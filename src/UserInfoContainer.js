import React from 'react';
import AlgorithmCard from './AlgorithmCard.js';
import { Redirect } from "react-router-dom";

export default class UserInfoContainer extends React.Component {

    state = {
        algorithm_list: [],
        toggle: false,
        id: null
    }
    fetchData = () => {
        fetch(`http://localhost:3000/algorithms`)
            .then(r => r.json())
            .then(algorithm_list => {
                this.setState({ algorithm_list })
            })
    }

    handleRedirect = (id) => {
        if (this.state.toggle === true) {
            return <Redirect to={`/algorithms/${this.state.id}`}/>
        }
    }

    toggleRedirect = (id) => {
        this.setState({toggle: true, id })
    }



    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <div className="ui grid container">   
                {this.handleRedirect()}
                {this.state.algorithm_list.map(algorithm => <AlgorithmCard toggleRedirect={this.toggleRedirect} key={algorithm.id} {...algorithm} />)}
            </div>
        )
    }
}