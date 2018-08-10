import React from 'react';
import Context from './context';

export default (props) => {
    return <Context.Consumer>
            {(context) => {
                //return <div onClick={() => {context.setName('Egor')}}>Hello {context.name}</div>;
                return <div className='list'>
                {context.cities.map((city, index) => 
                <div className='city'>
                <div>{city.name}</div>
                <div>{city.temperature}</div>
                <div>{city.text}</div>
                <div className='delete' onClick={(index) => {context.deleteCity(index)}}>x</div>
                </div>
                )}
                </div>;
            }}                
            </Context.Consumer>
}