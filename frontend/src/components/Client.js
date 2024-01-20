import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import OptimizedRouteModal from './OptimizedRouteModal';
import ClientListFilter from './ClientListFilter';
import ClientForm from './ClientForm';

const Client = ({ clients }) => {
  const [showRouteModal, setShowRouteModal] = React.useState(false);
  const [showCadastroModal, setShowCadastroModal] = React.useState(false);
  const [showFiltroModal, setShowFiltroModal] = React.useState(false);

  const openRouteModal = () => {
    setShowRouteModal(true);
  };

  const openCadastroModal = () => {
    setShowCadastroModal(true);
  };

  const openFiltroModal = () => {
    setShowFiltroModal(true);
  };

  const closeRouteModal = () => {
    setShowRouteModal(false);
  };

  const closeCadastroModal = () => {
    setShowCadastroModal(false);
  };

  const closeFiltroModal = () => {
    setShowFiltroModal(false);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Sistema de Gerenciamento de Clientes</h1>
      <div className="row mb-3">
        <Button color="primary" className="w-100" onClick={openRouteModal}>
          Calcular Rota Otimizada
        </Button>
      </div>
      <div className="row mb-3">
        <Button color="info" className="w-100" onClick={openCadastroModal}>
          Cadastrar Cliente
        </Button>
      </div>
      <div className="row mb-3">
        <Button color="warning" className="w-100" onClick={openFiltroModal}>
          Exibir Filtros
        </Button>
      </div>
      {/* Modal para Calcular Rota Otimizada */}
      <Modal isOpen={showRouteModal} toggle={closeRouteModal}>
        <ModalHeader toggle={closeRouteModal}>Calcular Rota Otimizada</ModalHeader>
        <ModalBody>
          {/* Conteúdo do Modal */}
          <OptimizedRouteModal />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeRouteModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para Cadastrar Cliente */}
      <Modal isOpen={showCadastroModal} toggle={closeCadastroModal}>
        <ModalHeader toggle={closeCadastroModal}>Cadastrar Cliente</ModalHeader>
        <ModalBody>
          {/* Conteúdo do Modal */}
          <ClientForm />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeCadastroModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal para Exibir Filtros */}
      <Modal isOpen={showFiltroModal} toggle={closeFiltroModal}>
        <ModalHeader toggle={closeFiltroModal}>Exibir Filtros</ModalHeader>
        <ModalBody>
          {/* Conteúdo do Modal */}
          <ClientListFilter />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeFiltroModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Client;
