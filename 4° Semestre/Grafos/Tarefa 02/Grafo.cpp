/*
 * Tarefa 02 - Potenciais Comparsas
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Lanzini
 * Matricula: 2221100006
 */

#include "Grafo.h"
#include <iostream>
#include <algorithm>
#include <queue>

using namespace std;

Grafo:: Grafo(int num_vertices) {

    num_vertices_ = num_vertices;
    num_arestas_ = 0;

    matriz_adj_.resize(num_vertices);
    for (int i = 0; i < num_vertices; i++) {
        matriz_adj_[i].resize(num_vertices, 0);
    }

}

void Grafo::insere_aresta(Aresta e) {

     if ((matriz_adj_[e.p1][e.p2] == 0) && (e.p1 != e.p2)) {
        matriz_adj_[e.p1][e.p2] = 1;
        matriz_adj_[e.p2][e.p1] = 1;

        num_arestas_++;
    }
}

vector<int> Grafo::PossiveisCumplices(int v) {

 vector<int> possiveisCumplices;
 vector<int> visitado(num_vertices_, 0);
 vector<int> dist(num_vertices_, 0);
 queue<int> fila;

 visitado[v] = 1;
 dist[v]= 0;

 fila.push(v);

    while (!fila.empty()) {
        int w = fila.front();
        fila.pop();
        for (int u =0; u< num_vertices_; u++){
            if (matriz_adj_[w][u] !=0){
                if (visitado[u] == 0){
                    visitado[u] = 1;
                    fila.push(u);
                    dist[u] = dist[w] + 1;
                    if(dist[u] < 4 ){
                    possiveisCumplices.push_back(u);
                }
                }

            }
        }

    }

    sort(possiveisCumplices.begin(), possiveisCumplices.end());
    
    return possiveisCumplices;
}


