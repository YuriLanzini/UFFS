/*
 * Tarefa 02 - Potenciais Comparsas
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

class Grafo {
public:
    Grafo(int num_vertices);

    void insere_aresta(Aresta e);
    vector<int> PossiveisCumplices(int suspeito); 

    

    
private:
     int num_vertices_;
    int num_arestas_;
    vector<std::vector<int>> matriz_adj_;

};

#endif /* GRAFO_H */
