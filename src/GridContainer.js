import React from 'react';
import Algorithms from './Algorithms'


export default class GridContainer extends React.Component {
    state = {
        grid: [],
        visitedNumbers: new Set(),
        neighborList: [],
        editStartNode: false,
        startPosition: null,
        editEndNode: false,
        endPosition: null
    }

    componentDidMount() {
        this.createNodes()
    }

    createNodes() {
        const grid = []
        for (let row = 0; row < 10; row++) {
            const rowData = []
            for (let col = 0; col < 20; col++) {
                let tensPlace = row * 10
                const columnNumber = tensPlace + col
                rowData.push(columnNumber)
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

        if(this.state.endPosition){
            if(this.state.endPosition[0] === rowIdx && this.state.endPosition[1] === colIdx){
                return {backgroundColor: "hotpink"}
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

    editStartNode = () => {
        this.setState({
            editStartNode: true,
            editEndNode: false
        })
    }

    editEndNode = () => {
        this.setState({
            editEndNode: true,
            editStartNode: false
        })
    }

    setNode = (rowIdx, colIdx) => {
        if (this.state.editStartNode) {
            this.setState({
                startPosition: [rowIdx, colIdx]
            })
        }
        if (this.state.editEndNode) {
            this.setState({
                endPosition: [rowIdx, colIdx]
            })
        }
    }
    //the console.log on line 69 slows the function down, i need to make it wait more

    render() {
        return (
            <div>
                <div className="grid-container">
                    <button onClick={this.editStartNode}>Place Start Node</button>
                    <button onClick={this.editEndNode}> Place End Node</button>
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((col, colIdx) => {
                                    return (
                                        <div
                                            onClick={() => this.setNode(rowIdx, colIdx)}
                                            style={this.getCellStyle(rowIdx, colIdx)}
                                            className="cell"
                                            key={col}>{col}
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
                    />
                </div>
            </div>

        )
    }
}

