
//// Alunos: Yuri Lanzini, Pierre Richard Demosthene


#include <stdio.h>
#include <string.h>

typedef struct {
    int id_arquivo;
    char nome[20];
    char tipo;
    char opcional;
    int tamanho;
} Atributo;

void selectAll(FILE *arquivo_att, FILE *arquivo_dados, int id_arquivo) {
    
    if (arquivo_att == NULL || arquivo_dados == NULL) {
        printf("Erro ao abrir arquivo(s).\n");
        return;
    }

    Atributo atributos[20]; 
    fread(atributos, sizeof(Atributo), 20, arquivo_att);
    
    for (int i = 0; i < 20; i++) {
        if (atributos[i].id_arquivo == id_arquivo) {
            printf("%-20s", atributos[i].nome);
        }
    }
    printf("\n\n");

    while (1) {
        int leu_registro = 0;
        for (int i = 0; i < 20; i++) {
            if (atributos[i].id_arquivo == id_arquivo) {
                switch (atributos[i].tipo) {
                    case 'S': {
                        char dado[atributos[i].tamanho];
                        if (fread(dado, sizeof(char), atributos[i].tamanho, arquivo_dados) != atributos[i].tamanho) {
                            leu_registro = 1;
                            break;
                        }
                        dado[atributos[i].tamanho] = '\0';
                        printf("%-20s", dado);
                        break;
                    }
                    case 'I': {
                        int dado;
                        if (fread(&dado, sizeof(int), 1, arquivo_dados) != 1) {
                            leu_registro = 1;
                            break;
                        }
                        printf("%-20d", dado);
                        break;
                    }
                    case 'D': {
                        double dado;
                        if (fread(&dado, sizeof(double), 1, arquivo_dados) != 1) {
                            leu_registro = 1;
                            break;
                        }
                        printf("%-20lf", dado);
                        break;
                    }
                }
            }
        }
        if (leu_registro)
            break;
        printf("\n");
    }
    printf("\n");
}


int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Uso: %s <nome_logico>\n", argv[0]);
        return 1;
    }

    FILE *arquivo_table = fopen("table.dic", "r");
    if (arquivo_table == NULL) {
        printf("Erro ao abrir o arquivo table.dic\n");
        return 1;
    }

    char nome_logico[20];
    char nome_fisico[20];
    int id_arquivo;

    while (fread(&id_arquivo, sizeof(int), 1, arquivo_table)) {
        fread(nome_logico, sizeof(char), 20, arquivo_table);
        fread(nome_fisico, sizeof(char), 20, arquivo_table);

        if (strcmp(nome_logico, argv[1]) == 0) {
            FILE *arquivo_dados = fopen(nome_fisico, "r");
            if (arquivo_dados == NULL) {
                printf("Erro ao abrir o arquivo de dados\n");
                fclose(arquivo_table);
                return 1;
            }

            FILE *arquivo_att = fopen("att.dic", "r");
            if (arquivo_att == NULL) {
                printf("Erro ao abrir o arquivo att.dic\n");
                fclose(arquivo_dados);
                fclose(arquivo_table);
                return 1;
            }

            printf("\nConteúdo do arquivo %s:\n\n", nome_fisico);
            selectAll(arquivo_att,arquivo_dados,id_arquivo);
            
            fclose(arquivo_att);
            fclose(arquivo_dados);
            fclose(arquivo_table);
            return 0;
        }
    }

    printf("Nome lógico não encontrado\n");
    fclose(arquivo_table);
    return 0;
}
