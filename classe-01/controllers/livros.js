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
    const {autor_id, nome, editora, genero, data_publicacao } = req.body;
    if(!autor_id) return res.status(400).json("O id do autor precisa ser informado.");
    if(!nome) return res.status(400).json("O nome do livro precisa ser informado.");
    if(!genero) return res.status(400).json("O gênero do livro precisa ser informado.");
    try {
        const livro = await conexao.query(
            "INSERT INTO livros (autor_id, nome, editora, genero, data_publicacao) VALUES ($1, $2, $3, $4, $5)",
            [autor_id, nome, editora, genero, data_publicacao]);
        if(!livro.rowCount) return res.status(400).json("Não foi possível cadastrar o livro.");
        return res.status(200).json("Livro cadastrado com sucesso!");
    } catch(error) {
        return res.status(400).json(error.message);
    }
}

const editarLivro = async (req, res) => {

}

const deletarLivro = async (req, res) => {

}

module.exports = { listarLivros, obterLivro, cadastrarLivro, editarLivro, deletarLivro };