import React from "react";

export default class ShowPage extends React.Component{
    
    state = {
        algorithm: [],
        comment: ''
    }
    fetchData = () => {
        fetch(`http://localhost:3000/${this.props.location.pathname}`)
            .then(r => r.json())
            .then(algorithm => {
                this.setState({ algorithm })
            })
    }

    componentDidMount(){
        this.fetchData()
    }
    render(){
    return (
        <div>
        <div class="card">
        <div class="container">
        <h4><b>{this.state.algorithm.user}</b></h4>
        <p>{this.state.algorithm.personal_note}</p>
        <p>{this.state.algorithm.title}</p>
        <button onClick={() => this.props.toggleRedirect(this.props.id)}>Show Page</button>
        </div>
        </div>

                <div className="ui segment">
                    <form className="ui form" >
                        <div className="inline fields">
                            <input type="text" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Comment" />
                        </div>
                        <button className="ui button" onClick={this.handleSubmit} type="submit">
                            Save Algo
            </button>
                    </form>
                </div>
        
        
        </div>);
}
}
