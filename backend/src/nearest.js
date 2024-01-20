/**
 * Calculates the Euclidean distance between two points in a 2D plane.
 *
 * @param {Object} ponto1 - The first point with coordinates (coordenada_x, coordenada_y).
 * @param {Object} ponto2 - The second point with coordinates (coordenada_x, coordenada_y).
 * @returns {number} The Euclidean distance between the two points.
 */
function calcularDistancia(ponto1, ponto2) {
    const deltaX = ponto1.coordenada_x - ponto2.coordenada_x;
    const deltaY = ponto1.coordenada_y - ponto2.coordenada_y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/**
 * Calculates the nearest neighbor route for a given list of clients using the Nearest Neighbor algorithm.
 *
 * @param {Array} clientes - An array of client objects with coordinates (coordenada_x, coordenada_y).
 * @returns {Array} The route (list of client IDs) representing the nearest neighbor solution.
 */
function calcularNearest(clientes) {
    const n = clientes.length;

    // Adds the origin point (0,0) to the beginning of the list
    const clientesComOrigem = [{ id: 0, coordenada_x: 0, coordenada_y: 0 }, ...clientes];

    let conjuntoNaoVisitado = clientesComOrigem.slice(1); // Removes the origin point
    let rota = [0]; // Starts with the origin point

    while (conjuntoNaoVisitado.length > 0) {
        let clienteAtual = rota[rota.length - 1];
        let melhorVizinho = null;
        let menorDistancia = Infinity;

        // Finds the nearest neighbor
        for (let i = 0; i < conjuntoNaoVisitado.length; i++) {
            const distanciaAtual = calcularDistancia(clientesComOrigem[clienteAtual], conjuntoNaoVisitado[i]);
            if (distanciaAtual < menorDistancia) {
                menorDistancia = distanciaAtual;
                melhorVizinho = i;
            }
        }

        // Adds the best neighbor to the route and removes it from the list of unvisited
        rota.push(conjuntoNaoVisitado[melhorVizinho].id);
        conjuntoNaoVisitado.splice(melhorVizinho, 1);
    }

    return rota;
}

module.exports = {
    calcularNearest,
};
