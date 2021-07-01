import React,{useState, useEffect} from 'react'
import './paginado.css';
import Games from './games';
import {connect} from 'react-redux'
import { getPaginado,FilterAdded,FilterGen,AlphaOrder,AlphaOrderI,RatingOrder,RatingOrderI} from '../../actions'; 


export function Paginado({getPaginado,paginado,FilterAdded,FilterGen,AlphaOrder,AlphaOrderI,
RatingOrder,RatingOrderI,filtred}){
    const [loading, setLoading]= useState(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [gamesPerPage,setPostPerPage]=useState(6);
    const [genres,setGrenres]=useState({value:"null"})

    useEffect(()=>{
        getPaginado();
    },[])
    var initial=paginado;
    console.log(initial);
    function change(e){
            setGrenres({value:e.target.value});
            FilterGen(e.target.value,paginado);      
    }

    const indexOfLastGame=currentPage*gamesPerPage;
    const indexOfFirstGame=indexOfLastGame-gamesPerPage;
    let currentGames=[];
    let PagesNumber=1;
    if(genres.value==="null"){
        currentGames=paginado.slice(indexOfFirstGame,indexOfLastGame);
        PagesNumber=Math.ceil(paginado.length/gamesPerPage);
    }else{        
        currentGames=filtred.slice(indexOfFirstGame,indexOfLastGame);
        PagesNumber=Math.ceil(filtred.length/gamesPerPage);
    }
    const nextPage= ()=>{
        if(currentPage<PagesNumber){
            setCurrentPage(currentPage+1);
        }else setCurrentPage(1);         
    }
    const prevPage=()=>{
        if(currentPage!==1){
            setCurrentPage(currentPage-1);
        }else setCurrentPage(PagesNumber);             
    }

        return (
            <div className='paginado'>
                <div className='orderfilter'>
                    <div className='order'>
                    <span>Order By:{' '}</span>                    
                    <button className='button' onClick={()=>{setGrenres({value:'null'});AlphaOrder(paginado)}}>A-Z</button>  
                    <button className='button' onClick={()=>{AlphaOrderI(paginado);setGrenres({value:'null'})}}>Z-A</button> 
                    <button className='button' onClick={()=>{RatingOrder(paginado);setGrenres({value:'null'})}}>Rating Top</button> 
                    <button className='button' onClick={()=>{RatingOrderI(paginado);setGrenres({value:'null'})}}>Rating Bot</button>  
                </div>
                <div className='filter'>
                    <span>Filter By:{' '}</span>
                    <button className='button' onClick={()=>{FilterAdded(paginado);;setGrenres({value:'my games'})}}>Added</button>
                    
                    <select className='select' onChange={change} value={genres.value}>
                        <option value="null">Null</option>
                        <option value="Action">Action</option>
                        <option value="Indie">Indie</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Casual">Casual</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Racing">Racing</option>
                        <option value="Massively Multiplayer">Massively Multiplayer</option>
                        <option value="Sports">Sports</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Family">Family</option>
                        <option value="Board Games">Board Games</option>
                        <option value="Educational">Educational</option>
                        <option value="Card">Card</option>
                    </select>
                </div>
                <div className='clear'>
                    <button className='button' onClick={()=>getPaginado()}>Clear</button>
                </div>
                </div>                    
                <Games games={currentGames} loading={loading} next={nextPage} prev={prevPage}/>
            </div>
    )    
    
}
const mapStateToProps=(state)=>{
    return {
        paginado:state.paginado,
        filtred:state.filtred,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getPaginado:()=>dispatch(getPaginado()),
        AlphaOrder:(gamesi)=>dispatch(AlphaOrder(gamesi)),
        AlphaOrderI:(gamesi)=>dispatch(AlphaOrderI(gamesi)),
        RatingOrder:(gamesi)=>dispatch(RatingOrder(gamesi)),
        RatingOrderI:(gamesi)=>dispatch(RatingOrderI(gamesi)),
        FilterAdded:(gamesi)=>dispatch(FilterAdded(gamesi)),
        FilterGen:(genre,gamesi)=>dispatch(FilterGen(genre,gamesi)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginado);