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