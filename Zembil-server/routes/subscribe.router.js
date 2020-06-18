const express = require('express');
const router = express.Router();

const Subscribe = require('../models/subscribe.model')

router.post('/', async (req, res) => {
    //console.log(req.body);
    const subscribe = new Subscribe({
        email: req.body.email,
        subscriptionType: req.body.subscriptionType
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({
            message: err
        })
    };
});

router.get('/:subscriptionId', async (req, res) => {
    //console.log(req.params.postId);
    try {
        const subscription = await Subscribe.findById(req.params.subscriptionId);
        res.json(subscription);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.delete('/:subscriptionId', async (req, res) => {
    try {
        const removedSubscription = await Subscribe.remove({
            _id: req.params.subscriptionId
        });
        res.json(removedSubscription);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

module.exports = router;