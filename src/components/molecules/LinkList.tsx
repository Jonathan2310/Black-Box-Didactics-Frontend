import React from "react";
import styled from "styled-components";

interface Link {
  name: string;
  href: string;
}

interface LinkListProps {
  title: string;
  links: Link[];
}

const Section = styled.div``;

const Title = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.4rem;

  a {
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    color: #ccc;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LinkList: React.FC<LinkListProps> = ({ title, links }) => (
  <Section>
    <Title>{title}</Title>
    <List>
      {links.map((link, index) => (
        <ListItem key={index}>
          <a href={link.href}>{link.name}</a>
        </ListItem>
      ))}
    </List>
  </Section>
);
