module display 
(input [9:0] R, 
output reg[6:0] display0, display1, display2, display3);

wire[15:0] df, df1, df2;
wire[15:0] dv, dv1, dv2;

assign dv = R/10;
assign df = dv*10; 
wire[3:0] D0 = R-df;

assign dv1 = dv/10;
assign df1 = dv1*10; 
wire[3:0] D1 = dv-df1;

assign dv2 = dv1/10;
assign df2 = dv2*10; 
wire[3:0] D2 = dv1-df2;

wire[3:0] D3 = dv2;

always @(*)
begin
	case(D0) 
		4'b0000 : display0 <= 7'b1000000; 
		4'b0001 : display0 <= 7'b1111001; 
		4'b0010 : display0 <= 7'b0100100; 
		4'b0011 : display0 <= 7'b0110000; 
		4'b0100 : display0 <= 7'b0011001; 
		4'b0101 : display0 <= 7'b0010010; 
		4'b0110 : display0 <= 7'b0000010; 
		4'b0111 : display0 <= 7'b1011000; 
		4'b1000 : display0 <= 7'b0000000;
		4'b1001 : display0 <= 7'b0010000; 
		default : display0 <= 7'b0111111;
	endcase
	
	case(D1) 
		4'b0000 : display1 <= 7'b1000000; 
		4'b0001 : display1 <= 7'b1111001; 
		4'b0010 : display1 <= 7'b0100100; 
		4'b0011 : display1 <= 7'b0110000; 
		4'b0100 : display1 <= 7'b0011001; 
		4'b0101 : display1 <= 7'b0010010; 
		4'b0110 : display1 <= 7'b0000010; 
		4'b0111 : display1 <= 7'b1011000; 
		4'b1000 : display1 <= 7'b0000000;
		4'b1001 : display1 <= 7'b0010000; 
		default : display1 <= 7'b0111111;
	endcase
	
	case(D2) 
		4'b0000 : display2 <= 7'b1000000; 
		4'b0001 : display2 <= 7'b1111001; 
		4'b0010 : display2 <= 7'b0100100; 
		4'b0011 : display2 <= 7'b0110000; 
		4'b0100 : display2 <= 7'b0011001; 
		4'b0101 : display2 <= 7'b0010010; 
		4'b0110 : display2 <= 7'b0000010; 
		4'b0111 : display2 <= 7'b1011000; 
		4'b1000 : display2 <= 7'b0000000;
		4'b1001 : display2 <= 7'b0010000; 
		default : display2 <= 7'b0111111;
	endcase
	
	case(D3) 
		4'b0000 : display3 <= 7'b1000000; 
		4'b0001 : display3 <= 7'b1111001; 
		4'b0010 : display3 <= 7'b0100100; 
		4'b0011 : display3 <= 7'b0110000; 
		4'b0100 : display3 <= 7'b0011001; 
		4'b0101 : display3 <= 7'b0010010; 
		4'b0110 : display3 <= 7'b0000010; 
		4'b0111 : display3 <= 7'b1011000; 
		4'b1000 : display3 <= 7'b0000000;
		4'b1001 : display3 <= 7'b0010000; 
		default : display3 <= 7'b0111111;
	endcase
end
endmodule
