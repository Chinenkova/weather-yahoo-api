import React from 'react';
import Context from './context';

export default (props) => {
    return <Context.Consumer>
            {(context) => {
                //return <div onClick={() => {context.setName('Egor')}}>Hello {context.name}</div>;
                return <div className='add'>
                <input placeholder='Add city' onChange={(event) => {context.findCity(event)}} />
                <button onClick={() => {context.addCity()}}>Add</button>
                <div className='error'></div>
                </div>;
            }}                
            </Context.Consumer>
}