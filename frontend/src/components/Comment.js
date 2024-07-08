import { Component } from "react"
import moment from 'moment'

class Comment extends Component{

    dateTime(value) {
        return moment(value)
    }

    getClasses(comment){
        if(comment.children.length === 0){
            if(comment.parentId === null){
                return "d-flex mb-4"
            }else{
                return "d-flex mt-4"
            }
        }else{
            return "d-flex mt-4"
        }
    }

    render(){
        return (
            <>
                <div className={this.getClasses(this.props.comment)}>
                    <div className="flex-shrink-0"><img className="rounded-circle" width={50} src={this.props.comment.user.gender === 'M' ? '/male.png' : '/female.png'} alt="..." /></div>
                    <div className="ms-3">
                        <div className="fw-bold">{this.props.comment.user.firstName} {this.props.comment.user.lastName}</div>
                        <div className="text-muted fst-italic mb-2">
                            <small>{ this.dateTime(this.props.comment.created_at).fromNow() }</small>
                        </div>
                        {this.props.comment.comment}
                        {this.props.comment.children.map((children, index)=>{
                           return (<Comment key={index} comment={children} />)
                        })}
                    </div>
                </div>
            </>
        )
    }

}

export default Comment