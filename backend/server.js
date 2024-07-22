// Importiamo il modulo express
const express = require("express");

// Creiamo un'applicazione Express
const server = express();

// Definiamo la porta su cui il server ascolterà
const port = 5001;

const router = express.Router();

// ENDPOINT PER PROFILO

router.get('/profile', async (req,res) => {
    res.send("GET richiesta alla root del router");
})

router.get('/me', async (req,res) => {
    res.send("GET richiesta alla root del router");
})

router.post('/profile', async (req,res) => {
    const data = req.body;
    res.send(`POST richiesta con dati: ${JSON.stringify(data)}`);
})

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    res.send(`PUT richiesta con ID: ${id} e dati: ${JSON.stringify(data)}`);
})
router.put('/:id/image', async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    res.send(`PUT richiesta con ID: ${id} e dati: ${JSON.stringify(data)}`);
})


// ENDPOINT PER ESPERIENZE

router.get('/:userId/experience', async (req,res) => {
    res.send("GET richiesta alla root del router");
})
router.get('/me/experience', async (req,res) => {
    res.send("GET richiesta alla root del router");
})

router.post('/experience', async (req,res) => {
    const data = req.body;
    res.send(`POST richiesta con dati: ${JSON.stringify(data)}`);
})

router.put('/:expId', async (req,res) => {
    const id = req.params.id;
    const data = req.body;
    res.send(`PUT richiesta con ID: ${id} e dati: ${JSON.stringify(data)}`);
})
router.delete('/:expId', async (req,res) => {
    const id = req.params.id;
    res.send(`DELETE richiesta con ID: ${id}`);
})

// Usare il middleware express.json() per gestire i dati JSON
server.use(express.json());

// Collegare il router all'app principale
// L'endpoint principale a cui è collegato il router è "/", quindi tutte le rotte definite nel router saranno relative a "/"
server.use("/", router);


// Iniziamo il server e lo facciamo ascoltare sulla porta definita
server.listen(port, () => {
  console.log(`Server partito sulla porta: ${port}`);
});