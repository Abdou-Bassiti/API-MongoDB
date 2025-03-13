//importation du module Express
const express = require("express")
const server = express()
const port = 5000

//activer la lecture en JSON
server.use(express.json())

server.use("/tasks", require("./routes.js"))


// connexion avec MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/taskDB')
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur de connexion", err));


//schema 
  const taskSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

//modèls
const Task = mongoose.model('Task', taskSchema);

//créer une tâche
const newTask = new Task({ nom: "Ma première tâche", description: "Ceci est un tâche." });
await newTask.save();

// Lire les taches
const tasks = await Task.find();

//Mettre à jour une note
await Task.findByIdAndUpdate(id, { nom: "Titre mis à jour" });

//Supprimer une note
await Task.findByIdAndDelete(id);

server.listen(port, ()=>{
    console.log("Hello les gens")
})