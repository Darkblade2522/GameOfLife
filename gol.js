$(document).ready(function(){
	var characters = {
        dead  : "&nbsp;&nbsp;&nbsp;",
        light : "&#9617;",
        medium: "&#9618;",
        heavy : "&#9619;"
	}
    
    var gameGrid =
    [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    
    function computeNextGrid(currentGrid){
        var nextGrid = currentGrid;
        
        for (var i = 0 ; i < currentGrid.length -1; i++){
            for (var j =0 ; j < currentGrid[i].length -1; j++){
                //Count neighbours
                var count = countNeighbours(currentGrid, i, j);
                if (count != 0)
                    console.log("x:" + i + "  y:" + j + "   count:"  +count);
                    
                //Decide action
                switch (count) {
                    case 0:
                    case 1:
                        nextGrid[i][j] = 0;
                        break;
                    case 2:
                        nextGrid[i][j] = currentGrid[i][j];
                        break;
                    case 3:
                        nextGrid[i][j] = 1;
                        break;
                    default:
                        nextGrid[i][j] = 0;
                }
            }
        }
        
        return nextGrid;
    }
    
    function countNeighbours(grid, x, y){
        var count = 0;
        x = parseInt(x);
        y = parseInt(y);
        for (var i = -1 ; i < 2 ; i++){
            for (var j = -1 ; j < 2 ; j++){
                var x2 = x + i,
                    y2 = y + j;
                if(i === 0  && j === 0){
                    //continue;
                }
                
                //Check borders
                else if (grid[x2] === undefined || grid[x2][y2] === undefined){
                    //continue;
                }
                //Test if alive
                else if (grid[x2][y2] == 1){
                    count++;
                }
            }
        }
        return count;
    }
    
    function displayGrid(grid){
        var HTMLgrid = "";
        
        for (var i in grid){
            var line = "";
            for (var j in grid[i]){
                if (grid[i][j] == 1)
                    line += characters.light;
                else
                    line += characters.dead;
            }
            HTMLgrid += "<p>" + line + "</p>";
        }
        
        $("#game").empty().append(HTMLgrid);
    }
    
    function doXSteps(number){
        if (number === undefined || number <= 0 )
            return false;
            
        gameGrid = computeNextGrid(gameGrid);
        displayGrid(gameGrid);
        setTimeout(function(){ doXSteps(number - 1) }, 300);
    }
    
    displayGrid(gameGrid);
    $("#go-1") .on('click', function(){ doXSteps(1) ; })
    $("#go-10").on('click', function(){ doXSteps(10); })
    $("#go-50").on('click', function(){ doXSteps(50); })
})