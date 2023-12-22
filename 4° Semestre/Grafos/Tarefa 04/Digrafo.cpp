/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Lanzini
 * Matricula: 2221100006
 */

#include "Digrafo.h"
#include <iostream>
#include <algorithm>
#include <queue>
#include <climits>

using namespace std;

Digrafo:: Digrafo(int num_vertices) {

    num_vertices_ = num_vertices;
    num_arestas_ = 0;

    matriz_adj_.resize(num_vertices);
    for (int i = 0; i < num_vertices; i++) {
        matriz_adj_[i].resize(num_vertices, 0);
    }

}

void Digrafo::insere_aresta(Aresta e) {

     if ((matriz_adj_[e.v1][e.v2] == 0) && (e.v1 != e.v2)) {
        matriz_adj_[e.v1][e.v2] = e.D;

        num_arestas_++;
    }
}


 bool Digrafo::max_vidas(int s, vector<int>& dp) {

    dp[s] = 0;

    for (int i = 1; i <= num_vertices_ - 1; i++) {
        for (int u = 0; u < num_vertices_; u++) {
            for (int v = 0; v < num_vertices_; v++) {
                if (matriz_adj_[u][v] != 0 && dp[u] != INT_MIN && dp[v] < dp[u] + matriz_adj_[u][v]) {
                    dp[v] = dp[u] + matriz_adj_[u][v];
                }
            }
        }
    }

      for (int u = 0; u < num_vertices_; u++) {
        for (int v = 0; v < num_vertices_; v++) {
            if (matriz_adj_[u][v] != 0 && dp[u] != INT_MIN && dp[v] < dp[u] + matriz_adj_[u][v]) {
                return false; 
            }
        }
    }

    return true;
}


