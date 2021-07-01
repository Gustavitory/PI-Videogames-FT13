import axios from 'axios';

export const SEARCH='SEARCH';
export const GAME_DETAILS='GAME_DETAILS';
export const SET_SEARCH='SET_SEARCH';
export const ADD_GAME='ADD_GAME';
export const GET_GENRES='GET_GENRES';
export const GET_PAGINADO='GET_PAGINADO';
export const ALPHA_ORDER="ALPHA_ORDER";
export const ALPHA_ORDERI="ALPHA_ORDERI";
export const RATING_ORDER="RATING_ORDER";
export const RATING_ORDERI="RATING_ORDERI";
export const FILT_ADDED='FILT_ADDED';
export const FILT_GEN='FILT_GEN';
export const CLEAR='CLEAR'
export function getPaginado(){
    return(dispatch)=>{
        return fetch('http://localhost:3001/videogames')
        .then(r=>r.json())
        .then(data=>dispatch({type:GET_PAGINADO,payload:data}))
    }
}
export function obtainSearchGame(nombre){
    return (dispatch)=>{
        return fetch(`http://localhost:3001/videogames?search=${nombre}`)
        .then(r=>r.json())
        .then(data=>dispatch({type:SEARCH,payload:data}))
    }
}
export function gameDetails(id){
    return (dispatch)=>{
        return axios(`http://localhost:3001/videogames/${id}`)
        .then(data=>dispatch({
            type:GAME_DETAILS,payload:data.data
        }))
    }
}
export function setSearch(string){
    return{
        type:SET_SEARCH,
        payload:string
    }
}
export function addGame(obj){
    return(dispatch)=>{
        axios.post('http://localhost:3001/videogames/add',obj)
        .then(r=>dispatch({type:ADD_GAME,payload:r.data}))
    }
}
export function getGenres(){
    return (dispatch)=>{
        axios.get('http://localhost:3001/genres')
        .then(r=>dispatch({type:GET_GENRES,payload:r.data}))
    }
}
export function AlphaOrder(games){
    let gamesi=games
    gamesi=gamesi.sort((a,b)=>{
        if(a.name>b.name)return 1;
        if(a.name<b.name)return -1;
        return 0
    })
    return {type:ALPHA_ORDER,payload:[...gamesi]}    
}
export function AlphaOrderI(gamesi){
    let games=gamesi.sort((a,b)=>{
        if(a.name<b.name)return 1;
        if(a.name>b.name)return -1;
        return 0
    })
    return {type:ALPHA_ORDERI,payload:[...games]}    
}
export function RatingOrder(gamesi){
    let games=gamesi.sort((a,b)=>{
        return a.id-b.id
    })
    return {type:RATING_ORDER,payload:[...games]}    
}
export function RatingOrderI(gamesi){
    let games=gamesi.sort((a,b)=>{
        return b.id-a.id
    })
    return {type:RATING_ORDERI,payload:[...games]}    
}
export function FilterAdded(gamesi){
    let games=[]
    games=gamesi.filter(g=>g.id>699999);
    return {type:FILT_ADDED,payload:[...games]}
};
export function FilterGen(genre,gamesi){
    let games=[]
    if(genre!=="Null"){
        for(let i=0;i<gamesi.length;i++){
            let comprobante=false
            gamesi[i].categories.map(cat=>{
                if (cat.name===genre) comprobante=true
            })
            if (comprobante!==false)games.push(gamesi[i]);
        }
       return {type:FILT_GEN,payload:[...games]}
    }   
}
export function clear(paginadoInicial){
    let games=paginadoInicial;
    return {type:CLEAR,payload:[...games]}
}









