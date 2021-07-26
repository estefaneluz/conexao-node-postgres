import express from 'express';
import autores from './controllers/autores'
import livros from './controllers/livros'

const routes = express();

//autores
routes.get('/autores', );
routes.get('autores/:id', ); 
routes.post('/autores', ); 
routes.put('/autores/:id', ); 
routes.delete('/autores/:id', ); 

//livros
routes.get('/livros', ); 
routes.get('livros/:id', ); 
routes.post('/livros', ); 
routes.put('/livros/:id', );
routes.delete('/livros/:id', );

module.exports = routes;