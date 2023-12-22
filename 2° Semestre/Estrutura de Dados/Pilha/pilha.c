#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define N 61

typedef struct elem_pilha{
    char item[N];
    struct elem_pilha *next;
} ElemPilha;

typedef struct{
    ElemPilha *top;
}Pilha;

void inicializaPilha(Pilha *pilha) {
 pilha->top = NULL;
}

int pilhaVazia(Pilha *pilha) {
  if(pilha->top == NULL){
        return 0;
  }
  return 1;
}

void inserePilha(Pilha *pilha, char *item) {
 ElemPilha *aux;
 aux = malloc(sizeof(ElemPilha));

 strncpy(aux->item, item, N);
 aux->next = pilha->top;
 pilha->top = aux;
}

void removePilha(Pilha *pilha) {
 ElemPilha *aux;

 aux = pilha->top;
 pilha->top = pilha->top->next;
 free(aux);
}

void liberaPilha(Pilha *pilha) {
 ElemPilha *aux;

 while (pilha->top != NULL) {
 aux = pilha->top;
 pilha->top = pilha->top->next;
 free(aux);
 printf("@\n");
 }
}

void imprimir(Pilha *pilha){

    printf("%s\n", pilha->top);
}

int main(){
    Pilha pilha;
    char item[N];
    char B[2]="B";
    char E[2]="E";
   
    inicializaPilha(&pilha);
        
   while(1){       

    scanf("%s", item);

    if(strcmp(B,item) && strcmp(E,item) != 0 ){
        inserePilha(&pilha,item);
    }    

    if(strcmp(B,item) == 0){
        if(!pilhaVazia(&pilha)){
            printf("Vazio\n");
            continue;
        }
        imprimir(&pilha);
        removePilha(&pilha);
        continue;
     }

    if(strcmp(E,item) == 0){
        if(!pilhaVazia(&pilha)){
            printf("!\n");
        }
        liberaPilha(&pilha);
        printf("\n");
        exit(0);
     }


}
    return 0;

}
