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
    const { id } = req.params; 
    const { nome, idade, email, telefone, cpf } = req.body; 

    if(!nome) return res.status(400).json("O nome precisa ser informado.");
    if(!email) return res.status(400).json("O e-mail precisa ser informado.");
    if(!cpf) return res.status(400).json("O cpf precisa ser informado.");
    if(!email.includes('@') || !email.includes(".")) return res.status(400).json("Insira um e-mail válido.");

    try {
        const usuario = await conexao.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if(!usuario.rowCount) return res.status(404).json("Usuário não encontrado.");
        const usuarioAtualizado = await conexao.query("UPDATE usuarios SET nome = $1, idade = $2, email = $3, telefone = $4, cpf = $5 WHERE id = $6", [nome, idade, email, telefone, cpf, id]);
        if(!usuarioAtualizado.rowCount) return res.status(400).json("Não foi possível atualizar o usuário.");
        return res.status(200).json("Usuário atualizado!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
 }

 const deletarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await conexao.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if(!usuario.rowCount) return res.status(404).json("Usuário não encontrado.");
        const usuarioDeletado = await conexao.query("DELETE FROM usuarios WHERE id = $1", [id]);
        if(!usuarioDeletado.rowCount) return res.status(400).json("Não foi possível deletar o usuário.");
        return res.status(200).json("Usuário deletado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
 }

module.exports = {
    listarUsuarios,
    obterUsuario,
    cadastrarUsuario, 
    editarUsuario,
    deletarUsuario
}