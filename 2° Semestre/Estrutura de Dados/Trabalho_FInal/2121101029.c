#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define TAM 40
#define TAM_cpf 15


typedef struct empresa {
    char nome[TAM];
    int CNPJ[14];
} Empresa;

typedef struct bebida {
    int codigo;
    char nome[TAM];
    int conteudo_liquido;
    float preco_em_venda;
    int quantidade_em_estoque;
    float teor_alcoolico;
    struct bebida *next;
} Bebida;

typedef struct list_bebi {
    int tamanho;
    Bebida *first;
} ListBebi;

typedef struct cliente {
    int codigo;
    char nome[TAM];
    char CPF[TAM_cpf];
    int idade;
    int fiado;
    struct cliente *next;
} Cliente;

typedef struct ListClient {
    int tamanho;
    Cliente *first;
} ListClient;

ListBebi *inicializaListaDeBebidas(void) {
    ListBebi *lista = (ListBebi*)malloc(sizeof(ListBebi));
    if (lista == NULL)
        return NULL;
    lista->tamanho = 0;
    lista->first = NULL;
    return lista;
}

int checaBebidaPeloCodigo(ListBebi *lista, int codigo) {
    Bebida *aux;
     for (aux = lista->first; aux != NULL; aux = aux->next) {
        if (aux->codigo == codigo)
            return 1;
    }
    return 0;
}

int cadastraBebida(ListBebi *lista){
    int codigo;
    char nome[TAM];
    int conteudo_liquido;
    float preco_de_venda;
    int quantidade_em_estoque;
    float teor_alcoolico;
    Bebida *aux = NULL;
    Bebida *bebida = (Bebida*)malloc(sizeof(Bebida));

    printf(" Digite o código: ");
    scanf("%d", &codigo);

    if (checaBebidaPeloCodigo(lista, codigo)) {
        printf("\n Esse código já foi cadastrado!\n\n");  
        return 0; 
    }
    printf(" Digite o nome: ");
    scanf("%s", nome);
    printf(" Digite o conteúdo líquido em ml: ");
    scanf("%d", &conteudo_liquido);
    printf(" Digite o preço de venda: ");
    scanf("%f", &preco_de_venda);
    printf(" Digite a quantidade em estoque: ");
    scanf("%d", &quantidade_em_estoque);
    printf(" Digite o teor alcoólico em %%: ");
    scanf("%f", &teor_alcoolico);

    bebida->codigo = codigo;
    strncpy(bebida->nome, nome, TAM);
    bebida->conteudo_liquido = conteudo_liquido;
    bebida->preco_em_venda = preco_de_venda;
    bebida->quantidade_em_estoque = quantidade_em_estoque;
    bebida->teor_alcoolico = teor_alcoolico;
    bebida->next = NULL;

    if (lista->tamanho == 0) {
        lista->first = bebida;
    } else {
        aux = lista->first;
        while (aux->next != NULL) {
            aux = aux->next;
        }
        aux->next = bebida;
    }
    lista->tamanho++;

    printf("\n Nova bebida cadastrada com sucesso!\n\n");

    return 0;
}

void mostraBebidas(ListBebi *lista) {
    Bebida *aux = NULL;

    if (lista->first == NULL) {
        printf("\nNão há bebida cadastrada ainda!\n\n");
        return;
    } else {
        for (aux = lista->first; aux != NULL; aux = aux->next)  {
            printf(" \n Codigo: %d\n", aux->codigo);
            printf(" Nome: %s\n", aux->nome);
            printf(" Conteúdo líquido: %d ml\n", aux->conteudo_liquido);
            printf(" Preço de venda: R$ %.2f\n", aux->preco_em_venda);
            printf(" Quantidade em estoque: %d\n", aux->quantidade_em_estoque);
            if (aux->teor_alcoolico != 0) {
                printf(" Teor alcoólico: %.2f %%\n\n", aux->teor_alcoolico);
            } else {
                printf("\n");
            }
        }
    }
}

void compraBebida(ListBebi *lista) {
    int codigo;
    int qnt;
    Bebida *aux = NULL;

    if (lista->first == NULL) {
        printf("\nNão há bebida cadastrada ainda!\n\n");
        return;
    }

    printf(" Digite o código da bebida: ");
    scanf("%d", &codigo);

    if (!checaBebidaPeloCodigo(lista, codigo)) {
        printf("\n Não há bebida registrada com esse código!\n\n");
        return ;
    }
    
    printf(" Digite a quantidade de unidades a serem compradas: ");
    scanf("%d", &qnt);


    for (aux = lista->first; aux != NULL; aux = aux->next){
        if(aux->codigo == codigo){
            aux->quantidade_em_estoque += qnt;
            break;
        }
    }

    printf("\n Bebida comprada com sucesso!\n");
    printf(" O estoque atual de %s é %d\n\n", aux->nome, aux->quantidade_em_estoque);
}


