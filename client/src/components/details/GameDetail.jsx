import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {gameDetails} from '../../actions/index';

import './detail.css';


const Details=({match,game,gameDetails})=>{
    useEffect(()=>{
        gameDetails(match.params.id)
    },[]);

    return(
        <div className='detailsCont'>
            <div className='back'>
                <img className='imgdetails' src={game.background_image}/>
                <h2>{game.name}</h2>
                <h5>Released: {game.released}</h5>
                <h5>Rating: {game.rating}</h5>
                {/* <h5>Genres:</h5> */}
                {/* {genres.map(genre=><li>{genre.name}</li>)} */}
                <h5>Description:</h5>
                <p> {game.description}</p>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return{
        game:state.gameDetails
    }
}
function mapDispatchToProps(dispatch){
    return {
        gameDetails: (id)=>dispatch(gameDetails(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Details);







