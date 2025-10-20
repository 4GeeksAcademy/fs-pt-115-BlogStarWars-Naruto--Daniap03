export const initialStore = () => {
  return {
    characters: [],
    akatsuki: [],
    clans: [],
    bijus: [],
    characterDetail:[],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_characters":
      return { ...store, characters: action.payload };
    case "set_akatsuki":
      return { ...store, akatsuki: action.payload };
    case "set_clans":
      return { ...store, clans: action.payload };
    case "set_bijus":
      return { ...store, bijus: action.payload };
    case "set_character_detail":
      return { ...store, characterDetail: action.payload };
    default:
      return store;
  }
}
