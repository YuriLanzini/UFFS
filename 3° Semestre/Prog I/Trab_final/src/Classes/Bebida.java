package Classes;


public class Bebida {
    
    private String codigo;
    private String nome;
    private int conteudoLiquido;
    private double precoVenda;
    private int quantidadeEstoque;
    private double teorAlcoolico;

    public Bebida(String codigo, String nome, int conteudoLiquido, double precoVenda, int quantidadeEstoque, double teorAlcoolico) {
        this.codigo = codigo;
        this.nome = nome;
        this.conteudoLiquido = conteudoLiquido;
        this.precoVenda = precoVenda;
        this.quantidadeEstoque = quantidadeEstoque;
        this.teorAlcoolico = teorAlcoolico;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getConteudoLiquido() {
        return conteudoLiquido;
    }

    public void setConteudoLiquido(int conteudoLiquido) {
        this.conteudoLiquido = conteudoLiquido;
    }

    public double getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(double precoVenda) {
        this.precoVenda = precoVenda;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public double getTeorAlcoolico() {
        return teorAlcoolico;
    }

    public void setTeorAlcoolico(double teorAlcoolico) {
        this.teorAlcoolico = teorAlcoolico;
    }

    @Override
    public String toString() {
        return "Código: " + codigo +
                "\nNome: " + nome +
                "\nConteúdo Líquido: " + conteudoLiquido + " ml" +
                "\nPreço de Venda: R$" + String.format("%.2f", precoVenda) +
                "\nQuantidade em Estoque: " + quantidadeEstoque +
                "\nTeor Alcoólico: " + String.format("%.2f", teorAlcoolico) + "%\n";
    }
    
}

