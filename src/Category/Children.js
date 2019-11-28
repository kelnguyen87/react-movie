import React, { Component } from 'react';
import {getMovieList} from '../Services';
import Breadcrumb  from '../Breadcrumb';
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

        return (

            <div className="w3_content_genre">
            <Breadcrumb name="Genres" link="/genres" subitem={this.state.itemDetail._name} />
            <div className="w3_content_agilleinfo_inner">
                <div className="agile_featured_movies">
                    <Content params={this.state.params} />
                </div>
            </div>
        </div>
        );
    }
}

export default Children;