ListClient *inicializaListClient(void) {
    ListClient *lista = (ListClient*)malloc(sizeof(ListClient));
    if (lista == NULL)
        return NULL;
    lista->tamanho = 0;
    lista->first = NULL;
    return lista;
}

int checaClientePeloCodigo(ListClient *lista, int codigo) {
    Cliente *aux = NULL;
     for (aux = lista->first; aux != NULL; aux = aux->next) {
        if (aux->codigo == codigo){
            return 1;

        }
    }
    return 0;
}

int checaClientePeloCPF(ListClient *lista, char *CPF) {
    Cliente *aux = NULL;
     for (aux = lista->first; aux != NULL; aux = aux->next) {
        if (strcmp(aux->CPF, CPF) == 0){
            return 1;
    }
  }
    return 0;
}

int checaCPF(char *CPF) {
    if(strlen(CPF) != 14){
        return 0;
    }
    return 1;
}

int cadastraCliente(ListClient *lista) {
    int codigo;
    char nome[TAM];
    char CPF[TAM_cpf];
    int idade;
    int fiado;
    Cliente *aux = NULL;
    Cliente *cliente = (Cliente*)malloc(sizeof(Cliente));

    if (cliente == NULL) {
        printf(" Não foi possível alocar memória!\n\n");
        return 0;
    }

    printf(" Digite o código: ");
    scanf("%d", &codigo);

    if (checaClientePeloCodigo(lista, codigo)) {
        printf("\n Esse código já foi cadastrado!\n\n");
        return 0;
    }

    printf(" Digite o nome: ");
    scanf("%s", nome);
    printf(" Digite o CPF [Ex:034.564.390-10]: ");
    scanf("%s", CPF);

    if (!checaCPF(CPF)) {
        printf("\n Número de CPF inválido!\n\n");
        return 0;
    }
    if (checaClientePeloCPF(lista, CPF)) {
        printf("\n Esse CPF já foi cadastrado!\n\n");
        return 0;
    }

    printf(" Digite a idade: ");
    scanf("%d", &idade);

    printf(" Pode vender fiado? [1 sim - 0 não]: ");
    scanf("%d", &fiado);
    if (fiado != 1 && fiado != 0) {
        printf("\n Opção inválida!\n\n");
        return 0;
    }

    cliente->codigo = codigo;
    strncpy(cliente->nome,nome, TAM);
    strncpy(cliente->CPF, CPF, TAM_cpf);
    cliente->idade = idade;
    cliente->fiado = fiado;

    if (lista->first == NULL) {
        cliente->next = NULL;
        lista->first = cliente;
    } else if (lista->first->idade > idade) {
        cliente->next = lista->first;
        lista->first = cliente;
    } else {
        aux = lista->first;
        while (aux != NULL) {
            if (aux->next == NULL) {
                cliente->next = NULL;
                aux->next = cliente;
                break;
            } else if (aux->next->idade > idade) {
                cliente->next = aux->next;
                aux->next = cliente;
                break;
            }
            aux = aux->next;
        }
    }
    lista->tamanho++;

    printf("\n Novo cliente cadastrado com sucesso!\n\n");

    return 1;
}
int comparaCPF(char CPF1[TAM_cpf], char CPF2[TAM_cpf]) {
        if (strcmp(CPF1, CPF2) == 0){
            return 1;
    }
    return 0;
}

void vendeBebida(Bebida *bebida, int quantidade) {
    bebida->quantidade_em_estoque -= quantidade;
}

