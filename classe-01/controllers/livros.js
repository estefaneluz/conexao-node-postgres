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

}

const cadastrarLivro = async (req, res) => {

}

const editarLivro = async (req, res) => {

}

const deletarLivro = async (req, res) => {

}

module.exports = { listarLivros, obterLivro, cadastrarLivro, editarLivro, deletarLivro };