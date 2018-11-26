const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const repository = require('../repository/users-repository');


router.get('/', async (req, res) => {
    try {
        const users = await repository.fetchAll();
        res.json(users);
    } catch(err) {
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