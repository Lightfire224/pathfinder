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
        for (let i = 0; i < this.props.wallPosition.length; i++) {
            const wall = this.props.wallPosition[i]
            if (neighbor[0] === wall[0] && neighbor[1] === wall[1]) {
                return false
            }
        }
        return true
    }

    checkVisited = (visited, nodeNeighbors) => {
        const nodeVisualize = []
        for(let i=0; i<nodeNeighbors.length; i++){
            const neighbor = nodeNeighbors[i]
            if(visited.has([neighbor[0], neighbor[1]].join(","))){
                continue
            } else{
                nodeVisualize.push(neighbor)
            }
        }
        this.props.updateNeighbors(nodeVisualize)
    }

    async dfs(grid, row, col, visited, endRow, endCol) {
        let stack = [[row, col]]
        visited.add([row, col].join(","))
        this.props.isVisited(visited)

        while (stack.length > 0) {
            if (visited.has([endRow, endCol].join(","))) {
                return -1
            }
            let curr = stack.pop()
            visited.add([curr[0], curr[1]].join(","))
            this.props.isVisited(visited)
            await sleep(150)
            const nodeNeighbors = this.neighbors(grid, curr[0], curr[1])
            await sleep(150)
            this.props.updateNeighbors(nodeNeighbors)
            for (const node of nodeNeighbors) {
                if (!(visited.has([node[0], node[1]].join(",")))) {
                    stack.push([node[0], node[1]])
                }
            }
        }
        return visited
    }

    async bfs(grid, row, col, visited, endRow, endCol) {
        const queue = [[row, col]]
        while (queue.length > 0) {
            const current = queue.shift()
            if (visited.has([endRow, endCol].join(","))) {
                return -1
            }
            visited.add([current[0], current[1]].join(","))
            await sleep(50)
            this.props.isVisited(visited)
            const nodeNeighbors = this.neighbors(grid, current[0], current[1])
            this.checkVisited(visited, nodeNeighbors)
            for (const [r, c] of nodeNeighbors) {
                if (!visited.has([r, c].join(","))) {
                    queue.push([r, c])
                    await sleep(50)
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