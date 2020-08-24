const menuCtrl = {};
const Colegio = require('../models/colegio');
const Producto = require('../models/producto');
const Menu = require('../models/menu');

menuCtrl.createMenu = async (req, res) => {
    let codigoMenu = await Menu.countDocuments() + 1;
    try {
        const { CodigoSolidoInicial, CodigoLiquidoInicial, ProductoSolidoInicial, FrecuenciaSolidoUtilizadoInicial,
            frecuenciaSolidoInicialInicial, frecuenciaLiquidaInicialInicial, montoLiquidaInicial,
            MontoSolildoUtilizadoInicial, montoSolildoInicial, ProductoLiquidoInicial,
            FrecuenciaLiquidaUtilizadoInicial, MontoLiquidaUtilizadoInicial, CodigoSolidoPrimaria,
            CodigoLiquidoPrimaria, ProductoSolidoPrimaria, FrecuenciaSolidoUtilizadoPrimaria,
            MontoSolildoUtilizadoPrimaria, ProductoLiquidoPrimaria, FrecuenciaLiquidaUtilizadoPrimaria,
            MontoLiquidaUtilizadoPrimaria, frecuenciaSolidoPrimariaInicial, montoSolildoPrimaria,
            frecuenciaLiquidaPrimariaInicial, montoLiquidaPrimaria, CodigoSolidoSegundaria, CodigoLiquidoSegundaria,
            ProductoSolidoSegundaria, FrecuenciaSolidoUtilizadoSegundaria, MontoSolildoUtilizadaSegundaria,
            ProductoLiquidoSegundaria, FrecuenciaLiquidaUtilizadoSegundaria, frecuenciaSolidoSegundariaInicial,
            montoSolildoSegundaria, frecuenciaLiquidaSegundariaInicial, montoLiquidaSegundaria,
            MontoLiquidaUtilizadoSegundaria, ObservacionJefeUnace, ObservacionEba } = req.body;

        const newMenu = new Menu({
            codigoGenerado: codigoMenu,

            CodigoSolidoInicial,
            CodigoLiquidoInicial,
            ProductoSolidoInicial,
            FrecuenciaSolidoUtilizadoInicial,
            MontoSolildoUtilizadoInicial,
            ProductoLiquidoInicial,
            FrecuenciaLiquidaUtilizadoInicial,
            frecuenciaSolidoInicialInicial,
            MontoLiquidaUtilizadoInicial,
            montoSolildoInicial,
            frecuenciaLiquidaInicialInicial,
            montoLiquidaInicial,

            CodigoSolidoPrimaria,
            CodigoLiquidoPrimaria,
            ProductoSolidoPrimaria,
            FrecuenciaSolidoUtilizadoPrimaria,
            MontoSolildoUtilizadoPrimaria,
            ProductoLiquidoPrimaria,
            FrecuenciaLiquidaUtilizadoPrimaria,
            MontoLiquidaUtilizadoPrimaria,
            frecuenciaSolidoPrimariaInicial,
            montoSolildoPrimaria,
            frecuenciaLiquidaPrimariaInicial,
            montoLiquidaPrimaria,

            CodigoSolidoSegundaria,
            CodigoLiquidoSegundaria,
            ProductoSolidoSegundaria,
            FrecuenciaSolidoUtilizadoSegundaria,
            MontoSolildoUtilizadaSegundaria,
            ProductoLiquidoSegundaria,
            FrecuenciaLiquidaUtilizadoSegundaria,
            MontoLiquidaUtilizadoSegundaria,
            frecuenciaSolidoSegundariaInicial,
            montoSolildoSegundaria,
            frecuenciaLiquidaSegundariaInicial,
            montoLiquidaSegundaria,
            EnviadoEba: true,
            AprovadoEba: false,
            EnviadoJefeUnace: false,
            Aprovado: false,
            ObservacionJefeUnace,
            ObservacionEba
        })
        await newMenu.save();
        res.status(200).json(newMenu);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

menuCtrl.updateMenu = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['CodigoSolidoInicial', 'CodigoLiquidoInicial', 'ProductoSolidoInicial',
        'FrecuenciaSolidoUtilizadoInicial', 'frecuenciaSolidoInicialInicial', 'frecuenciaLiquidaInicialInicial',
        'montoLiquidaInicial', 'MontoSolildoUtilizadoInicial', 'montoSolildoInicial', 'ProductoLiquidoInicial',
        'FrecuenciaLiquidaUtilizadoInicial', 'MontoLiquidaUtilizadoInicial', 'CodigoSolidoPrimaria',
        'CodigoLiquidoPrimaria', 'ProductoSolidoPrimaria', 'FrecuenciaSolidoUtilizadoPrimaria',
        'MontoSolildoUtilizadoPrimaria', 'ProductoLiquidoPrimaria', 'FrecuenciaLiquidaUtilizadoPrimaria',
        'MontoLiquidaUtilizadoPrimaria', 'frecuenciaSolidoPrimariaInicial', 'montoSolidoPrimaria',
        'frecuenciaLiquidaPrimariaInicial', 'montoLiquidaPrimaria', 'CodigoSolidoSegundaria',
        'CodigoLiquidoSegundaria', 'ProductoSolidoSegundaria', 'FrecuenciaSolidoUtilizadoSegundaria',
        'MontoSolildoUtilizadaSegundaria', 'ProductoLiquidoSegundaria', 'FrecuenciaLiquidaUtilizadoSegundaria',
        'frecuenciaSolidoSegundariaInicial', 'montoSolildoSegundaria', 'frecuenciaLiquidaSegundariaInicial',
        'montoLiquidaSegundaria', 'MontoLiquidaUtilizadoSegundaria', 'IdUser'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const menu = await Menu.findOne({ _id: req.params.id });

        if (!menu) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            menu[update] = req.body[update];
        });
        await menu.save();

        res.send(menu);

    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.listarMenuAprobado = async (req, res) => {
    try {
        const menu = await Menu.find({ Aprovado: true });

        res.status(200).send(menu);
    } catch (e) {
        res.status(400).send(e);
    }
}

menuCtrl.listarMenuNoAprobado = async (req, res) => {
    try {
        const menu = await Menu.find({ Aprovado: false });

        res.status(200).send(menu);
    } catch (e) {
        res.status(400).send(e);
    }
}
menuCtrl.listarMenuEba = async (req, res) => {
    try {
        const menu = await Menu.find({ EnviadoEba: true });

        res.status(200).send(menu);
    } catch (e) {
        res.status(400).send(e);
    }
}
menuCtrl.aprobarMenuEba = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['AprovadoEba', 'EnviadoEba', 'ObservacionEba', 'EnviadoJefeUnace'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const menu = await Menu.findOne({ _id: req.params.id });
        if (!menu) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            menu[update] = req.body[update];
        });
        await menu.save();

        res.send(menu);

    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.aprobarMenuUnace = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['AprovadoEba', 'ObservacionEba', 'Aprovado', 'ObservacionJefeUnace', 'EnviadoJefeUnace'];

    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const menu = await Menu.findOne({ _id: req.params.id });
        if (!menu) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            menu[update] = req.body[update];
        });
        await menu.save();

        res.send(menu);

    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.listarMenuUnace = async (req, res) => {
    try {
        const menu = await Menu.find({ EnviadoJefeUnace: true });

        res.status(200).send(menu);
    } catch (e) {
        res.status(400).send(e);
    }
}
menuCtrl.getSolidoInicial = async (req, res) => {
    let totalAlumnosInicial = 0;
    let solidoInicial = req.query.solidoinicial;
    try {
        const getProductosSolitoInicial = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(solidoInicial),
                $options: 'i'
            },
            "Nivels.Nivel": "Inicial",
            Solido_Liquido: true
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosInicial: 1, _id: 0 });

        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosInicial += data.CantidadAlumnosInicial;
        });

        let frecuenciaSolidoInicialInicial = getProductosSolitoInicial.PresupuestoInicial / (totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario);
        let montoSolildoInicial = getProductosSolitoInicial.PresupuestoInicial;
        let frecuenciaSolidoUtilizadoInicial = 0;
        let montoSolildoUtilizadoInicial = 0;
        let frecuenciaSolidoUtilizadoInicial2 = 0;
        let montoSolildoUtilizadoInicial2 = 0;

        const MenuSolidoInicial = await Menu.find({ CodigoSolidoInicial: getProductosSolitoInicial.CodigoProducto, Aprovado: true });

        if (MenuSolidoInicial == 0) {
            frecuenciaSolidoUtilizadoInicial;
            montoSolildoUtilizadoInicial;
        } else {
            MenuSolidoInicial.forEach((s) => {
                frecuenciaSolidoUtilizadoInicial += s.frecuenciaSolidoInicialInicial;
                montoSolildoUtilizadoInicial += s.montoSolildoInicial;
            })
            frecuenciaSolidoUtilizadoInicial = ((totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario) / (totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario) + frecuenciaSolidoUtilizadoInicial);

            frecuenciaSolidoUtilizadoInicial2 = ((totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario) / (totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario));

            montoSolildoUtilizadoInicial = ((totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario) + montoSolildoUtilizadoInicial);

            montoSolildoUtilizadoInicial2 = (totalAlumnosInicial * getProductosSolitoInicial.PrecioUnitario);
        }
        const newProductoSolidInicial = {
            CodigoSolidoInicial: getProductosSolitoInicial.CodigoProducto,
            ProductoSolidoInicial: getProductosSolitoInicial.NombreProducto,
            FrecuenciaSolidoUtilizadoInicial: (frecuenciaSolidoInicialInicial - frecuenciaSolidoUtilizadoInicial).toFixed(2),
            frecuenciaSolidoInicialInicial: (frecuenciaSolidoUtilizadoInicial2).toFixed(2),
            MontoSolildoUtilizadoInicial: (montoSolildoInicial - montoSolildoUtilizadoInicial).toFixed(2),
            montoSolildoInicial: (montoSolildoUtilizadoInicial2).toFixed(2)
        }
        res.status(200).json(newProductoSolidInicial);
    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.getLiquidoInicial = async (req, res) => {
    let totalAlumnosInicial = 0;
    let liquidoInicial = req.query.liquidoinicial;
    try {
        const getProductosLiquidoInicial = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(liquidoInicial),
                $options: 'i'
            },
            "Nivels.Nivel": "Inicial", Solido_Liquido: false
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosInicial: 1, _id: 0 });
        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosInicial += data.CantidadAlumnosInicial;
        });
        let frecuenciaLiquidoInicialInicial = getProductosLiquidoInicial.PresupuestoInicial / (totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario);
        let montoLiquidoInicial = getProductosLiquidoInicial.PresupuestoInicial;
        let frecuenciaLiquidoUtilizadoInicial = 0;
        let montoLiquidoUtilizadoInicial = 0;
        let frecuenciaLiquidoUtilizadoInicial2 = 0;
        let montoLiquidoUtilizadoInicial2 = 0;
        const MenuLiquidoInicial = await Menu.find({ CodigoLiquidoInicial: getProductosLiquidoInicial.CodigoProducto, Aprovado: true});
        if (MenuLiquidoInicial == 0) {
            frecuenciaLiquidoUtilizadoInicial;
            montoLiquidoUtilizadoInicial;
        } else {
            MenuLiquidoInicial.forEach((s) => {
                frecuenciaLiquidoUtilizadoInicial += s.frecuenciaLiquidaInicialInicial;
                montoLiquidoUtilizadoInicial = + s.montoLiquidaInicial;
            })
            frecuenciaLiquidoUtilizadoInicial = ((totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario) / (totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario) + frecuenciaLiquidoUtilizadoInicial);

            montoLiquidoUtilizadoInicial = ((totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario) + montoLiquidoUtilizadoInicial);

            frecuenciaLiquidoUtilizadoInicial2 = ((totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario) / (totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario));

            montoLiquidoUtilizadoInicial2 = ((totalAlumnosInicial * getProductosLiquidoInicial.PrecioUnitario));
        }
        const newProductoLiquidoInicial = {
            CodigoLiquidoInicial: getProductosLiquidoInicial.CodigoProducto,
            ProductoLiquidoInicial: getProductosLiquidoInicial.NombreProducto,
            FrecuenciaLiquidaUtilizadoInicial: (frecuenciaLiquidoInicialInicial - frecuenciaLiquidoUtilizadoInicial).toFixed(2),
            MontoLiquidaUtilizadoInicial: (montoLiquidoInicial - montoLiquidoUtilizadoInicial).toFixed(2),
            frecuenciaLiquidoInicialInicial: (frecuenciaLiquidoUtilizadoInicial2).toFixed(2),
            montoLiquidaInicial: (montoLiquidoUtilizadoInicial2).toFixed(2)
        }
        res.status(200).json(newProductoLiquidoInicial);
    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.getSolidoPrimario = async (req, res) => {
    let totalAlumnosPrimario = 0;
    let solidoPrimario = req.query.solidoprimario;
    try {
        const getProductosSolitoPrimaria = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(solidoPrimario),
                $options: 'i'
            },
            "Nivels.Nivel": "Primaria",
            "Solido_Liquido": true
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosPrimaria: 1, _id: 0 });
        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosPrimario += data.CantidadAlumnosPrimaria;
        });
        let frecuenciaSolidoPrimariaInicial = getProductosSolitoPrimaria.PresupuestoInicial / (totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario);
        let montoSolidoPrimaria = getProductosSolitoPrimaria.PresupuestoInicial;
        let frecuenciaSolidoUtilizadoPrimaria = 0;
        let montoSolildoUtilizadoPrimaria = 0;
        let frecuenciaSolidoUtilizadoPrimaria2 = 0;
        let montoSolildoUtilizadoPrimaria2 = 0;

        const MenuSolidoPrimaria = await Menu.find({ CodigoSolidoPrimaria: getProductosSolitoPrimaria.CodigoProducto, Aprovado: true });
        if (MenuSolidoPrimaria == 0) {
            frecuenciaSolidoUtilizadoPrimaria;
            montoSolildoUtilizadoPrimaria;
        } else {
            MenuSolidoPrimaria.forEach((s) => {
                frecuenciaSolidoUtilizadoPrimaria += s.frecuenciaSolidoPrimariaInicial;
                montoSolildoUtilizadoPrimaria += s.montoSolidoPrimaria;
            })
            frecuenciaSolidoUtilizadoPrimaria = ((totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario) / (totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario) + frecuenciaSolidoUtilizadoPrimaria);
            montoSolildoUtilizadoPrimaria = ((totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario) + montoSolildoUtilizadoPrimaria);

            frecuenciaSolidoUtilizadoPrimaria2 = ((totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario) / (totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario));

            montoSolildoUtilizadoPrimaria2 = ((totalAlumnosPrimario * getProductosSolitoPrimaria.PrecioUnitario));
        }

        const newProductoSolidoPrimaria = {
            CodigoSolidoPrimaria: getProductosSolitoPrimaria.CodigoProducto,
            ProductoSolidoPrimaria: getProductosSolitoPrimaria.NombreProducto,
            FrecuenciaSolidoUtilizadoPrimaria: (frecuenciaSolidoPrimariaInicial - frecuenciaSolidoUtilizadoPrimaria).toFixed(2),
            MontoSolildoUtilizadoPrimaria: (montoSolidoPrimaria - montoSolildoUtilizadoPrimaria).toFixed(2),
            frecuenciaSolidoPrimariaInicial: (frecuenciaSolidoUtilizadoPrimaria2).toFixed(2),
            montoSolidoPrimaria: (montoSolildoUtilizadoPrimaria2).toFixed(2)
        }
        res.status(200).json(newProductoSolidoPrimaria);
    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.getLiquidoPrimario = async (req, res) => {

    let totalAlumnosPrimaria = 0;
    let liquidoPrimaria = req.query.liquidoprimaria;
    try {
        const getProductosLiquidoPrimaria = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(liquidoPrimaria),
                $options: 'i'
            },
            "Nivels.Nivel": "Primaria",
            "Solido_Liquido": false
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosPrimaria: 1, _id: 0 });
        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosPrimaria += data.CantidadAlumnosPrimaria;
        });
        let frecuenciaLiquidoPrimariaInicial = getProductosLiquidoPrimaria.PresupuestoInicial / (totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario);
        let montoLiquidoPrimaria = getProductosLiquidoPrimaria.PresupuestoInicial;
        let frecuenciaLiquidoUtilizadoPrimaria = 0;
        let montoLiquidoUtilizadoPrimaria = 0;
        let frecuenciaLiquidoUtilizadoPrimaria2 = 0;
        let montoLiquidoUtilizadoPrimaria2 = 0;

        const MenuLiquidoPrimaria = await Menu.find({ CodigoLiquidoPrimaria: getProductosLiquidoPrimaria.CodigoProducto, Aprovado: true });
        if (MenuLiquidoPrimaria == 0) {
            frecuenciaLiquidoUtilizadoPrimaria;
            montoLiquidoUtilizadoPrimaria;
        } else {
            MenuLiquidoPrimaria.forEach((s) => {
                frecuenciaLiquidoUtilizadoPrimaria += s.frecuenciaLiquidaPrimariaInicial;
                montoLiquidoUtilizadoPrimaria += s.montoLiquidaPrimaria;
            })
            frecuenciaLiquidoUtilizadoPrimaria = ((totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario) / (totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario) + frecuenciaLiquidoUtilizadoPrimaria);

            montoLiquidoUtilizadoPrimaria = ((totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario) + montoLiquidoUtilizadoPrimaria);

            frecuenciaLiquidoUtilizadoPrimaria2 = ((totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario) / (totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario));

            montoLiquidoUtilizadoPrimaria2 = ((totalAlumnosPrimaria * getProductosLiquidoPrimaria.PrecioUnitario));
        }
        const newProductoLiquidoPrimaria = {
            CodigoLiquidoPrimaria: getProductosLiquidoPrimaria.CodigoProducto,
            ProductoLiquidoPrimaria: getProductosLiquidoPrimaria.NombreProducto,
            FrecuenciaLiquidaUtilizadoPrimaria: (frecuenciaLiquidoPrimariaInicial - frecuenciaLiquidoUtilizadoPrimaria).toFixed(2),
            MontoLiquidaUtilizadoPrimaria: (montoLiquidoPrimaria - montoLiquidoUtilizadoPrimaria).toFixed(2),
            frecuenciaLiquidaPrimariaInicial: frecuenciaLiquidoUtilizadoPrimaria2.toFixed(2),
            montoLiquidaPrimaria: montoLiquidoUtilizadoPrimaria2.toFixed(2)
        }
        res.status(200).json(newProductoLiquidoPrimaria);
    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.getSolidoSegundario = async (req, res) => {
    let totalAlumnosSegundario = 0;
    let solidoSegundario = req.query.solidosegundario;
    try {
        const getProductosSolitoSegundario = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(solidoSegundario),
                $options: 'i'
            },
            "Nivels.Nivel": "Segundaria",
            Solido_Liquido: true
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosSegundaria: 1, _id: 0 });
        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosSegundario += data.CantidadAlumnosSegundaria;
        });
        let frecuenciaSolidoSegundariaInicial = getProductosSolitoSegundario.PresupuestoInicial / (totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario);

        let montoSolildosegundario = getProductosSolitoSegundario.PresupuestoInicial;
        let frecuenciaSolidoUtilizadoSegundario = 0;
        let montoSolildoUtilizadoSegundario = 0;
        let frecuenciaSolidoUtilizadoSegundario2 = 0;
        let montoSolildoUtilizadoSegundario2 = 0;

        const MenuSolidoSegundario = await Menu.find({ CodigoSolidoSegundaria: getProductosSolitoSegundario.CodigoProducto , Aprovado: true  });
        if (MenuSolidoSegundario == 0) {
            frecuenciaSolidoUtilizadoSegundario;
            montoSolildoUtilizadoSegundario;
        } else {
            MenuSolidoSegundario.forEach((s) => {
                frecuenciaSolidoUtilizadoSegundario += s.frecuenciaSolidoSegundariaInicial;
                montoSolildoUtilizadoSegundario += s.montoSolildoSegundaria;
            })
            frecuenciaSolidoUtilizadoSegundario = ((totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario) / (totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario) + frecuenciaSolidoUtilizadoSegundario);
            montoSolildoUtilizadoSegundario = ((totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario) + montoSolildoUtilizadoSegundario);
            frecuenciaSolidoUtilizadoSegundario2 = ((totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario) / (totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario));
            montoSolildoUtilizadoSegundario2 = ((totalAlumnosSegundario * getProductosSolitoSegundario.PrecioUnitario));
        }
        const newProductoSolidSegundario = {
            CodigoSolidoSegundaria: getProductosSolitoSegundario.CodigoProducto,
            ProductoSolidoSegundaria: getProductosSolitoSegundario.NombreProducto,
            FrecuenciaSolidoUtilizadoSegundaria: (frecuenciaSolidoSegundariaInicial - frecuenciaSolidoUtilizadoSegundario).toFixed(2),
            MontoSolildoUtilizadaSegundaria: (montoSolildosegundario - montoSolildoUtilizadoSegundario).toFixed(2),
            frecuenciaSolidoSegundariaInicial: frecuenciaSolidoUtilizadoSegundario2.toFixed(2),
            montoSolildoSegundaria: montoSolildoUtilizadoSegundario2.toFixed(2)
        }
        res.status(200).json(newProductoSolidSegundario);
    } catch (error) {
        res.status(400).send(error);
    }
}

