import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

interface SectionOption {
  label: string;
  key: string;
}

interface Props {
  sections: SectionOption[];
  onSectionChange: (sectionKey: string) => void;
}

const Section = styled.section`
  font-family: "Rubik", sans-serif;
  text-align: center;
`;

const MenuContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;

const MenuButton = styled.button<{ active?: boolean }>`
  padding: 30px 70px;
  background-color: ${({ active }) => (active ? "#212121" : "transparent")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-bottom: ${({ active }) =>
    active ? "4px solid #212121" : "4px solid transparent"};
  cursor: pointer;
  font-family: "Rubik", sans-serif;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const EventsMenuSections: React.FC<Props> = ({ sections, onSectionChange }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("section") || sections[0].key;
  });

  const navigate = useNavigate();

  const handleClick = (key: string) => {
    setActiveSection(key);
    navigate(`?section=${key}`);
    onSectionChange(key);
  };

  useEffect(() => {
    onSectionChange(activeSection);
  }, []);

  return (
    <Section>
      <MenuContainer>
        {sections.map(({ label, key }) => (
          <MenuButton
            key={key}
            active={activeSection === key}
            onClick={() => handleClick(key)}
          >
            {label}
          </MenuButton>
        ))}
      </MenuContainer>
    </Section>
  );
};

export default EventsMenuSections;
