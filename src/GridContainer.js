import React from 'react';
import Algorithms from './Algorithms'
import InputContainer from './InputContainer'
import UserInfoContainer from './UserInfoContainer'

export default class GridContainer extends React.Component {
    state = {
        grid: [],
        visitedNumbers: new Set(),
        neighborList: [],
        editMode: null,
        startPosition: null,
        endPosition: null,
        wallPosition: [],
        wallRefresh: null
    }

    resetGrid = () => {
        this.setState({
            visitedNumbers: new Set(),
            neighborList: [],
            editMode: null,
            startPosition: null,
            endPosition: null,
            wallPosition: [],
        })
        this.createNodes()
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
                rowData.push({ value: columnNumber, weight: 0 })
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
                return { backgroundColor: "lawngreen" }
            }
        }

        if (this.state.endPosition) {
            if (this.state.endPosition[0] === rowIdx && this.state.endPosition[1] === colIdx) {
                return { backgroundColor: "coral" }
            }
        }

        if (this.state.wallPosition) {
            for (const wall of this.state.wallPosition) {
                if (wall[0] === rowIdx && wall[1] === colIdx) {
                    return { backgroundColor: "rgba(0, 0, 0, 0.411)" }
                }
            }
        }

        const isVisited = this.state.visitedNumbers.has([rowIdx, colIdx].join(","))

        for (const neighbor of this.state.neighborList) {
            let neighborRowIdx = neighbor[0]
            let neighborColIdx = neighbor[1]
            if (neighborRowIdx === rowIdx && neighborColIdx === colIdx) {
                return { backgroundColor: "crimson" }
            }
        }

        return {
            backgroundColor: isVisited ? "DeepPink" : "gold",
            animation: isVisited ? "cellpulse 0.5s linear" : "none"
        };
    }


    //the console.log on line 69 slows the function down, i need to make it wait more

    render() {
        return (
            <div>
                <div className="grid-container">
                    <button onClick={this.resetGrid} > Reset Grid</button>
                    <button onClick={this.editStartNode}>Place Start Node</button>
                    <button onClick={this.editEndNode}> Place End Node</button>
                    <button onClick={this.editWall}> Place Wall Node</button>
                    <button onClick={this.editWeight}> Place Weight on Node</button>
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map(({ value, weight }, colIdx) => {
                                    return (
                                        <div
                                            onClick={() => this.setNode(rowIdx, colIdx)}
                                            style={this.getCellStyle(rowIdx, colIdx)}
                                            className="cell"
                                            key={value}>{this.state.grid[rowIdx][colIdx].weight}
                                        </div>)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div id="algo-input-container">
                    <Algorithms
                        grid={this.state.grid}
                        startPosition={this.state.startPosition}
                        endPosition={this.state.endPosition}
                        isVisited={this.updateVisited}
                        updateNeighbors={this.updateNeighbors}
                        wallPosition={this.state.wallPosition}
                    />
                    <InputContainer
                        reRender={this.fetchData}
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

    editWeight = () => {
        this.setState({
            editMode: 3
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
        if (this.state.editMode === 3) {
            console.log(this.state.grid[rowIdx][colIdx].weight += 10)
            this.setState({
                wallRefresh: 0
            })
        }
    }

}