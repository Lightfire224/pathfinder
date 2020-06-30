import React from 'react';
import Grid from './Grid'
import Algorithms from './Algorithms'


export default class GridContainer extends React.Component {
    state = {
        grid: [], // 2-dim array
        visitedNumbers: new Set(),
        isNeighbor: new Set(),
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

    updateVisited = async (visited) => {
        //converting visited values from [row, col] ie. [3,2]
        //to integers of 
        console.log("visitedNumber", new Set([...Array.from(visited)]), this.state.visitedNumbers)
        // this.state.visitedArr.push(isVisitedNumber)
        return new Promise((resolve) => {
            this.setState({
                //old values of my set, new value
                visitedNumbers: new Set([...Array.from(visited)]),
            }, () => resolve())
        })
    }

    // updateNeighbors = (neighborItems) => {
    //     const neighborList = []
    //     neighborList.push(neighborItems)
    //     // console.log(neighborList)
    //     this.setState({
    //         neighborList
    //     })
    // }

    // need to update is visited and check stuff for each time its sent back

    getCellStyle = (rowIdx, colIdx) => {
        const isVisited = this.state.visitedNumbers.has([rowIdx,colIdx].join(","));
        return {
            backgroundColor: isVisited ? "red" : "yellow",
        };
    }

    render() {
        return (
            <div>
                <div className="grid-container">
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div id={rowIdx} key={rowIdx}>
                                {row.map((col, colIdx) => {
                                    return <div style={this.getCellStyle(rowIdx, colIdx)} className="cell" key={col}>{col}</div>
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

