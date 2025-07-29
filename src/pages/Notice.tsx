import '../assets/styles/Home.css';
import Header from "../components/organism/Header";
import EventsMenuSections from "../components/organism/EventsMenuSections";
import EventsSection from "../components/organism/EventsSection";
import DocumentCarousel from "../components/organism/DocumentCarousel";
import CoursesSection from "../components/organism/CoursesSection";
import Footer from "../components/organism/Footer";
import { useEffect, useState } from "react";

const sectionOptions = [
  { label: "Eventos", key: "eventos" },
  { label: "Documentos", key: "documentos" },
  { label: "Cursos", key: "cursos" }
];

function Notice() {
  const [section, setSection] = useState("eventos");
  const [topEvents, setTopEvents] = useState([]);
  const [bottomEvents, setBottomEvents] = useState([]);

  useEffect(() => {
    if (section === "eventos") {
      fetch("http://localhost:3000/eventos")
        .then(res => res.json())
        .then(data => {
          const eventos = data.reverse();

          const top = eventos.slice(0, 4).map(ev => ({
            title: ev.titulo,
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
    }
  }, [section]);

  return (
    <>
      <Header />
      <EventsMenuSections
        sections={sectionOptions}
        onSectionChange={setSection}
      />

      {section === "eventos" && (
        <EventsSection
          title="Eventos"
          topEvents={topEvents}
          bottomEvents={bottomEvents}
        />
      )}

      {section === "documentos" && <DocumentCarousel />}
      {section === "cursos" && <CoursesSection />}
      <Footer />
    </>
  );
}

export default Notice;
