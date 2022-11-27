const Citizen = require("../models/citizen");

exports.getIndex = (req, res, next) => {
    Citizen.findAll()
        .then((result) => {
            const citizen = result.map((result) => result.dataValues);

            res.render("citize/index", {
                pageTitle: "Citizen",
                module: "citizen",
                hasCitizen: citizen.length > 0,
                citizen: citizen,
                hasError : false,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.createCitizenPost = (req, res, next) => {

    let hasError = false;
    let errorMessage = '';

    const citizenVM = {
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        status: true,
    }

    if ((citizenVM.firstName == null || citizenVM.firstName == undefined ||
        citizenVM.firstName == '') && !hasError) {
        hasError = true;
        errorMessage = 'The first name field is required.'
    }

    if ((citizenVM.lastName == null || citizenVM.lastName == undefined ||
        citizenVM.lastName == '') && !hasError) {
        hasError = true;
        errorMessage = 'The last name field is required.'
    }

    
    if ((citizenVM.email == null || citizenVM.email == undefined ||
        citizenVM.email == '') && !hasError) {
        hasError = true;
        errorMessage = 'The email field is required.'
    }
    
    if (!hasError){
        Citizen.findAll()
            .then((result) => {
                const citizen = result.map((result) => result.dataValues);

                res.render("citize/index", {
                    pageTitle: "Citizen",
                    module: "citizen",
                    hasCitizen: citizen.length > 0,
                    citizen: citizen,
                    hasError : hasError,
                    errorMessage : errorMessage
                });
                return;
            })
            .catch((err) => {
                console.log(err);
            });
    }        

    Citizen.create(
        {
            firstName: citizenVM.firstName,
            lastName: citizenVM.lastName,
            email: citizenVM.email,
            status: citizenVM.status
        }).then((result) => {
            res.redirect("/Citizen");
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.editCitizenPost = (req, res, next) => {

    let hasError = false;
    let errorMessage ='';

    const citizenVM = {
        id: req.body.Id,
        firstName: req.body.FirstName,
        lastName: req.body.LastName,
        email: req.body.Email,
        status: req.body.Status,
    }

    if ((citizenVM.firstName == null || citizenVM.firstName == undefined ||
        citizenVM.firstName == '') && !hasError) {
        hasError = true;
        errorMessage = 'The first name field is required.'
    }

    if ((citizenVM.lastName == null || citizenVM.lastName == undefined ||
        citizenVM.lastName == '') && !hasError) {
        hasError = true;
        errorMessage = 'The last name field is required.'
    }

    
    if ((citizenVM.email == null || citizenVM.email == undefined ||
        citizenVM.email == '') && !hasError) {
        hasError = true;
        errorMessage = 'The email field is required.'
    }
    

    Citizen.findOne(
        { where: { id: citizenVM.citizenId } }
    ).then((result) => {

        const citizenRequest = result.dataValues;

        if (!citizenRequest && !hasError) {
            hasError = true;
            errorMessage = 'Citizen not found.'
        }

        if (!hasError){
            Citizen.findAll()
                .then((result) => {
                    const citizen = result.map((result) => result.dataValues);
    
                    res.render("citize/index", {
                        pageTitle: "Citizen",
                        module: "citizen",
                        hasCitizen: citizen.length > 0,
                        citizen: citizen,
                        hasError : hasError,
                        errorMessage : errorMessage
                    });
                    return;
                })
                .catch((err) => {
                    console.log(err);
                });
        }        

        Citizen.update(
            {
                id: citizenVM.id,
                firstName: citizenVM.firstName,
                lastName: citizenVM.lastName,
                email: citizenVM.email,
                status: citizenVM.status
            },
            {
                where: { id: citizenVM.id }
            }).then((result) => {
                return res.redirect("/Citizen");
            }).catch((err) => {
                console.log(err);
            });
    }).catch((err) => {
        console.log(err);
    });
};


exports.changeStatusCitizen = (req, res, next) => {
    const citizenId = req.params.idCitizen

    Citizen.findOne(
        { where: { id: citizenId } }
    ).then((result) => {
        const citizenVM = result.dataValues;

        if (!citizenVM) {
            Citizen.findAll()
                .then((result) => {
                    const citizen = result.map((result) => result.dataValues);
    
                    res.render("citize/index", {
                        pageTitle: "Citizen",
                        module: "citizen",
                        hasCitizen: citizen.length > 0,
                        citizen: citizen,
                        hasError : true,
                        errorMessage : 'Citizen not found.'
                    });
                    return;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        citizenVM.status = citizenVM.status ? false : true;
        Citizen.update(
            {
                firstName: citizenVM.firstName, lastName: citizenVM.lastName, id: citizenVM.id,
                email: citizenVM.email, status: citizenVM.status
            }, { where: { id: citizenVM.id } })
            .then((result) => {
                return res.redirect("/Citizen");
            }).catch((err) => {
                console.log(err);
            });

    }).catch((err) => {
        console.log(err);
    });
};
