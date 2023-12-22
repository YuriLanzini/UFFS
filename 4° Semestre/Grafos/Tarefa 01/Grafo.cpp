/*
 * Tarefa 01 - Grafo - Listas de Adjacencia
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Luis Malinski Lanzini
 * Matricula: 2221100006
 */


#include "Grafo.h"
#include <iostream>
#include <algorithm>

using namespace std;

Grafo:: Grafo(int V) : num_vertices_(V), list_adj(V) {}

void Grafo::insere_aresta(Aresta e) {

    if (e.v1 !=  e.v2) {
        if (find(list_adj[e.v1].begin(), list_adj[e.v1].end(),  e.v2) == list_adj[e.v1].end()) {
            list_adj[e.v1].push_front(e.v2);
            list_adj[e.v2].push_front(e.v1);
        }
    }
}

void Grafo::remove_aresta(Aresta e) {

        list_adj[e.v1].remove(e.v2);
        list_adj[e.v2].remove(e.v1);
        
    }

int Grafo::num_arestas() {

        int numArestas = 0;
        for (int i = 0; i < num_vertices_; ++i) {
            numArestas += list_adj[i].size();
        }
        
        return numArestas / 2;
    }

void Grafo::remove_vertice(int X) {

     for (int i = 0; i < num_vertices_; ++i) {
        if (i != X) {
            list_adj[i].remove(X);
            for (int& j : list_adj[i]) {
                if (j > X) {
                    j--;
                }
            }
        }
    }

    list_adj[X].clear();
    list_adj.erase(list_adj.begin() + X);
    num_vertices_--;
}


 int Grafo::num_vertices() {
        return num_vertices_;
    }

void Grafo:: imprime() {

        for (int i = 0; i < num_vertices_; ++i) {
            cout << i << ":";
            for (int v : list_adj[i]) {
                cout << " " << v;
            }
            cout << endl;
        }
    }