int tentaVenderBebida(ListBebi *bebidas, ListClient *clientes) {
    char CPF[TAM_cpf];
    int codigo;
    int qnt;
    Bebida *aux_bebida = NULL;
    Cliente *aux_cliente = NULL;

    if (bebidas->first == NULL) {
        printf("\n Não há bebida para ser vendida!\n\n");
        return 0;
    }

    if (clientes->first == NULL) {
        printf("\n Não há cliente para vender!\n\n");
        return 0;
    }

    printf("\n Digite o CPF do cliente [Ex:034.564.390-10]: ");
    scanf("%s", CPF);

    if (!checaCPF(CPF)) {
        printf("\n Número de CPF inválido!\n\n");
        return 0;
    }

    if (!checaClientePeloCPF(clientes, CPF)) {
        printf("\n Não há cadastro de cliente com esse CPF!\n\n");
        return 0;
    }

    printf(" Digite o código da bebida: ");
    scanf("%d", &codigo);

    if (!checaBebidaPeloCodigo(bebidas, codigo)) {
        printf("\n Não há cadastro de bebida com esse código!\n\n");
        return 0;
    }

    printf(" Digite a quantidade a ser vendida: ");
    scanf("%d", &qnt);

    aux_bebida = bebidas->first;
    while (aux_bebida != NULL) {
        if (aux_bebida->codigo == codigo) {
            break;
        }
        aux_bebida =aux_bebida->next;
    }

    if (aux_bebida->quantidade_em_estoque < qnt) {
        if (aux_bebida->quantidade_em_estoque < 1){
            printf("\nO estoque dessa bebida acabou!\n\n");
            return 0;
        }else{
        printf("\n Só tem %d em estoque!\n\n",aux_bebida->quantidade_em_estoque);
        return 0;
        }
    }

    aux_cliente = clientes->first;
    while (aux_cliente != NULL) {
        if (comparaCPF(aux_cliente->CPF, CPF)) {
            break;
        }
        aux_cliente = aux_cliente->next;
    }

    if (aux_bebida->teor_alcoolico > 0 && aux_cliente->idade < 18) {
        printf("\n Não pode vender bebida alcoólica para menor de idade!\n\n");
        return 0;
    }

    vendeBebida(aux_bebida, qnt);

    printf("\n %d bebidas de %s foram vendidos para %s\n", qnt, aux_bebida->nome, aux_cliente->nome);
    printf(" Preço total foi R$ %.2f\n\n", qnt*aux_bebida->preco_em_venda);

    return 1;
}


void mostraCliente(ListClient *lista) {
    Cliente *aux = NULL;

    if (lista->first == NULL) {
        printf("\nNão há cliente cadastrado ainda!\n\n");
        return;
    } else {
        for (aux = lista->first; aux != NULL; aux = aux->next)  {
            printf(" Codigo: %d\n", aux->codigo);
            printf(" Nome: %s\n", aux->nome);
            printf(" CPF: %s\n", aux->CPF);
            printf(" Idade: %d\n", aux->idade);
            printf(" Fiado: ");
            if (aux->fiado == 1) {
                printf("Sim\n\n");
            } else {
                printf("Não\n\n");
            }
            
        }
    }
}


int LiberaBebidas(ListBebi *lista) {
    int n = 0;
    Bebida *aux = NULL;

    while (lista->first != NULL) {
        aux = lista->first;
        lista->first = lista->first->next;
        free(aux);
        n++;
    }
    return n;
}

int LiberaClientes(ListClient *lista) {
    int n = 0;
    Cliente *aux = NULL;

    while (lista->first != NULL) {
        aux = lista->first;
        lista->first = lista->first->next;
        free(aux);
        n++;
    }
    return n;
}



int menuPrincipal(void) {
    int opcao;
   
    printf("\nMENU PRINCIPAL\n");
    printf(" 1) Cadastrar bebida\n");
    printf(" 2) Mostrar bebidas\n");
    printf(" 3) Comprar bebida\n");
    printf(" 4) Vender bebida\n");
    printf(" 5) Cadastrar cliente\n");
    printf(" 6) Mostrar clientes\n");
    printf(" 0) Sair do sistema\n\n");

    printf(" Escolha uma opção: ");
    scanf("%d", &opcao);
    if(getchar()!='\n')
    printf("\n");
    return opcao;
}

int main(){
    int n = 0;
    int opcao;
    ListBebi *bebidas = NULL;
    ListClient *clientes = NULL;

     bebidas = inicializaListaDeBebidas();
    if (bebidas == NULL) {
        printf(" Não foi possível inicializar a lista de bebidas!\n");
        return 0;
    }

    clientes = inicializaListClient();
    if (clientes == NULL) {
        printf(" Não foi possível inicializar a lista de clientes!\n");
        return 0;
    }

 while (1) {
        opcao = menuPrincipal();

        switch (opcao) {
            
            case 0:
                n += LiberaBebidas(bebidas);
                n += LiberaClientes(clientes);
                free(bebidas);
                free(clientes);
                printf("\n %d elementos foram liberados\n\n", n);
                printf(" Saindo do sistema...\n\n");
                return 0;
                break;

            case 1:
                cadastraBebida(bebidas);
                break;
            
            case 2:
                mostraBebidas(bebidas);
                break;

            case 3:
                compraBebida(bebidas);
                break;

            case 4:
                tentaVenderBebida(bebidas, clientes);
                break;

            case 5:
                cadastraCliente(clientes);
                break;

            case 6:
                mostraCliente(clientes);
                break;
            default:
                printf("\nOpção inválida!\n\n");
                break;
        }
    }

    return 0;
}