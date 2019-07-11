const EmailDao = require('../infra/email-dao');
const db = require('../../config/database');
module.exports = (app) => {

    
    app.get('/emails', (req, resp) => {
        console.log(req,'oi')
        const emailDao = new EmailDao(db);
        emailDao.lista()
            .then(emails => 
                resp.send(emails)
            )
            .catch(erro => console.log(erro));
    });


    app.post('/emails', function(req, resp) {
        console.log(req.body);
        const emailDao = new EmailDao(db);
        
        emailDao.adiciona(req.body)
                .then(resp.send(req.body))
                .catch(erro => console.log(erro));
    });

    // app.put('/livros', function(req, resp) {
    //     console.log(req.body);
    //     const livroDao = new LivroDao(db);
        
    //     livroDao.atualiza(req.body)
    //             .then(resp.redirect('/livros'))
    //             .catch(erro => console.log(erro));
    // });

    // app.delete('/livros/:id', function(req, resp) {
    //     const id = req.params.id;

    //     const livroDao = new LivroDao(db);
    //     livroDao.remove(id)
    //             .then(() => resp.status(200).end())
    //             .catch(erro => console.log(erro));
    // });
};