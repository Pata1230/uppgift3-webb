
let mineFeild= [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
];

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
flagcheck()


let mineButtons = document.querySelectorAll(".minebutton");
console.log(mineButtons)

mineButtons.forEach((button) => {
    
    button.addEventListener("click", OnButtonclick)
})
SetMineFeild();
function resetgame (){
    SetMineFeild();
    OnButtonclick(e);
}

function SetMineFeild(){
    
    for(let y = 0; y<mineFeild.length; y++){                
        for(let x = 0; x< mineFeild.length; x++){
            mineFeild[x][y]=0;
        }
    }
        for(let y = 0; y<mineFeild.length; y++){                
            for(let x = 0; x< mineFeild.length; x++){
            if(Math.random() <= 0.2){ //sätt ut bomber
                mineFeild[x][y]=1;
            }
            else{
                mineFeild[x][y]=0;
            }
         }
        }
    }



function ResetMineFeild(){
    for(let x =0; x < (mineFeild.length*mineFeild.length); x++){
        mineButtons[x].disabled = false;
        mineButtons[x].innerHTML = ' ';
        mineButtons[x].style.backgroundColor = "gray";
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
    console.table(mineFeild)

}





console.table(mineFeild)

function OnButtonclick(e){
    let coordiante = e.target.value.split(",");
    console.log(coordiante);
    let x = parseInt(coordiante[0]);
    let y = parseInt(coordiante[1]);
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
flagcheck();
if(flagga == true){
    e.target.mineButtons.innerHTML = '🚩'
}
else{
    if (mineFeild[y][x] == 1){
        console.log("you hit a mine")
        e.target.style.backgroundColor="#ff0000";
        e.target.disabled = true;
       

    }
    else{
        if (neighbouringMines > 0){
            e.target.innerHTML = neighbouringMines;
            
        }
        e.target.disabled = true;
        console.log("no mine")
    }
}
}
function checkBounds(x,y){
    if(y>=0 && y <= mineFeild.length-1){
        if(x>=0 && x <= mineFeild[y].length -1){
        return true;
    }
    }
    return false;
}

   

