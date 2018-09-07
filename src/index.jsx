import React from 'react';

import ReactDOM from 'react-dom';

import { createStore, combineReducers, bindActionCreators  } from 'redux';

import { Provider, connect } from 'react-redux';

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

// reducer
const initialState = {
    text: 'Hello',
    btnText: 'change'
}

function myApp(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text: state.text == 'Hello' ? 'Stark' : 'Hello',
                btnText: 'change TEXT'
            }
        case 'BUTTON_CLICK':
            return {
                text: 'You just click button',
                btnText: 'change BUTTON'
            }
        default:
          return {
            text:'Hello',
            btnText: 'change'
        };
    }
}

// store
let store = createStore(myApp);

class Hello extends React.Component{
    constructor(props) {
        
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        
        this.props.actions.changeText();

    }

    render() {

        return (
            <h1 onClick={this.handleClick}> {this.props.text} </h1>
        )

    }
}

class Change extends React.Component{

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(){

        this.props.actions.buttonClick();

    }

    render() {
        return (
            <button onClick={this.handleClick} >{this.props.text}</button>
        );
    }
}

class App extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        
        const { actions, text, btnText} = this.props;
        
        console.log(btnText)

        return (
            <div>
                <Hello actions={actions} text={text}/>
                <Change actions={actions} text={btnText}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
  return { 
      text: state.text,
      btnText: state.btnText
    }
}

function mapDispatchToProps(dispatch){

    console.log(dispatch);

    return{
        actions : bindActionCreators(
            {
                changeText:changeText,
                buttonClick:buttonClick
            },
            dispatch
        )
    }
}

App = connect(mapStateToProps,mapDispatchToProps)(App)

console.log(App);

console.log(store);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
