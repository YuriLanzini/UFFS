/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/GUIForms/JInternalFrame.java to edit this template
 */
package Interface;

import Classes.Cliente;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JOptionPane;
import java.util.ArrayList;
import java.util.List;



public class menu_cliente extends javax.swing.JInternalFrame {
    
    private List<Cliente> listaClientes;
   
   
    public menu_cliente() {
        initComponents();
        listaClientes = new ArrayList<>();
        
        txt_codigo.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                txt_nome.requestFocus(); 
            }
        });

        txt_nome.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                txt_cpf.requestFocus(); 
            }
        });

        txt_cpf.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                txt_idade.requestFocus(); 
            }
        });

        txt_idade.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                btt_cdscliente.doClick();
            }
        });
    }
    
    private String formatarCPF(String cpf) {
    // Remove caracteres não numéricos do CPF
    String cpfSemCaracteres = cpf.replaceAll("\\D", "");

    // Formata o CPF
    String cpfFormatado = cpfSemCaracteres.replaceFirst("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4");

    return cpfFormatado;
}


    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        txt_codigo = new javax.swing.JTextField();
        txt_nome = new javax.swing.JTextField();
        txt_cpf = new javax.swing.JTextField();
        jLabel4 = new javax.swing.JLabel();
        txt_idade = new javax.swing.JTextField();
        btt_cdscliente = new javax.swing.JButton();

        setClosable(true);
        setIconifiable(true);
        setTitle("Cadastro cliente");

        jLabel1.setText("Código:");

        jLabel2.setText("Nome:");

        jLabel3.setText("CPF:");

        txt_codigo.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_codigoActionPerformed(evt);
            }
        });

        txt_nome.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txt_nomeActionPerformed(evt);
            }
        });

        jLabel4.setText("Idade:");

        btt_cdscliente.setText("Cadastrar");
        btt_cdscliente.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btt_cdsclienteActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addComponent(txt_idade, javax.swing.GroupLayout.PREFERRED_SIZE, 187, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                        .addGroup(layout.createSequentialGroup()
                            .addContainerGap()
                            .addComponent(txt_cpf, javax.swing.GroupLayout.PREFERRED_SIZE, 187, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGroup(javax.swing.GroupLayout.Alignment.LEADING, layout.createSequentialGroup()
                            .addGap(14, 14, 14)
                            .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                                .addComponent(txt_codigo, javax.swing.GroupLayout.PREFERRED_SIZE, 187, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addComponent(txt_nome, javax.swing.GroupLayout.PREFERRED_SIZE, 187, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addGroup(layout.createSequentialGroup()
                                    .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                        .addComponent(jLabel4)
                                        .addComponent(jLabel3)
                                        .addComponent(jLabel2)
                                        .addComponent(jLabel1))
                                    .addGap(143, 143, 143))))))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 33, Short.MAX_VALUE)
                .addComponent(btt_cdscliente, javax.swing.GroupLayout.PREFERRED_SIZE, 172, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(34, 34, 34))
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(layout.createSequentialGroup()
                .addGap(14, 14, 14)
                .addComponent(jLabel1)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addComponent(txt_codigo, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(27, 27, 27)
                .addComponent(jLabel2)
                .addGap(18, 18, 18)
                .addComponent(txt_nome, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(28, 28, 28)
                .addComponent(jLabel3)
                .addGap(18, 18, 18)
                .addComponent(txt_cpf, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jLabel4)
                .addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(txt_idade, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 43, Short.MAX_VALUE)
                        .addComponent(btt_cdscliente, javax.swing.GroupLayout.PREFERRED_SIZE, 39, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(21, 21, 21))))
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void txt_nomeActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_nomeActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_nomeActionPerformed

    
    private boolean verificaCodigo(String cod) {
        
        for (Cliente cliente : listaClientes) {
            if (cliente.getCodigo().equals(cod)) {
                return true;
            }
        }
        return false;
}

    private boolean validarCPF(String cpf) {
        
    cpf = cpf.replaceAll("\\D", "");
    if (cpf.length() != 11) {
        return false;
    }
    
    if (cpf.matches("(\\d)\\1{10}")) {
        return false;
    }
    
     return true;
}
    
    
    
    private void btt_cdsclienteActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btt_cdsclienteActionPerformed
   
   try{    
       
    String codigo = (txt_codigo.getText());
    
    if (verificaCodigo(codigo)) {
            JOptionPane.showMessageDialog(this, "O código do cliente já existe. Por favor, digite novamente.", "Erro", JOptionPane.ERROR_MESSAGE);
            txt_codigo.setText("");
            return;
        }
    
    String nome = txt_nome.getText();
    String cpf = formatarCPF(txt_cpf.getText());
    int idade = Integer.parseInt(txt_idade.getText()); 
    
    if (!validarCPF(cpf)) {
            JOptionPane.showMessageDialog(this, "CPF inválido. Por favor, digite novamente.", "Erro", JOptionPane.ERROR_MESSAGE);
            txt_cpf.setText(""); 
            return;
        }
    
    
    
    Cliente cliente = new Cliente(codigo, nome, cpf, idade);
    
    listaClientes.add(cliente);
    
    
    JOptionPane.showMessageDialog(this, "Cliente cadastrado com sucesso!");
    
    
    txt_codigo.setText("");
    txt_nome.setText("");
    txt_cpf.setText("");
    txt_idade.setText("");
    txt_codigo.requestFocus();
    
     tela_inicial telaInicial = (tela_inicial) getTopLevelAncestor();
     telaInicial.atualizarTabelaClientes(listaClientes);
   
       
   } catch (NumberFormatException e) {
            JOptionPane.showMessageDialog(this, "Por favor, preencha todos os campos corretamente.", "Erro", JOptionPane.ERROR_MESSAGE);
            txt_codigo.setText("");
            txt_nome.setText("");
            txt_cpf.setText("");
            txt_idade.setText("");
            txt_codigo.requestFocus();
        }  
    }//GEN-LAST:event_btt_cdsclienteActionPerformed

    private void txt_codigoActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txt_codigoActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txt_codigoActionPerformed


    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btt_cdscliente;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JTextField txt_codigo;
    private javax.swing.JTextField txt_cpf;
    private javax.swing.JTextField txt_idade;
    private javax.swing.JTextField txt_nome;
    // End of variables declaration//GEN-END:variables

    public List<Cliente> getListaClientes() {
        return listaClientes;
    }
}
