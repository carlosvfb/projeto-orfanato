import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pages from './pages/index.js'; // Certifique-se de incluir a extensão .js

// iniciando o express
const server = express();

// Usar import.meta.url para simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server
// utilizar body do req
.use(express.urlencoded({ extended: true }))
// utilizando os arquivos estáticos
.use(express.static('public'))
// configurar template engine
.set('views', path.join(__dirname, 'views'))
.set('view engine', 'hbs')
// criar uma rota
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)
// ligar um servidor
.listen(5500, () => {
    console.log('Server is running on port 5500');
});
