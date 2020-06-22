const proveedorCtrl = {};
const Proveedor = require('../models/proveedor');

proveedorCtrl.createProveedor = async (req, res) => {
    try {
        const { NombreProveedor, CodigoProveedor, NombreEmpresa, Direccion, Descripcion, IdUser } = req.body;
        const newProveedor = new Proveedor({
            NombreProveedor,
            CodigoProveedor,
            NombreEmpresa,
            Direccion,
            Descripcion,
            IdUser
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




module.exports = proveedorCtrl;