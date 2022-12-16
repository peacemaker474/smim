import styled from 'styled-components';

const Text = styled.p`
  width: 80%;
  font-size: 1.2rem;
  word-break: keep-all;
  text-align: center;
  line-height: 2.5rem;

  & > strong {
    color: orange;
    font-weight: bold;
  }
`;

function DeleteText () {
  return (
    <Text>
      지금까지 스며들다를 이용해주셔서 감사합니다. 회원탈퇴를 진행할 경우, 해당 데이터는 삭제일로부터
      <strong> 7일간 보관됩니다. </strong>
      만약, 탈퇴한 회원을 복구시키고 싶으시면 고객센터에 문의해주시기 바랍니다.
    </Text>
  );
}

export default DeleteText;