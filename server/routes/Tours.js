const express = require("express");
const router = express.Router();
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'uploads/'
}))


const { createAbout, getAbout } = require("../controllers/About");
const { createBestTimeToVisit, getBestTimeToVisit } = require("../controllers/BestTimeToVIsit")
const { createBookFlight, getBookFlight } = require("../controllers/BookFlight")
const { createConclusion, getConclusion } = require("../controllers/Conclusion")
const { createHotels, getHotels } = require("../controllers/Hotels")
const { createLifeStyle, getLifeStyle } = require("../controllers/LifeStyle")
const { createRestraunts, getRestraunts } = require("../controllers/Restraunts")
const {createThingsToDo,getThingsToDo} = require("../controllers/ThingsToDo")
const {createTours, getTours,getToursById} = require("../controllers/Tours")
const {createCategory} = require("../controllers/Category")



// create about
router.post("/createAbout", createAbout);

// get about
router.get("/getAbout", getAbout);




// create best time to visit
router.post("/createBestTimeToVisit", createBestTimeToVisit)

// get best time to visit
router.get("/getBestTimeToVisit", getBestTimeToVisit)



// create best time to visit
router.post("/createBookFlight", createBookFlight)

// get book flights
router.get("/getBookFlight", getBookFlight)



// create conclusion
router.post("/createConclusion", createConclusion)

// get book flights
router.get("/getConclusion", getConclusion)



// create hotels
router.post("/createHotels", createHotels)

// get lifestyle
router.get("/getHotels", getHotels)



// create lifestyle
router.post("/createLifeStyle", createLifeStyle)

// get lifestyle
router.get("/getLifeStyle", getLifeStyle)



// create restraunts
router.post("/createRestraunts", createRestraunts)

// get restraunts
router.get("/getRestraunts", getRestraunts)



// create things to do
router.post("/createThingsToDo", createThingsToDo)

// get things to do
router.get("/getThingsToDo", getThingsToDo)




// create tours
router.post("/createTours", createTours)

// get tours
router.get("/getTours", getTours)

// get tours by id
router.post("/getToursById", getToursById)



// create category
router.post("/createCategory", createCategory);



// export the router
module.exports = router;