
const BASE_URL = "https://dattebayo-api.onrender.com";

export const getCharacters = async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/characters`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "set_characters", payload: data.characters });
    }
  } catch (error) {
    console.error("Error en getCharacters:", error);
  }
};

export const getAkatsuki = async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/akatsuki`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "set_akatsuki", payload: data.akatsuki });
    }
  } catch (error) {
    console.error("Error en getAkatsuki:", error);
  }
};

export const getClans = async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/clans`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    dispatch({ type: "set_clans", payload: data.clans });
  } catch (error) {
    console.error("Error en getClans:", error);
  }
};

export const getTailedBeasts = async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/tailed-beasts`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "set_bijus", payload: data["tailed-beasts"] });
    }
  } catch (error) {
    console.error("Error en getTailedBeasts:", error);
  }
};

export const getCharacterById = async (id, dispatch, type = "characters") => {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}`);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: "set_character_detail", payload: data });
    }
  } catch (error) {
    console.error("Error en getCharacterById:", error);
  }
};