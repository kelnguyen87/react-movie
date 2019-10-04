import React, {Component} from 'react';
import TabContent from '../TabMovies/TabContent';

export default class TabMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabList: this._createTabList()
        }
    }

    
    _createTabList = () => {
        let tabList = [
           
            {
                id: 'top_revenue',
                name: 'revenue',
                option: 'toprevenue'
            },
            {
                id: 'popularity',
                name: 'Popularity',
                option: 'popularity'
            },
            {
                id: 'top_rating',
                name: 'Top Rating',
                option: 'toprating'
            }
        ]
        return tabList;
    }
    
    _renderTabList = () => {
        const {tabList} = this.state;
        const itemTab = tabList.map((item, index) => {
            return (
                <li role="presentation" 
                    className={index === 0? 'resp-tab-item active' : 'resp-tab-item'}
                    key={index}>
                    <a id={item.id + '-tab'} href={'#' + item.id} role="tab" data-toggle="tab" aria-controls={item.id} aria-expanded="true">
                        {item.name}
                    </a>
                </li>
            );
        });
        return itemTab;
    }

    _renderTabContent = () => {
        const {tabList} = this.state;
        const itemContent = tabList.map((item, index) => {
            return (
                <TabContent
                    key={index}
                    index = {index}
                    item = {item}
                />
            );
        });
        return itemContent;
    }

    _renderTabLayout = () => {
        const {tabList} = this.state;
        if(tabList.length > 0) {
            return (
                <div  role="tabpanel" data-example-id="togglable-tabs">
                    <ul id="myTab" className="resp-tabs-list" role="tablist">
                        { this._renderTabList() }
                    </ul>
                    <div id="myTabContent" className="tab-content">
                        { this._renderTabContent() }
                       
                    </div>
                </div>
            );
        }
        return false;
    }

    

    render() {
        return (
            <div className="section-movies agileinfo_tabs">
                {this._renderTabLayout()}
            </div>
        );
    }
}

