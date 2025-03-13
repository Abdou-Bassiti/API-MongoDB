// Créer un serveur
const express = require("express")

// Utiliser la méthode Router de express pour créer les routes 
const router = express.Router()

let tasks = []
let id = 0

// le route pour créer une nouvelle tâche
router.post("/", (req, res) => {
    const {nom, description} = req.body // extraire des données envoyées dans la requête

    
    const nouvelleTache = {
        id: id++,
        nom : nom,
        description: description,
    }
    tasks.push(nouvelleTache)
    res.status(201).json({nouvelleTache})
});

//la route pour lire la liste des tâches
router.get("/tasks", (req, res)=>{
    res.json(tasks);
});

//la route afficher une tâche spécifique avec id
router.get("/:id", (req, res)=>{
    const task = tasks.find((element) => element.id === parseInt(req.params.id))
    if(task){
        res.json(task)
    }else{
        res.status(404).json({message: "Tâche non trouvée"})
    }

})

//la route pour modifier une tâche
router.put("/:id", (req, res) =>{
    const task = tasks.find((element) => element.id === parseInt(req.params.id))
    if(!task){
        return res.status(404).json({message: "Tâche non trouvée"})
    }
    const {nom, description} = req.body // extraire des données envoyées dans la requête

    if (nom) task.nom = nom
    if(description !== undefined)  task.description = description

    res.json(task)
} )


//la route pour supprimer une tâche

router.delete("/:id", (res, req) => {
    const index = tasks.findIndex((element) => element.id === parseInt(req.params.id))
    if (index === -1 )
        return res.status(400).json({ message: "Tâche non trouvée" })

    const taskDeleted = tasks.splice(index, 1)
    res.json(taskDeleted)

})



module.exports = router