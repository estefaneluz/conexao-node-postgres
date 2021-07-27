const conexao = require('../connection');

const listarAutores = async (req, res) => {
    try {
        const { rows: autores } = await conexao.query("SELECT * FROM autores");

        for(const autor of autores){
            const { rows: livros } = await conexao.query("SELECT * FROM livros WHERE autor_id = $1", [autor.id]);
            autor.livros = livros;
        }

        return res.json(autores);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterAutor = (req, res) => {
    
}

const cadastrarAutor = (req, res) => {

}

const editarAutor = (req, res) => {

}

const deletarAutor = (req, res) => {

}

module.exports = { listarAutores, obterAutor, cadastrarAutor, editarAutor, deletarAutor };