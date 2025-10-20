import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getCharacterById } from "../sevices/APIServices.js";

const CharacterDetail = () => {
  const { id, type } = useParams();
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    getCharacterById(id, dispatch, type);
  }, [id, type]);

  const char = store.characterDetail;
  if (!char) return <p className="text-center mt-5">Cargando personaje...</p>;

  const img =
    char.images?.[0] ||
    char.image ||
    `https://via.placeholder.com/600x400?text=${encodeURIComponent(
      char.name || "Sin nombre"
    )}`;

  let rawAffiliation =
    char.affiliation ||
    char.personal?.affiliation ||
    char.personal?.affiliations ||
    char.family?.affiliation ||
    [];

  if (typeof rawAffiliation === "string") {
    rawAffiliation = [rawAffiliation];
  }

  const affiliation = Array.isArray(rawAffiliation)
    ? [...new Set(rawAffiliation.map((a) => a.trim()))].join(", ")
    : rawAffiliation || "Desconocida";

  const clan =
    char.clan ||
    char.personal?.clan ||
    (Array.isArray(char.personal?.clan)
      ? char.personal.clan.join(", ")
      : char.personal?.clan) ||
    "Desconocido";

  const rank =
    typeof char.rank === "object"
      ? Object.values(char.rank).join(", ")
      : char.rank || "Desconocido";

  const chakraType =
    Array.isArray(char.natureType)
      ? char.natureType.join(", ")
      : char.natureType || "No especificado";

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100 py-5"
      style={{
        backgroundColor: "#FFA500", 
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
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      >
        <img
          src={img}
          alt={char.name}
          className="card-img-top img-fluid"
          style={{
            objectFit: "cover",
            maxHeight: "500px",
          }}
        />

        <div className="card-body px-5 py-4">
          <h1 className="card-title text-center mb-4 display-5 fw-bold">
            {char.name}
          </h1>

          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4 text-center">
            <span className="badge bg-primary fs-6">
              Afiliación: {affiliation}
            </span>
            <span className="badge bg-success fs-6">Clan: {clan}</span>
            <span className="badge bg-danger fs-6 text-wrap">
              Chakra: {chakraType}
            </span>
          </div>

          {char.jutsu?.length > 0 && (
            <>
              <h3 className="text-center mb-3 fw-semibold">Jutsus conocidos</h3>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                {char.jutsu.slice(0, 20).map((j, idx) => (
                  <span
                    key={idx}
                    className="badge bg-light text-dark border border-secondary-subtle shadow-sm px-3 py-2"
                  >
                    {j}
                  </span>
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-4">
            <Link to="/" className="btn btn-outline-primary px-4 py-2 fw-semibold">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;