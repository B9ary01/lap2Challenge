const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());


const postsRoutes = require('./routes/posts');

server.use('/posts', postsRoutes);

// Root route
server.get('/', (req, res) => res.send(' Welcome to the Post App!'))

module.exports = server
