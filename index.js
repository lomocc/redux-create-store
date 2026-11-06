/**
 * Created by vincent on 2016/11/21.
 *
 * import createStore from "redux-create-store";
 * import reduxA from './reduxA';
 * import reduxB from './reduxB';
 * import reduxC from './reduxC';
 *
 * export var store = createStore({reduxA,reduxB,reduxC});
 *
 * createStore(reducer, {
 *   login() {
 *   },
 *   logout() {
 *   }
 *  });
 *
 */
var redux = require('redux');
var thunk = require('redux-thunk').default;
var assign = require('object-assign');

// import {createStore, applyMiddleware, combineReducers, bindActionCreators} from 'redux';
// import thunk from 'redux-thunk';
// import assign from 'object-assign';

module.exports = function(reducer, preloadedState, enhancer){
    if(typeof reducer == 'function'){
        return assign.apply(null, arguments);
    }else{
        var middlewares = Array.prototype.slice.call(arguments, 3);
        var store = redux.applyMiddleware.apply(null, [thunk].concat(middlewares))(redux.createStore)(redux.combineReducers(reducer), preloadedState, enhancer);
        for (var key in reducer) {
            if(reducer.hasOwnProperty(key)) {
                assign(reducer[key], redux.bindActionCreators(assign({}, reducer[key]), store.dispatch));
            }
        }
        assign(reducer, {dispatch:store.dispatch});
        return store;
    }
};
