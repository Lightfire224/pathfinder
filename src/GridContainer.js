import React from 'react';
import Algorithms from './Algorithms'

// const START_EDIT_MODE = 0
// const END_EDIT_MODE = 1
// const WALL_EDIT_MODE = 2

export default class GridContainer extends React.Component {
    state = {
        grid: [],
        visitedNumbers: new Set(),
        neighborList: [],
        editMode: null,
        startPosition: null,
        endPosition: null,
        wallPosition: [],
    }

    componentDidMount() {
        this.createNodes()
    }

    createNodes() {
        const grid = []
        for (let row = 0; row < 10; row++) {
            const rowData = []
            for (let col = 0; col < 10; col++) {
                let tensPlace = row * 10
                const columnNumber = tensPlace + col
                rowData.push([{ value: columnNumber, weight: 0 }])
            }
            grid.push(rowData)
        }
        this.setState({ grid })
    }


    updateVisited = (visited) => {
        this.setState({
            visitedNumbers: new Set([...Array.from(visited)]),
        })
    }


    updateNeighbors = (neighbors) => {
        this.setState({
            neighborList: [...neighbors, neighbors]
        })
    }


    getCellStyle = (rowIdx, colIdx) => {
        if (this.state.startPosition) {
            if (this.state.startPosition[0] === rowIdx && this.state.startPosition[1] === colIdx) {
                return { backgroundColor: "blue" }
            }
        }

        if (this.state.endPosition) {
            if (this.state.endPosition[0] === rowIdx && this.state.endPosition[1] === colIdx) {
                return { backgroundColor: "hotpink" }
            }
        }

        if (this.state.wallPosition) {
            for (const wall of this.state.wallPosition) {
                if (wall[0] === rowIdx && wall[1] === colIdx) {
                    return { backgroundColor: "black" }
                }
            }
        }

        const isVisited = this.state.visitedNumbers.has([rowIdx, colIdx].join(","))

        for (const neighbor of this.state.neighborList) {
            let neighborRowIdx = neighbor[0]
            let neighborColIdx = neighbor[1]
            if (neighborRowIdx === rowIdx && neighborColIdx === colIdx) {
                return { backgroundColor: "green" }
            }
        }

        return {
            backgroundColor: isVisited ? "red" : "yellow",
        };
    }


    //the console.log on line 69 slows the function down, i need to make it wait more

    render() {
        console.log(this.state.grid[0])
        return (
            <div>
                <div className="grid-container">
                    <button onClick={this.editStartNode}>Place Start Node</button>
                    <button onClick={this.editEndNode}> Place End Node</button>
                    <button onClick={this.editWall}> Place Wall Node</button>
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((col, colIdx) => {
                                    return (
                                        <div
                                            onClick={() => this.setNode(rowIdx, colIdx)}
                                            style={this.getCellStyle(rowIdx, colIdx)}
                                            className="cell"
                                            key={col}>{col.value}
                                        </div>)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Algorithms
                        grid={this.state.grid}
                        startPosition={this.state.startPosition}
                        endPosition={this.state.endPosition}
                        isVisited={this.updateVisited}
                        updateNeighbors={this.updateNeighbors}
                        wallPosition={this.state.wallPosition}
                    />
                </div>
            </div>

        )
    }

    editStartNode = () => {
        this.setState({
            editMode: 0,
        })
    }

    editEndNode = () => {
        this.setState({
            editMode: 1,
        })
    }

    editWall = () => {
        this.setState({
            editMode: 2,
        })
    }

    setNode = (rowIdx, colIdx) => {
        if (this.state.editMode === 0) {
            this.setState({
                startPosition: [rowIdx, colIdx]
            })
        }
        if (this.state.editMode === 1) {
            this.setState({
                endPosition: [rowIdx, colIdx]
            })
        }
        if (this.state.editMode === 2) {
            this.setState({
                wallPosition: [...this.state.wallPosition, [rowIdx, colIdx]]
            })
        }
    }

}