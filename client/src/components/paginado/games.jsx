import React from 'react';
import './games.css'



const Games=({games,loading,next,prev})=>{
    if(loading){
        return <img src='https://media.giphy.com/media/WiIuC6fAOoXD2/giphy.gif'/>
    }
    console.log (games)
    return (
        <div className='gamesConteiner'>
            <div className='buttons'>                
                <button className='pagcontrol1' onClick={prev}>{'<< '}Prev Page</button>
                <button className='pagcontrol2' onClick={next}>Next Page{' >>'} </button>
            </div>       
            <ul className='lista'>
            {games.map(game=>{
                let url=`/home/details/${game.id}`
                return (
                <a className='tarjeta' href={url}>
                <li className='item' key={game.id}>
                    <img className='game_img' src={game.background_image}/>
                    <h3>{game.name}</h3>
                    <h5>Categories:</h5>
                    {game.categories.map(genre=>(
                        <li>{genre.name}</li>
                    ))}
                </li>
                </a>
            )})} 
            </ul>
            
        </div> 
        )
}
export default Games;   