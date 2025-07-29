import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";

const Container = styled.div`
  background-color: #1e1e1e;
  padding: 20px 100px;
  color: #fff;

  .slick-slide {
    padding: 0 12px;
  }

  .slick-list {
    margin: 0 -12px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const Card = styled.a`
  display: block;
  padding: 15px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease;
  margin: 0 10px;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    display: block;
  }
`;

interface Documento {
  id: number;
  nombre: string;
  imagenUrl: string;
  link: string;
}

const DocumentCarousel: React.FC = () => {
  const [documents, setDocuments] = useState<Documento[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:3000/documentos");
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };

    fetchDocuments();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <Title>Documentos</Title>
      <Slider {...settings}>
        {documents.map((doc) => (
          <Card key={doc.id} href={doc.link} target="_blank">
            <img src={doc.imagenUrl} alt={doc.nombre} />
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

export default DocumentCarousel;
