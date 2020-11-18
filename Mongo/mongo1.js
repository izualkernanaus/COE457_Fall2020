const mongoose = require('mongoose');
// i am opening or creating a new databsae called cats1
mongoose.connect('mongodb://localhost:27017/cats1', {useNewUrlParser: true, useUnifiedTopology: true});

// defining a schema for a database
// Cats is a collection 
// { name: String } is thee schema for Cats

const Cat = mongoose.model('Cat', { name: String });

// created a document for the collection Cat
const kitty = new Cat({ name: 'Zildjian' });

// save the document to the DB

kitty.save().then(() => console.log('meow'));
