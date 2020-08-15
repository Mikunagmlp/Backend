const colegioCtrl = {};
const Colegio = require('../models/colegio');

colegioCtrl.crearColegio = async (req, res) => {
    const { NombreColegio, Ruta, Distrito, CodColegio, Turno, Categoria, Telefono, Direccion, Encargado, CantidadAlumnosInicial, CantidadAlumnosPrimaria, CantidadAlumnosSegundaria} = req.body;
    try {
        const newColegio = new Colegio({
            NombreColegio,
            Ruta,
            Distrito,
            CodColegio,
            Turno,
            Categoria,
            Telefono,
            Direccion,
            Encargado,
            CantidadAlumnosInicial,
            CantidadAlumnosPrimaria, 
            CantidadAlumnosSegundaria
        })
        await newColegio.save();
        res.json(newColegio);
    } catch (e) {
        res.status(400).send(e);
    }
}

colegioCtrl.listarColegios = async (req, res) => {
    // console.log(req.query.limit);

    try {
        const colegios = await Colegio.find({ Estado: true })
            .limit( parseInt(req.query.limit) ) // limitamos cuantos colegios va a devolver
            .skip( parseInt(req.query.skip) ); // nos saltamos las tareas

        res.status(200).send( colegios );
    } catch (e) {
        res.status(400).send(e);
    }
}

colegioCtrl.updateColegio = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreColegio', 'Ruta', 'Distrito', 'CodColegio', 'Turno', 'Categoria',
        'Telefono', 'Direccion', 'Estado','Encargado','CantidadAlumnosInicial','CantidadAlumnosPrimaria',
        'CantidadAlumnosSegundaria'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const colegio = await Colegio.findOne({ _id: req.params.id });

        if (!colegio) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            colegio[update] = req.body[update];
        });
        await colegio.save();

        res.send(colegio);

    } catch (error) {
        res.status(400).send(error);
    }
}

colegioCtrl.getSearch = async (req, res, next) => {

    try {
        let q = req.query.q;
        let result =  await Colegio.find(
        {
            NombreColegio: {
                $regex: new RegExp(q),
                $options: 'i'
            }
        }, { __v: 0 });

        if (result.length == 0) {
            result =  await Colegio.find(
                {
                    CodColegio: {
                        $regex: new RegExp(q),
                        $options: 'i'
                    }
                }, { __v: 0 });
        }
        res.status(200).send( result );
    } catch (e) {
        res.status(400).send(e);
    }
    
}

colegioCtrl.listarColegiosDisabled = async (req, res) => {
    try {
        const colegios = await Colegio.find({ Estado: false });

        res.status(200).send( colegios );
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = colegioCtrl;
