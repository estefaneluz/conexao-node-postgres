const conexao = require('../connection');

const listarLivros = async (req, res) => {
    try {
        const { rows: livros } = await conexao.query("SELECT * FROM livros");
        return res.status(200).json(livros);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterLivro = async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await conexao.query("SELECT * FROM livros WHERE id = $1", [id]);
        if(!livro.rowCount) return res.status(404).json("Livro não encontrado.");
        return res.status(200).json(livro.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarLivro = async (req, res) => {

}

const editarLivro = async (req, res) => {

}

const deletarLivro = async (req, res) => {

}

module.exports = { listarLivros, obterLivro, cadastrarLivro, editarLivro, deletarLivro };