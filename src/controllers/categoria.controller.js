const categoriaCtrl = {};
const Categoria = require('../models/categoria');

categoriaCtrl.createCategoria = async (req, res) => {
    try {
        const { NombreCategoria, CodigoCategoria, Descripcion, IdUser } = req.body;

        const newCategoria = new Categoria({
            NombreCategoria,
            CodigoCategoria,
            Descripcion,
            IdUser
        })

        await newCategoria.save();
        res.status(200).json(newCategoria);

    } catch (error) {
        res.status(400).send(error);
    }
}

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({ Estado: true })
        res.status(200).json(categorias);

    } catch (error) {
        res.status(400).send(error);
    }

}

categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        res.status(200).json(categoria);
    } catch (error) {
        res.status(400).send(error);
    }
}


categoriaCtrl.updateCategoria = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['NombreCategoria', 'Descripcion', 'Estado'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Actualizaciones invalidas!' })
    }

    try {
        const categoria = await Categoria.findOne({ _id: req.params.id });

        if (!categoria) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            categoria[update] = req.body[update];
        });
        await categoria.save();

        res.send(categoria);

    } catch (error) {
        res.status(400).send(error);
    }
}

categoriaCtrl.desableCategoria = async (req, res) => {
    try {
        const { Estado } = req.body;
        await Categoria.findByIdAndUpdate(req.params.id, {
            Estado
        });
        return res.status(200).json({ update: true });
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = categoriaCtrl;
