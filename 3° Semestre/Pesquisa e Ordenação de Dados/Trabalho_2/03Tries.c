/**
 * @file 03Tries.c
 * @author Yuri_Lanzini
 * @version 0.1
 * @date 2023-06-10
 *
 * @copyright Copyright (c) 2023
 *
 * @brief Arquivo template para Questão 03 do trabalho de Pesquisa e Ordenação T2.
 *
 *      Implemente uma estrutura de Trie para armazenar chaves em formato de
 * caractere. Inclua operações de inserção, remoção e busca completa e busca
 * parcial na estrutura do Trie.
 *      Para a busca completa, o algoritmo deve apenas informar se a chave foi
 * encontrada ou não dentro da estrutura. Para a busca parcial, o algoritmo deve
 * retornar todas as chaves armazenadas abaixo da string informada para a busca.
 *
 */

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define TAMANHO 256

typedef struct trie_no{

    struct trie_no *filho[TAMANHO];
    bool terminal;
}Trieno;


Trieno *criarNo(){

    Trieno *newNo = malloc(sizeof(Trieno));

    for(int i =0; i<TAMANHO; i++){

        newNo->filho[i] = NULL;
    } 
    
    newNo->terminal = false;
    return newNo;
}

bool inserir(Trieno **raiz, char *chaves){

    if(*raiz == NULL){

        *raiz = criarNo();
    }

    unsigned char *texto = (unsigned char *)chaves;
    Trieno *aux = *raiz;
    int size = strlen(chaves);

    for(int i = 0; i< size; i++){

        if (aux->filho[texto[i]] == NULL){

            aux->filho[texto[i]] = criarNo();
        }

        aux= aux->filho[texto[i]];
    }
    
    if(aux->terminal){

        return false;
    }else{

        aux->terminal = true;
        return true;
    }
}

void printTrie_rec(Trieno *no, unsigned char *prefixo, int size){

    unsigned char newprefixo[size+2];
    memcpy(newprefixo, prefixo, size);
    newprefixo[size+1] = 0;

    if(no->terminal){

        printf("%s\n",prefixo);
    }

    for(int i = 0; i < TAMANHO; i++){

        if(no->filho[i] != NULL){
            newprefixo[size] = i;
            printTrie_rec(no->filho[i], newprefixo, size+1);
        }

    }
}

void printtrie(Trieno *raiz){

    if(raiz == NULL){

        printf("Trie vazia.\n");
        return;
    }

    printTrie_rec(raiz,NULL,0);
}

void buscar(Trieno *raiz, char *chave) {

    unsigned char *texto = (unsigned char *)chave;
    int size = strlen(chave);
    Trieno *aux = raiz;

    for (int i = 0; i < size; i++) {
        if (aux->filho[texto[i]] == NULL) {

            printf("Chave não encontrada.\n");
            return;
        }
        aux = aux->filho[texto[i]];
    }

    if (aux->terminal) {

        printf("Chave encontrada.\n");
    }else{

        printf("Chave não encontrada.\n");  
         }
}

void buscar_parcial(Trieno *raiz, char *chave) {

    unsigned char *texto = (unsigned char *)chave;
    int size = strlen(chave);
    Trieno *aux = raiz;

    for (int i = 0; i < size; i++) {
        if (aux->filho[texto[i]] == NULL) {
            printf("Não foi encontrada a chave.\n");
            return;
        }
        aux = aux->filho[texto[i]];
    }

    printf("Chaves encontradas:\n");
    unsigned char prefixo[size + 1];
    memcpy(prefixo, chave, size);
    prefixo[size] = 0;

    printTrie_rec(aux, prefixo, size);
}

bool possuifilho(Trieno *no){

    if(no == NULL){

        return false;
    }

    for(int i = 0; i < TAMANHO; i++){

        if(no->filho[i] != NULL){

            return true;
        }
    }
    return false;
}


Trieno *remover_rec(Trieno *no, unsigned char *texto, bool *resultado){

    if(no == NULL){

        return no;
    }

    if(*texto == '\0'){
        if(no->terminal){
            no->terminal = false;
            *resultado = true;

            if(!possuifilho(no)){
                free(no);
                no = NULL;

            }

        }
        return no;
    }

    no->filho[*texto] = remover_rec(no->filho[*texto], texto+1, resultado);

    if(*resultado && !possuifilho(no) && !no->terminal){

        free(no);
        no = NULL;
    }

    return no;
}

bool remover(Trieno **raiz, char *chave){

    unsigned char *texto = (unsigned char*)chave;
    bool resultado = false;

    if(*raiz == NULL){

        return false;
    }

    *raiz = remover_rec(*raiz, texto, &resultado);

    return resultado;
    
}

void liberarMemoria(Trieno *no) {

    if (no == NULL) {
        return;
    }

    for (int i = 0; i < TAMANHO; i++) {
        
        liberarMemoria(no->filho[i]);
    }

    free(no);
}



int main() {

    Trieno *raiz = NULL;

     char chaves[][20] = {"amy", "ann", "emma", "rob", "roger", "robert", "bob", "emmily"};
     int size = sizeof(chaves) / sizeof(chaves[0]);
     for (int i = 0; i < size; i++) {
        inserir(&raiz, chaves[i]);
    }

    printtrie(raiz);
    buscar(raiz,"emma" );
    buscar(raiz,"roger" );
    buscar(raiz,"ann" );
    buscar(raiz,"roberto" );
    buscar_parcial(raiz,"a" );
    buscar_parcial(raiz,"r" );
    buscar_parcial(raiz,"y" );
    remover(&raiz, "emma");
    remover(&raiz, "amy");
    printtrie(raiz);

    liberarMemoria(raiz);

    return 0;
}
