//////////////////////////////NUMERO 1

import java.io.IOException;
import java.util.Scanner;


public class Main {
 
        Scanner sc = new Scanner(System.in);
            
            double media = 0;
            double valor;
            int cont = 0;
           
            
            for (int i = 0; i < 6; i++) {
            	valor = sc.nextDouble();
            	if (valor > 0) {
            		cont++;
            		media += valor;
            	}
            }
            
            media = media / cont;
            System.out.println(cont + " valores positivos");
            System.out.println(String.format("%.1f", media));
        }
 
}

////////////////////////////////NUMERO 2

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
        Scanner sc = new Scanner(System.in);
            
            int cont = 0;
            int valor;
        
            for(int i = 0; i < 5; i++){
                valor = sc.nextInt();
                if(valor % 2 ==0){
                   cont++; 
                }
            
            }
            
            System.out.println(cont + " valores pares");
            
    }
 
}


////////////////////////////////NUMERO 3

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
           Scanner sc = new Scanner(System.in);
            
            int  valor = sc.nextInt();
            
            for(int i = 1; i < 10000; i++){
                if(i % valor == 2){
                    
                   System.out.println(+i);
                }
            
            }    
            
    }
 
}


////////////////////////////////NUMERO 4

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
	    Scanner sc = new Scanner(System.in);	
	     
		int N = sc.nextInt();

		for(int i = 1; i < 11; i++){

		    System.out.printf( "%d x %d = %d\n", i, N, N * i);

		}
		
	}
	    
}


////////////////////////////////NUMERO 5

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
	Scanner sc = new Scanner(System.in);	
     
	     double nota, media = 0, total = 0, soma = 0;
	     
		while(total != 2){
		    nota = sc.nextDouble();

		    if(nota >= 0 && nota <= 10){
		        soma += nota;
		        total++;

		    }

		    else{

		        System.out.print("nota invalida\n");
		    }

		 }
		
		media = soma / 2;
		System.out.printf("media = %.2f\n", media);
		 
	    }     
    
}

     

