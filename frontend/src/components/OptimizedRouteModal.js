import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OptimizedRouteModal = ({ onClose }) => {
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptimizedRoute = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clientes/clientes/calcula-rota');
        console.log('Resposta da API:', response.data);

        if (response.data && response.data.ordemDeVisita) {
          setOptimizedRoute(response.data.ordemDeVisita);
        } else {
          console.error('Resposta da API não possui a estrutura esperada.');
        }
      } catch (error) {
        console.error('Erro ao obter rota otimizada:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptimizedRoute();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Ordem de Visitação</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando...</p>
        </div>
      ) : (
        <ul className="list-group">
          {optimizedRoute.map((cliente, index) => (
            <li key={index} className="list-group-item">
              {`${cliente.nome} - x: ${cliente.coordenada_x}, y: ${cliente.coordenada_y}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptimizedRouteModal;
