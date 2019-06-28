// REQUIRING bcryptjs FOR PASSWORD HASHING
var bcrypt = require("bcryptjs");

// CREATING THE USER MODEL
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING        
    },
    isAdmin: {type: DataTypes.STRING}
  });
  // Creating a custom method for our User model. 
  // This will check if an unhashed password entered by the 
  // user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password

  // User.hook("beforeCreate", function(user) {
  //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // });

User.beforeCreate(user => {
   user.password = bcrypt.hashSync(
     user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};

//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working

//User.beforeCreate(user => {
  //  user.password = bcrypt.hashSync(
    //  user.password,
      //bcrypt.genSaltSync(10),
      //null
    //);
  //});