	.data
	
A:	.word	5,1,8,3,7
B:	.word	2,6,8,4,3
C:	.space	20
msg:	.string	"\nVetor C: "
ma:	.word	1
ig:	.word	0
me:	.word	-1

	.text
	
main:

	la a0, A
	la a1, B
	la a2, C
	li t0, 5	#t0 tamanho dos vetores
	
	
	la t1, ma
	lw s5, 0(t1)
	
	la t2, ig
	lw s6, 0(t2)
	
	la t3, me
	lw s7, 0(t3)
	
	call funcao
		
	call inicio_impri
	
	li a7, 10
	ecall
	
funcao:
	li t1, 0
	
laco:	
	beq t1, t0, fim		#t1 e que eu tenho que fazer + 1
	
	slli s0, t1, 2	
	add s0, a0, s0
	
	slli s1, t1, 2	
	add s1, a1, s1
	
	lw s2, 0(s0)	# vetor A
	lw s3, 0(s1)	# vetor B
	
	
	beq s2,s3, igual
	
	blt s2, s3 menor

# A é maior que B
	
	slli s4, t1, 2
	add s4, a2, s4
	sw s5 ,0(s4)
	
	addi t1,t1,1
	j laco
	
igual:

	slli s4, t1, 2
	add s4, a2, s4
	sw s6 ,0(s4)
	
	addi t1,t1,1
	j laco
		

menor:	
	slli s4, t1, 2
	add s4, a2, s4
	sw s7 ,0(s4)
	
	addi t1,t1,1
	j laco	

	
fim:
	ret
	
	
##################################


inicio_impri:

	li t1,0

imprimir:
	
	beq t1, t0, fim_imprimir
	
	slli s0, t1, 2
	add s0, a2, s0
	
	la a0, msg
	li a7, 4
	ecall
	
	lw s1, 0(s0)
	    
	mv a0, s1
	li a7, 1
	ecall
	
	addi t1, t1, 1
	j imprimir

fim_imprimir:
	
	ret
