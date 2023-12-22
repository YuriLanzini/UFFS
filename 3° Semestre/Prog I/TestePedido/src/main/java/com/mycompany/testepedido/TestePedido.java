package com.mycompany.testepedido;

public class TestePedido {

    public static void main(String[] args) {
        
       Produto p[] = new Produto[3];  
       
       p[0] = new Produto(10, 25f, "Shampoo"); 
       p[1] = new Produto(11, 3f, "Sabonete"); 
       p[2] = new Produto(12, 20f, "Desodorante");
       
       
       ItemPedido i[] = new ItemPedido[3]; 
       
       i[0] = new ItemPedido(p[0], 1);
       i[1] = new ItemPedido(p[1], 1);
       i[2] = new ItemPedido(p[2], 1);
       
       Pedido pedido = new Pedido();
       
       pedido.adicionarItem(i[0]);
       pedido.adicionarItem(i[1]);

       
       System.out.println("Valor total da compra: R$ " + pedido.obterTotal());

    }
}
