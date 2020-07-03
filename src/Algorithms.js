import React from 'react'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

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
                if (this.checkWalls(neighbor)) {
                    result.push(neighbor)
                }
            }
        })
        return result
    }

    checkWalls = (neighbor) => {
        //purpose filter out the neighbor that shares the same row&col as a wallPosition
        // when my neighbor is a wall, I should return null
        // when my neighbor is not a wall, I should return neighbor
        //my problem is that I'm only iterating over the first wall
        for (let i = 0; i < this.props.wallPosition.length; i++) {
            const wall = this.props.wallPosition[i]
            if (neighbor[0] === wall[0] && neighbor[1] === wall[1]) {
                return false
            }
        }
        return true
    }

    async dfs(grid, row, col, visited, endRow, endCol) {
        if (visited.has([endRow, endCol].join(","))) {
            return -1
        }
        if (visited.has([row, col].join(",")) && this.props.wallPosition.includes([row, col])) {
            return
        }
        // console.log("Visting", row, col, "with value", this.props.grid[row][col])
        visited.add([row, col].join(","))
        this.props.isVisited(visited)
        const nodeNeighbors = this.neighbors(grid, row, col)
        this.props.updateNeighbors(nodeNeighbors)
        for (const node of nodeNeighbors) {
            this.dfs(grid, node[0], node[1], visited, endRow, endCol)
        }
    }

    async bfs(grid, row, col, visited, endRow, endCol) {
        const queue = [[row, col]]
        while (queue.length > 0) {
            const current = queue.shift()

            // console.log("Visting", current, "with value", grid[current[0]][current[1]])
            visited.add([current[0], current[1]].join(","))
            this.props.isVisited(visited)
            await sleep(150)

            if (visited.has([endRow, endCol].join(","))) {
                return -1
            }

            const nodeNeighbors = this.neighbors(grid, current[0], current[1])
            this.props.updateNeighbors(nodeNeighbors)

            for (const [r, c] of nodeNeighbors) {
                if (!visited.has([r, c].join(","))) {
                    queue.push([r, c])
                    await sleep(150)

                }
            }
        }

    }


    render() {
        return (
            <div>
                <button onClick={() => this.dfs(this.props.grid,
                    this.props.startPosition[0], this.props.startPosition[1],
                    new Set(),
                    this.props.endPosition[0], this.props.endPosition[1])
                }> Run DFS</button>
                <button onClick={() => this.bfs(this.props.grid,
                    this.props.startPosition[0], this.props.startPosition[1],
                    new Set(),
                    this.props.endPosition[0], this.props.endPosition[1])
                }> Run BFS</button>

            </div>)
    }
}