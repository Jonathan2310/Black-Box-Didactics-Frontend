import '../assets/styles/Home.css';
import Header from "../components/organism/Header";
import LandingHero from "../components/organism/LandingHero";
import ProductSection from "../components/organism/ProductSection";
import LevelInfoSection from "../components/organism/LevelInfoSection";
import EventsSection from "../components/organism/EventsSection";
import ExploreCourseSection from "../components/organism/ExploreCourseSection";
import MoreRecoursesSection from "../components/organism/MoreRecoursesSection";
import GallerySection from "../components/organism/GallerySection";
import Footer from "../components/organism/Footer";
import { useEffect, useState } from "react";

function Home() {
  const [topEvents, setTopEvents] = useState([]);
  const [bottomEvents, setBottomEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then(res => res.json())
      .then(data => {
        const eventos = data.reverse();

        const top = eventos.slice(0, 4).map(ev => ({
          title: ev.titulo,
          description: ev.descripcion,
          image: `http://localhost:3000/uploads/${ev.urlImagen}`
        }));

        const bottom = eventos.slice(4, 8).map(ev => ({
          title: ev.titulo,
          description: ev.descripcion,
          image: `http://localhost:3000/uploads/${ev.urlImagen}`
        }));

        setTopEvents(top);
        setBottomEvents(bottom);
      })
      .catch(err => console.error("Error al obtener eventos:", err));
  }, []);

  return (
    <>
      <Header />
      <LandingHero />
      <ProductSection />
      <LevelInfoSection />
      <EventsSection
        title="Eventos"
        topEvents={topEvents}
        bottomEvents={bottomEvents}
      />
      <ExploreCourseSection />
      <MoreRecoursesSection />
      <GallerySection />
      <Footer />
    </>
  );
}

export default Home;
