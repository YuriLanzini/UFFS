module operador(
input [15:0] v1, v2,
input [1:0]h, 
output reg[15:0] saida
);

always @(*)
begin
	case(h)
		1'b0 : saida <= v1 + v2;
		1'b1 : saida <= v1 * v2;
	endcase
end

endmodule
