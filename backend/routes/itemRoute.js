const express = require("express")
const app = express()
const multer = require("multer")
const {v4: uuidv4 } = require('uuid')
const path = require("path")
const itemModel = require("../models/item.js")

// Konfigurimet e nevojshme per upload e imazheve ne mongoDB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'images');
    },
    filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname))
    }
    })
    const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
    } else {
    cb(null, false)
    }}
    let upload = multer({ storage, fileFilter })



//Create 
app.post("/create", upload.single('photo'), async (req, res) => {
    try {
    // Merrja dhe ruajtja te dhenat nga frontend (input-et e form-es, React)
    const newItem = new itemModel({
    ...req.body,
    // Imazhi
    photo: req.file.filename });
    // Ruajtje e te dhenave ne mongo DB
    await newItem.save();
    console.log(newItem)
    // Mesazhi i suksesit
    res.status(200).send(newItem);
    } catch (err) {
    console.error("Error creating item:", err);
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Not created" + err);
    }
    });

module.exports = app