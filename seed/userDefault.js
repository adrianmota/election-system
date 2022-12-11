const user = require("../models/user");
const bcrypt = require("bcryptjs");

const admin = {
    firstname: "System",
    lastname:"Election",
    email:"franklynbrea100@gmail.com",
    username: "Admin",
    password: "1234",
    state:true
}

exports.createUser = () => {
  user
    .findOne({ where: { username: "admin" } })
    .then((result) => {
        if(result){
            return;
        }

        bcrypt
        .hash(admin.password, 12)
        .then((hashedPassword) => {
            admin.password = hashedPassword;
            user.create(admin).then((result)=>{}).catch((err)=>{
                console.log(err);
            })
        })
        .catch((err) => {
          console.log(err);
        });       
    })
    .catch((err) => {
        console.log(err);
    });
};
