import './landing.css';
import React from 'react';
import { NavLink } from 'react-router-dom';



export function Landingpage(){
    return (
        <div className='landingpage'>
            <div className='content'>
                <h1>Welcome to the GameZone</h1>
                <h2>Press START</h2>
                <img className='littleA' src='https://media.giphy.com/media/l8G8sdTRURRBANPpPR/giphy.gif'/>
                <NavLink className='link' to='/home'>S T A R T</NavLink>                
            </div>            
        </div>
    )
}
export default Landingpage;