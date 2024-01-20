const express = require('express');
const router = express.Router();
const { calcularNearest } = require('../nearest');

/**
 * Configures and exports the routes related to client operations.
 *
 * @param {Object} pool - The database connection pool.
 * @returns {Object} The configured Express router.
 */
module.exports = (pool) => {
  router.get('/', async (req, res) => {
      const termo = req.query.termo;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;

      try {
          let result;

          if (termo) {
              result = await pool.query(
                  'SELECT * FROM clientes WHERE nome ILIKE $1 OR email ILIKE $1 OR telefone ILIKE $1 LIMIT $2 OFFSET $3',
                  [`%${termo}%`, pageSize, (page - 1) * pageSize]
              );
          } else {
              result = await pool.query('SELECT * FROM clientes LIMIT $1 OFFSET $2', [pageSize, (page - 1) * pageSize]);
          }

          res.json(result.rows);
      } catch (error) {
          console.error('Erro ao listar ou filtrar clientes:', error);
          res.status(500).json({ error: 'Erro ao listar ou filtrar clientes' });
      }
  });

  router.post('/', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  
    // Verificar se todas as informações obrigatórias foram fornecidas
    if (!nome || !email || !telefone || coordenada_x === undefined || coordenada_y === undefined) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nome, email, telefone, coordenada_x, coordenada_y]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
  });
  

  router.get('/:id', async (req, res) => {
      const id = req.params.id;

      try {
        const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Erro ao obter informações do cliente:', error);
        res.status(500).json({ error: 'Erro ao obter informações do cliente' });
      }
  });

  router.put('/:id', async (req, res) => {
      const id = req.params.id;
      const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

      try {
        const result = await pool.query(
          'UPDATE clientes SET nome = $1, email = $2, telefone = $3, coordenada_x = $4, coordenada_y = $5 WHERE id = $6 RETURNING *',
          [nome, email, telefone, coordenada_x, coordenada_y, id]
        );
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result.rows[0]);
      } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar cliente' });
      }
  });

  router.get('/clientes/calcula-rota', async (req, res) => {
    try {
      const result = await pool.query('SELECT id, nome, coordenada_x, coordenada_y FROM clientes');
      const clientesInfo = result.rows;
  
      // Adicionando a "empresa" como o primeiro cliente
      const empresa = {
        id: 0,
        nome: 'Empresa',
        coordenada_x: 0,
        coordenada_y: 0
      };
  
      const rotaOtimizadaIds = calcularNearest(clientesInfo);
  
      // Mapeando todos os detalhes do cliente na ordem otimizada
      const clientesOtimizados = rotaOtimizadaIds.map(id => {
        if (id === 0) {
          return empresa;
        }
        const cliente = clientesInfo.find(c => c.id === id);
        return cliente ? cliente : null;
      });
  
      res.json({ ordemDeVisita: clientesOtimizados });
    } catch (error) {
      console.error('Erro ao calcular rota otimizada:', error);
      res.status(500).json({ error: 'Erro ao calcular rota otimizada' });
    }
  });

  return router;
};
