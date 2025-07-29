import styled from "styled-components";

interface Event {
  title: string;
  description?: string;
  image: string;
}

interface EventsSectionProps {
  title: string;
  topEvents: Event[];
  bottomEvents: Event[];
}

const Section = styled.section`
  background-color: #212121;
  color: white;
  padding: 3rem 6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.2fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
  height: 450px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
`;

const HalfImageCard = styled(ImageCard)`
  height: calc(50% - 0.5rem);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  text-shadow: 1px 1px 5px black;
`;

const DoubleStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

const BottomRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

const CircleCard = styled.div`
  display: flex;
  align-items: center;
  max-width: 400px;
`;

const CircleImage = styled.img`
  width: 200px;
  height: 120px;
  border-radius: 40%;
  object-fit: cover;
  margin-right: 1rem;
`;

const TextBlock = styled.div``;

const CircleTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const CircleDescription = styled.p`
  font-size: 0.85rem;
  margin: 0.5rem 0 0;
`;

export default function EventsSection({ title, topEvents, bottomEvents }: EventsSectionProps) {
  const [main, second, third, fourth] = topEvents;

  const minBottomEvents = 3;
  const paddedBottomEvents = [
    ...bottomEvents,
    ...Array(Math.max(0, minBottomEvents - bottomEvents.length)).fill({
      title: "Próximamente...",
      description: "Mantente al tanto de nuestros próximos eventos",
      image: "/src/assets/img/NoticiasExample1.jpg",
    }),
  ];

  return (
    <Section>
      <Title>{title}</Title>

      <TopGrid>
        {main && (
          <ImageCard>
            <CardImage src={main.image} alt={main.title} />
            <OverlayText>{main.title}</OverlayText>
          </ImageCard>
        )}
        {second && (
          <ImageCard>
            <CardImage src={second.image} alt={second.title} />
            <OverlayText>{second.title}</OverlayText>
          </ImageCard>
        )}
        <DoubleStack>
          {third && (
            <HalfImageCard>
              <CardImage src={third.image} alt={third.title} />
              <OverlayText>{third.title}</OverlayText>
            </HalfImageCard>
          )}
          {fourth && (
            <HalfImageCard>
              <CardImage src={fourth.image} alt={fourth.title} />
              <OverlayText>{fourth.title}</OverlayText>
            </HalfImageCard>
          )}
        </DoubleStack>
      </TopGrid>

      <BottomRow>
        {paddedBottomEvents.map((event, idx) => (
          <CircleCard key={idx}>
            <CircleImage src={event.image} alt={event.title} />
            <TextBlock>
              <CircleTitle>{event.title}</CircleTitle>
              {event.description && (
                <CircleDescription>{event.description}</CircleDescription>
              )}
            </TextBlock>
          </CircleCard>
        ))}
      </BottomRow>
    </Section>
  );
}
