export const Icon: React.FC<{ type: 'facebook' | 'instagram' | 'x' | 'mail' }> = ({ type }) => {
  return <img src={`/icons/${type}.svg`} alt={`${type} icon`} />;
};