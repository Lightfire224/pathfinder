import React from 'react';

export default class GridContainer extends React.Component {
    state = {
        gridNodes: []
    }

    componentDidMount() {
        this.createNodes()
    }

    createNodes() {
        let gridNodes = []
        for (let row = 0; row < 10; row++) {
            for (let column = 0; column < 10; column++)
                gridNodes.push([row,column])
        }
        this.setState({ gridNodes })
    }



    render() {
        return (
            <div className="main-container">
            </div>
        )
    }
}


