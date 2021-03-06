const productoCtrl = {};
const Producto = require('../models/producto');

productoCtrl.createProducto = async (req, res) => {
    try {
        const { NombreProducto, CodigoProducto, Descripcion, Solido, Liquido, IdProveedor, IdAlmacen, Lote, Volumen, Gramage,Nivels, PresupuestoInicial, PrecioUnitario } = req.body;
        const newProducto = new Producto({
            NombreProducto,
            CodigoProducto,
            Descripcion,
            // IdUser,
            Solido,
            Liquido,
            IdProveedor,
            IdAlmacen,
            Lote,
            Volumen,
            Gramage,
            Nivels,
            PresupuestoInicial,
            PrecioUnitario
        })
        await newProducto.save();
        res.status(200).json(newProducto);

    } catch (error) {
        res.status(400).send(error);
    }
}

productoCtrl.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find({ Estado: true })
            .populate('IdProveedor')
            .populate('IdAlmacen')
            .exec();

        res.status(200).json(productos);

    } catch (error) {
        res.status(400).send(error);
    }

}

productoCtrl.getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
            .populate('IdProveedor')
            .populate('IdAlmacen')
            .exec();

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).send(error);
    }
}


productoCtrl.updateProducto = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreProducto', 'Descripcion', 'Solido_Liquido','IdProveedor', 'IdAlmacen', 'Lote', 'Volumen', 'Gramage', 'PresupuestoInicial', 'Nivels', 'PrecioUnitario'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const producto = await Producto.findOne({ _id: req.params.id });

        if (!producto) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            producto[update] = req.body[update];
        });
        await producto.save();

        res.send(producto);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

}

productoCtrl.desableProducto = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Producto.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}

productoCtrl.getProductosDisabled = async (req, res) => {
    try {
        const productos = await Producto.find({ Estado: false })
            .populate('IdProveedor')
            .populate('IdAlmacen')
            .exec();

        res.status(200).json(productos);

    } catch (error) {
        res.status(400).send(error);
    }

}


module.exports = productoCtrl;
