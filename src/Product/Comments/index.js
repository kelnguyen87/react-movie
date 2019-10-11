import React, { Component } from 'react';
import { getListComment } from '../../Services';
import CommentItem from './CommentItem';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listComment: []
        }
    }

    componentDidMount() {
        const id = this.props.id;
        this._getListComment(id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const currentId = this.props.id;
        const nextId = nextProps.id;
        const shouldQuery = currentId !== nextId;
        if(shouldQuery){
            this._getListComment(nextId);
        }
        return this.state !== nextState;
    }

    _getListComment = (movieID) => {
        const params = {
            id: movieID,
            apiName: this.props.apiName
        }
        const getMovieVideoPromise = getListComment(params);
        getMovieVideoPromise.then(
            response =>
            response.data.results.map(
                listComment => ({
                    author: `${listComment.author}`,
                    content: `${listComment.content}`
                })
            )
        ).then (
            listComment => {
                this.setState({
                    listComment: listComment
                })
            }
        )
        .catch(function (error) {
            console.log(error);
        });
    }

    _renderComentItem = () => {
        const {listComment} = this.state;
        const item = listComment.map((item, index) => {
            return (
                <div className="media response-info" key={index}>
                    <CommentItem item={item} />
                </div>
            )
        });
        return item;
    }

   
   

    _renderListCommentLayout = () => {
        const {listComment} = this.state;
        if(listComment.length > 0) {
            return (
                <div className="media-grids">
                    { this._renderComentItem() }
                </div>
            );
        }else {
            return '';
        }
    }

    render() {
        return (
            <div className="all-comments ">
                <div className="response">
                    <h4>Responses</h4>
                    {this._renderListCommentLayout()}
                </div>
               

                <div className="all-comments-info">
                    <h5>LEAVE A COMMENT</h5>
                    <div className="agile-info-wthree-box">
                        <form>
                            <div className="col-md-6 form-info">
                                <input type="text" placeholder="Name" required />
                                <input type="email" placeholder="Email" required />
                                <input type="text" placeholder="Phone" required />
                            </div>
                            <div className="col-md-6 form-info">
                                <textarea placeholder="Message" required defaultValue={""} />
                                <input type="submit" defaultValue="SEND" />
                            </div>
                            
                           
                            <div className="clearfix"> </div>
                        </form>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Comments;