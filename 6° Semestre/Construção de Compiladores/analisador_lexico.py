class LexicalAnalyzer:
    def __init__(self, file_path):
        self.source_code = self._read_source_code(file_path)
        self.position = 0
        self._caracter = ''
        self.symbols_table = {}
        self.output_tape = []
        self.line_number = 1 



    def _read_source_code(self, file_path):
        with open(file_path, 'r') as file:
            return file.read()

    def _obter_caracter(self):
        self._remover_espacos()
        if self.position < len(self.source_code):
            self._caracter = self.source_code[self.position]
            self.position += 1
        else:
            self._caracter = None  

    def _remover_espacos(self):
        while self.position < len(self.source_code) and self.source_code[self.position].isspace():
            if self.source_code[self.position] == '\n':
                self.line_number += 1
                self.output_tape.append('LINE')

            self.position += 1

    def _q0(self):
        """Estado inicial."""
        self._obter_caracter()
        if self._caracter is None:
            return  # Fim da análise
        if self._caracter == 'i':
            self._q1()  # Palavra-chave 'if'
        elif self._caracter == 'e':
            self._q3()  # Palavra-chave 'else'
        elif self._caracter == 'r':
            self._q7()  # Palavra-chave 'return'
        elif self._caracter.isdigit():
            self._q13()  # Número
        elif self._caracter.isalpha():
            self._q14()  # Identificador
        elif self._caracter == '+':
            self._q15()  # Operador '+'
        elif self._caracter == '-':
            self._q16()  # Operador '-'
        elif self._caracter == '*':
            self._q17()  # Operador '*'
        elif self._caracter == '/':
            self._q18()  # Operador '/'
        elif self._caracter == '=':
            # print('foi')
            self._q19()  # Operador '='
        elif self._caracter == '!':
            self._q20()  # Operador '!'
        elif self._caracter == '<':
            self._q21()  # Operador '<'
        elif self._caracter == '>':
            self._q22()  # Operador '>'
        elif self._caracter == '(':
            self._q23()  # Separador '('
        elif self._caracter == ')':
            self._q24()  # Separador ')'
        elif self._caracter == '{':
            self._q25()  # Separador '{'
        elif self._caracter == '}':
            self._q26()  # Separador '}'
        elif self._caracter == ';':
            self._q27()  # Separador ';'
        elif self._caracter == ',':
            self._q28()  # Separador ','
        else:
            self._q_error()

    def _q1(self):
        self._obter_caracter()
        if self._caracter != 'f':
            self.position -= 2
            self._obter_caracter()
            self._q14()
        else:
            self._q2()

    def _q2(self):
        """Reconhece palavra-chave 'if'."""
        self._obter_caracter()
        if self._caracter != '(':
            self.position -= 3
            self._obter_caracter()
            self._q14()
        else:
            self.output_tape.append('if')
            self.position -=1
            self._q0()


    def _q3(self):
        self._obter_caracter()
        if self._caracter != 'l':
            self.position -= 2
            self._obter_caracter()
            self._q14()
        else:
            self._q4()

    def _q4(self):
        self._obter_caracter()
        if self._caracter != 's':
            self.position -= 3
            self._obter_caracter()           
            self._q14()
        else:
            self._q5()

    def _q5(self):
        self._obter_caracter()
        if self._caracter != 'e':
            self.position -= 4
            self._obter_caracter()
            self._q14()
        else:
            self._q6()

    def _q6(self):
        """Reconhece palavra-chave 'else'."""
        self._obter_caracter()
        if self._caracter != '{':
            self.position -= 5
            self._obter_caracter()
            self._q14()
        else:
            self.output_tape.append('else')
            self.position -=1
            self._q0()

    def _q7(self):
        self._obter_caracter()
        if self._caracter != 'e':
            self.position -= 2
            self._obter_caracter()
            self._q14()
        else:
            self._q8()

    def _q8(self):
        self._obter_caracter()
        if self._caracter != 't':
            self.position -= 3
            self._obter_caracter()
            self._q14()
        else:
            self._q9()    

    def _q9(self):
        self._obter_caracter()
        if self._caracter != 'u':
            self.position -= 4
            self._obter_caracter()
            self._q14()
        else:
            self._q10()

    def _q10(self):
        self._obter_caracter()
        if self._caracter != 'r':
            self.position -= 5
            self._obter_caracter()
            self._q14()
        else:
            self._q11()

    def _q11(self):
        self._obter_caracter()
        if self._caracter != 'n':
            self.position -= 6
            self._obter_caracter()
            self._q14()
        else:
            self._q12()

    def _q12(self):
        """Reconhece palavra-chave 'return'."""
        self.output_tape.append('RETURN')
        self._q0()

    def _q13(self):  # Números
        num = self._caracter
        
        self._obter_caracter()
        is_float = False  
        
        while self._caracter and self._caracter.isdigit():
            num += self._caracter
            self._obter_caracter()
        
        if self._caracter == '.': 
            is_float = True
            num += self._caracter 
            self._obter_caracter()
            
            if not self._caracter or not self._caracter.isdigit():
                self.position -= 2
                self._obter_caracter()
                self._q_error() 
                return
            
            while self._caracter and self._caracter.isdigit():
                num += self._caracter
                self._obter_caracter()

            if self._caracter and (self._caracter.isalpha() or self._caracter in ['_', '.']):
                self._q_error()
            else:
                self.output_tape.append(f'FLOAT')
                if self._caracter:
                    self.position -= 1 
        else:
            self.output_tape.append(f'INTEGER')  
            if self._caracter:
                self.position -= 1 
        
        self._q0() 

