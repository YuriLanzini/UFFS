	.data
	
par: 	.asciz " \nPares: "
impar: 	.asciz " \nImpares: "
vetor:	.word 11,9,8,4,5,7,1
size:	.word 7

	.text

main:

	la a0, vetor
	la t0, size
	lw a1, 0(t0)
	li t2, 2
	li s1, 0
	li s2, 0
	
	call funcao
	
	li a7, 10
	ecall
	
	
funcao:
	
	li t1,0
		
laco:
	beq t1, a1, fim
	
	slli t3, t1, 2
	add t3, a0, t3
	
	lw s0, 0(t3)
	
	
	rem t4, s0, t2

	beq t4, zero, igual
	
	
	addi s2,s2,1
	
	addi t1,t1, 1	
	j laco
	

igual:
	addi s1,s1,1
	
	addi t1,t1,1
	j laco	

fim: 

	la a0, par
	li a7, 4
	ecall
	
	mv a0, s1
	li a7, 1
	
	ecall
	
	li a7, 4
	la a0, impar
	ecall
	
	mv a0, s2
	li a7, 1	
	ecall
	
	
	ret

   
   	
   			
   	
