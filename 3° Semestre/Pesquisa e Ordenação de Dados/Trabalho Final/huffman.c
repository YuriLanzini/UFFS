#include <stdio.h>
#include <stdlib.h>
#include <string.h>

# define TAM 256

// Estrutura do Nó da árvore
typedef struct no {
    unsigned char data;
    int frequencia;
    struct no *left, *right, *next;
}No;

typedef struct{
    No *first;
    int tam;

}Lista;

void inicializa_tabela(unsigned int *tab){

    for(int i = 0; i < TAM; i++ ){
        tab[i] = 0;
    }
}

void preenche_tab(unsigned char *text, unsigned int *tab){
    int i = 0;

    while(text[i] != '\0'){

        tab[text[i]]++;
        i++;
    }
}

void criar_lista(Lista *l){

    l->first = NULL;
    l->tam = 0;
}

void inserir_ordenado(Lista* l, No* no) {
    No* aux;

    if (l->first == NULL) {

        l->first = no;
    } else if (no->frequencia < l->first->frequencia ||
               (no->frequencia == l->first->frequencia && no->data <= l->first->data)) {

        no->next = l->first;
        l->first = no;
    } else {

        aux = l->first;
        while (aux->next &&
               (no->frequencia > aux->next->frequencia ||
                (no->frequencia == aux->next->frequencia && no->data > aux->next->data))) {

            aux = aux->next;
        }
        no->next = aux->next;
        aux->next = no;
    }
    l->tam++;
}

void preencher_lista(unsigned int *tab, Lista *l){

    No *new;

    for(int i = 0; i < TAM; i++){

        if(tab[i] > 0){

            new = malloc(sizeof(No));
            if(new){
                new->data = i;
                new->frequencia = tab[i];
                new->right = NULL;
                new->left = NULL;
                new->next = NULL;

                inserir_ordenado(l, new);
            }
        }
    }
}

No* criar_arvore_huffman(Lista *l) {

    while (l->tam > 1) {
        
        No* novo_no = malloc(sizeof(No));

        novo_no->left = l->first;
        novo_no->right = l->first->next;
        novo_no->frequencia = novo_no->left->frequencia + novo_no->right->frequencia;
        novo_no->next = NULL;

        l->first = l->first->next->next;
        l->tam -= 2;

        inserir_ordenado(l, novo_no);
    }

    return l->first;
}

void imprimir_arvore_huffman(No* raiz, unsigned char *cod, int tam) {

    if (raiz->left == NULL && raiz->right == NULL) {
        cod[tam] = '\0';
        printf("%c: %s\n", raiz->data, cod);

    } else {

        if (raiz->left != NULL) {
            cod[tam] = '0';
            imprimir_arvore_huffman(raiz->left, cod, tam + 1);
        }

        if (raiz->right != NULL) {
            cod[tam] = '1';
            imprimir_arvore_huffman(raiz->right, cod, tam + 1);
        }
    }
}


int main() {

    unsigned int tabela_frenquencia[TAM];
    unsigned char codigo[TAM];
    Lista l;
    unsigned char input[100];

    fgets((char*)input, sizeof(input), stdin);
    input[strcspn((char*)input, "\n")] = '\0';   // remove o caractere de nova linha

    // tabela frequencia
    inicializa_tabela(tabela_frenquencia);
    preenche_tab(input, tabela_frenquencia);

    // lista encadeada
    criar_lista(&l);
    preencher_lista(tabela_frenquencia, &l);

    // arvore
    No* raiz = criar_arvore_huffman(&l);
    imprimir_arvore_huffman(raiz, codigo, 0);

    return 0;
}