/**
 * @file trabalho_1.c
 * @author Yuri__Lanzini
 * @version 0.3
 * @date 30-03-2023
 *
 * @copyright Copyright (c) 2023
 *
 *
 * @brief Arquivo template para trabalho de Pesquisa e Ordenação.
 *
 * Cada estudante deve implementar as funções conforme as assinaturas
 * abaixo e realizar as impressões dos vetores após a ordenação. Desta forma,
 * o(a) estudante deve implementar o trecho de código para impressão dos vetores
 * ordenados dentro da função `main` conforme o exemplo do Bubble Sort abaixo.
 *
 * Se necessário, declare e implemente funções auxiliares para realizar as
 * ordenações.
 *
 * Importante:Não altere as assinaturas dos métodos de ordenação!
 *
 * Caso o vetor não possa ser ordenado por algum método, imprima uma mensagem de
 * aviso e o vetor original.
 *
 * Atenção: Antes de entregar, verifique se dos dados de documentos no início
 * do arquivo estão preenchidos corretamente.
 *
 */
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

void copia(int *A, int *v, int size);
void troca( int *A, int i, int j);
void bubbleSort(int *A, int size);
void selectionSort(int *A, int size);
void insertionSort(int *A, int size);
void mergeSort(int *A, int size);
void merge(int *A, int inicio, int size);
void intercala(int *A, int inicio, int meio, int size);
void quickSort(int *A, int size);
void quick(int *A, int inicio, int size );
int particiona(int *A, int inicio, int size);
void heapSort(int *A, int size);
void criaHeap(int *A, int i, int size);
void countingSort(int *A, int size);
int buscaMax(int *A, int size);
int buscaMenor(int *A, int size);
void radixSort(int *A, int size);
void counting(int *A, int size, int pos);


int main(){

    int i;
    int vetor[] = {1, 20, -10, 30, 5, 7};
    int tamanhoVetor = (int)sizeof(vetor)/sizeof(int);

    printf("\nVetor original: ");
    for (i = 0 ; i < tamanhoVetor ; i++)
        printf("%d ", vetor[i]);

    printf("\nVetor tamanho = %d\n", tamanhoVetor);

    // bubble sort

     int bubbleVec[tamanhoVetor];
    copia(vetor, bubbleVec, tamanhoVetor);
    bubbleSort(bubbleVec, tamanhoVetor);
    printf("\nBubble sort: ");
    for (i = 0 ; i < tamanhoVetor ; i++)
        printf("%d ", bubbleVec[i]);
    printf("\n");

    // selectionsort

     int selectionVec[tamanhoVetor];
    copia(vetor, selectionVec, tamanhoVetor);
    selectionSort(selectionVec, tamanhoVetor);
    printf("\nSelection sort: ");
    for (i = 0 ; i < tamanhoVetor ; i++)
        printf("%d ", selectionVec[i]);
    printf("\n");

    // insertion sort

     int insertionVec[tamanhoVetor];
    copia(vetor, insertionVec, tamanhoVetor);
    insertionSort(insertionVec, tamanhoVetor);
    printf("\nInsertion sort: ");
    for (i = 0 ; i < tamanhoVetor ; i++)
        printf("%d ", insertionVec[i]);
    printf("\n");

    // merge sort

    int mergeVec[tamanhoVetor];
    copia(vetor, mergeVec, tamanhoVetor);
    mergeSort(mergeVec, tamanhoVetor);
    printf("\nMerge sort: ");
    for (i = 0 ; i < tamanhoVetor; i++)
        printf("%d ", mergeVec[i]);
    printf("\n");

    // quick sort

    int quickVec[tamanhoVetor];
    copia(vetor, quickVec, tamanhoVetor);
    quickSort(quickVec, tamanhoVetor);
    printf("\nQuick sort: ");
    for (i = 0 ; i < tamanhoVetor; i++)
    printf("%d ", quickVec[i]);
    printf("\n");

    // heap sort

    int heapVec[tamanhoVetor];
    copia(vetor, heapVec, tamanhoVetor);
    heapSort(heapVec, tamanhoVetor);
    printf("\nHeap sort: ");
    for (i = 0 ; i < tamanhoVetor; i++)
    printf("%d ", heapVec[i]);
    printf("\n");


    // counting sort

    int countingVec[tamanhoVetor];
    copia(vetor, countingVec, tamanhoVetor);
    countingSort(countingVec, tamanhoVetor);
    for (i = 0 ; i < tamanhoVetor; i++)
    printf("%d ", countingVec[i]);
    printf("\n");

    // radix sort

    int radixVec[tamanhoVetor];
    copia(vetor, radixVec, tamanhoVetor);
    radixSort(radixVec, tamanhoVetor);
    for (i = 0 ; i < tamanhoVetor; i++)
    printf("%d ", radixVec[i]);
    printf("\n\n");

    return 0;
}


void copia(int *A, int *V, int size){

    int i;
    for (i = 0 ; i < size ; i++)
        V[i] = A[i];
}

void troca( int *A, int i, int j){

	int aux = A[i];
	A[i] = A[j];
	A[j] = aux;
}


int buscaMax(int *A, int size){

   int i, max = A[0];

       for (i = 0; i < size; i++) {
            if (i == 0) {
                A[i] = max;
            }
            if (A[i] > max) {
                max = A[i];
            }
        }
        return max;
}

