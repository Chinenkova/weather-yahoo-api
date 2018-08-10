import React from 'react';
import Context from './context';

export default (props) => {
    return <Context.Consumer>
            {(context) => {
                return <div onClick={() => {context.setName('Egor')}}>Hello {context.name}</div>;
            }}                
            </Context.Consumer>
}