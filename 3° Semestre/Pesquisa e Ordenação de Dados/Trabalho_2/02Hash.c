 /**
 * @file 02Hash.c
 * @author Yuri_Lanzini
 * @version 0.1
 * @date 2023-06-10
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 02 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma tabela hash contendo 13 posições. O índice das chaves
 *  deve ser gerado utilizando a fórmula k mod M, onde k é a chave e M a
 *  quantidade de chaves. Resolva as colisões utilizando uma Lista Encadeada.
 *  Inclua operações de inserção, remoção e busca da chave nesta tabela hash,
 *  informando se a chave foi encontrada ou não.  Atenção: os elementos da
 *  lista encadeada não precisam estar ordenados/em ordem.
 *
 *      Utilize os vetores comentados no código para realizar seus testes.
 *
 * Atenção: Antes de entregar, conferir se dos dados de documentação no início
 * do arquivo estão preenchidos corretamente.
 *
 */
#include <stdio.h>
#include <stdlib.h>

#define TAMANHO 13

typedef struct no{
    int chave;
    struct no *next;

}No;

typedef struct{
    No *first;

}Lista;

int funcaoHash(int k){

    return k % TAMANHO;
}

void iniciatabela(Lista *l) {

    for (int i = 0; i < TAMANHO; i++) {

        l[i].first = NULL;
    }
}

void inserir(Lista *l, int valor){

    int id = funcaoHash(valor);
    No *novo = malloc(sizeof(No));

    if(novo){

        novo->chave = valor;
        novo->next = l[id].first;
        l[id].first = novo;

    }else{

        printf("\n Erro ao alocar memória\n");
    }

}

int buscar(Lista *l, int chave) {

    int id = funcaoHash(chave);
    No *aux = l[id].first;

    while (aux != NULL) {
        if (aux->chave == chave) {
            printf("Chave encontrada.\n");
            return aux->chave;
        }
        aux = aux->next;
    }

    printf("Chave não encontrada.\n");
    return 0;
}


void remover(Lista *l, int valor) {
    
    int id = funcaoHash(valor);
    No *atual = l[id].first;
    No *anterior = NULL;
    int encontrou = 0;

    while (atual != NULL) {
        if (atual->chave == valor) {
            if (anterior == NULL) {
                l[id].first = atual->next;
            } else {
                anterior->next = atual->next;
            }

            No *temp = atual;
            atual = atual->next;
            free(temp);
            printf("Chave removida.\n");
            encontrou = 1;
        } else {
            anterior = atual;
            atual = atual->next;
        }
    }

    if (!encontrou) {
        printf("Chave não encontrada.\n");
    }
}


void imprimir(Lista *l) {

    for (int i = 0; i < TAMANHO; i++) {
        printf("%2d =  ", i); 
        No* aux = l[i].first;

        while (aux) {
            printf("%d ", aux->chave);
            aux = aux->next;
        }
        printf("\n");
    }
}

void liberarMemoria(Lista *l) {
    
    for (int i = 0; i < TAMANHO; i++) {

        No *aux = l[i].first;
        while (aux) {
            No *temp = aux;
            aux = aux->next;
            free(temp);
        }
    }
}

int main(){

    Lista tabela[TAMANHO];

    iniciatabela(tabela);

    //int chaves[] = {7, 13, 33, 12, 5, 1, 0};
    //int chaves[] = {5, 6, 9, 19, 24, 32, 41, 42, 43, 58};
    //int chaves[] = {178, 231, 244, 292, 321, 356, 389, 421, 482, 488, 490, 502, 546, 641, 694, 786, 841, 890, 899, 922};
    int chaves[] = {3, 29, 43, 45,  3, 17,  2,  7, 33, 17};

    int tamanho = sizeof(chaves) / sizeof(chaves[0]);
    
    for (int i = 0; i < tamanho; i++) {
        inserir(tabela, chaves[i]);
    }
    
    imprimir(tabela);
    remover(tabela, 43);
    imprimir(tabela);
    remover(tabela, 20);
    imprimir(tabela);
    remover(tabela, 17);
    buscar(tabela,29);
    buscar(tabela, 17);
    imprimir(tabela);

    liberarMemoria(tabela);

    return 0;
}