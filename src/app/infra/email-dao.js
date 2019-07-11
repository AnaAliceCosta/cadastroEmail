class EmailDAO {

    constructor(db) {
        this._db = db;
    }

    adiciona(pessoa) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO pessoas (
                    nome, 
                    email
                ) values (?,?)
                `,
                [
                    pessoa.nome,
                    pessoa.email
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM pessoas',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os livros!');
                    return resolve(resultados);
                }
            )
        });
    }


    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE livros SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o livro!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = EmailDAO;