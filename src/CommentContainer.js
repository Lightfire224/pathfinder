import React from "react";
import Comments from "./Comments"

export default class ShowPage extends React.Component {

    render() {
        if(!this.props.algo.comments) return <div>loading</div>
        return (
            <div>
                    {this.props.algo.comments.map(comment => <Comments key={comment.id} {...comment}/>)}
            </div>);
    }

}
