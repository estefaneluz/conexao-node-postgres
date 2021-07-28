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
    const { nome, idade, email, telefone, cpf } = req.body;

    if(!nome) return res.status(400).json("O nome precisa ser informado.");
    if(!email) return res.status(400).json("O e-mail precisa ser informado.");
    if(!cpf) return res.status(400).json("O cpf precisa ser informado.");
    if(!email.includes('@') || !email.includes(".")) return res.status(400).json("Insira um e-mail válido.");

    try {
        const usuario = await conexao.query(`INSERT INTO usuarios (nome, idade, email, telefone, cpf) 
        VALUES ($1, $2, $3, $4, $5)`, [nome, idade, email, telefone, cpf]);
        if(!usuario.rowCount) return res.status(400).json("Não foi possível cadastrar o usuário.");
        return res.status(200).json("Usuário cadastrado com sucesso!");
    } catch(error) {
        return res.status(400).json(error.message);
    }
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