import { ALPHA_ORDER, ALPHA_ORDERI, CLEAR, FILT_ADDED, FILT_GEN, GAME_DETAILS,
    GET_GENRES,GET_PAGINADO, RATING_ORDER, RATING_ORDERI, SEARCH, SET_SEARCH } from "../actions"
import paginado from "../components/paginado/paginado";

const initialState = {
    paginado:[],
    genres:[],
    searchedGames:[],
    gameDetails:{},
    search:'',
    filtred:[],
    ordered:[]
}
console.log(initialState.alphabetical);
export const rootReducer =(state=initialState,action)=>{
    console.log(state.alphabetical);
    switch(action.type){
        case GET_PAGINADO:
            return{
                ...state,
                paginado:action.payload
            }
        case CLEAR:
            return{
                ...state,
                paginado:action.payload
            }
        case SEARCH:
            state.searchedGames=[]
            return{
                ...state,
                searchedGames:action.payload
            }
        case GAME_DETAILS:
            state.gameDetails={}
            return{
                ...state,
                gameDetails:action.payload
            }
        case SET_SEARCH:
            state.search=''
            return{
                ...state,
                search:action.payload
            }
        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            }
        
        case ALPHA_ORDER:
            return{
                ...state,
                paginado:action.payload
            }
        case ALPHA_ORDERI:
            return{
                ...state,
                paginado:action.payload
            }
        case RATING_ORDER:
            return{
                ...state,
                paginado:action.payload
            }
        case RATING_ORDERI:
            return{
                ...state,
                paginado:action.payload
            }
        case FILT_ADDED:
            return {
                ...state,
                filtred:action.payload
            }
        case FILT_GEN:
            return{
                ...state,
                filtred:action.payload
            }
        

        default:
            return state;


    }
}
export default rootReducer;