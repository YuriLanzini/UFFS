package com.mycompany.testepedido;


public class Produto {
    private int codigo;
    double valor;
    private String descr;

    public Produto(int codigo, double valor, String descr) {
        this.codigo = codigo;
        this.valor = valor;
        this.descr = descr;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }
    
     
    
}
