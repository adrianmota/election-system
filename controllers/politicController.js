const Politic = require('../models/politic');

exports.getIndex = (req, res, next) => {
    Politic.findAll()
        .then(result => {
            const politics = result.map(result => result.dataValues);
            res.render('politic/index', {
                title: 'Partidos',
                politics,
                hasPolitics: politics.length > 0
            });
        }).catch(err => console.error(err));
}

exports.postCreatePolitic = (req, res, next) => {
    let hasError = false;
    let errorMessage = '';

    const { name, description } = req.body;
    const politic = { name, description, logoImg: '' };
    const imageFile = req.file;

    if (!name || !description || !imageFile) {
        hasError = true;
        errorMessage = 'You must fill all the fields before sending the information';
    }

    if (hasError) {
        Politic.findAll()
            .then(result => {
                const politics = result.map(result => result.dataValues);
                res.render('admin/index', {
                    title: 'Partidos',
                    politics,
                    hasError,
                    errorMessage
                });
            }).catch(err => console.error(err));
        return;
    }

    politic.logoImg = imageFile.path;
    Politic.create(politic)
        .then(result => {
            console.log(result);
            res.status(302).redirect('/politics');
        })
        .catch(err => console.error(err));
}

exports.postEditPolitic = (req, res, next) => {
    let hasError = false;
    let errorMessage = '';

    const { id, name, description } = req.body;
    const politic = { id, name, description, logoImg: '' };
    const imageFile = req.file;

    if (!name || !description) {
        hasError = true;
        errorMessage = 'You must fill all the fields before sending the information';
    }

    if (hasError) {
        Politic.findAll()
            .then(result => {
                const politics = result.map(result => result.dataValues);
                res.render('admin/index', {
                    title: 'Partidos',
                    politics,
                    hasError,
                    errorMessage
                });
            }).catch(err => console.error(err));
        return;
    }

    Politic.findOne({ where: { id } })
        .then(result => {
            const oldPolitic = result.dataValues;
            politic.logoImg = !imageFile ? oldPolitic.logoImg : imageFile.path;
            Politic.update({
                name: politic.name,
                description: politic.description,
                logoImg: politic.logoImg
            }, { where: { id } })
                .then(result => res.redirect('/politics'))
                .catch(err => console.error(err));
        }).catch(err => console.error(err));
}

exports.postDeletePolitic = (req, res, next) => {
    const { id } = req.body;

    Politic.findOne({ where: { id } })
        .then(result => {
            const politic = result.dataValues;
            politic.status = false;
            Politic.update({
                name: politic.name,
                description: politic.description,
                logoImg: politic.logoImg,
                status: politic.status
            }, { where: { id } })
                .then(result => res.status(302).redirect('/politics'))
                .catch(err => console.error(err));
        }).catch(err => console.error(err));
}