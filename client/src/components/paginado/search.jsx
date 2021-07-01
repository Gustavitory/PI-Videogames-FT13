import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import {obtainSearchGame} from '../../actions';
import {useLocation} from 'react-router-dom';
import './search.css'


const Search= ({obtainSearchGame,searchedGames})=>{
    const search=useLocation().search;
    const name=new URLSearchParams(search).get('name')
    useEffect(()=>{
        obtainSearchGame(name)       
    },[]) 
    console.log(name)   
    console.log(searchedGames);
    if(searchedGames.length!==0){
        return(
            <div className='searcheds'>
            <ul className='lista'>
                
                {searchedGames.map(game=>{
                    var url=`/home/details/${game.id}`
                    return (
                    <a href={url} className='tarjeta' key={game.id}>
                        <li className='item' key={game.id}>
                            <img className='game_img' src={game.background_image}/>
                            <h3>{game.name}</h3>
                            <h5>Categories:</h5>
                            {game.genres.map(genre=>(
                                <li>{genre.name}</li>
                            ))}
                        </li>
                    </a>
                )})}
            </ul>
        </div>
        )
    }
    return (
        <h2>Game not found :(</h2>
    )
}

function mapStateToProps(state){
    return{
        searchedGames:state.searchedGames,
        search:state.search
    }
}

function mapDispatchToProps(dispatch){
    return {
        obtainSearchGame: (name)=>dispatch(obtainSearchGame(name)),
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Search);