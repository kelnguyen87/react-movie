import React, {Component} from 'react';

export default class CommentItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    _showMore = () => {
        this.setState({ expanded: !this.state.expanded })
    }

    _renderContent = () => {
        const content = this.props.item.content;
        const contentLenght = content.length;
        if(contentLenght > 300) {
            const contentFirst = content.substring(0,300);
            let contentLast = content.substring(301);

            return (
                <div>
                    <p>{contentFirst}</p>
                    {this.state.expanded ? (<p>{contentLast}</p>) : (<p></p>) }
                    <span className="btn-showmore" onClick={this._showMore}>
                        {this.state.expanded ? (<span>Show less</span>) : (<span>Show more</span>)}
                    </span>
                </div>
            );
        }else {
            return (
                <p>{content}</p>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="media-left response-text-left">
                    <h5>{this.props.item.author}</h5>
                </div>

              
                <div className="media-body response-text-right">
                    {this._renderContent()}
                </div>
            </div>
        );
    }
}
