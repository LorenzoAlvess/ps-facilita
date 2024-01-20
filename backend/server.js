// backend/src/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const clientesRoutes = require('./src/routes/clientesRoutes');

const pool = new Pool({
  user: 'my_user',
  host: 'my_postgres',
  database: 'my_database',
  password: 'my_password',
  port: 5432,
});

const app = express();

app.use(cors());
app.use(express.json());


app.use('/clientes', clientesRoutes(pool));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
