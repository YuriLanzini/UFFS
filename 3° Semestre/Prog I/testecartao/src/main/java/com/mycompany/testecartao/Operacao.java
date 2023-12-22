
package com.mycompany.testecartao;

public class Operacao {
    
    private String tipoOperacao;
    private double valorOperacao;
  

    public Operacao(String tipoOperacao, double valorOperacao) {
        this.tipoOperacao = tipoOperacao;
        this.valorOperacao = valorOperacao;
  
    }

    public String getTipoOperacao() {
        return tipoOperacao;
    }

    public double getValorOperacao() {
        return valorOperacao;
    }

  
}

    

