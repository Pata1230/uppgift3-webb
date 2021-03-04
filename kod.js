
let mineFeild= [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    
];

let rutor = 64; 

let antal = 0;
SetMineFeild()
function flagcheck() {
    var checkBox = document.getElementById("flag");
    var flagga;
    if (checkBox.checked == true){
     var flagga = true;
     console.log("din mamma1")
    } 
    else {
        flagga = false;
        console.log("din mamma2")
    }
  console.log(flagga)
    return flagga;
}



let mineButtons = document.querySelectorAll(".minebutton");
console.log(mineButtons)

mineButtons.forEach((button) => {
    
    button.addEventListener("click", OnButtonclick)
})

function SetMineFeild(){
    antal = 0;
    for(let y = 0; y<mineFeild.length; y++){                
        for(let x = 0; x< mineFeild.length; x++){
            mineFeild[x][y]=0;
        }
    }
        for(let y = 0; y<mineFeild.length; y++){                
            for(let x = 0; x< mineFeild.length; x++){
            if(Math.random() <= 0.2){ //sätt ut bomber
                mineFeild[x][y]=1;
                antal = antal+1;
             
            }
            else{
                mineFeild[x][y]=0;
            }
         }
        }
        console.log(antal)
        return antal
        
    }

function ResetMineFeild(){
    for(let x =0; x < (mineFeild.length*mineFeild.length); x++){
        mineButtons[x].disabled = false;
        mineButtons[x].innerHTML = ' ';
        mineButtons[x].style.backgroundColor = "green";
        neighbouringMines = 0;
     
    }
}



document.getElementById('button').onclick = function() {
    ResetMineFeild()
    for(let y = 0; y<mineFeild.length; y++){                
        for(let x = 0; x< mineFeild.length; x++){
            mineFeild[x][y]=0;
        }
    }
    SetMineFeild()
    rutor = (mineFeild.length*mineFeild.length);
    console.table(mineFeild)
    outputReset()


}




console.table(mineFeild)
function NeighbouringMines(x,y){
    let neighbouringMines= 0;
    //kolla åvan
    //south
    if(checkBounds(x, y-1)){
        if(mineFeild[y-1][x]===1){
            neighbouringMines++;
        }
    }
    //north
    if(checkBounds(x, y+1)){
    if(mineFeild[y+1][x]===1){
        neighbouringMines++;
    }
}
    //east
    if(checkBounds(x+1, y)){
    if(mineFeild[y][x+1]===1){
        neighbouringMines++;
    }
}
    //west
    if(checkBounds(x-1, y)){
    if(mineFeild[y][x-1]===1){
        neighbouringMines++;
    }
    }
//southeast
if(checkBounds(x+1, y-1)){
    if(mineFeild[y-1][x+1]===1){
        neighbouringMines++;
    }
}
//northeast
if(checkBounds(x+1, y+1)){
    if(mineFeild[y+1][x+1]===1){
        neighbouringMines++;
    }
}
//southwest
if(checkBounds(x-1, y-1)){
    if(mineFeild[y-1][x-1]===1){
        neighbouringMines++;
    }
}
//northwest
if(checkBounds(x-1, y+1)){
    if(mineFeild[y+1][x-1]===1){
        neighbouringMines++;
    }
}
return neighbouringMines
}

function OnButtonclick(e){
    let coordiante = e.target.value.split(",");
    console.log(coordiante);
    let x = parseInt(coordiante[0]);
    let y = parseInt(coordiante[1]);
    let neighbouringMines = NeighbouringMines(x,y)
 
   
    flagga = flagcheck(); //kollar om du har klickat på flagg knappen eller inte
 if(flagga == true){
    if( e.target.innerHTML ==='🚩' ){ //om den redan är flaggad tas den bort
        e.target.innerHTML = '';
    }
    else{
        e.target.innerHTML = '🚩'; 
    }
 }
else{
    

    if (mineFeild[y][x] == 1){ //om du träffar en mina
       
        console.log("you hit a mine")
        e.target.style.backgroundColor="#ff0000";
        e.target.disabled = true;
        outputLoss()
       
        

    }
 
    
    else{
        if(neighbouringMines==0){ //om du inte träffar en mina

            floodFill(x,y)
       }
        if (neighbouringMines >= 0){
            e.target.innerHTML = neighbouringMines;
        e.target.disabled = true;
        e.target.style.backgroundColor="gray"
        console.log("no mine")
        console.log(rutor)
        rutor = rutor-1
        CheckWin();
        console.log(rutor)
    }
    }
}

return rutor;
}
function checkBounds(x,y){
    if(y>=0 && y <= mineFeild.length-1){
        if(x>=0 && x <= mineFeild[y].length -1){
        return true;
        
    }
    }
    return false;
}
function CheckWin(){ //om de rutorna som ör kvar är = antalet bomber
    if(rutor <  antal+1){
        outputWin();
        
    }
}
//Floodfill som kallas första gången, clickar ej på sig själv   
function floodFill(x,y){
        mineFeild[y][x] = 2;
        floodFillHelper(x,y-1)
        floodFillHelper(x-1,y)
        floodFillHelper(x,y+1)
        floodFillHelper(x+1,y)
    
  
}

//Floodfill alla gånger utom första
function floodFillHelper( x, y){


   

     //om rows är mindre än 0
    if(y < 0){
        
        return;
    }

    //om column är mindre än 0
    if(x < 0){
      
        return;
    }

    //Om rad är längre än minefeild
    if(y > 7){
        
        return;
    }

    //Om column är längre än minefeild
    if(x > 7){
     
        return;
    }
    if(NeighbouringMines(x,y) >0){
        mineButtons[x + mineFeild.length*y].click()
        mineFeild[y][x] = 2;
        return;
    }

    if(mineFeild[y][x]==1 || mineFeild[y][x]==2){
      
        return;
    }

    mineButtons[x + mineFeild.length*y].click()
    mineFeild[y][x] = 2;
    floodFillHelper(x+1,y)
   
    floodFillHelper(x-1,y)

    floodFillHelper(x,y+1)
    floodFillHelper(x,y-1)  
    console.log("finished")  
   return
}

function outputWin(){
    document.getElementById("output").innerHTML = "You win"

}
function outputLoss(){
    document.getElementById("output").innerHTML = "You lose"
}
function outputReset(){
    document.getElementById("output").innerHTML = ""
}
  