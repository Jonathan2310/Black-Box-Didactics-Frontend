import React, { useEffect, useState } from "react";
import styled from "styled-components";
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
      box-shadow: 0 0 0 2px #105BD8;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.75rem 2rem;
  background-color: #105BD8;
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

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #f5a623;
`;

const QuestionForm: React.FC<{ onPreguntaCreada?: () => void }> = ({ onPreguntaCreada }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");

    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(usuario);
      setNombre(user.nombre || "");
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    if (!descripcion) {
      setMensaje("Por favor escribe tu duda antes de enviarla.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/preguntaRespuesta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          descripcion
        })
      });

      if (res.ok) {
        setMensaje("¡Tu duda fue enviada con éxito!");
        setDescripcion("");

        if (onPreguntaCreada) onPreguntaCreada();
      }
      else {
        const data = await res.json();
        setMensaje(data.message || "Error al enviar tu pregunta.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión con el servidor.");
    }
  };

  return (
    <FormWrapper>
      <Title>¿Tienes dudas? Aquí te ayudamos</Title>

      <FormGroup>
        <label>Nombre completo:</label>
        <input type="text" value={nombre} disabled />
      </FormGroup>

      <FormGroup>
        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Escribe tu duda aquí..."
        />
      </FormGroup>

      <SubmitButton onClick={handleSubmit}>Publicar</SubmitButton>

      {mensaje && <Message>{mensaje}</Message>}
    </FormWrapper>
  );
};

export default QuestionForm;
