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
routes.get('/livros', ); 
routes.get('/livros/:id', ); 
routes.post('/livros', ); 
routes.put('/livros/:id', );
routes.delete('/livros/:id', );

module.exports = routes;