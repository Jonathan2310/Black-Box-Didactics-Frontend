import '../assets/styles/Home.css';
import Header from "../components/organism/Header";
import EventsMenuSections from "../components/organism/EventsMenuSections";
import ReviewForm from "../components/organism/ReviewForm";
import TestimonialsForm from "../components/organism/TestimonialsForm";
import QuestionsAnswersSection from "../components/organism/QuestionsAnswersSection";
import GallerySection2 from "../components/organism/GallerySection2";

import Footer from "../components/organism/Footer";
import { useState } from "react";

const sectionOptions = [
  { label: "Opiniones", key: "opiniones" },
  { label: "Testimonios", key: "testimonios" },
  { label: "Preguntas y respuestas", key: "preguntasRespuestas" },
  { label: "Fotografías", key: "fotografias" }
];

function Community() {
  const [section, setSection] = useState("opiniones");

  return (
    <>
      <Header />
      <EventsMenuSections
        sections={sectionOptions}
        onSectionChange={setSection}
      />

      {section === "opiniones" && <ReviewForm />}
      {section === "testimonios" && <TestimonialsForm />}
      {section === "preguntasRespuestas" && <QuestionsAnswersSection />}
      {section === "fotografias" && <GallerySection2 />}

      <Footer />
    </>
  );
}

export default Community;
