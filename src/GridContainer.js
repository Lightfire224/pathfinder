import React from 'react';
import Grid from './Grid'
import Algorithms from './Algorithms'
// cellStatus: [
//     isVisited: null,
//     isNeighbor: null
// ]
export default class GridContainer extends React.Component {
    state = {
        grid: [], // 2-dim array
        isVisitedValue: [],
        isNeighbor: [],
        visitedArr: []
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
                rowData.push(columnNumber)
            }
            grid.push(rowData)
        }
        this.setState({ grid })
    }

    updateVisited = (isVisitedArr) => {
        //converting visited values from [row, col] ie. [3,2]
        //to integers of 
        const isVisitedNumber = parseInt(isVisitedArr.toString().split(",").join(""),10)
        this.state.visitedArr.push(isVisitedNumber)
        this.setState({
            isVisited: [...this.state.visitedArr]
        })
    }

    updateNeighbors = (neighborItems) => {
        const neighborList = []
        neighborList.push(neighborItems)
        // console.log(neighborList)
        this.setState({
            neighborList
        })
    }

    generateCells = (col, comparisonIdx) => {
        // console.log("col:", col, "comparisonIdx", comparisonIdx)
        if (this.state.visitedArr) {
            if (this.state.visitedArr.includes(col)) {
console.log(col)
            }

            // const isVisitedComparisonVersion = this.state.isVisited.forEach(number => number)
            // console.log(isVisitedComparisonVersion)
        }

        return <div className="cell" id={col} key={col}>{col}</div>

        // if (this.state.isVisitedValue.includes(col)
        // return <div className="cell" id={col} key={col}>{col}</div>
    }
    // console.log("idx", rowIdx*10+idx)
    // console.log("value", col)
    // console.log(rowIdx)
    render() {
        return (
            <div>
                <div className="grid-container">
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div id={rowIdx} key={rowIdx}>
                                {row.map((col, idx) => {
                                    let comparisonIdx = rowIdx * 10 + idx
                                    return this.generateCells(col, comparisonIdx)
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Algorithms
                        grid={this.state.grid}
                        isVisited={this.updateVisited}
                        updateNeighbors={this.updateNeighbors}
                    />
                </div>
            </div>

        )
    }
}


/*
    render() {
        return (
            <div>
                <div className="grid-container">
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div id={rowIdx} key={rowIdx}>
                                {row.map((col) => {
                                    return <div className="cell" id={col} key={col}>{col}</div>
                                })}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Algorithms
                        grid={this.state.grid}
                        isVisited={this.updateVisited}
                        updateNeighbors={this.updateNeighbors}
                    />
                </div>
            </div>

        )
    }
}

*/