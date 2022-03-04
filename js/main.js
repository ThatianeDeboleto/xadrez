

let turn, selectedPiece, currentSpot, borderEl, blockPiece, positions = [], whitePositions=[], blackPositions =[], blocked, passantArr=[], promoteNum, promoteTileColor; 


const tile = document.querySelectorAll('td');
const gameBoardEl = document.getElementById('board');
const whiteButton = document.getElementById('white-button');
const blackButton = document.getElementById('black-button');
const whiteKillList = document.getElementById('white-dead-pieces');
const blackKillList = document.getElementById('black-dead-pieces');


gameBoardEl.addEventListener('click', clickAction);


init();

function init(){
    turn = true; 
    BOARD_OBJ.initPieces();
    placePieces();
    //mantenha-os aqui, para que a posição na matriz não seja prejudicada pelas capturas antes do castelo
    whiteKingRook = BOARD_OBJ.pieces[27];
    whiteQueenRook = BOARD_OBJ.pieces[26];
    blackKingRook = BOARD_OBJ.pieces[25];
    blackQueenRook = BOARD_OBJ.pieces[24];  
}

function clickAction(evt){
    positionTracker();
    if (selectedPiece){
        movePiece(evt);
    } else selectPiece(evt);
}

function selectPiece(evt){
    let num = evt.target.id.slice(3);
    borderEl = evt.target.style;
    let piece = BOARD_OBJ.pieces.find(function(piece){
        return piece.position === parseInt(num);    
    });  

    if (turn === true && piece.color === 'w'){
       selectedPiece = piece; 
       borderEl.border = '4px solid green';    
    } 

    if (turn === false && piece.color === 'b'){
        selectedPiece = piece; 
        borderEl.border = '4px solid green';  
    }       
}
 

function movePiece(evt){
    console.log(evt.target.className);
    blocked = false;    
    let targetRow = evt.path[1].id;
    let num = evt.target.id.slice(3);
    let targetSquareColor = evt.path[0].className;

    if (parseInt(selectedPiece.position) === parseInt(num)) {
        selectedPiece = null;
        borderEl.border = null; 
    }
    else {
        let success = selectedPiece.move(num, targetRow, targetSquareColor);
        if (success) {
            checkPromotion(num, evt.target.className);
            killPiece(num);
            turn = !turn;

            passantArr.push(selectedPiece);
            selectedPiece = null;
            placePieces();
            positions = [];
            whitePositions = [];
            blackPositions = [];
            borderEl.border = null;
            if (turn){ 
                whiteButton.style.backgroundColor = 'red'; blackButton.style.backgroundColor = 'white';
            }
            else{
                 blackButton.style.backgroundColor = 'red'; whiteButton.style.backgroundColor = 'white';
            }         
        }
    }  
}

function clearBoard(){
    for (let i = 0; i <= 63; i++){
        let element = document.getElementById(`sq-${i}`) 
        element.style.backgroundImage = null;
    }
}

function placePieces(){
    clearBoard();
    BOARD_OBJ.pieces.forEach(function(piece){
        let element = document.getElementById(`sq-${piece.position}`) 
        element.style.backgroundImage = piece.image;
    });
}

function positionTracker(){
    BOARD_OBJ.pieces.forEach(function(piece){
        positions.push(piece.position);
    });

    BOARD_OBJ.pieces.forEach(function(piece){
        if (piece.color === 'b'){
          blackPositions.push(piece.position);
        }
    });

    BOARD_OBJ.pieces.forEach(function(piece){
        if (piece.color === 'w'){
          whitePositions.push(piece.position);
        }
    });
}

function killPiece(num){
    if (turn){
        if (blackPositions.includes(parseInt(num))){
            BOARD_OBJ.pieces.forEach(function(piece){
                if (piece.color === 'b' && piece.position === parseInt(num)){
                    piece.alive = 'false';
                   let  index = BOARD_OBJ.pieces.indexOf(piece);
                  splicedPiece=BOARD_OBJ.pieces.splice(index, 1);
                  image=splicedPiece[0].image.slice(4, splicedPiece[0].image.length-1);
                  appender = `<img src=${image}>`
                 whiteKillList.insertAdjacentHTML('beforeend', appender); 
                }
            });            
        }
    }
     if (!turn){
        if (whitePositions.includes(parseInt(num))){
            BOARD_OBJ.pieces.forEach(function(piece){
                if (piece.color === 'w' && piece.position === parseInt(num)){
                    piece.alive = 'false';
                   let  index = BOARD_OBJ.pieces.indexOf(piece);
                   splicedPiece= BOARD_OBJ.pieces.splice(index, 1);
                   image=splicedPiece[0].image.slice(4, splicedPiece[0].image.length-1);
             appender = `<img src=${image}>`
            blackKillList.insertAdjacentHTML('beforeend', appender); 
                }
            });    
            
        }
    }
}




