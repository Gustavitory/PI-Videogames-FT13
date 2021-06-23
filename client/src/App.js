import './App.css';
import React from 'react';
import {Route} from 'react-router-dom';

import Landing from './components/LandingPage/LandingPage'
import NavBar from './components/NavBar/Navbar'
import paginado from './components/paginado/paginado'
import Details from './components/details/GameDetail'
import Search from './components/paginado/search';
import Form from './components/form/FormAdd';

function App() {
  return (
    <React.Fragment>
      <div className='app'>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={NavBar} />
        <Route path="/search" component={NavBar} />
        <Route exact path='/home' component={paginado}/>
        <Route exact path='/home/details/:id' component={Details}/>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/home/add' component={Form}/>
      </div>
      
    </React.Fragment>
  );  
}

export default App;
