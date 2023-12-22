	.data
	
x: 	.asciz "\nDigite o valor:"
ma:	.asciz	"\nMaior:"
me:	.asciz	"\nMenor:"
msg:	.string "\nMédia:"
cont:	.word	0
soma:	.word	0


	.text
	
main:
	la zero, ma
	mv s1, zero
	la a0, me
	mv s2, a0
	la t0, cont
	lw s3, 0(t0)
	la t1, soma
	lw s4, 0(t1)
	
novo:
	la a0, x
	li a7, 4
	ecall
	
	li a7, 5
	ecall
	
	mv s0, a0
	
	blt s0, zero, fim
	
	addi s3, s3, 1
	add s4, s4, s0
		
	blt s1, s0, maior
	blt s0, s2, menor
	j novo
	
maior:
	mv s1, s0
	blt s0, s2, menor
	j novo
	
menor:
	mv s2, s0
	j novo
	
	
fim:	
	
	la a0, ma
	li a7, 4
	ecall
	
	mv a0, s1
	li a7, 1
	ecall
	
	la a0, me
	li a7, 4
	ecall
	
	mv a0, s2
	li a7, 1
	ecall
		        
	divu s4, s4, s3
	
	la a0, msg
	li a7, 4
	ecall
	
	mv a0, s4
	li a7, 1
	ecall
	
	li a7, 10
	ecall
	
