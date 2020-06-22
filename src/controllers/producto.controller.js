const productoCtrl = {};
const Producto = require('../models/producto');

productoCtrl.createProducto = async (req, res) => {
    try {
        const { NombreProducto, CodigoProducto, PrecioProducto, CantidadProducto, Descripcion, IdUser, IdCategoria, IdProveedor, IdAlmacen } = req.body;
        const newProducto = new Producto({
            NombreProducto,
            CodigoProducto,
            PrecioProducto,
            CantidadProducto,
            Descripcion,
            IdUser,
            IdCategoria,
            IdProveedor,
            IdAlmacen
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
            .populate('IdCategoria')
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
            .populate('IdCategoria')
            .populate('IdProveedor')
            .populate('IdAlmacen')
            .exec();

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).send(error);
    }
}


productoCtrl.updateProducto = async (req, res) => {
    try {
        const { NombreProducto, PrecioProducto, CantidadProducto, Descripcion, IdUser, IdCategoria, IdProveedor, IdAlmacen } = req.body;
        await Producto.findByIdAndUpdate(req.params.id, {
            NombreProducto,
            PrecioProducto,
            CantidadProducto,
            Descripcion,
            IdUser,
            IdCategoria,
            IdProveedor,
            IdAlmacen
        });
        return res.status(200).json({ update: true });
    } catch (error) {
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


module.exports = productoCtrl;