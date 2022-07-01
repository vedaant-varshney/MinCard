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
        required: true,
        type: Date
    },
    deck_ids: {
        required: true, 
        type:[Number]
    }
})

const deck = new mongoose.Schema({
    deck_id: {
        required: true,
        type: Number
    },
    user_id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    created_at: {
        required: true,
        type: Date
    },
    card_ids: {
        required: true,
        type: [Number]
    }
})

const card = new mongoose.Schema({
    card_id: {
        required: true,
        type: Number
    },
    deck_id: {
        required: true,
        type: Number
    },
    user_id: {
        required: true,
        type: Number
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
        required: true,
        type: String
    },
    editor_state: {
        required: true,
        type: String
    }
})

module.exports = {
    user: mongoose.model('User', user),
    deck: mongoose.model('Deck', deck),
    card: mongoose.model('Card', card)
  }
