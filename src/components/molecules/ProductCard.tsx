import { Link } from "react-router-dom";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, image, link }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Columna izquierda */}
      <div style={{ flex: 1, minWidth: "280px" }}>
        <h2 style={{ fontFamily: "Rubik", fontSize: "28px", fontStyle: "italic", fontWeight: "bold" }}>{title}</h2>
        <p style={{ fontFamily: "Inter", fontSize: "16px", margin: "16px 0" }}>{description}</p>

        <Link
          to={link}
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "15px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Comprar
        </Link>
      </div>

      {/* Imagen */}
      <div style={{ flex: 1, textAlign: "center", minWidth: "280px" }}>
        <img
          src={image}
          alt={title}
          style={{ maxWidth: "300px", height: "auto", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
