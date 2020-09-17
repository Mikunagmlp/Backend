const registerphCtrl = {};
const Registerph = require('../models/registerph');

registerphCtrl.createRegisterph = async (req, res) => {
    try {
        const { CodigoActa, NombreColegio, Ruta, CodigoRuta,
            CodColegio, LoteLiquidoInicial,  ProductoLiquidoInicial,
            phLiquidoInicial, LoteLiquidoPrimaria, ProductoLiquidoPrimaria,
            phLiquidoPrimaria, LoteLiquidoSegundaria,ProductoLiquidoSegundaria,
            phLiquidoSegundaria
              } = req.body;
        const newRegisterph = new Registerph({
            CodigoActa,
            NombreColegio,
            NombreEmpresa,
            Ruta,
            CodigoRuta,
            CodColegio,
            LoteLiquidoInicial,
            ProductoLiquidoInicial,
            phLiquidoInicial,
            LoteLiquidoPrimaria,
            ProductoLiquidoPrimaria,
            phLiquidoPrimaria,
            LoteLiquidoSegundaria,
            ProductoLiquidoSegundaria,
            phLiquidoSegundaria
        })
        await newRegisterph.save();
        res.status(200).json(newRegisterph);

    } catch (error) {
        res.status(400).send(error);
    }
}

//proveedorCtrl.getProveedores = async (req, res) => {
  //  try {
    //    const registerphcalidad = await Registerph.find({ Estado: true })
      //  res.status(200).json(registerphcalidad);

    //} catch (error) {
      //  res.status(400).send(error);
    //}

//}

registerphCtrl.getRegisterph= async (req, res) => {
    try {
        const registerph = await Registerph.findById(req.params.id);
        res.status(200).json(registerph);
    } catch (error) {
        res.status(400).send(error);
    }
}
registerphCtrl.listaRegisterph = async (req, res) => {
    try {
        const fechaInicial = req.body.fechaBusqueda; 
        const fechaFinal = fechaInicial.substring(0, 8).concat(Number(fechaInicial.substring(8)) + 1);
        const { codigoGenerado } = req.body;
        const registerph = await Registerph.find({ $and: [{ updatedAt: { $gte: new Date(fechaInicial) } }, { updatedAt: { $lt: new Date(fechaFinal) } }], Estado: true })
        res.status(200).send(registerph);
    } catch (e) {
        res.status(400).send(e);
    }
}


module.exports = registerphCtrl;
