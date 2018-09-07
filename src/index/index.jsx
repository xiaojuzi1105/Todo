import React from 'react';

import ReactDOM from 'react-dom';

import { createStore, combineReducers, bindActionCreators  } from 'redux';

import { Provider, connect } from 'react-redux';



/*
    酒店预订
*/

// action

function changeText(){
    return {
        type:'CHANGE_TEXT'
    }
}

function buttonClick(){
    return {
        type:'BUTTON_CLICK'
    }
}