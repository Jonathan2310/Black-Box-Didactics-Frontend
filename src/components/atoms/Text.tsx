export const Text: React.FC<{ children: React.ReactNode; font?: 'Rubik' | 'Inter'; variant?: 'body' | 'caption' }> = ({ children, font = 'Rubik', variant = 'body' }) => {
  return <p className={`${variant} font-${font.toLowerCase()}`}>{children}</p>;
};