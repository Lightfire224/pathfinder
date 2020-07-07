import React from 'react';
import AlgorithmCard from './AlgorithmCard.js';

export default class UserInfoContainer extends React.Component {

    state = {
        algorithm_list: []

    }
    fetchData = () => {
        fetch(`http://localhost:3000/algorithms`)
            .then(r => r.json())
            .then(algorithm_list => {
                this.setState({ algorithm_list })
            })
        }



    componentDidMount(){
        this.fetchData()
    }

    render() {
        return (
            <div className="ui grid container">
                {this.state.algorithm_list.map(algorithm => <AlgorithmCard key={algorithm.id} {...algorithm}/>)}
            </div>
        )
    }
}