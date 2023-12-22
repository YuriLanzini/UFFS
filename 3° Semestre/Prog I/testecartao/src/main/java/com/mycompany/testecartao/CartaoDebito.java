package com.mycompany.testecartao;

public class CartaoDebito extends Cartao {
    
    private int agencia;
    private int conta;    
    private double saldo;
    
    public CartaoDebito(String numero, String titular, String bandeira, int agencia, int conta) {
        super(numero, titular, bandeira);
        this.agencia = agencia;
        this.conta = conta;
        this.saldo = 0;
    }

    public int getAgencia() {
        return agencia;
    }

    public void setAgencia(int agencia) {
        this.agencia = agencia;
    }

    public int getConta() {
        return conta;
    }

    public void setConta(int conta) {
        this.conta = conta;
    }

    public void realizarSaque(double valor) {
        
        if (valor <= saldo) {
            saldo -= valor;
            adicionarOperacao("Saque", valor);
            System.out.println("Saque realizado.");
        } else {
            System.out.println("Saldo insuficiente.");
        }
    }
    
    public void realizarDeposito(double valor) {
        
        saldo += valor;
        adicionarOperacao("Depósito", valor);
        System.out.println("Valor depositado.");
        
    }
    
     public void imprimirExtratoDebito() {
         
        System.out.println("EXTRATO DO CARTÃO " + getNumero() + " - " + getTitular());
        System.out.println("========================================");
        for (Operacao operacao : getOperacoes()) {
            String tipo = operacao.getTipoOperacao();
            double valor = operacao.getValorOperacao();
            System.out.println(" - " + tipo + ": R$ " + valor);
        }
        System.out.println("----------------------------------------");
        System.out.println("SALDO DISPONÍVEL: R$ " + saldo);
        System.out.println("========================================");
    }

}
    

