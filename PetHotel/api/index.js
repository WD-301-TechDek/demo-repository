var express = require('express');
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = express();

app.use(cors());
app.use(express.json()); // Parse JSON bodies

var CONNECTION_STRING = "mongodb+srv://daryllmedina6:Asdf-asdf123@cluster0.p576f9f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "PetShopDB";

var database;

app.listen(5038, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            console.error("Failed to connect to database:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log('Connected to database successfully!');
    })
})

app.get('/api/pets/GetPets', (req, res) => {
    database.collection("pets").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error fetching pets:", error);
            res.status(500).json({ error: "Failed to fetch pets" });
            return;
        }
        res.json(result);
    });
});

app.post('/api/pets/AddPet', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("pets").countDocuments();
        await database.collection("pets").insertOne({
            id: numOfDocs + 1,
            name: req.body.name,
            type: req.body.type,
            breed: req.body.breed,
            age: req.body.age,
            description: req.body.description,
            available: true // Assuming newly added pet is available for adoption
        });
        res.json("Pet added successfully");
    } catch (error) {
        console.error("Error adding pet:", error);
        res.status(500).json({ error: "Failed to add pet" });
    }
});

app.put('/api/pets/UpdatePet', multer().none(), async (req, res) => {
    try {
        const updatedPet = {
            name: req.body.name,
            type: req.body.type,
            breed: req.body.breed,
            age: req.body.age,
            description: req.body.description
        };

        const result = await database.collection("pets").updateOne(
            { id: parseInt(req.body.id) },
            { $set: updatedPet }
        );

        if (result.modifiedCount === 1) {
            res.json("Pet updated successfully");
        } else {
            res.status(404).json("Pet not found or no changes were made");
        }
    } catch (error) {
        console.error("Error updating pet:", error);
        res.status(500).json({ error: "Failed to update pet" });
    }
});


app.delete('/api/pets/DeletePet', async (req, res) => {
    try {
        const result = await database.collection("pets").deleteOne({
            id: parseInt(req.query.id)
        });

        if (result.deletedCount === 1) {
            res.json("Pet deleted successfully");
        } else {
            res.status(404).json("Pet not found");
        }
    } catch (error) {
        console.error("Error deleting pet:", error);
        res.status(500).json({ error: "Failed to delete pet" });
    }
});