import { useEffect, useState } from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 3rem 2rem;
  background-color: #ffffff;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ReviewsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ReviewCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 320px;
  min-width: 280px;
  text-align: center;
`;

const Stars = styled.div`
  color: #f5a623;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Comment = styled.p`
  font-style: italic;
  font-size: 1rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const Name = styled.p`
  font-weight: 600;
  font-size: 0.95rem;
`;

interface Review {
  nombre: string;
  descripcion: string;
  estrellas: number;
}

export default function UserReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/opiniones")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((err) => console.error("Error cargando opiniones:", err));
  }, []);

  return (
    <Section>
      <Title>Experiencias de otros usuarios</Title>
      <ReviewsContainer>
        {reviews.map((r, i) => (
          <ReviewCard key={i}>
            <Stars>{"★".repeat(r.estrellas)}</Stars>
            <Comment>“{r.descripcion}”</Comment>
            <Name>{r.nombre}</Name>
          </ReviewCard>
        ))}
      </ReviewsContainer>
    </Section>
  );
}
