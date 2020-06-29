import React from 'react'

export default class Algorithms extends React.Component {

    neighbors(grid, row, col) {
        const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
        const result = []
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

    dfs(grid, row, col, visited, endRow, endCol) {
        if (visited.has([endRow, endCol].join(","))) {
            return -1
        }
        if (visited.has([row, col].join(","))) {
            return
        }
        console.log("Visting", row, col, "with value", this.props.grid[row][col])
        visited.add([row, col].join(","))
        this.props.isVisited([row,col])
        const nodeNeighbors = this.neighbors(grid, row, col)
        this.props.updateNeighbors(nodeNeighbors)
        for (const node of nodeNeighbors) {
            this.dfs(grid, node[0], node[1], visited, endRow, endCol)
        }
    }


    render() {
        return (
            <div>
                <button onClick={() => this.dfs(this.props.grid, 0, 0, new Set(), 4, 3)}> Run DFS</button>
            </div>)
    }
}