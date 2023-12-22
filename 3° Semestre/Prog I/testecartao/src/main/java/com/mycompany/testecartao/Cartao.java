package com.mycompany.testecartao;
import java.util.ArrayList;
import java.util.List;

public class Cartao {
    
    private String numero;
    private String titular;
    private String bandeira;
    private List<Operacao> operacoes;
    
    public Cartao(String numero, String titular, String bandeira) {
        this.numero = numero;
        this.titular = titular;
        this.bandeira = bandeira;
        this.operacoes = new ArrayList<>();
    }
    
    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }
    
    public void setTitular(String titular) {
        this.titular = titular;
    }
    
    public String getTitular() {
        return this.titular;        
    }

    public String getBandeira() {
        return bandeira;
    }

    public void setBandeira(String bandeira) {
        this.bandeira = bandeira;
    }
     
     public List<Operacao> getOperacoes() {
        return operacoes;
    }

    public void adicionarOperacao(String tipo, double valor) {
        Operacao operacao = new Operacao(tipo, valor);
        operacoes.add(operacao);
    }     
     
}
