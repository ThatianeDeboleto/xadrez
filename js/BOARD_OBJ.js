const BOARD_OBJ = {
    pieces: [],
    passantPiece: undefined,

    initPieces(){

        for (let i = 48; i <= 55; i++){
            this.pieces.push(new WhitePawn(i));
        }

        for (let i = 8; i <= 15; i++){
            this.pieces.push(new BlackPawn(i));
        }

        this.pieces.push(new BlackKnight(1), new BlackKnight(6));

        this.pieces.push(new WhiteKnight(57), new WhiteKnight(62));

        this.pieces.push(new BlackBishop(2, 'white-square'), new BlackBishop(5, 'black-square'));

        this.pieces.push(new WhiteBishop(58, 'black-square'), new WhiteBishop(61, 'white-square'));

        this.pieces.push(new BlackRook(0), new BlackRook(7));

        this.pieces.push(new WhiteRook(56), new WhiteRook(63));

        this.pieces.push(new WhiteKing(60));
        this.pieces.push(new BlackKing(4));

        this.pieces.push(new WhiteQueen(59));
        this.pieces.push(new BlackQueen(3));
    }
}