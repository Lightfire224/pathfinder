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
        // let n = 0
        //outer loop, creates row list
        for (let row = 0; row < 10; row++) {
            const rowData = []
            // creates integers in row
            for (let col = 0; col < 10; col++) {
                let tensPlace = row * 10
                const columnNumber = tensPlace + col
                rowData.push(columnNumber)
            }
            //keeps count of the current tens place
            // n += 10
            grid.push(rowData)
        }
        this.setState({ grid })
    }

    updateVisited = (isVisited) => {
        this.state.visitedArr.push(isVisited)
        console.log(this.state.visitedArr)
        this.setState({
            isVisited: [...this.state.visitedArr]
        })
    }

    updateNeighbors = (neighborItems) => {
        const neighborList = []
        neighborList.push(neighborItems)
        console.log(neighborList)
        this.setState({
            neighborList
        })
    }

    //cell state, array of hashes with each cell's individual state
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


