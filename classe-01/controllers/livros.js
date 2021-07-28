const conexao = require('../connection');

const listarLivros = async (req, res) => {
    try {
        const { rows: livros } = await conexao.query(`
        SELECT l.id, a.nome AS nome_autor, l.nome, l.editora, l.genero, l.data_publicacao FROM livros l
        LEFT JOIN autores a ON l.autor_id = a.id`);
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
    const { id } = req.params; 
    const { autor_id, nome, editora, genero, data_publicacao } = req.body;
    if(!autor_id || !nome || !genero) return res.status(400).json("Os campos autor_id, nome e genero precisam ser informados.");
    try {
        const livro = await conexao.query("SELECT * FROM livros WHERE id = $1", [id]);

        if(!livro.rowCount) return res.status(404).json("Livro não encontrado.");

        const livroAtualizado = await conexao.query(
            "UPDATE livros SET autor_id = $1, nome = $2, editora = $3, genero = $4, data_publicacao = $5 WHERE id = $6",
            [autor_id, nome, editora, genero, data_publicacao, id]);

        if(!livroAtualizado.rowCount) return res.status(400).json("Não foi possível atualizar o livro.");

        return res.status(200).json("Livro atualizado com sucesso.");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deletarLivro = async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await conexao.query("SELECT * FROM livros WHERE id = $1", [id]);
        if(!livro.rowCount) return res.status(404).json("Livro não encontrado.");

        const emprestimoLivro = await conexao.query("SELECT * FROM emprestimos WHERE livro_id = $1", [id]);
        if(emprestimoLivro.rowCount) return res.status(400).json("Não podemos deletar esse livro pois existe um emprestimo atrelado a ele.");

        const livroDeletado = await conexao.query("DELETE FROM LIVROS WHERE id = $1", [id]);
        if(!livroDeletado.rowCount) return res.status(400).json("Não foi possível deletar o livro.");
        return res.status(200).json("Livro deletado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = { listarLivros, obterLivro, cadastrarLivro, editarLivro, deletarLivro };