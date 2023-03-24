const axios = require("axios");

// Personajes Ricky y Morty
const verPersonajesRyM = async (req, res) => {
  try {
    const personajesRyM = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    res.status(200).json({
      personajes: personajesRyM.data,
      message: "Se visualizan todos los personajes de Ricky y Morty",
    });
  } catch (error) {
    res.status(500).json({
      personajes: null,
      message: `Error: ${error.message}`,
    });
  }
};

module.exports = { verPersonajesRyM };
