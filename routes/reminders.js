const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const repository = require('../repository/reminders-repository');

router.get('/', async (req, res) => {
    try {
        const reminders = await repository.fetchAll();
        res.json(reminders);
    } catch (err) {
        error500(err, res);
    }
});

router.post('/', async (req, res) => {
    const reminderData = [
        req.body.title,
        req.body.comments,
        +req.body.amount,
        req.body.remindDate,
        req.body.status
    ];

    try {
        const reminderId = await repository.create(reminderData);
        const reminder = await repository.fetchOne(reminderId);
        res.status(201);
        res.json(reminder);
    } catch(err) {
        error500(err, res);
    }
});

router.delete('/:id', async (req, res) => {
    const reminderId = req.params.id;
    try {
        const affectedRows = await repository.delete(reminderId);
        res.status((affectedRows === 0)? 404: 204);
        res.json({});
    } catch(err) {
        error500(err, res);
    }
});

router.patch('/:id', async (req, res) => {
    logger.info("HERE");
    const reminderId = req.params.id;
    const data = req.body;
    
    try {
        const affectedRows = await repository.update(reminderId, data);
        if (affectedRows === 0) {
            res.status(404);
            res.json({});
        }
        
        const reminder = await repository.fetchOne(reminderId);
        res.status(200);
        res.json(reminder);
    } catch(err) {
        error500(err, res);
    }
});

function error500(err, res) {
    logger.error(err);
    res.status(500);
    res.json({
        code: 'SERVER_ERROR',
        message: 'Technical error'
    });
}

module.exports = router;