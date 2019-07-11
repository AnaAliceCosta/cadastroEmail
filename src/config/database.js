const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS pessoas (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL UNIQUE
)
`;

const INSERIR_USUARIO_1 = 
`
INSERT INTO pessoas (
    nome, 
    email
) SELECT 'Ana Alice', 'anaalice.cd@gmail.com' WHERE NOT EXISTS (SELECT * FROM pessoas WHERE email = 'anaalice.cd@gmail.com')
`;



bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(INSERIR_USUARIO_1);


    bd.each("SELECT * FROM pessoas", (err, usuario) => {
        console.log('Usuario: ');
        console.log(usuario);
    });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;