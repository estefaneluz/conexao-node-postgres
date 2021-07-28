const conexao = require('../connection');

const listarEmprestimos = async (req, res) => {
    try {
        const { rows: emprestimos } = await conexao.query("SELECT * FROM emprestimos");
        return res.status(200).json(emprestimos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterEmprestimo = async (req, res) => {
    const { id } = req.params;
    try {
        const emprestimo = await conexao.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
        if(!emprestimo.rowCount) return res.status(404).json("Não foi possível encontrar o registro do emprestimo.");
        return res.status(200).json(emprestimo.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarEmprestimo = async (req, res) => {
    const { usuario_id, livro_id } = req.body;
    if(!usuario_id) return res.status(400).json("Precisa ser informado o id do usuário.");
    if(!livro_id) return res.status(400).json("Precisa ser informado o id do livro.");
    try {
        const emprestimo = await conexao.query(
            `INSERT INTO emprestimos (usuario_id, livro_id) VALUES ($1, $2)`, 
            [usuario_id, livro_id]);
        if(!emprestimo.rowCount) return res.status(400).json("Não foi possível cadastrar o emprestimo.");
        return res.status(200).json("Emprestimo cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const editarEmprestimo = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if(!status) return res.status(400).json("O novo status precisa ser informado.");
    if(status!=='pendente' && status !== 'devolvido') return res.status(400).json("O status precisa ser igual a 'pendente' ou 'devolvido'");

    try {
        const emprestimo = await conexao.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
        if(!emprestimo.rowCount) return res.status(404).json("Não foi possível encontrar o emprestimo.");
        const emprestimoEditado = await conexao.query("UPDATE emprestimos SET status = $1 WHERE id = $2", [status, id]);
        if(!emprestimoEditado.rowCount) return res.status(400).json("Não foi possível atualizar o emprestimo.");
        return res.status(200).json("Emprestimo atualizado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deletarEmprestimo = async (req, res) => {
    const { id } = req.params;
    try {
        const emprestimo = await conexao.query("SELECT * FROM emprestimos WHERE id = $1", [id]);
        if(!emprestimo.rowCount) return res.status(404).json("Emprestimo não encontrado.");

        const emprestimoDeletado = await conexao.query("DELETE FROM emprestimos WHERE id = $1", [id]);
        if(!emprestimoDeletado.rowCount) return res.status(400).status("Não foi possível deletar o emprestimo.");

        return res.status(200).json("Emprestimo deletado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarEmprestimos,
    obterEmprestimo,
    cadastrarEmprestimo,
    editarEmprestimo, 
    deletarEmprestimo
}