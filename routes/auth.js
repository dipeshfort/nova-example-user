const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const repository = require('../repository/users-repository');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const credentials = {
        email,
        passwordPlain: password,
    };

    try {
        const user = await repository.fetchByCredentials(credentials);
        const token = jwt.sign({
            user
        }, process.env.JWT_SECRET, {
            algorithm: process.env.JWT_ALG,
            issuer: 'nova-auth',
            expiresIn: +process.env.JWT_EXPIRY
        });
        res.json({
            token
        });
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
        role: 'USER',
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

router.get('/profile', async (req, res) => {
    const authorization = req.header('authorization');

    if (!authorization) {
        res.status(401);
        return res.json({
            message: 'Unauthorized'
        });
    }

    const token = authorization.replace(/Bearer\s/, '');
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        res.json(data.user);
    } catch(err) {
        res.status(401);
        if (err.name && err.name === "TokenExpiredError") {
            res.json({
                message: 'Token Expired'
            });
        } else {
            res.json({
                message: 'Verification failed'
            });
        }
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