menuCtrl.getLiquidoSegundario = async (req, res) => {
    let totalAlumnosSegundario = 0;
    let liquidoSegundario = req.query.liquidosegundario;
    try {
        const getProductosLiquidoSegundario = await Producto.findOne({
            NombreProducto: {
                $regex: new RegExp(liquidoSegundario),
                $options: 'i'
            },
            "Nivels.Nivel": "Segundaria",
            Solido_Liquido: false
        }, { NombreProducto: 1, CodigoProducto: 1, IdCategoria: 1, Nivels: 1, PresupuestoInicial: 1, PrecioUnitario: 1, __id: 1 }
        );
        const getTotalPoblacionAlumnos = await Colegio.find({ Estado: true }, { CantidadAlumnosSegundaria: 1, _id: 0 });
        getTotalPoblacionAlumnos.forEach((data) => {
            totalAlumnosSegundario += data.CantidadAlumnosSegundaria;
        });
        let frecuenciaLiquidoSegundarioInicial = getProductosLiquidoSegundario.PresupuestoInicial / (totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario);
        let montoLiquidoSegundario = getProductosLiquidoSegundario.PresupuestoInicial;
        let frecuenciaLiquidoUtilizadoSegundario = 0;
        let montoLiquidoUtilizadoSegundario = 0;
        let frecuenciaLiquidoUtilizadoSegundario2 = 0;
        let montoLiquidoUtilizadoSegundario2 = 0;
        const MenuLiquidoSegundario = await Menu.find({ CodigoLiquidoSegundaria: getProductosLiquidoSegundario.CodigoProducto, Aprovado: true });
        if (MenuLiquidoSegundario == 0) {
            frecuenciaLiquidoUtilizadoSegundario;
            montoLiquidoUtilizadoSegundario;
        } else {
            MenuLiquidoSegundario.forEach((s) => {
                frecuenciaLiquidoUtilizadoSegundario += s.frecuenciaLiquidaSegundariaInicial;
                montoLiquidoUtilizadoSegundario += s.montoLiquidaSegundaria;
            })
            frecuenciaLiquidoUtilizadoSegundario = ((totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario) / (totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario) + frecuenciaLiquidoUtilizadoSegundario);

            montoLiquidoUtilizadoSegundario = ((totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario) + montoLiquidoUtilizadoSegundario);

            frecuenciaLiquidoUtilizadoSegundario2 = ((totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario) / (totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario));

            montoLiquidoUtilizadoSegundario2 = ((totalAlumnosSegundario * getProductosLiquidoSegundario.PrecioUnitario));
        }
        const newProductoLiquidoSegundario = {
            CodigoLiquidoSegundaria: getProductosLiquidoSegundario.CodigoProducto,
            ProductoLiquidoSegundaria: getProductosLiquidoSegundario.NombreProducto,
            FrecuenciaLiquidaUtilizadoSegundaria: (frecuenciaLiquidoSegundarioInicial - frecuenciaLiquidoUtilizadoSegundario).toFixed(2),
            MontoLiquidaUtilizadoSegundaria: (montoLiquidoSegundario - montoLiquidoUtilizadoSegundario).toFixed(2),
            frecuenciaLiquidaSegundariaInicial: frecuenciaLiquidoUtilizadoSegundario2.toFixed(2),
            montoLiquidaSegundaria: montoLiquidoUtilizadoSegundario2.toFixed(2)
        }
        res.status(200).json(newProductoLiquidoSegundario);
    } catch (error) {
        res.status(400).send(error);
    }
}

module.exports = menuCtrl;
