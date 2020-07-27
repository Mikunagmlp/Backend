const proveedorCtrl = {};
const Proveedor = require('../models/proveedor');

proveedorCtrl.createProveedor = async (req, res) => {
    try {
        const { NombreProveedor, CodigoProveedor, NombreEmpresa, Direccion, Descripcion,
                pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8, pro9, pro10
              } = req.body;
        const newProveedor = new Proveedor({
            NombreProveedor,
            CodigoProveedor,
            NombreEmpresa,
            Direccion,
            Descripcion,
            pro1,
            pro2,
            pro3,
            pro4,
            pro5,
            pro6,
            pro7,
            pro8,
            pro9,
            pro10
        })
        await newProveedor.save();
        res.status(200).json(newProveedor);

    } catch (error) {
        res.status(400).send(error);
    }
}

proveedorCtrl.getProveedores = async (req, res) => {
    try {
        const proveedotres = await Proveedor.find({ Estado: true })
        res.status(200).json(proveedotres);

    } catch (error) {
        res.status(400).send(error);
    }

}

proveedorCtrl.getProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).send(error);
    }
}


proveedorCtrl.updateProveedor = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreProveedor', 'NombreEmpresa', 'Direccion', 'Descripcion', 'CodigoProveedor', 'Estado',
                           'pro1','pro2','pro3','pro4','pro5','pro6','pro7','pro8','pro9','pro10' 
                           ];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const proveedor = await Proveedor.findOne({ _id: req.params.id });

        if (!proveedor) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            proveedor[update] = req.body[update];
        });
        await proveedor.save();

        res.send(proveedor);

    } catch (error) {
        res.status(400).send(error);
    }
}

proveedorCtrl.desableProveedor = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Proveedor.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}

proveedorCtrl.getProveedoresDisabled = async (req, res) => {
    try {
        const proveedotres = await Proveedor.find({ Estado: false })
        res.status(200).json(proveedotres);

    } catch (error) {
        res.status(400).send(error);
    }

}

module.exports = proveedorCtrl;
