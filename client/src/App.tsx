import styled from 'styled-components';
import { useAppSelector } from './redux/hooks';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App () {
  const { menuToggled } = useAppSelector((state) => state.toggle);

  console.log(menuToggled);

  return (
    <Wrapper>
      hi
    </Wrapper>
  );
}

export default App;
