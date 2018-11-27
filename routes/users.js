const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const repository = require('../repository/users-repository');
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    const authorization = req.header('authorization');
    if (!authorization) {
        res.status(403);
        return res.json({
            message: 'Requires authentication'
        });
    }
    const token = authorization.replace(/Bearer\s/, '');
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        if (data.user.role === 'ADMIN') {
            next();
        } else {
            res.status(403);
            res.json({
                message: 'Forbidden'
            });
        }
    } catch (err) {
        res.status(403);
        res.json({
            message: 'User verification failed'
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await repository.fetchAll();
        res.json(users);
    } catch(err) {
        error500(err, res);
    }
});

router.post('/', async (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;

    const userData = {
        firstname,
        lastname,
        email,
        role,
        passwordPlain: password,
    };

    try {
        const userId = await repository.create(userData);
        const user = await repository.fetchOne(userId);
        logger.info(`Sucessfully created users for data: ${JSON.stringify({ ...userData, password: "****" })}`);
        res.status(201);
        res.json(user);
    } catch (err) {
        error500(err, res);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await repository.delete(id);
        res.status((affectedRows === 0)? 404: 204);
        res.json({});
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