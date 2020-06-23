
function neighbors(node){
    directions = [ [1,0], [0,1], [-1,0], [0, -1]]
    result= []
    
    for ( direction in directions){
        neighbor = [node[0] + directions[direction][0], node[1] + directions[direction][1]]        
        console.log(neighbor)

        if (0 <= neighbor[0] < 20 && 0 <= neighbor[1] < 20){
            result.push(neighbor)
        }
    }
    return result
}

console.log("The edges of [0,0] are: ", neighbors([0,0]))
