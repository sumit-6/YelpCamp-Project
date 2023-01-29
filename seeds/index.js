const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '63d3e92ab53e96be9455a9ec',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:  [
                {
                  url: 'https://res.cloudinary.com/dk26fyzkl/image/upload/v1674992772/YelpCamp/eaaxdugrexdtpakzuydl.jpg',
                  filename: 'YelpCamp/eaaxdugrexdtpakzuydl'
                },
                {
                  url: 'https://res.cloudinary.com/dk26fyzkl/image/upload/v1674992772/YelpCamp/dsqeosas3simtb9px5l3.jpg',
                  filename: 'YelpCamp/dsqeosas3simtb9px5l3'
                },
                {
                  url: 'https://res.cloudinary.com/dk26fyzkl/image/upload/v1674992772/YelpCamp/uwfxg8n8kpal4tz3ruxq.jpg',
                  filename: 'YelpCamp/uwfxg8n8kpal4tz3ruxq'
                }
              ],
            description: 'This is a test description',
            price: Math.floor(Math.random() * 30) + 10
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});