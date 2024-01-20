const { expect } = require('chai');
const sinon = require('sinon');
const clientesRoutes = require('../../src/routes/clientesRoutes');

describe('Clientes Routes - Unit Tests', () => {
  describe('GET /clientes', () => {
    it('Deve retornar uma lista de clientes sem filtro de termo', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [{ id: 1, nome: 'Cliente 1' }] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { query: {} };
      const res = { json: sinon.stub() };

      await router.get('/', req, res);

      sinon.assert.calledWith(res.json, [{ id: 1, nome: 'Cliente 1' }]);
    });

    it('Deve retornar uma lista de clientes filtrada por termo', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [{ id: 1, nome: 'Cliente 1' }] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { query: { termo: 'Cliente' } };
      const res = { json: sinon.stub() };

      await router.get('/', req, res);

      sinon.assert.calledWith(res.json, [{ id: 1, nome: 'Cliente 1' }]);
    });

  });

  describe('POST /clientes', () => {
    it('Deve criar um novo cliente', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [{ id: 2, nome: 'Novo Cliente' }] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { body: { nome: 'Novo Cliente', email: 'novo@cliente.com' } };
      const res = { json: sinon.stub() };

      await router.post('/', req, res);

      sinon.assert.calledWith(res.json, { id: 2, nome: 'Novo Cliente' });
    });

    it('Deve retornar erro ao criar cliente sem informações obrigatórias', async () => {
      const fakePool = {
        query: sinon.stub(),
      };

      const router = clientesRoutes(fakePool);

      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await router.post('/', req, res);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { error: 'Todos os campos são obrigatórios.' });
    });

  });

  describe('GET /clientes/:id', () => {
    it('Deve retornar informações sobre um cliente específico', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [{ id: 1, nome: 'Cliente 1' }] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { params: { id: 1 } };
      const res = { json: sinon.stub() };

      await router.get('/:id', req, res);

      sinon.assert.calledWith(res.json, { id: 1, nome: 'Cliente 1' });
    });

    it('Deve retornar 404 se o cliente não for encontrado', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { params: { id: 1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await router.get('/:id', req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { error: 'Cliente não encontrado' });
    });

  });

  describe('PUT /clientes/:id', () => {
    it('Deve atualizar informações de um cliente específico', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [{ id: 1, nome: 'Cliente Atualizado' }] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { params: { id: 1 }, body: { nome: 'Cliente Atualizado' } };
      const res = { json: sinon.stub() };

      await router.put('/:id', req, res);

      sinon.assert.calledWith(res.json, { id: 1, nome: 'Cliente Atualizado' });
    });

    it('Deve retornar 404 se o cliente não for encontrado ao tentar atualizar', async () => {
      const fakePool = {
        query: sinon.stub().resolves({ rows: [] }),
      };

      const router = clientesRoutes(fakePool);

      const req = { params: { id: 1 }, body: { nome: 'Cliente Atualizado' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

      await router.put('/:id', req, res);

      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, { error: 'Cliente não encontrado' });
    });
  });
});

