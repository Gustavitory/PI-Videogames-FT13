const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Videogame = sequelize.define('videogame', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    released:{
      type: DataTypes.TEXT
    },
    rating:{
      type:DataTypes.FLOAT
    },
    platforms:{
      type:DataTypes.TEXT,
      allowNull:false
    },
    background_image:{
      type:DataTypes.TEXT
    }
  });
};
