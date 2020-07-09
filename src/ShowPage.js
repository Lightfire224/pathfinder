import React from "react";
import CommentContainer from "./CommentContainer"

export default class ShowPage extends React.Component {

    state = {
        algorithm: [],
        content: '',
        algorithm_id: 1
    }


    fetchAlgoData = () => {
        fetch(`http://localhost:3000/${this.props.location.pathname}`)
            .then(r => r.json())
            .then(algorithm => {
                this.setState({ 
                    algorithm,
                    algorithm_id: algorithm.id
                })
            })
    }

    componentDidMount() {
        this.fetchAlgoData()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.persist()
        console.log(this.state.content)

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.content,
                algorithm_id: this.state.algorithm_id
            })
        }

        fetch(`http://localhost:3000/comments`, options)
            .then(r => r.json())
            .then(comment => this.setState({comments: [...this.state.comments, comment]}))
    }

    render() {
        console.log(this.state.algorithm.id)
        return (
            <div>
                <div className="card">
                    <div className="container">
                        <h4 style={{ color: "white" }}><b>User: {this.state.algorithm.user}</b></h4>
                        <p style={{ color: "white" }}>Personal Note: {this.state.algorithm.personal_note}</p>
                        <p style={{ color: "white" }}>Title: {this.state.algorithm.title}</p>
                    </div>
                </div>

                <div className="ui segment">
                    <form className="ui form" onSubmit={this.handleSubmit} >
                        <div className="inline fields">
                            <input type="text" value={this.state.content} onChange={this.handleChange} name="content" placeholder="Content" />
                        </div>
                        <button className="ui button" type="submit">
                            Save Content
                        </button>
                    </form>
                    <CommentContainer algo={this.state.algorithm} />
                </div>
            </div>);
    }

    // onClick={this.handleSubmit}
}
