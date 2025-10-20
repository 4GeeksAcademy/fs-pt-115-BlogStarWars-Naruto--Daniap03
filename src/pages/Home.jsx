import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import { getCharacters, getAkatsuki, getClans, getTailedBeasts } from "../sevices/APIServices.js";
import Card from "./Card.jsx";

const getKages = (characters) => {
  if (!Array.isArray(characters)) return [];

  return characters.filter((char) => {
    if (!char.rank) return false;
    const containsKage = (obj) => {
      if (typeof obj === "string") return obj.toLowerCase().includes("kage");
      if (typeof obj === "object") return Object.values(obj).some(containsKage);
      return false;
    };
    return containsKage(char.rank);
  });
};

const filterValidItems = (items = []) => {
  return items.filter((item) => {
    if (!item.name || item.name.trim() === "") return false;

    const hasImage =
      item.image ||
      (Array.isArray(item.images) && item.images.length > 0 && item.images[0]) ||
      item.tailedBeastImage;

    if (!hasImage) return false;

    const hasRelevantInfo =
      item.rank ||
      item.village ||
      item.affiliation ||
      item.personal?.affiliation ||
      item.personal?.village;

    return hasRelevantInfo;
  });
};

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getCharacters(dispatch);
    getAkatsuki(dispatch);
    getClans(dispatch);
    getTailedBeasts(dispatch);
  }, []);

  const renderCards = (items, type) =>
    filterValidItems(items).map((item) => (
      <Card key={item.id || item.name} item={item} type={type} />
    ));

  return (
    <div
      className="min-vh-100"
      style={{
        backgroundColor: "#FFA500", // Naranja Konoha
        backgroundImage: `
          url('src/assets/img/pngegg.png'),
          radial-gradient(circle, rgba(255, 165, 0, 0.8), rgba(255, 165, 0, 0.8))
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "250px 250px",
        backgroundPosition: "center",
        
      }}
    >
      <div
        className="container py-4"
        style={{
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          borderRadius: "12px",
          padding: "2rem",
        }}
      >
        <h1 className="text-center mb-5 fw-bold text-warning">Naruto Blog 🍥</h1>

        {/* Personajes principales */}
        <h2 className="mb-3 text-light">Personajes principales</h2>
        <div className="d-flex overflow-auto mb-4 pb-2">
          {Array.isArray(store.characters) &&
            renderCards(store.characters.slice(0, 12), "characters")}
        </div>

        {/* Kages */}
        <h2 className="mb-3 text-light">Kages</h2>
        <div className="d-flex overflow-auto mb-4 pb-2">
          {Array.isArray(store.characters) &&
            renderCards(getKages(store.characters), "characters")}
        </div>

        {/* Bijus */}
        <h2 className="mb-3 text-light">Bijū (Bestias con Cola)</h2>
        <div className="d-flex overflow-auto mb-4 pb-2">
          {Array.isArray(store.bijus) && renderCards(store.bijus, "bijus")}
        </div>

        {/* Akatsuki */}
        <h2 className="mb-3 text-light">Akatsuki</h2>
        <div className="d-flex overflow-auto mb-4 pb-2">
          {Array.isArray(store.akatsuki) &&
            renderCards(store.akatsuki.slice(0, 12), "akatsuki")}
        </div>
      </div>
    </div>
  );
};