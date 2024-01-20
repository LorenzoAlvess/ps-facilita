import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const ClientListFilter = () => {
  const [clients, setClients] = useState([]);
  const [termo, setTermo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchFilteredClients = async () => {
      try {
        if (termo.length < 3) {
          setClients([]);
          setCurrentPage(1);
          return;
        }

        const response = await axios.get(`http://localhost:3001/clientes`, {
          params: {
            termo,
            page: currentPage,
          },
        });

        if (response.data && response.data.length > 0) {
          setClients(response.data);
        } else {
          setClients([]);
        }
      } catch (error) {
        console.error('Erro ao obter clientes com filtro:', error);
      }
    };

    fetchFilteredClients();
  }, [termo, currentPage]);

  const openModal = (client) => {
    setSelectedClient(client);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Lista de Clientes com Filtro</h2>
      <input
        type="text"
        placeholder="Digite o termo de filtro"
        value={termo}
        onChange={(e) => {
          setTermo(e.target.value);
          setCurrentPage(1);
        }}
      />
      <ul>
        {clients.map((client) => (
          <li
            key={client.id}
            onClick={() => openModal(client)}
            style={{ cursor: 'pointer' }}
          >
            <strong>{client.nome}</strong> - Email: {client.email}, Telefone: {client.telefone}
          </li>
        ))}
      </ul>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedClient && (
            <div>
              <p>ID: {selectedClient.id}</p>
              <p>Nome: {selectedClient.nome}</p>
              <p>Email: {selectedClient.email}</p>
              <p>Telefone: {selectedClient.telefone}</p>
              {/* Adicione outras informações necessárias aqui */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientListFilter;
