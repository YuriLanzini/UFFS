package com.mycompany.testepedido;
import java.util.ArrayList;
import java.util.List;

public class Pedido {
    private List<ItemPedido> itens;
    private double valorTotal;

    public Pedido() {
        
        this.itens = new ArrayList<>();
    }
    
    public void adicionarItem(ItemPedido item){
        
       itens.add(item);
       
          
    }
    
    public double obterTotal(){
        
       valorTotal = 0;
        for (ItemPedido item : itens) {
            valorTotal += item.getSubtotal();
        }
        return valorTotal;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }
    
    
    
}
