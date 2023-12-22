/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Lanzini
 * Matricula: 2221100006
 */

#ifndef GRAFO_H

#define GRAFO_H

#include <vector>
#include <list>
#include "Aresta.h"

using namespace std;

class Digrafo {
public:
    Digrafo(int num_vertices);

    void insere_aresta(Aresta e);
    bool max_vidas(int s, vector<int>& dp);

private:
     int num_vertices_;
    int num_arestas_;
    vector<std::vector<int>> matriz_adj_;

};

#endif /* GRAFO_H */
