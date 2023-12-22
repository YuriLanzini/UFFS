/*
 * Tarefa 04 - Desbravo Bros.
 *
 * GEN254 - Grafos - 2023/2
 *
 * Nome:      Yuri Lanzini
 * Matricula: 2221100006
 */

#include "Digrafo.h"
#include "Aresta.h"
#include <iostream>
#include <vector>
#include <climits>

using namespace std;

int main() {
    int R, C;
    cin >> R >> C;

    Digrafo digrafo(R);

    for (int i = 0; i < C; i++) {
        int X, Y, D;
        cin >> X >> Y >> D;
        
    
            Aresta aresta = {X, Y, D};
            digrafo.insere_aresta(aresta);

    }

   int O;
   cin >> O;

    for (int i = 0; i < O; i++) {
        int X;
        cin >> X;
       
        vector<int> dp(R, INT_MIN); 
        if (!digrafo.max_vidas(X, dp)) {

            cout << X << ": ilimitada" << endl;
        
        } else {

            int Vidas = 0;

            for (int j = 0; j < R; j++) {

                if (dp[j] > Vidas) {
                    
                    Vidas = dp[j];
                    
                }
            }
            cout << X << ": " << Vidas << endl;
        }
        

            for (int j = 0; j < R; j++) {

              cout << j << ": " << dp[j] << endl;
    }

    
    }
    

    return 0;
}


