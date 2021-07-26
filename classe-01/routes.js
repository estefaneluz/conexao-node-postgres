import express from 'express';
import autores from './controllers/autores'
import livros from './controllers/livros'

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

module.exports = routes;