# Função de estado para identificadores
    def _q14(self):
        rst = 0
        num = ''
        identifier = self._caracter
        self._obter_caracter()
        
        while self._caracter and (self._caracter.isalnum()):
            identifier += self._caracter
            self._obter_caracter()

        value_type = None 
        if self._caracter == '=':
            self._obter_caracter()
            
            if self._caracter != '=':   
                rst += 3
                if self._caracter == ';':
                    num = None
                if self._caracter.isdigit():
                    
                    is_float = False  
                    while self._caracter.isdigit() or self._caracter == '.':
                        if self._caracter == '.':
                            if is_float: 
                                break
                            is_float = True
                        num += self._caracter
                        self._obter_caracter()
                        rst += 1

                    if is_float:
                        if num.endswith('.'):
                            num = ''  
                        else:
                            value_type = 'FLOAT'
                            num = float(num)
                    else:
                        value_type = 'INTEGER'
                        num = int(num)
            else:
                rst += 1

        self.position -= rst   

        if identifier not in self.symbols_table and num != '':
            self.symbols_table[identifier] = {
                'type': 'identifier', 
                'value': num, 
                'value_type': value_type
            }
            num = ''
        
        self.output_tape.append(f'ID')
        
        self.position -= 1  
        self._q0()

    # Funções de estado para operadores
    def _q15(self):  # Operador '+'
        self.output_tape.append('+')
        self._q0()

    def _q16(self):  # Operador '-'
        self.output_tape.append('-')
        self._q0()

    def _q17(self):  # Operador '*'
        self.output_tape.append('*')
        self._q0()

    def _q18(self):  # Operador '/'
        self.output_tape.append('/')
        self._q0()

    def _q19(self):  # Operador '='
        self._obter_caracter()
        # print(self._caracter)
        # print(self.output_tape)

        if self._caracter == '=':
            self.output_tape.append('==')
        else:
            self.position -= 1 
            self.output_tape.append('=')
             
        self._q0()

    def _q20(self):  # Operador '!'
        self._obter_caracter()
        if self._caracter == '=':
            self.output_tape.append('!=')
        else:
            self._q_error()
        self._q0()

    def _q21(self):  # Operador '<'
        self._obter_caracter()
        if self._caracter == '=':
            self.output_tape.append('<=')
        else:
            self.position -= 1  
            self.output_tape.append('<')
        self._q0()

    def _q22(self):  # Operador '>'
        self._obter_caracter()
        if self._caracter == '=':
            self.output_tape.append('>=')
        else:
            self.position -= 1
            self.output_tape.append('>')
        self._q0()

    # Funções de estado para Separadores
    def _q23(self):  # Separador '('
        self.output_tape.append('(')
        self._q0()

    def _q24(self):  # Separador ')'
        self.output_tape.append(')')
        self._q0()

    def _q25(self):  # Separador '{'
        self.output_tape.append('{')
        self._q0()

    def _q26(self):  # Separador '}'
        self.output_tape.append('}')
        self._q0()

    def _q27(self):  # Separador ';'
        self.output_tape.append(';')
        self._q0()

    def _q28(self):  # Separador ','
        self.output_tape.append(',')
        self._q0()

    def _q_error(self):
        """Função para capturar e relatar erros."""
        self.output_tape.append(f'ERROR')
        self._q0()

    def analyze(self):
        self._q0()
        self.output_tape.append('$')
        output_file_path = 'saida.txt'
        self.save_results_to_file(output_file_path)

    def save_results_to_file(self, output_file_path):
        with open(output_file_path, 'w') as file:
            # Escreve a fita de saída
            file.write('\n'.join(self.output_tape) + '\n\n')

            # Escreve a tabela de símbolos
            file.write("Tabela de Símbolos:\n")
            for symbol, info in self.symbols_table.items():
                file.write(f"{symbol}: {info}\n")

    