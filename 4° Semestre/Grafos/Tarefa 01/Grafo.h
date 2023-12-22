/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Luis Malinski Lanzini
 * Matricula: 2221100006
 */

#ifndef GRAFO_H

#define GRAFO_H

#include <vector>
#include <list>
#include "Aresta.h"

class Grafo {
public:
    Grafo(int num_vertices);
    int num_vertices();
    int num_arestas();
    void insere_aresta(Aresta e);
    void remove_aresta(Aresta e);
    void remove_vertice(int v);
    void imprime();
private:
    int num_vertices_;
    int num_arestas_;
    std::vector<std::list<int>> list_adj;

};

#endif /* GRAFO_H */
