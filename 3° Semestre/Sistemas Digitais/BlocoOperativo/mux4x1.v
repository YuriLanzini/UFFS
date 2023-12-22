module mux4x1(
input[15:0] am,bm,cm,ym,
input[1:0] sel,
output reg[9:0] saidaMux);

always @(*)
begin
	case(sel)
		2'b00 : saidaMux <= ym;
		2'b01 : saidaMux <= am;
		2'b10 : saidaMux <= bm;
		2'b11 : saidaMux <= cm;
	endcase
end
endmodule
