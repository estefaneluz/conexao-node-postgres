const conexao = require('../connection');

const listarUsuarios = (req, res) => {
    try {
        const { rows: usuarios } = await conexao.query("SELECT * FROM usuarios");
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterUsuario = (req, res) => {

}

const cadastrarUsuario = (req, res) => {

}

 const editarUsuario = (req, res) => {

 }

 const deletarUsuario = (req, res) => {

 }

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario, 
    editarUsuario,
    deletarUsuario
}