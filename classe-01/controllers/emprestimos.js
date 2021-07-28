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

}

const editarEmprestimo = async (req, res) => {

}

const deletarEmprestimo = async (req, res) => {

}

module.exports = {
    listarEmprestimos,
    obterEmprestimo,
    cadastrarEmprestimo,
    editarEmprestimo, 
    deletarEmprestimo
}