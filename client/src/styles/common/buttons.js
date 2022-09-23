import React from 'react';
import styled from 'styled-components';

export const BorderBtn = styled.button`
  width: ${({ width }) => width || '3.5rem'};
  padding: ${({ padding }) => padding || '.2rem'};
  color: ${({ palette, theme }) => theme.color[palette]};
  border: 1.5px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 4px;
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
  border: 1.5px solid
    ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  border-radius: 4px;
  background: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
  &:hover {
    background: none;
    color: ${({ palette, theme }) => (palette ? theme.color[palette] : theme.color['black'])};
    cursor: pointer;
  }
`;

export const UpdateBtn = React.memo(styled(ColorBtn)`
  width: 100px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.yellow};
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin-right: 20px;
  align-self: flex-end;
  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.yellow};
    color: ${({ theme }) => theme.color.yellow};
  }
`);

export const ChangePwBtn = styled(ColorBtn)`
  width: 70%;
  height: 50px;
  background-color: ${({ theme }) => theme.color.yellow};
  border: ${({ theme }) => theme.color.yellow};
  font-size: 18px;
  &:hover {
    border: 1.5px solid ${({ theme }) => theme.color.yellow};
    color: ${({ theme }) => theme.color.yellow};
  }
`;

export const CancelBtn = styled(BorderBtn)`
  width: 70%;
  height: 50px;
  background-color: white;
  font-size: 18px;
  color: ${({ theme }) => theme.color.yellow};
  border: 1.5px solid ${({ theme }) => theme.color.yellow};
  &:hover {
    background-color: ${({ theme }) => theme.color.yellow};
  }
`;
