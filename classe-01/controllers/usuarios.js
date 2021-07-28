const conexao = require('../connection');

const listarUsuarios = async (req, res) => {
    try {
        const { rows: usuarios } = await conexao.query("SELECT * FROM usuarios");
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterUsuario =  async (req, res) => {
    const { id } = req.params; 
    try {
        const usuario = await conexao.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if(!usuario.rowCount) return res.status(404).json("Não foi possível encontrar o usuário.");
        return res.status(200).json(usuario.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarUsuario = async (req, res) => {

}

 const editarUsuario = async (req, res) => {

 }

 const deletarUsuario = async (req, res) => {

 }

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario, 
    editarUsuario,
    deletarUsuario
}