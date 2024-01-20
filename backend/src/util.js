/**
 * Calcula a distância euclidiana entre dois pontos no plano.
 *
 * @param {Object} ponto1 - O primeiro ponto com coordenadas x e y.
 * @param {Object} ponto2 - O segundo ponto com coordenadas x e y.
 * @returns {number} A distância euclidiana entre os dois pontos.
 */
function calcularDistancia(ponto1, ponto2) {
    const deltaX = ponto1.coordenada_x - ponto2.coordenada_x;
    const deltaY = ponto1.coordenada_y - ponto2.coordenada_y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/**
 * Calcula a rota ótima que visita todos os clientes, começando e terminando na empresa.
 *
 * @param {Array} clientes - Uma matriz de objetos representando clientes com coordenadas x e y.
 * @returns {Array} Uma matriz representando a ordem ótima de visita dos clientes.
 */
function calcularRotaOtima(clientes) {
    const n = clientes.length + 1;
    const clientesComEmpresa = [{ id: 0, nome: 'Empresa', coordenada_x: 0, coordenada_y: 0 }, ...clientes];

    // Inicializar matriz de distâncias
    const distancias = [];
    for (let i = 0; i < n; i++) {
        distancias[i] = [];
        for (let j = 0; j < n; j++) {
            distancias[i][j] = calcularDistancia(clientesComEmpresa[i], clientesComEmpresa[j]);
        }
    }

    // Inicializar matriz de memoização para armazenar soluções parciais
    const memo = [];

    /**
     * Função auxiliar para o Problema do Caixeiro Viajante (TSP).
     *
     * @param {number} clienteAtual - O índice do cliente atual.
     * @param {Array} conjuntoVisitado - A lista de clientes já visitados.
     * @returns {number} A menor distância para completar a rota começando no clienteAtual.
     */
    function tspAtual(clienteAtual, conjuntoVisitado) {
        if (conjuntoVisitado.length === n) {
            // Todos os clientes foram visitados, retornar à empresa
            return distancias[clienteAtual][0];
        }

        // Verificar se a solução já foi calculada
        const memoKey = `${clienteAtual}-${conjuntoVisitado.join(',')}`;
        if (memo[memoKey] !== undefined) {
            return memo[memoKey];
        }

        let menorDistancia = Infinity;

        // Tentar visitar cada cliente não visitado
        for (let i = 0; i < n; i++) {
            if (!conjuntoVisitado.includes(i)) {
                const novaDistancia = distancias[clienteAtual][i] + tspAtual(i, [...conjuntoVisitado, i]);
                menorDistancia = Math.min(menorDistancia, novaDistancia);
            }
        }

        // Memoizar a solução parcial
        memo[memoKey] = menorDistancia;

        return menorDistancia;
    }

    // Iniciar o TSP a partir do cliente 0 (empresa)
    const distanciaTotal = tspAtual(0, [0]);

    // Reconstruir a ordem de visita dos clientes
    const ordemDeVisita = [0];
    let clienteAtual = 0;
    let conjuntoVisitado = [0];

    for (let i = 1; i < n; i++) {
        let melhorProximoCliente;
        let melhorDistancia = Infinity;

        for (let j = 0; j < n; j++) {
            if (!conjuntoVisitado.includes(j) && distancias[clienteAtual][j] < melhorDistancia) {
                melhorDistancia = distancias[clienteAtual][j];
                melhorProximoCliente = j;
            }
        }

        ordemDeVisita.push(melhorProximoCliente);
        conjuntoVisitado.push(melhorProximoCliente);
        clienteAtual = melhorProximoCliente;
    }

    return ordemDeVisita;
}

module.exports = {
    calcularRotaOtima,
};
