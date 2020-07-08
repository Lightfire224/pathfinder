import React from "react";

export default class ShowPage extends React.Component {

    state = {
        algorithm: [],
        content: '',
        commentData: []
    }
    fetchAlgoData = () => {
        fetch(`http://localhost:3000/${this.props.location.pathname}`)
            .then(r => r.json())
            .then(algorithm => {
                this.setState({ algorithm })
            })
    }

    fetchCommentData = () => {
        fetch(`http://localhost:3000/comments/2`)
        .then(r => r.json())
        .then(commentData => {
            this.setState({ commentData })
        })
    }

    componentDidMount() {
        this.fetchAlgoData()
        this.fetchCommentData()
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
            .then(console.log)
    }

    render() {
        console.log(this.state.commentData)
        return (
            <div>
                <div className="card">
                    <div className="container">
                        <h4 style={{color: "white"}}><b>User: {this.state.algorithm.user}</b></h4>
                        <p style={{color: "white"}}>Personal Note: {this.state.algorithm.personal_note}</p>
                        <p style={{color: "white"}}>Title: {this.state.algorithm.title}</p>
                    </div>
                </div>

                <div className="ui segment">
                    <form className="ui form" onSubmit={this.handleSubmit} >
                        <div className="inline fields">
                            <input type="text" value={this.state.content} onChange={this.handleChange} name="content" placeholder="Content" />
                        </div>
                        <button className="ui button"  type="submit">
                            Save Content
                        </button>
                    </form>
        <p style={{color: "white"}}>Comment: {this.state.commentData.content}</p>

                </div>


            </div>);
    }

    // onClick={this.handleSubmit}
}
