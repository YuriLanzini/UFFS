/*
 * Tarefa 02 - Potenciais Comparsas
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Lanzini
 * Matricula: 2221100006
 */

#include "Grafo.h"
#include "Aresta.h"
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int P, L;
    cin >> P >> L;

    Grafo grafo(P);

    for (int i = 0; i < L; i++) {
        int X, Y;
        char T;
        cin >> X >> Y >> T;
        
        if (T == 'W') {
            Aresta aresta = {X, Y};
            grafo.insere_aresta(aresta);
        }

    }


    int O;
    cin >> O;

    for (int i = 0; i < O; ++i) {
        int X;
        cin >> X;
        vector<int> cumplices = grafo.PossiveisCumplices(X);

        cout << X << " :";
        for (int j : cumplices) {
            cout << " " << j;
        }
        cout << endl;
    }

    return 0;
}


