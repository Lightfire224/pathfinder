import React from 'react';
import Algorithms from './Algorithms'


export default class GridContainer extends React.Component {
    state = {
        grid: [], 
        visitedNumbers: new Set(),
        neighborList: [],
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

    updateVisited = (visited) => {
        console.log(new Set([...Array.from(visited)]), this.state.visitedNumbers)
            this.setState({
                visitedNumbers: new Set([...Array.from(visited)]), 
            })

    }
    

    updateNeighbors = (neighbors) => {
        this.setState({
            neighborList: [...neighbors, neighbors]
        })
        // this.setState({
        //     newNeighbor: new Set([...Array.from(neighbors)])
        // })
    }


    getCellStyle = (rowIdx, colIdx) => {
        const isVisited = this.state.visitedNumbers.has([rowIdx,colIdx].join(","))

        for (const neighbor of this.state.neighborList){
            console.log(neighbor[0], neighbor[1])
            let neighborRowIdx = neighbor[0]
            let neighborColIdx = neighbor[1]
            if (neighborRowIdx===rowIdx && neighborColIdx===colIdx){
                return {backgroundColor: "green"}
            }
        }

        return {
            backgroundColor: isVisited ? "red" : "yellow",
        };
    }

    //the console.log on line 69 slows the function down, i need to make it wait more

    render() {
        console.log("new neighbor", this.state.newNeighbor)
        return (
            <div>
                <div className="grid-container">
                    {this.state.grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
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

