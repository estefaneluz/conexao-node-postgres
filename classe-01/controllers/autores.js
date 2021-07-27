const conexao = require('../connection');

const listarAutores = async (req, res) => {
    try {
        const { rows: autores } = await conexao.query("SELECT * FROM autores");

        for(const autor of autores){
            const { rows: livros } = await conexao.query("SELECT * FROM livros WHERE autor_id = $1", [autor.id]);
            autor.livros = livros;
        }

        return res.json(autores);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterAutor = async (req, res) => {
    const { id } = req.params; 
    try {
        const autor = await conexao.query("SELECT * FROM autores WHERE id = $1", [id]);

        if(!autor.rowCount){
            return res.status(404).json("O autor informado não foi encontrado.")
        }

        return res.json(autor.rows[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarAutor = async (req, res) => {
    const {nome, idade} = req.body;
    if(!nome){
        return res.status(400).json("O campo nome precisa ser preenchido.");
    }

    try {
        const autor = await conexao.query("INSERT INTO autores (nome, idade) VALUES ($1, $2)", [nome, idade]);
        
        if(!autor.rowCount) return res.status(404).json("Não foi possível realizar o cadastro");

        return res.status(200).json("Autor cadastrado com sucesso!");
    } catch(error){
        return res.status(400).json(error.message);
    }
}

const editarAutor = async (req, res) => {
    const {id} = req.params;
    const {nome, idade} = req.body;

    try {
        const autor = await conexao.query("SELECT * FROM autores WHERE id = $1", [id]);
        
        if(!autor.rowCount) return res.status(404).json("O autor informado não foi encontrado.");
        if(!nome) return res.status(400).json("O campo nome precisa ser informado");

        const autorEditado = await conexao.query("UPDATE autores SET nome = $1, idade = $2 WHERE id = $3", [nome, idade, id]);

        if(!autorEditado.rowCount) return res.status(400).json("Não foi possível atualizar o autor.");

        return res.status(200).json("Autor atualizado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deletarAutor = async (req, res) => {

}

module.exports = { listarAutores, obterAutor, cadastrarAutor, editarAutor, deletarAutor };