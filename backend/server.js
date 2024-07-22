// Importa il framework Express per creare l'applicazione web
import express from 'express';
// Importa Mongoose per la connessione e l'interazione con MongoDB
import mongoose from 'mongoose';
// Importa dotenv per caricare le variabili d'ambiente dal file .env
import dotenv from 'dotenv';
// Importa una utility per elencare tutti gli endpoint dell'applicazione
import endpoints from 'express-list-endpoints';
// Importa il middleware CORS per gestire le richieste cross-origin
import cors from 'cors';
// Importa le route per i post del blog
import experienceRoutes from './routes/experienceRoutes.js';
// Importa le route per gli autori
import userRoutes from './routes/userRoutes.js';
// Importo le rotte per l'autenticazione
import authRoutes from './routes/AuthRoutes.js';

import session from "express-session";
import passport from "./config/passportConfig.js";


// Importa i middleware per la gestione degli errori
import {
    badRequestHandler,
    unauthorizedHandler,
    notFoundHandler,
    genericErrorHandler
} from './middlewares/errorHandler.js';

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Crea un'istanza dell'applicazione Express
const app = express();


// Configurazione CORS
app.use(cors());

app.use(express.json());

// Inizializzazione di Express Session
app.use(
    session({
      // Il 'secret' è usato per firmare il cookie di sessione
      // È importante che sia una stringa lunga, unica e segreta
      secret: process.env.SESSION_SECRET,
  
      // 'resave: false' dice al gestore delle sessioni di non
      // salvare la sessione se non è stata modificata
      resave: false,
  
      // 'saveUninitialized: false' dice al gestore delle sessioni di non
      // creare una sessione finché non memorizziamo qualcosa
      // Aiuta a implementare le "login sessions" e riduce l'uso del server di memorizzazione
      saveUninitialized: false,
    })
);

// Inizializzazione di Passport
app.use(passport.initialize());
app.use(passport.session());


// Connette al database MongoDB usando l'URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connesso'))
    .catch((err) => console.error('Errore di connessione', err));

// Imposta le route per l'autenticazione
app.use('/api/auth', authRoutes);

// Imposta le route per gli autori
app.use('/api/user', userRoutes);

// Imposta le route per i post del blog
app.use('/api/experience', experienceRoutes);

// Imposta la porta del server specifica o 5000
const PORT = process.env.PORT || 5000;

// Aggiunge i middleware per la gestione degli errori
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

// Avvia il server sulla porta specificata
app.listen(PORT, () => {
    console.log('Server connesso sulla porta ' + PORT);
    
    // Stampa una tabella con tutti gli endpoint dell'applicazione
    console.table(
        endpoints(app).map((route) => ({
          path: route.path,
          methods: route.methods.join(", "),
        })),
    );
});