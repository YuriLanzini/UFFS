package com.mycompany.testecartao;
import java.util.Scanner;


public class Testecartao {

    public static void main(String[] args) {
        
      
        Scanner sc = new Scanner(System.in);
        
        System.out.println("========================================");
        System.out.println("CARTÃO DE CRÉDITO:");
        System.out.println("========================================");
        System.out.println("\n");
        System.out.println("Digite a numero do cartão de crédito:");
        String numeroC = sc.nextLine();
        System.out.println("Digite o nome do titular do cartão de crédito:");
        String titularC = sc.nextLine();
        System.out.println("Digite a bandeira do cartão de débito:");
        String bandeiraC = sc.nextLine();
        System.out.println("Digite o limite de crédito do cartão de crédito:");
        double limiteCredito = sc.nextDouble();
        sc.nextLine();
        CartaoCredito cc = new CartaoCredito(numeroC, titularC, bandeiraC, limiteCredito);

        System.out.println("\n");
        System.out.println("========================================");
        System.out.println("CARTÃO DE DÉBITO:");
        System.out.println("========================================");
        System.out.println("\n");
        System.out.println("Digite o número do cartão de débito:");
        String numeroD = sc.nextLine();
        System.out.println("Digite o nome do titular do cartão de débito:");
        String titularD = sc.nextLine();
        System.out.println("Digite a bandeira do cartão de débito:");
        String bandeiraD = sc.nextLine();
        System.out.println("Digite a agência do cartão de débito:");
        int agencia = sc.nextInt();
        System.out.println("Digite o número da conta do cartão de débito:");
        int conta = sc.nextInt();
        CartaoDebito cd = new CartaoDebito(numeroD, titularD, bandeiraD, agencia, conta);


        int opcao = 0;
        while (opcao != 6) {
            System.out.println("========================================");
            System.out.println("Escolha uma opção:");
            System.out.println("1 - Realizar pagamento no cartão de crédito");
            System.out.println("2 - Realizar saque do cartão de débito");
            System.out.println("3 - Realizar depósito no cartão de débito");
            System.out.println("4 - Imprimir extrato/fatura do cartão de crédito");
            System.out.println("5 - Imprimir extrato/fatura do cartão de débito");
            System.out.println("6 - Sair");
            opcao = sc.nextInt();

            switch (opcao) {
                case 1:
                    
                    System.out.println("Digite o valor do pagamento no cartão de crédito:");
                    double valorPagamento = sc.nextDouble();
                    cc.realizarCompraCredito(valorPagamento);
                    break;
                    
                case 2:
                    
                    System.out.println("Digite o valor do saque do cartão de débito:");
                    double valorSaque = sc.nextDouble();
                    cd.realizarSaque(valorSaque);
                    break;
                    
                case 3:
                    
                    System.out.println("Digite o valor do depósito no cartão de débito:");
                    double valorDeposito = sc.nextDouble();
                    cd.realizarDeposito(valorDeposito);
                    break;
                    
                case 4:
                    
                    System.out.println("\n");
                    System.out.println("========================================");
                    System.out.println("Extrato/fatura do cartão de crédito:");
                    cc.imprimirExtratoCredito();
                    System.out.println("\n");
                    break;
                    
                case 5: 
                    
                    System.out.println("\n");
                    System.out.println("========================================");
                    System.out.println("Extrato/fatura do cartão de débito:");
                    cd.imprimirExtratoDebito();
                    System.out.println("\n");
                    break;
                
                case 6:
                    
                    System.out.println("Saindo...");
                    break;
                    
                default:
                    System.out.println("Opção inválida!");
            }
        }
            
    }
}