int buscaMenor(int *A, int size){

   int i, menor = A[0];

       for (i = 0; i < size; i++) {
            if (i == 0) {
                A[i] = menor;
            }
            if (A[i] < menor) {
                menor = A[i];
            }
        }
        return menor;
}


void bubbleSort(int *A, int size){
   int i, j ;

        for(i = 0; i < size; i++){
            for(j=0; j < size-1; j++ ){

                if(A[j] > A[j+1]){
                
                    troca(A, j, j+1);

                }
            }
        }

}

 void selectionSort(int *A, int size){

    int menor, i, j;

        for(i=0; i < size-1; i++){

            menor = i;

            for(j=i+1; j < size; j++){

                if(A[menor] > A[j]){

                    menor = j;
            
                }
            }

            troca(A, i, menor);    
                
        }

}


void insertionSort(int *A, int size){

    int i, j, aux;

    for(i = 1; i < size; i++){

        aux = A[i];

        for(j = i; (j > 0) && (aux < A[j-1]); j--){

             A[j] = A[j-1];
        }
           
       A[j] = aux;
    
    }    

}

void mergeSort(int *A, int size){

        merge(A, 0, size-1);

}


void merge(int *A, int inicio, int size){

        if(inicio < size){
            int meio = floor((inicio + size)/2);
            merge(A, inicio, meio);
            merge(A, meio + 1, size);
            intercala(A, inicio, meio, size);
        }

}


void intercala(int *A, int inicio, int meio, int size){
    
    int *aux  = (int*) malloc((size - inicio +1)*sizeof(int));
    int i = inicio; 
    int j = meio + 1;
    int k = 0;

        while(i <= meio && j <= size){
            if(A[i] <= A[j]){

                aux[k] = A[i];
                i++;

            }else{

                aux[k] = A[j];
                j++;

            }
            k++;
        }

        while(i <= meio){

            aux[k] = A[i];
            k++;
            i++;
        }

        while(j <= size){

            aux[k] = A[j];
            k++;
            j++;
        }

        for(k = inicio; k <= size; k++){

            A[k] = aux[k - inicio];
        }

    free(aux);

}

void quickSort(int *A, int size){

    quick(A, 0, size-1);
}

void quick(int *A, int inicio, int size ){

    if(inicio < size){
        int posPivo = particiona(A, inicio, size);
        quick(A, inicio, posPivo -1);
        quick(A, posPivo +1, size);
    }
}


int particiona(int *A, int inicio, int size){

    int posPivo = size;
    int k = inicio;

        for(int i = inicio; i < size; i++){
            
            if(A[i] <= A[posPivo]){

              troca(A, i, k);
                k++; 
            }
        }

        if(A[k] > A[posPivo]){

            troca(A, k, posPivo);
        }

        return k;
}


void heapSort(int *A, int size){

    int k;

        for(k = (size/2)-1; k >= 0; k--){

            criaHeap(A, k, size);
        }

        for(k = (size-1); k >= 1; k--){

            troca(A, 0, k);
            criaHeap(A, 0, k);
        }
}

void criaHeap(int *A, int i, int size){

    int maior = i;
    int left = 2* i+1;
    int right = 2* i+2;

        if(left < size && A[left] > A[i]){

            maior = left;
        }

        if(right < size && A[right] > A[maior]){

            maior = right;
        }

        if(maior != i){

            troca(A, i, maior);
            criaHeap(A, maior, size);
        }

}


void countingSort(int *A, int size){
    
    int f = 0, i;

    for(i = 0; i < size; i++){
        if(A[i] < 0){
            printf("\nCounting Sort não ordena vetor com valores negativos.\n");
            printf("Vetor Original: ");
            f = 1;
            break;
        }

    }

    if(f == 0){

     
    int k = buscaMax(A,size);
    int count[k+1];
    int aux[size];

    for(i = 0; i <= k; i++){

        count[i] = 0;
    }

    for(i = 0; i < size; i++){

        count[A[i]]++;
    }

    for(i = 1; i <= k; i++){

        count[i] += count[i-1];
    }

    for(i = size-1; i >= 0; i--){

        count[A[i]] = count[A[i]] - 1;
        aux[count[A[i]]] = A[i]; 

    }

    for(i = 0; i < size; i++){

        A[i] = aux[i];
    }

      printf("\nCounting sort: ");
}
    
   
 
}

void radixSort(int *A, int size){

    int f = 0, i;

    for(i = 0; i < size; i++){
        if(A[i] < 0){
            printf("\nRadix Sort não ordena vetor com valores negativos.\n");
            printf("Vetor Original: ");
            f = 1;
            break;
        }

    }

    if(f == 0){

        int max = buscaMax(A, size);

        for (int pos = 1; max/pos > 0; pos*= 10){
            counting(A, size, pos);
        }
        printf("\nRadix sort: ");
    }
 
}

void counting(int *A, int size, int pos){

    int digito;
    int aux[size];
    int count[10] = {0};

    for (int i = 0; i < size; i++){

        digito = (A[i]/pos) %10;
        count[digito]++;
    }

    for (int i = 1; i < 10; i++){

        count[i] += count[i - 1];
    }

    for (int i = size - 1; i >= 0; i--){

        digito = (A[i]/pos) %10;
        count[digito]--;
        aux[count[digito]] = A[i];
        
    }

    for (int i = 0; i < size; i++){

        A[i] = aux[i];
    }
    
}
