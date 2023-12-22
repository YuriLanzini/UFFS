1-/////////////////////////

import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
   
   
        Scanner sc = new Scanner(System.in); 
        
        int a = sc.nextInt();
        int b = sc.nextInt(); 
        int x = a + b;
         
        System.out.println("X = " + x);
    }
 
}



2-/////////////////////////////

import java.io.IOException;
import java.util.Scanner;

public class Main {
	
	public static void main(String[] args) throws IOException {
        Scanner leitor = new Scanner(System.in);
        int funcionarios = leitor.nextInt();
        int horas = leitor.nextInt();
        double valorPorHora = leitor.nextDouble();
        double salario = horas * valorPorHora;
        System.out.println("NUMBER = " + funcionarios);
        System.out.println(String.format("SALARY = U$ %.2f" , salario));
    }
	
}



3-/////////////////////////////

import java.io.IOException;
import java.util.Scanner;


public class Main {
 
    public static void main(String[] args) throws IOException {
 
    Scanner leitor = new Scanner(System.in);
        
        int notasInseridas = leitor.nextInt();
        int resul = notasInseridas;
        int not100 = resul / 100;
        resul -= not100 * 100;
        int not50 = resul / 50;
        resul -= not50 * 50;
        int not20 = resul / 20;
        resul -= not20 * 20;
        int not10 = resul / 10;
        resul -= not10 * 10;
        int not5 = resul / 5;
        resul -= not5 * 5;
        int not2 = resul / 2;
        resul -= not2 * 2;
        int not1 = resul;
        
        System.out.println(notasInseridas);
        System.out.println(not100 + " nota(s) de R$ 100,00");
        System.out.println(not50 + " nota(s) de R$ 50,00");
        System.out.println(not20 + " nota(s) de R$ 20,00");
        System.out.println(not10 + " nota(s) de R$ 10,00");
        System.out.println(not5 + " nota(s) de R$ 5,00");
        System.out.println(not2 + " nota(s) de R$ 2,00");
        System.out.println(not1 + " nota(s) de R$ 1,00");
        
    }
 
}



4-//////////////////////////////////

import java.util.Scanner;

public class Main {
     

    public static void main(String[] args) {
        
     Scanner sc = new Scanner(System.in);
     
		int a = sc.nextInt();
		int b = sc.nextInt();
		int c = sc.nextInt();
		if (a < b && a < c) {
			System.out.println(a);
			if (b < c) {
				System.out.println(b);
				System.out.println(c);
			} else {
				System.out.println(c);
				System.out.println(b);
			}
		} else if (b < c) {
			System.out.println(b);
			if (a < c) {
				System.out.println(a);
				System.out.println(c);
			} else {
				System.out.println(c);
				System.out.println(a);
			}
		} else {
			System.out.println(c);
			if (a < b) {
				System.out.println(a);
				System.out.println(b);
			} else {
				System.out.println(b);
				System.out.println(a);
			}
		}
		
		System.out.println("");
		System.out.println(a);
		System.out.println(b);
		System.out.println(c);
	}
}



5-/////////////////////////////////

import java.io.IOException;
import java.util.Scanner;
 
public class Main {
 
    public static void main(String[] args) throws IOException {
 
        Scanner sc = new Scanner(System.in);
         
            int a = sc.nextInt();
            int b = sc.nextInt();
            
            if (a % b == 0 || b % a == 0) {
                
                System.out.println("Sao Multiplos");
                
            } else {
                
                System.out.println("Nao sao Multiplos");
            }
     
    }
 
}


6-///////////////////////////////////////////


import java.io.IOException;
import java.util.Scanner;

public class Main {
 
    public static void main(String[] args) throws IOException {
 
      	Scanner sc = new Scanner(System.in);
		String palavra1 = sc.next();
		String palavra2 = sc.next();
		String palavra3 = sc.next();
		if (palavra1.equalsIgnoreCase("vertebrado")) {
			if (palavra2.equalsIgnoreCase("ave")) {
				if (palavra3.equalsIgnoreCase("carnivoro")) {
					System.out.println("aguia");
				} else {
					System.out.println("pomba");
				}
			} else {
				if (palavra3.equalsIgnoreCase("onivoro")) {
					System.out.println("homem");
				} else {
					System.out.println("vaca");
				}
			}
		} else {
			if (palavra2.equalsIgnoreCase("inseto")) {
				if (palavra3.equalsIgnoreCase("hematofago")) {
					System.out.println("pulga");
				} else {
					System.out.println("lagarta");
				}
			} else {
				if (palavra3.equalsIgnoreCase("hematofago")) {
					System.out.println("sanguessuga");
				} else {
					System.out.println("minhoca");
				}			
			}
		}
	}
	
}
