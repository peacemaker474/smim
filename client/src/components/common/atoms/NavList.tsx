import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface LinkProps {
  url: string;
  current: boolean;
  children: string;
}

const GenerationLink = styled(Link)<{ current: boolean }>`
  font-size: 1rem;
  text-decoration: none;
  color: ${({ theme, current }) => (current ? `${theme.color.black}` : `${theme.color.gray}`)};
  transition: all 0.3s ease 0s;
  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.color.black};
    font-size: 1.1rem;
  }
  font-weight: ${({ current }) => (current ? `bold` : `none`)};
  border-bottom: 2px solid
    ${({ current, theme }) => (current ? `${theme.color.black}` : 'transparent')};
`;

const List = styled.li`
  &:nth-child(6) {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

function NavList ({ url, current, children }: LinkProps) {
  return (
    <List>
      <GenerationLink to={url} current={current}>
        {children}
      </GenerationLink>
    </List>
  );
}

export default NavList;