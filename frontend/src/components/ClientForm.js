import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenada_x: 0,
    coordenada_y: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Dados do formulário:', formData);

      const response = await axios.post('http://localhost:3001/clientes', formData);
      console.log('Cliente cadastrado:', response.data);

      setFormData({
        nome: '',
        email: '',
        telefone: '',
        coordenada_x: 0,
        coordenada_y: 0,
      });

      setShowModal(true);
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="client-form-container">
      <h2>Cadastrar Cliente</h2>
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coordenada_x">Coordenada X:</label>
          <input
            type="number"
            id="coordenada_x"
            name="coordenada_x"
            value={formData.coordenada_x}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="coordenada_y">Coordenada Y:</label>
          <input
            type="number"
            id="coordenada_y"
            name="coordenada_y"
            value={formData.coordenada_y}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
      </form>

      {/* Modal de sucesso */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrado com Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          O cliente foi cadastrado com sucesso.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientForm;
