const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user_id: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    profile_pic: {
        required: false,
        data: Buffer,
        contentType: String   
    },
    created_at: {
        // required: true,
        type: Date
    },
    deck_ids: {
        required: true, 
        type:[String]
    }
})

const deck = new mongoose.Schema({
    deck_id: {
        required: true,
        type: String
    },
    user_id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    created_at: {
        // required: true,
        type: Date
    },
    card_ids: {
        required: true,
        type: [String]
    }
})

const card = new mongoose.Schema({
    card_id: {
        required: true,
        type: String
    },
    deck_id: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    created_at: {
        // required: true,
        type: Date
    },
    editor_state: {
        required: true,
        type: String
    }
})

module.exports = {
    User: mongoose.model('User', user),
    Deck: mongoose.model('Deck', deck),
    Card: mongoose.model('Card', card)
  }
