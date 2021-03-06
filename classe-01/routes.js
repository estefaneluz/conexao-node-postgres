const express = require('express');
const autores = require('./controllers/autores');
const livros = require('./controllers/livros');
const usuarios = require('./controllers/usuarios');
const emprestimos = require('./controllers/emprestimos');

const routes = express();

//autores
routes.get('/autores', autores.listarAutores);
routes.get('/autores/:id', autores.obterAutor); 
routes.post('/autores', autores.cadastrarAutor); 
routes.put('/autores/:id', autores.editarAutor); 
routes.delete('/autores/:id', autores.deletarAutor); 

//livros
routes.get('/livros', livros.listarLivros); 
routes.get('/livros/:id', livros.obterLivro); 
routes.post('/livros', livros.cadastrarLivro); 
routes.put('/livros/:id', livros.editarLivro);
routes.delete('/livros/:id', livros.deletarLivro);

//usuarios
routes.get('/usuarios', usuarios.listarUsuarios);
routes.get('/usuarios/:id', usuarios.obterUsuario);
routes.post('/usuarios', usuarios.cadastrarUsuario);
routes.put('/usuarios/:id', usuarios.editarUsuario);
routes.delete('/usuarios/:id', usuarios.deletarUsuario);

//emprestimos 

routes.get('/emprestimos', emprestimos.listarEmprestimos);
routes.get('/emprestimos/:id', emprestimos.obterEmprestimo);
routes.post('/emprestimos', emprestimos.cadastrarEmprestimo);
routes.put('/emprestimos/:id', emprestimos.editarEmprestimo);
routes.delete('/emprestimos/:id', emprestimos.deletarEmprestimo);

module.exports = routes;