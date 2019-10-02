import React from 'react';

export const getLayoutVote = (vote) => {

    vote = vote/2;
    let result = [];
    for (let i = 1; i <= 5; i++) {
        if(vote >= i && vote > 0) {
            result.push(<li key={i}><span><i className="fa fa-star" aria-hidden="true" /></span></li>);
        }else if((vote + 0.5) === i) {
            result.push(<li key={i}><span><i className="fa fa-star-half-o" aria-hidden="true" /></span></li>);
        }else {
            result.push(<li key={i}><span><i className="fa fa-star-o" aria-hidden="true" /></span></li>);
        }
    }
    return result;
};

export const renderLayoutDate = (date) => {

    if (date === '') {
        return '';
    }else {
        let d = new Date(date);
        let y = d.getFullYear();
        return y;
    }
    
};

export const renderNewlabel = (allItemLatest,itemcurrent) => {
    let itemNewLabel = [];
    allItemLatest.map( (result, index) => {
        if(result.id === itemcurrent) itemNewLabel.push(<div className="ribben" key={index}><p>NEW</p></div>);
        return false;
    })
    return itemNewLabel;
    
};
