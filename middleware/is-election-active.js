const Election = require("../models/election")

module.exports = (req, res, next) => {
    let electionActive = false;

    Election.findOne({where:{status:true}}).then((result)=>{
        electionActive = result ? true : false;        
        if(result){
            res.render("home/index", {
                title: "Home",
                hasError: true,
                errorMessage: "Hay una eleccion en curso no podras realizar cambios en ningunos de los mantenimientso, hasta que esta culmine.",
              });
        }

        if(!electionActive){
            next();
        }  
    }).catch((err)=>{
        console.log(err);
    });
     
  };