from analisador_lexico import LexicalAnalyzer
from analisador_sintatico import SyntaxAnalyzer

def main():
    entrada = 'source_code.txt' 
    saida = 'saida.txt' 

    LexicalAnalyzer(entrada).analyze()
    SyntaxAnalyzer(saida).parse()

if __name__ == "__main__":
    main()
