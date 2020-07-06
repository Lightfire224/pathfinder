import React from 'react';

export default class InputContainer extends React.Component {

    state = {
        user: '',
        title: '',
        personal_note: '',
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        event.persist()

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch(`http://localhost:3000/algorithms`, options)
            .then(r => r.json())
            .then(console.log)
    }

    render() {
        return (
            <div>
                <div className="ui segment">
                    <form className="ui form" >
                        <div className="inline fields">
                            <input type="text" value={this.state.user} onChange={this.handleChange} name="user" placeholder="User"/>
                            <input type="text" value={this.state.title} onChange={this.handleChange} name="title" placeholder="Title" />
                            <input type="text" value={this.state.personal_note} onChange={this.handleChange} name="personal_note" placeholder="Personal Note" />
                        </div>
                        <button className="ui button" onClick={this.handleSubmit} type="submit">
                            Save Algo
            </button>
                    </form>
                </div>
            </div>
        )
    }
}