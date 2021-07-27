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

const obterAutor = async (req, res) => {
    const { id } = req.params; 
    try {
        const autor = await conexao.query("SELECT * FROM autores WHERE id = $1", [id]);

        if(!autor.rowCount){
            return res.status(404).json("O autor informado não foi encontrado.")
        }

        return res.json(autor.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarAutor = async (req, res) => {

}

const editarAutor = async (req, res) => {

}

const deletarAutor = async (req, res) => {

}

module.exports = { listarAutores, obterAutor, cadastrarAutor, editarAutor, deletarAutor };