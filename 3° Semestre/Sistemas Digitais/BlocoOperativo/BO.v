module BO(
input [9:0] SW,
input [3:0] KEY,
output [6:0] HEX0, HEX1, HEX2, HEX3
);

parameter A = 5;
parameter B = 2;
parameter C = 9;

reg[7:0] LX, LS, LH;

always @(posedge KEY[0])
begin
	if(SW[0] == 1)
		LX[2:0] <= KEY[3:1];
	if(SW[1] == 1)
		LS <= saida_Somador;
	if(SW[2] == 1)
		LH <= saida_Somador;
end

wire [9:0] saida_M0, saida_M1, saida_M2;
wire [15:0] saida_Somador;

mux4x1 mux0(.am(A),.bm(B),.cm(C), .ym(0), .sel(SW[9:8]), .saidaMux(saida_M0));
mux4x1 mux1(.am(LX),.bm(LS),.cm(LH), .ym(saida_M0), .sel(SW[7:6]), .saidaMux(saida_M1));
mux4x1 mux2(.am(saida_M0),.bm(LS),.cm(LH), .ym(LX), .sel(SW[5:4]), .saidaMux(saida_M2));

operador op (.v1(saida_M2), .v2(saida_M1), .h(SW[3]), .saida(saida_Somador));

display disp(.R(saida_Somador) ,.display0(HEX0), .display1(HEX1), .display2(HEX2), .display3(HEX3));

endmodule
