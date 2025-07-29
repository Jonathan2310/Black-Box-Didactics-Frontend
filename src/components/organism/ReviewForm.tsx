import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FormWrapper = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;

  label {
    width: 120px;
    font-weight: bold;
  }

  input,
  textarea {
    flex: 1;
    background: white;
    border: none;
    border-radius: 4px;
    padding: 0.75rem;
    font-size: 1rem;
    color: #333;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #105bd8;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StarButton = styled.button<{ selected: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ selected }) => (selected ? "#f5a623" : "#ccc")};
  font-size: 1.8rem;
  transition: color 0.2s;

  &:hover {
    color: #f5a623;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.75rem 2rem;
  background-color: #105bd8;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #1e40af;
  }
`;

const ReviewForm: React.FC = () => {
  const [stars, setStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!usuarioGuardado) {
      navigate("/login");
      return;
    }

    try {
      const usuario = JSON.parse(usuarioGuardado);
      setNombre(usuario.nombreCompleto || usuario.nombre || "");
    } catch (err) {
      console.error("Error al parsear el usuario:", err);
      localStorage.removeItem("usuario");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!descripcion || stars === 0) {
      setMensaje("Por favor completa todos los campos y selecciona estrellas.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/opiniones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, estrellas: stars })
      });

      if (res.ok) {
        setMensaje("¡Opinión enviada con éxito!");
        setDescripcion("");
        setStars(0);
      } else {
        const data = await res.json();
        setMensaje(data.message || "Error al enviar la opinión.");
      }
    } catch {
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <FormWrapper>
      <Title>¿Quieres crear una opinión?</Title>

      <FormGroup>
        <label>Nombre completo:</label>
        <input type="text" value={nombre} disabled />
      </FormGroup>

      <FormGroup>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe tu experiencia..."
        />
      </FormGroup>

      <FormGroup>
        <label>Estrellas:</label>
        <StarsContainer>
          {[1, 2, 3, 4, 5].map((index) => (
            <StarButton
              key={index}
              selected={index <= (hoveredStar ?? stars)}
              onClick={() => setStars(index)}
              onMouseEnter={() => setHoveredStar(index)}
              onMouseLeave={() => setHoveredStar(null)}
              type="button"
              aria-label={`${index} estrellas`}
            >
              <FaStar />
            </StarButton>
          ))}
        </StarsContainer>
      </FormGroup>

      <SubmitButton onClick={handleSubmit}>Publicar</SubmitButton>

      {mensaje && (
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: mensaje.includes("éxito") ? "#4caf50" : "#f5a623"
          }}
        >
          {mensaje}
        </p>
      )}
    </FormWrapper>
  );
};

export default ReviewForm;
