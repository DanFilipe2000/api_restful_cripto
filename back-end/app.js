
require('dotenv').config();
const express = require('express');
const app = express();


app.use(express.json());

// Middleware de log para todas as rotas
const logRequest = require('./middlewares/logRequest');
app.use(logRequest);

// Importa os routers
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const chatRouter = require('./routes/chat');
const messageRouter = require('./routes/message');
const friendshipRouter = require('./routes/friendship');

// Middlewares de proteção
const verifySignature = require('./middlewares/verifySignature');
const autenticarToken = require('./middlewares/auth');

const PORT = process.env.API_PORT || 3000;


// Rotas públicas
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Rotas protegidas por JWT e assinatura
app.use('/chat', autenticarToken, verifySignature, chatRouter);
app.use('/message', autenticarToken, verifySignature, messageRouter);
app.use('/friendship', autenticarToken, verifySignature, friendshipRouter);

// --------------------------------------------- //
app.get('/', (_req, res) => {
  res.send('API está rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});