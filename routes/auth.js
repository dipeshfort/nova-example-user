const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const repository = require('../repository/users-repository');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const credentials = {
        email,
        passwordPlain: password,
    };

    try {
        const user = await repository.fetchByCredentials(credentials);
        res.json(user);
    } catch (err) {
        error500(err, res);
    }
});

router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const userData = {
        firstname,
        lastname,
        email,
        passwordPlain: password,
    };

    try {
        const userId = await repository.create(userData);
        const user = await repository.fetchOne(userId);
        logger.info(`Sucessfully created users for data: ${JSON.stringify({...userData, password: "****"})}`);
        res.status(201);
        res.json(user);
    } catch(err) {
        error500(err, res);
    }
});

function error500(err, res) {
    logger.error(JSON.stringify(err));
    res.status(500);
    res.json({
        code: err.code,
        message: err.message
    });
}

module.exports = router;