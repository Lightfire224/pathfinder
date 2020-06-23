
function neighbors(node){
    directions = [ [1,0], [0,1], [-1,0], [0, -1]]
    result= []
    
    for ( direction in directions){
        neighbor = [node[0] + directions[direction][0], node[1] + directions[direction][1]]        

        if allNodes.includes(neighbor){

        }
    }
    return result
}
// return node[0] + directions[0][0]

console.log("The edges of [0,0] are: ", neighbors([0,0]))
