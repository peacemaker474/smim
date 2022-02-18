import styled from 'styled-components';

export const BorderBtn = styled.button`
  width: ${({ width }) => width || '3.5rem'};
  padding: ${({ padding }) => padding || '.2rem'};
  color: ${({ palette, theme }) => theme.color[palette]};
  border: 1.5px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  &:hover {
    background-color: ${({ palette, theme }) =>
      palette ? theme.color[palette] : theme.color['black']};
    color: #fff;
    cursor: pointer;
  }
`;

export const ColorBtn = styled.button`
  width: ${({ width }) => width || '3.5rem'};
  height: ${({ height }) => height || '2rem'};
  padding: ${({ padding }) => padding || '.2rem'};
  color: #fff;
  border: 1px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  background: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  &:hover {
    background: none;
    color: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
    cursor: pointer;
  }
`;
