import React from "react";

const Card = ({ item, type }) => {
  const img = item.image || item.images?.[0] || "https://via.placeholder.com/286x180?text=Sin+Imagen";

  const secondaryInfo =
    typeof item.rank === "object"
      ? Object.values(item.rank).join(", ")
      : item.rank || item.village || item.affiliation || (item.tails ? `${item.tails} colas` : "");

  const handleClick = () => {
    window.location.href = `/naruto/${type}/${item.id}`;
  };

  return (
    <div className="card me-3" style={{ minWidth: "18rem" }}>
      <img
        src={img}
        className="card-img-top"
        alt={item.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <button className="btn btn-primary" onClick={handleClick}>
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default Card;