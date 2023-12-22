	.data
	
vetor:	.word	80,6,2,-100,8,20,580,0,-2,100
size:	.word	10
msg:	.string "\nVetor"
msg1:	.string "["
msg2:	.string	"]: "
msg3:	.string "\n\nMaior: "
	
	.text
	
main:	
	
	la a0, vetor
	la t0, size
	lw a1, 0(t0)
	
	call ordena
	
	la a2, vetor
	
	call imprimir	
	call maior
	
	li a7, 10
    	ecall
   
#########################################
	
ordena:

	li t0,0
	
laco_ext:

	beq a1, t0, fim_ordena
	addi t1,t0, 1
	
laco_int:	

	beq t1,a1,fim_laco_int
	
	slli s0, t0, 2
	add s0, a0, s0
	slli s1,t1, 2
	add s1, a0,s1
	lw s2, 0(s0)
	lw s3, 0(s1)
	
	bgt s3, s2, prox
	
	sw s3, 0(s0)
	sw s2, 0(s1)
	
prox:
	
	addi t1, t1, 1
	j laco_int
	
fim_laco_int:

	addi t0, t0 ,1
	j laco_ext
	
fim_ordena:
	ret
	
	
	
#########################################


imprimir:

	li t0, 0 
	
    
imprimir_loop:

	beq t0, a1, fim_imprimir
	
	slli s0, t0, 2
	add s0, a2, s0
	
	la a0, msg
	li a7, 4
	ecall
	
	la a0, msg1
	li a7, 4
	ecall
	
	mv a0, t0
	li a7, 1
	ecall
	
	la a0, msg2
	li a7, 4
	ecall
	
	lw s2, 0(s0)
	    
	mv a0, s2
	li a7, 1
	ecall
	
	addi t0, t0, 1
	j imprimir_loop

fim_imprimir:

	ret
	
	
#########################################
		
						
maior:
	
	li t0, 0 
	li s1, 0
	
maior_loop:

	beq t0, a1, fim_maior
	
	slli s0, t0, 2
	add s0, a2, s0
	lw s2, 0(s0)	
	
	blt s2, s1, proxi
	
	mv s1, s2

proxi:

	addi t0, t0, 1	
	j maior_loop


fim_maior:

	la a0, msg3
	li a7, 4
	ecall
	    
	mv a0, s1
	li a7, 1
	ecall
	
	ret
