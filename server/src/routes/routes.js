const express = require('express');

const router = express.Router()

module.exports = router;

const {User} = require('../models/model');
const {Deck} = require('../models/model');
const {Card} = require('../models/model');


//Post User Request
router.post('/postUser', async (req, res) => {
    const data = new User({
        user_id: req.body.user_id,
        username: req.body.username,
        email: req.body.email,
        created_at: req.body.created_at,
        deck_ids: req.body.deck_ids
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Post Deck Request
router.post('/postDeck/:user_id', async (req, res) => {
    const data = new Deck({
        deck_id: req.body.deck_id,
        user_id: req.params.user_id,
        name: req.body.name,
        description: req.body.description,
        created_at: req.body.created_at,
        card_ids: req.body.card_ids
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Post Card Request
router.post('/postCard/:deck_id', async (req, res) => {
    const data = new Card({
        card_id: req.body.card_id,
        deck_id: req.params.deck_id,
        title: req.body.title,
        description: req.body.description,
        created_at: req.body.created_at,
        editor_state: req.body.editor_state
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Users Request
router.get('/getAllUsers', async (req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get user by user_id request
router.get('/getUser/:user_id', async (req, res) => {
    try{
        const data = await User.findOne({user_id: req.params.user_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all decks by user_id request
router.get('/getAllDecks/:user_id', async (req, res) => {
    try{
        const data = await Deck.find({user_id: req.params.user_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get deck by deck_id request
router.get('/getDeck/:deck_id', async (req, res) => {
    try{
        const data = await Deck.findOne({deck_id: req.params.deck_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get all cards by deck_id request
router.get('/getAllCards/:deck_id', async (req, res) => {
    try{
        const data = await Card.find({deck_id: req.params.deck_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get card by card_id request
router.get('/getCard/:card_id', async (req, res) => {
    try{
        const data = await Card.findOne({card_id: req.params.card_id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update user by user_id request
router.patch('/updateUser/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const updatedData = req.body;

        const result = await User.findOneAndUpdate(
            user_id, updatedData
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update deck by deck_id request
router.patch('/updateDeck/:deck_id', async (req, res) => {
    try {
        const deck_id = req.params.deck_id;
        const updatedData = req.body;

        const result = await Deck.findOneAndUpdate(
            deck_id, updatedData
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update card by card_id request
router.patch('/updateCard/:card_id', async (req, res) => {
    try {
        const card_id = req.params.card_id;
        const updatedData = req.body;

        const result = await Card.findOneAndUpdate(
            card_id, updatedData
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Delete user by user_id request
router.delete('/deleteUser/:user_id', async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const data = await User.findOneAndDelete(user_id)
        res.send(`User with user_id: ${data.user_id} has been deleted...`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete deck by deck_id request
router.delete('/deleteDeck/:deck_id', async (req, res) => {
    try {
        const deck_id = req.params.deck_id;
        const data = await Deck.findOneAndDelete(deck_id)
        res.send(`Deck with deck_id: ${data.deck_id} has been deleted...`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete card by card_id request
router.delete('/deleteCard/:card_id', async (req, res) => {
    try {
        const card_id = req.params.card_id;
        const data = await Card.findOneAndDelete(card_id)
        res.send(`Card with card_id: ${data.card_id} has been deleted...`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
