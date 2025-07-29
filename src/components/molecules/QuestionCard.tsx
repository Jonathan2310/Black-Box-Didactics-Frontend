import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiUser, FiCalendar, FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  color: #1e1e1e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: #555;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Question = styled.p`
  margin: 0.5rem 0 1rem;
  font-size: 1rem;
  color: #222;
`;

const ViewReplies = styled.button`
  background: none;
  border: none;
  color: #105bd8;
  font-size: 0.9rem;
  font-style: italic;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #0c47aa;
  }
`;

const CommentInput = styled.input`
  width: 100%;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #105bd8;
  }
`;

const PublishButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #105bd8;
  color: white;
  font-weight: bold;
  border: none;
  padding: 0.6rem 1.2rem;
  margin-top: 0.75rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;

  &:hover {
    background-color: #1e40af;
  }
`;

interface Respuesta {
  id: number;
  respuesta: string;
  nombre: string;
  fecha: string;
}

interface Props {
  id: number;
  user: string;
  question: string;
  date: string;
}

const QuestionCard: React.FC<Props> = ({ id, user, question, date }) => {
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const [mostrarRespuestas, setMostrarRespuestas] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
      navigate("/login");
      return;
    }

    try {
      const userObj = JSON.parse(usuario);
      setNombreUsuario(userObj.nombre || "");
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const obtenerRespuestas = async () => {
    if (mostrarRespuestas) {
      setMostrarRespuestas(false);
    } else {
      try {
        const res = await fetch(`http://localhost:3000/preguntaRespuesta/${id}/respuestas`);
        const data = await res.json();
        setRespuestas(data);
        setMostrarRespuestas(true);
      } catch (err) {
        console.error("Error al obtener respuestas:", err);
      }
    }
  };


  const enviarRespuesta = async () => {
    if (!nuevaRespuesta.trim()) return;

    try {
      const res = await fetch(`http://localhost:3000/preguntaRespuesta/${id}/respuestas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombreUsuario,
          respuesta: nuevaRespuesta
        })
      });

      if (res.ok) {
        setNuevaRespuesta("");
        obtenerRespuestas();
      }
    } catch (err) {
      console.error("Error al enviar respuesta:", err);
    }
  };

  return (
    <Card>
      <Header>
        <span><FiUser /> {user}</span>
        <span><FiCalendar /> {date}</span>
      </Header>

      <Question>{question}</Question>

      <ViewReplies onClick={obtenerRespuestas}>
        {mostrarRespuestas ? "Ocultar respuestas" : "Ver respuestas"}
      </ViewReplies>

      {mostrarRespuestas && respuestas.map((r) => (
        <div key={r.id} style={{ paddingLeft: "1rem", marginBottom: "1rem", color: "#444" }}>
          <p style={{ marginBottom: 4 }}><strong>{r.nombre}</strong> - {new Date(r.fecha).toLocaleDateString()}</p>
          <p style={{ fontStyle: "italic" }}>{r.respuesta}</p>
        </div>
      ))}

      <CommentInput
        placeholder="Escribe una respuesta..."
        value={nuevaRespuesta}
        onChange={(e) => setNuevaRespuesta(e.target.value)}
      />

      <PublishButton onClick={enviarRespuesta}>
        <FiSend size={16} />
        Publicar comentario
      </PublishButton>
    </Card>
  );
};

export default QuestionCard;