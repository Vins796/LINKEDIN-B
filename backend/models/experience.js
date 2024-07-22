// models/User.js

// Importa il modulo Mongoose per la gestione del database MongoDB
import { Schema, model } from "mongoose";

// Definizione dello schema dell'utente utilizzando il costruttore Schema di Mongoose
const experienceSchema = new Schema(
  {
    // Campo 'name' di tipo String obbligatorio (required)
    role: {
      type: String,
    //   required: true,
    },
    company: {
      type: String,
    //   required: true,
    },
    startDate: {
      type: Date,
    //   required: true,
    },
    endDate: {
      type: Date,
    //   required: true,
    },
    description: {
      type: String,
    //   required: true,
    },
    // Campo 'email' di tipo String obbligatorio e unico (unique)
    area: {
      type: String,
    //   required: true,
    }
  },
  {
    // Opzioni dello schema:
    collection: "experience", // Specifica il nome della collezione nel database MongoDB
  }
);

// Esporta il modello 'User' utilizzando il metodo model di Mongoose
// Il modello 'User' sarà basato sullo schema 'userSchema' definito sopra
const Experience = model("Experience", experienceSchema);
export default Experience;
