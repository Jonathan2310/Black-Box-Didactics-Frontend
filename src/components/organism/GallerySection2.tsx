import { useEffect, useState } from "react";
import styled from "styled-components";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Section = styled.section`
  background-color: #fff;
  color: #1e1e1e;
  padding: 3rem 1rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div<{ isCenter: boolean }>`
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isCenter ? 1 : 0.4)};
  transform: ${(props) => (props.isCenter ? "scale(1)" : "scale(0.85)")};
  transition: all 0.3s ease;
`;

const Image = styled.img`
  width: 100%;
  max-height: 550px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const Arrow = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const PrevArrow = styled(Arrow)`
  left: 10px;
`;

const NextArrow = styled(Arrow)`
  right: 10px;
`;

interface ArrowProps {
  onClick?: () => void;
}

const CustomPrevArrow = ({ onClick }: ArrowProps) => (
  <PrevArrow onClick={onClick}>‹</PrevArrow>
);

const CustomNextArrow = ({ onClick }: ArrowProps) => (
  <NextArrow onClick={onClick}>›</NextArrow>
);

interface GaleriaItem {
  id: number;
  imgUrl: string;
}

export default function GallerySection2() {
  const [images, setImages] = useState<GaleriaItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/galeria")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error cargando galería:", err));
  }, []);

  const settings: Settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <Section>
      <Title>Fotografías</Title>
      <Slider {...settings}>
        {images.map((item) => (
          <ImageWrapper key={item.id} isCenter={true}>
            <Image src={`http://localhost:3000${item.imgUrl}`} alt={`Imagen ${item.id}`} />
          </ImageWrapper>
        ))}
      </Slider>
    </Section>
  );
}
