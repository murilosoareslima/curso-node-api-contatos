import model from './model'; 


class Controller{
    constructor(){};    

    getContatos() {
        //as {} indica que queremos tudo da collection
        return model.find({});
    }

    select(req, res) {
        this.getContatos()
        .then(contatos => res.status(200).json({'result': contatos}))
        .catch(err => res.status(400).json({'result': err}));
    }

    getContatoByID(id) {
        return model.find(id);
    }

    selectOne(req, res) {
        const id = { _id: req.params.id};
        this.getContatoByID(id)
        .then(contatos => res.status(200).json({'result': contatos}))
        .catch(err => res.status(400).json({'result': err}));
    }

    deleteByID(id) {
        return model.deleteOne(id);
    }

    delete(req, res) {
        const id = { _id: req.params.id};
        this.deleteByID(id)
        .then(contatos => res.status(200).json({'result': contatos}))
        .catch(err => res.status(400).json({'result': err}));
    }

    updateByID(id, data) {
        return model.findOneAndUpdate(id, data);
    }

    update(req, res) {
        const id = { _id: req.params.id};
        const contato = req.body;

        this.updateByID(id, contato)
        .then(contatos => res.status(200).json({'result': contatos}))
        .catch(err => res.status(400).json({'result': err}));
    }

    createContato(data) {
        return model.create(data);
    }

    insert(req, res) {
        const contato = req.body;

        this.createContato(contato)
        .then(contatos => res.status(200).json({'result': contatos}))
        .catch(err => res.status(400).json({'result': err}));
    }
}

export default Controller;