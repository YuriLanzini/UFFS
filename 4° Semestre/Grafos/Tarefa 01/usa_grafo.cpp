/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Luis Malinski Lanzini
 * Matricula: 2221100006
 */

#include "Aresta.h"
#include "Grafo.h"
#include <iostream>

using namespace std;

int main() {
    int V, O, X, Y;
    cin >> V >> O;

    Grafo grafo(V);

    for (int i = 0; i < O; ++i) {
        char op;
        cin >> op;

        switch (op) {
            case 'I': {
                cin >> X >> Y;
                grafo.insere_aresta(Aresta(X, Y));
                break;
            }
            case 'R': {
                cin >> X >> Y;
                grafo.remove_aresta(Aresta(X, Y));
                break;
            }
            case 'E': {
                int numArestas = grafo.num_arestas();
                cout << numArestas << endl;
                break;
            }
            case 'Q': {
                cin >> X;
                grafo.remove_vertice(X);
                break;
            }
            case 'N': {
                int numVertices = grafo.num_vertices();
                cout << numVertices << endl;
                break;
            }
            case 'P': {
                grafo.imprime();
                break;
            }
            default:
                cout << "Operação inválida: " << op << endl;
        }
    }

    return 0;
}