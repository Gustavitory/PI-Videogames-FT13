const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull:true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false
    },
    premiere:{
      type: DataTypes.STRING
    },
    rating:{
      type:DataTypes.FLOAT
    },
    platforms:{
      type:DataTypes.JSON,
      allowNull:false
    }
  });
};
