import styled from "styled-components";
import { useEffect, useState } from "react";
import QuestionForm from "../molecules/QuestionForm";
import QuestionCard from "../molecules/QuestionCard";

const Container = styled.section`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

interface Pregunta {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
}

const QuestionsAnswersSection: React.FC = () => {
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

  const fetchPreguntas = async () => {
    try {
      const res = await fetch("http://localhost:3000/preguntaRespuesta");
      const data = await res.json();
      setPreguntas(data);
    } catch (err) {
      console.error("Error al obtener preguntas:", err);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  return (
    <Container>
      <QuestionForm onPreguntaCreada={fetchPreguntas} />
      {preguntas.length === 0 ? (
        <p style={{ color: "#555", marginTop: "2rem" }}>
          No hay preguntas por el momento.
        </p>
      ) : (
        preguntas.map((p) => (
          <QuestionCard
            key={p.id}
            id={p.id}
            user={p.nombre}
            question={p.descripcion}
            date={new Date(p.fecha).toLocaleDateString()}
          />
        ))
      )}
    </Container>
  );
};

export default QuestionsAnswersSection;