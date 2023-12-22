///////////////////////////// 1

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
   public static void main(String[] args) throws IOException {
       
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


////////////////////////////// 2

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

/////////////////////////////// 3

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
           Scanner sc = new Scanner(System.in);
            
            int valor;
            valor = sc.nextInt();
        
            for(int i = 1; i < 10000; i++){
                if(i % valor ==2){
                    
                   System.out.println(+i);
                }
            
            }    
            
    }
 
}

//////////////////////// 4

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



/////////////////////////// 5

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
    Scanner sc = new Scanner(System.in);
            
            int X[] = new int[10];
           
            
            for (int i = 0; i < 10; i++) {
            	X[i] = sc.nextInt();
                if(X[i] <= 0){
                    X[i] = 1;
                }
            
            }
            for (int i = 0; i < X.length; i++){
                
                System.out.println( "X[" + i +"] = "+ X[i]);
            }
            
           
        }
 
}


/////////////////////////// 6

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
       Scanner sc = new Scanner(System.in);
            
            int N[] = new int[20];
            int aux;
            
            for (int i = 0; i < 20; i++) {
                
              N[i] = sc.nextInt();
           
            }
            
           for (int i=0; i < (20 / 2); i++) {
               
        	aux = N[i];
        	N[i] = N[20 - 1- i];
        	N[20 - 1 -i] = aux;
            }
           
            for (int i=0; i < N.length; i++) {

                System.out.println("N["+ i +"] = " + N[i]);
                
            }
        }
 
}

///////////////////////////////// 7

import java.io.IOException;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) throws IOException {
        
        Scanner sc = new Scanner(System.in);
            
            double soma = 0;
            char O = sc.next().toUpperCase().charAt(0);
            double[][] M = new double[12][12];
            
            for (int i = 0; i < M.length; i++) {
            	for (int j = 0; j < M[i].length; j++) {
            		M[i][j] = sc.nextDouble();
            	}
            }
            
            for (int i = 0; i < M.length; i++) {
            	for (int j = 0; j < M[i].length; j++) {
            		if (j > i) soma += M[i][j];
            	}
            }
    
            if (O == 'M') {
                
                soma /= ((M.length * M.length) - 12) / 2;
                
            }
        	System.out.println(String.format("%.1f", soma));
        }
    	
}
