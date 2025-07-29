import { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = styled.section`
  background-color: #212121;
  color: white;
  padding: 3rem 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
`;

const ImageWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
`;

interface GaleriaItem {
  id: number;
  imgUrl: string;
}

export default function GallerySection() {
  const [images, setImages] = useState<GaleriaItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/galeria")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error cargando galería:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <Section>
      <Title>Galería de fotos</Title>
      <Slider {...settings}>
        {images.map((item) => (
          <ImageWrapper key={item.id}>
            <Image
              src={`http://localhost:3000${item.imgUrl}`}
              alt={`Imagen ${item.id}`}
            />
          </ImageWrapper>
        ))}
      </Slider>
    </Section>
  );
}
