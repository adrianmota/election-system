const Election = require("../models/election");
const Vote = require("../models/vote");
const Candidate = require("../models/candidate");
const Politic = require("../models/politic");
const ElectivePosition = require("../models/electivePosition");

exports.getIndex = (req, res, next) => {
  Election.findOne({ where: { status: true } })
    .then((result) => {
      const hasElectionActive = result ? true : false;

      Election.findAll()
        .then((result) => {
          const election = result.map((result) => result.dataValues);

          res.render("elections/index", {
            title: "Elections",
            module: "elections",
            election: election,
            hasElection: election.length > 0,
            hasElectionActive: hasElectionActive,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getResult = (req, res, next) => {
  const idElection = req.params.idElection;

  if (!idElection) {
    Election.findOne({ where: { status: true } })
      .then((result) => {
        const hasElectionActive = result ? true : false;

        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasElectionActive: hasElectionActive,
              hasError: true,
              errorMessage:
                "Hacen falta valores para poder buscar la eleccion.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }

  Vote.findOne({
    include: [
      { model: Candidate },
      { model: ElectivePosition },
      { model: Politic },
    ],
    where: { id: 2 },
  })
    .then((result) => {    

      if (!result) {
        Election.findAll()
          .then((result) => {
            const election = result.map((result) => result.dataValues);

            res.render("elections/index", {
              title: "Elections",
              module: "elections",
              election: election,
              hasElection: election.length > 0,
              hasError: true,
              errorMessage: "No se pudo encontrar la eleccion seleccionada.",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        Election.findOne({ where: { status: true } })
          .then((result) => {
            const hasElectionActive = result ? true : false;

            Election.findAll()
              .then((result) => {
                const election = result.map((result) => result.dataValues);

                res.render("elections/index", {
                  title: "Elections",
                  module: "elections",
                  election: election,
                  hasElection: election.length > 0,
                  hasElectionActive: hasElectionActive,
                  hasError: true,
                  errorMessage:
                    "No se pudo encontrar la eleccion seleccionada.",
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        return;
      }

      const vote = result.dataValues;
      console.log(vote.Candidate.dataValues);
      console.log(vote.ElectivePosition.dataValues);
      console.log(vote.Politic.dataValues);;

      // const electivePosition = [];

      // for(let x=1 ; x < votes.length ; x++){

      //   let existElectivePosition = electivePosition.filter(x=> x.id == votes[x].ElectivePositionId).length > 0;

      //   if(!existElectivePosition){

      //     const item = {
      //       id: votes[x].ElectivePositionId,
      //       name: votes[x].ElectivePosition.name
      //     };
      //     electivePosition.push(item);
      //   }
      // }

      res.render("elections/index", {
        title: "Elections",
        module: "elections",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// res.render("elections/index", {
//     title: "Elections",
//     module: "elections",
//     election: election,
//     vote:election.vote
//   });
