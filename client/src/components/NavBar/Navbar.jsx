import './navbar.css';
import React,{useState} from 'react';
import { NavLink,useHistory,Link } from 'react-router-dom';
import { setSearch } from '../../actions';
import { connect } from 'react-redux';



export function NavBar({setSearch,search}){
    const [s,setS]=useState('');
    let history=useHistory()
    const handleChange= (e)=>{
        setSearch(e.target.value)
    }
    const handleClick=()=>{
        history.state=search
        history.push(`/search?name=${search}`)
    }
    let link;
    if(search===''){
        link='/home'
    }else{
        link=`/search?name=${search}`
    }
    
    
    console.log(history)
    return( 
        <div>
            <img className='headerimg' src='https://wallpapercave.com/wp/wp2276152.jpg'/>
            <header className="navbar">
                <nav>
                    <ul className="list">
                        <li className="list-item">
                            <NavLink className='navlink' to='/home'>HOME</NavLink>
                            {/* <NavLink className='navlink' to='/home/about'>ABOUT</NavLink> */}
                            <NavLink className='navlink' to='/home/add'>ADD</NavLink>
                            {/* <NavLink className='navlink' to='/home/us'>WHO WE ARE</NavLink> */}
                            <div>
                                <input type="text" value={search} onChange={handleChange} />
                                <a className='navlink' href={link}>search</a>                                
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}
function mapStateToProps(state){
    return {
        search:state.search
    }
};
function mapDispatchToProps(dispatch){
    return{
        setSearch:(title)=>dispatch(setSearch(title))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);