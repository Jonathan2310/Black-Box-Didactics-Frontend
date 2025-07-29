import React from "react";
import styled from "styled-components";

const IconRow = styled.div`
  display: flex;
  gap: 1rem;

  img {
    width: 24px;
    height: 24px;
    filter: brightness(100%);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;

const icons = [
  {
    name: "facebook",
    url: "/src/assets/img/Facebook F.png",
    link: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    url: "/src/assets/img/Instagram.png",
    link: "https://www.instagram.com/",
  },
  {
    name: "x",
    url: "/src/assets/img/X.png",
    link: "https://twitter.com/",
  },
  {
    name: "mail",
    url: "/src/assets/img/Gmail.png",
    link: "mailto:example@gmail.com",
  },
];

export const SocialIcons: React.FC = () => (
  <IconRow>
    {icons.map(icon => (
      <a
        key={icon.name}
        href={icon.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={icon.name}
      >
        <img src={icon.url} alt={`${icon.name} icon`} />
      </a>
    ))}
  </IconRow>
);
