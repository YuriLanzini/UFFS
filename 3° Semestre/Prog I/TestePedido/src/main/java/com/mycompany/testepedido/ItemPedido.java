package com.mycompany.testepedido;

public class ItemPedido {
    private Produto prod;
    private int qtde;

    public ItemPedido(Produto prod, int qtde) {
        this.prod = prod;
        this.qtde = qtde;
    }

    public double getSubtotal() {
        
        return prod.getValor() * qtde;
    }
    
    public Produto getProd() {
        return prod;
    }

    public void setProd(Produto prod) {
        this.prod = prod;
    }

    public int getQtde() {
        return qtde;
    }

    public void setQtde(int qtde) {
        this.qtde = qtde;
    }
    
  }
