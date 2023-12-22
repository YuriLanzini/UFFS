package com.mycompany.testecartao;

public class CartaoCredito extends Cartao {
    private double limiteCredito;
    private double fatura;

    public CartaoCredito(String numero, String titular, String bandeira, double limiteCredito) {
        super(numero, titular, bandeira);
        this.limiteCredito = limiteCredito;
        this.fatura = 0;
    }

    public double getLimiteCredito() {
        return limiteCredito;
    }

    public void setLimiteCredito(double limiteCredito) {
        this.limiteCredito = limiteCredito;
    }
    
    public double calcularLimiteDisponivel() {
        return limiteCredito - fatura;
    }
    
    public void realizarCompraCredito(double valor) {
        
        if (valor <= calcularLimiteDisponivel()) {
            fatura += valor;
            adicionarOperacao("Compra a crédito", valor);
            System.out.println("Pagamento realizado.");
        } else {
            System.out.println("Limite de crédito insuficiente.");
            }
    }
    
     public void imprimirExtratoCredito() {
         
        System.out.println("EXTRATO DO CARTÃO " + getNumero() + " - " + getTitular());
        System.out.println("========================================");
        for (Operacao operacao : getOperacoes()) {
            String tipo = operacao.getTipoOperacao();
            double valor = operacao.getValorOperacao();
            System.out.println(" - " + tipo + ": R$ " + valor);
        }
        System.out.println("-------------------------------------------");
        System.out.println("FATURA A PAGAR: R$ " + fatura);
        System.out.println("LIMITE DISPONIVEL: R$ " + calcularLimiteDisponivel());

        System.out.println("========================================");
    }

}
