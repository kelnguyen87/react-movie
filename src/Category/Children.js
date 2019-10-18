import React, { Component } from 'react';
import {getMovieList} from '../Services';
import Content from './Content';

class Children extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemDetail: '',
            params: {
                apiVersion: '4',
                resource: 'list',
                id: this.props.match.params.id
            }
        };
    }

    componentDidMount() {
        this._getDetailList(this.props.match.params.id);
       
     }

    shouldComponentUpdate(nextProps, nextState) {
        const currentId = this.props.match.params.id;
        const nextId = nextProps.match.params.id;
        
       

        const shouldQuery = currentId !== nextId;
        if(shouldQuery){
            this._getDetailList(nextId);
            this.setState({
                params: {
                    apiVersion: '4',
                    resource: 'list',
                    id: nextId
                }
            });
        }
        return true;
    }

    _getDetailList = (id) => {
        let params = {
            id: id,
            apiName: 'genre'
        };
       
        const getDetailListPromise = getMovieList(params);
        getDetailListPromise
        .then(response =>
            ({
                _id: `${response.data.id}`,
                _name: `${response.data.name}`
            })
        )
        .then(itemDetail => {
            this.setState({
                itemDetail
            });
        })
       
        .catch(function(error){
            console.log(error);
        });
    }

    render() {
        console.log(this.state.params);
        return (
            
            <div className="general-agileits-w3l">
                <div className="w3l-medile-movies-grids">
                    <div className="browse-agile-w3ls general-w3ls">
                        <div className="tittle-head">
                            <h4 className="latest-text"> Movies</h4>
                            
                        </div>
                        <div className="container">
                            <Content params={this.state.params} />
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Children;