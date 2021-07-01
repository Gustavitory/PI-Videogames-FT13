import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {addGame,getGenres} from '../../actions/index'
import {useHistory} from 'react-router-dom'
import './form.css';

function AddAGame({addGame,getGenres,genres}) {
  useEffect(() => {
    const charge=async ()=>{
        getGenres()
    }
    charge();
  }, []);
  let history=useHistory();
  function homeButton() {
    history.push('/home')
  }
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = function (e) {
    // console.log("Entre");
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenreChange = function (e) {
    e.preventDefault();
   let ids = e.target.options;
   console.log(ids);
   if(ids) {   
     setInput({
       ...input,
           genres: function (arr) {
           let aux = [];
           for(let i = 0; i < arr.length; i++) {
               arr[i].selected && aux.push(arr[i].value)
           };
           return aux;
       } (ids)
   })} else {
       console.log('ERROR');
   } 
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    let platformArray = platForm.map((el) => {
        return (
            {
                name: el
            }
        ) 
    })
    input.platforms = platformArray;
    addGame(input);
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: []
    });
    alert('Your game has been added!!');
  };

  const [platForm, setPlatform] = useState([]);

  const handlePlatforms = function (e) {
      e.preventDefault();
      e.target.checked ? setPlatform([...platForm, e.target.value])
      : setPlatform(platForm.filter(el => el !== e.target.value))
  };
  return(
    <div className='formconteiner'>
      <img className='formimg' src='https://media.giphy.com/media/AhhGtrpj5ZxGZER5yC/giphy.gif'/>
    <form className='formulario' onSubmit={(e) => handleSubmit(e)}>
      
    <div>
      <label>Name:</label>
      <input
        className={errors.Videogame && "danger"}
        type="text"
        name="name"
        onChange={handleInputChange}
        value={input.name}
        required
      />
      {errors.name && <p className="danger">{errors.name}</p>}
      <div>
        <label>Description:</label>
        <textarea
            placeholder='Describe tu juego, es una parte importante'
          className={errors.description && "danger"}
          type="text"
          name="description"
          onChange={handleInputChange}
          value={input.description}
          required
        />
        <div>
          <label>Releasedate:</label>
          <input
            className={errors.releaseDate && "danger"}
            type="text"
            name="released"
            placeholder='DD/MM/AAAA'
            onChange={handleInputChange}
            value={input.released}
            required
          />
          <div>
            <label>Rating:</label>
            <input
              className={errors.rating && "danger"}
              type="number"
              name="rating"
              min = "0"
              max = "5"
              onChange={handleInputChange}
              value={input.rating}
              required
            />
            <div>Platforms:</div>
            <div>
              <label> PS5</label>
              <input
                type="checkbox"
                value="PS5"
                name="PS5"
                onChange={(e) => handlePlatforms(e)}
              />
              <label> Android</label>
              <input
                type="checkbox"
                value="Android"
                name="Android"
                onChange={(e) => handlePlatforms(e)}
              />
              <label>XBOX</label>
              <input
                type="checkbox"
                value="XBOX"
                name="XBOX"
                onChange={(e) => handlePlatforms(e)}
              />
              <label>PC</label>
              <input
                type="checkbox"
                value="PC"
                name="PC"
                onChange={(e) => handlePlatforms(e)}
              />
              <label>GAMEBOY</label>
              <input
                type="checkbox"
                value="Gameboy"
                name="Gameboy"
                onChange={(e) => handlePlatforms(e)}
              />
              <label>PS4</label>
              <input
                type="checkbox"
                value="PS4"
                name="PS4"
                onChange={(e) => handlePlatforms(e)}
              />
            </div>

            <span>Genre</span>
            
            <select multiple 
              className="genre"
              name="genre"
              onChange={handleGenreChange}
              required
            >
              
              {genres &&
                genres.map((g) => (
                  <option value={g.id} name="g.name">
                    {g.name}
                  </option>
                ))}
            </select>            
          </div>
          <span>Nota: Para seleccionar varios generos manten presionada la tecla "Ctrl"</span>
        </div>
      </div>
    </div>
    <button className = "btn-form" type="submit" >Create</button>
  </form>
  </div>
);
}
function mapStateToProps(state){
    return {
        genres:state.genres,
        filtred:state.filtred
    }
}
function mapDispatchToProps(dispatch) {
    return {
        addGame:(obj)=>dispatch(addGame(obj)),
        getGenres:()=>dispatch(getGenres())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddAGame);