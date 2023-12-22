#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define Tam_nome 40
#define TAM_MATRI 10
#define TRUE 1

typedef struct{
    int dia;
    int mes;
    int ano;
} Data;

struct aluno{
    char matri[TAM_MATRI+1];
    char nome[Tam_nome+1];
    Data nasc;
    float nota;
    struct aluno *next;
} ;

typedef struct aluno Aluno;


Aluno *inserir(Aluno *first)
{

    first = (Aluno *)malloc(sizeof(Aluno));

    int d, me, an;

    scanf("%s", first->matri);
    scanf("%s", first->nome);
    scanf("%d/%d/%d", &d, &me, &an);
    first->nasc.dia = d,  first->nasc.mes = me,  first->nasc.ano = an;
    scanf("%f", &first->nota);
    first->next = NULL;
    return first;
}

Aluno *deletarAlun(Aluno *first, char *matricula)
{
    Aluno *aux, *previous=first;
        for (aux=first;aux!=NULL;aux=aux->next) 
        {
            if (strcmp(aux->matri,matricula)==0) 
            {
                if (aux==first) 
                {
                    first=first->next;
                    free(previous);
                    return first;
                    

                }
                    previous->next=aux->next; 
                    free(aux);
                    return first;
            }
                previous=aux;
            
            
    }    return first;
}

void imprimir (Aluno *lista)
{
    Aluno *aux;

    for (aux = lista; aux != NULL; aux = aux->next)
    {
        printf("%s, %s, %d/%d/%d, %.2f\n", aux->matri, aux->nome, aux->nasc.dia, aux->nasc.mes, aux->nasc.ano, aux->nota);
    }
}


void inversa(Aluno *lista)
{
    if (lista == NULL)
        return;
    inversa(lista->next);
    printf("%s, %s, %d/%d/%d, %.2f\n", lista->matri, lista->nome, lista->nasc.dia, lista->nasc.mes, lista->nasc.ano, lista->nota);
}

int contadAluno(Aluno *lista)
{
    int conta = 0;
    while (lista != NULL)
    {

        conta++;
        lista = lista->next;
    }
    return conta;
}


int Buscapos(Aluno *lista, char matricula[TAM_MATRI+1])
{

    Aluno *aux;
    int conta = 0;
    for (aux = lista; aux != NULL; aux = aux->next)
    {
        if (strcmp(aux->matri, matricula) == 0)
            conta++;
        
    }
    return conta;
}


Aluno *atualiza(Aluno *lista, Aluno *aux)
{
    if (lista != NULL){
        aux = lista;
    }
    while (TRUE)
    {
        if (aux ->next == NULL){
            return aux;
        }
        aux = aux->next;
    }

    return NULL;
}

void sair(Aluno *lista)
{
    Aluno *aux;
    aux = lista;
    while (aux != NULL)
    {
        Aluno *next = aux->next;
        free(aux);
        printf("-");
        aux = next;
    }
}

int main(){

  int opcao;
  char matricula[TAM_MATRI+1];
    Aluno *first, *aux, *lista=NULL; 

    while (TRUE)
    {
        scanf("%d", &opcao);
        switch (opcao)    
        {
         case 0:

            sair(lista);
            printf("\n\n");
            exit(0);
            break;

         case 1:
            first=inserir(first);
            if(lista==NULL)
            {
                lista=first;
                aux=first;
            } else
            {
                aux->next=first;
                aux= first;
            }
            break;
           


        case 2:
            if (!contadAluno(lista)){
                printf("Lista Vazia!\n");
             }
            else
            {
                scanf("%s", matricula);
                for (int i = Buscapos(lista, matricula); i > 0; i--)
                {

                    lista = deletarAlun(lista, matricula);
                    aux = atualiza(lista, aux);
                }
            }
            break;

         case 3:
         if (!contadAluno(lista))
            {
                printf("Lista Vazia!\n");
            }
            else
                imprimir(lista);
            break;

        case 4:
        if (!contadAluno(lista))
            {
                printf("Lista Vazia!\n");
            }
            else
                inversa(lista);
            break;

        case 5:
        if (contadAluno(lista))
            {
                printf("%d\n",contadAluno(lista));
            }
            else
                printf("Lista Vazia!\n");
            break;    
}

}
    return 0;
         
         
}
