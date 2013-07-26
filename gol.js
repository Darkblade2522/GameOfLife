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
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
    
    function computeNextGrid(currentGrid){
        var nextGrid = currentGrid;
        
        for (var i in currentGrid){
            for (var j in currentGrid[i]){
                //Count neighbors
                var count;
                
                
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