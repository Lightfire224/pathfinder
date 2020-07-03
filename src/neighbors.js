function neighbors(grid, row, col) {
    directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    result = []

    directions.forEach((offset) => {
        const neighbor = [
            row + offset[0],
            col + offset[1]
        ];
        if (neighbor[0] >= 0
            && neighbor[0] < grid.length
            && neighbor[1] >= 0
            && neighbor[1] < grid[0].length) {
            result.push(neighbor);
        }
    });

    return result
}

const grid = [
    /* 0, 1, 2,  3,  4  - columns innner array (second number)*/
    [11, 12, 13, 14, 15], // 0 - rows- outter array (first number)
    [21, 22, 23, 24, 25], // 1
    [31, 32, 33, 34, 35], // 2
]

// function dijkstras(grid, row, col) {
//     const nodeNeighbors = neighbors(grid, row, col)

//     graph = {}
// }

function dfs(grid, row, col, visited, endRow, endCol) {

    if (visited.has([endRow, endCol].join(","))) {
        return -1
    }

    if (visited.has([row, col].join(","))) {
        return
    }
    // console.log("Visting", row, col, "with value", grid[row][col])
    visited.add([row, col].join(","))

    const nodeNeighbors = neighbors(grid, row, col)
    for (node of nodeNeighbors) {
        dfs(grid, node[0], node[1], visited, endRow, endCol)
    }
}

/// Tests
// function testDFS() {
// dfs(grid, 0, 0, new Set(), 2, 2);
// console.log('solving next..')
// dfs(grid, 0, 1, new Set());
// }

function bfs(grid, row, col, visited, endRow, endCol) {
    const queue = [[row, col]]
    while (queue.length > 0) {
        const current = queue.shift()

        // console.log("Visting", current, "with value", grid[current[0]][current[1]])
        visited.add([current[0], current[1]].join(","))

        if (visited.has([endRow, endCol].join(","))) {
            return -1
        }

        const nodeNeighbors = neighbors(grid, current[0], current[1])
        for ([r, c] of nodeNeighbors) {
            if (!visited.has([r, c].join(","))) {
                queue.push([r, c])
            }
        }
    }

}


// function testBFS() {
//     bfs(grid, 0, 0, new Set(), 2, 2)
// }
// testBFS()




function testNeighbor() {
    // grid[/* row index */][/* columns index */]
    // console.log("Rows: ", grid.length, "Columns: ", grid[0].length)

    neighbors(grid, 1, 2)
    console.log('some edges')
    neighbors(grid, 0, 0)
    neighbors(grid, 2, 4)
    neighbors(grid, 2, 0)
    // console.log(neighbors(grid, 1, 2).map(coord => grid[coord[0]][coord[1]]))
}

// testDFS()

function createGrid() {
    const grid = []
    for (let row = 0; row < 10; row++) {
        const rowData=[]
        for (let col = 0; col < 10; col++) {
            let tensPlace = row * 10
            const columnNumber = tensPlace + col
            rowData.push(columnNumber)
        }
        grid.push(rowData)
    }
    // console.log(grid)
    return grid
}

// createGrid()

function breakUpEachIndividualGridNumber(grid){

    console.log(grid)
}

breakUpEachIndividualGridNumber(createGrid())