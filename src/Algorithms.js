import React from 'react'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
var Heap = require("heap")

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

    visualizeUnvisited = (visited, nodeNeighbors) => {
        // Changes the color of unvisited neighbors
        const nodeVisualize = []
        for (let i = 0; i < nodeNeighbors.length; i++) {
            const neighbor = nodeNeighbors[i]
            if (visited.has([neighbor[0], neighbor[1]].join(","))) {
                continue
            } else {
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
            this.visualizeUnvisited(visited, nodeNeighbors)
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

            this.props.isVisited(visited)
            await sleep(50)

            const nodeNeighbors = this.neighbors(grid, current[0], current[1])
            this.visualizeUnvisited(visited, nodeNeighbors)

            for (const [r, c] of nodeNeighbors) {
                if (!visited.has([r, c].join(","))) {
                    queue.push([r, c])
                    await sleep(50)
                }
            }
        }
    }

    async dijkstra(grid, row, col, visited, endRow, endCol) {
        const getKey = (coord) => {
            return coord.join(",")
        }
        const makeVertex = (coord, weight, totalWeight) => {
            return {coord, weight, totalWeight, key: getKey(coord)}
        }

        let source = {}
        let dist = {}
        let prev = {}
        source = makeVertex([row,col], 0, 0)
        dist[source.key] = 0

        let Q = new Heap(function (currentVertex, otherVertex) {
            if (currentVertex.totalWeight === otherVertex.totalWeight) {
                return 0;
            }
            return currentVertex.totalWeight < otherVertex.totalWeight ? -1 : 1;
        });

        const vertexList = []
        grid.forEach(
            (row, rowIdx) => row
                .forEach(
                    (col, colIdx) => {
                        if(source.key !== getKey([rowIdx,colIdx])){
                            vertexList.push(makeVertex([rowIdx, colIdx], 0, Infinity))
                        }
                    }
                )
        ) 
        vertexList.push(source)
        for (let i = 0; i < vertexList.length; i++) {
            let vertex = vertexList[i]
            if (vertex.coord !== source.coord) {
                const vertexKey = vertex.key
                dist[vertexKey] = Infinity
                prev[vertexKey] = undefined
            }
            Q.push(vertex)
        }
        while (!Q.empty()) {
            let currentVertex = Q.pop()
            const coord = currentVertex.coord
            const nodeNeighbors = this.neighbors(
                grid,
                coord[0], 
                coord[1]
            )
            for (const [r, c] of nodeNeighbors) {
                const currentDistance = dist[currentVertex.key] + grid[r][c].weight
                if (currentDistance < dist[getKey([r, c])]){
                    dist[getKey([r, c])] = currentDistance
                    prev[getKey([r, c])] = currentVertex
                    Q.push(makeVertex([r,c], grid[r][c].weight, currentDistance))
                }
            }
        }
        let path =[]
        let currentKey = getKey([endRow, endCol])
    
        if (prev[currentKey] !== undefined){
            while (currentKey !== undefined){
                path.unshift(currentKey)
                let prevKey = prev[currentKey]
                if (prevKey === undefined) {
                    break;
                }
                currentKey = prev[currentKey].key
            }
        }
        this.props.isVisited(path)
    }



    render() {
        return (
            <div className="Algorithm-Buttons">
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

                <button onClick={() => this.dijkstra(this.props.grid,
                    this.props.startPosition[0], this.props.startPosition[1],
                    new Set(),
                    this.props.endPosition[0], this.props.endPosition[1])
                }>Run Dijkstra's</button>

            </div>)
    }
}