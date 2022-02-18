import React, { useState } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {menuClose} from '../../redux/toggle/action';

const MobileNavBox = styled.section`
  width: 45vw;
  height: 100vh;
  position: fixed;
  top: 10%;
  right: 0;
  background-color: white;
  display: none;
  @media ${({theme}) => theme.device.ipad} {
    display: flex;
    justify-content: flex-end;
    box-shadow: rgb(0 0 0 / 50%) -16px 0px 16px -16px
  }
`;

const MobileLists = styled.ul`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const MobileList = styled.li`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const MobileLink = styled(Link)`
  font-size: 26px;
  text-decoration: none;
  color: ${({theme}) => theme.color.gray};
  cursor: pointer;
  @media ${({theme}) => theme.device.iphoneSE} {
    font-size: 18px;
  }
  @media ${({theme}) => theme.device.fold} {
    font-size: 17px;
  }
`;

const MobileSignBox = styled.div`
  width: 90%;
  @media ${({theme}) => theme.device.iphoneSE} {
    width: 95%;
  }
  @media ${({theme}) => theme.device.fold} {
    width: 100%;
  }
`;

const MobileSignIn = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  cursor: pointer;
  @media ${({theme}) => theme.device.iphoneSE} {
    font-size: 15px;
    margin: 5px 0;
  }
  @media ${({theme}) => theme.device.fold} {
    font-size: 14px;
    margin: 5px 0;
  }
`;

const MobileSignUpTitle = styled.span`
  font-size: 13px;
  color: ${({theme}) => theme.color.gray};
  font-weight: 500;

  @media ${({theme}) => theme.device.iphoneSE} {
    display: block;
    font-size: 11px;
    margin-bottom: 5px;
  }
  @media ${({theme}) => theme.device.fold} {
    font-size: 10px;
    display: block;
    margin-bottom: 5px;
  }
`;

const MobileSignUp = styled(Link)`
  color: ${({theme}) => theme.color.black};
  font-weight: bold;
  font-size: 15px;
  padding-left: 5px;

  @media ${({theme}) => theme.device.iphoneSE} {
    font-size: 13px;
    padding-left: 0;
  }

  @media ${({theme}) => theme.device.fold} {
    font-size: 12px;
    padding-left: 0;
  }
`;

function MobileNavBar () {
  const [test, setTest] = useState(true);
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(menuClose());
    setTest(!test);
  }
  return (
    <MobileNavBox>
        <MobileLists>
          <MobileList>
            {test ? (
              <MobileSignBox>
                <MobileSignIn onClick={handleToggle}> 로그인 하기 </MobileSignIn>
                <MobileSignUpTitle> 아직 회원이 아니신가요? </MobileSignUpTitle>
                <MobileSignUp to="/signup"> 회원가입 </MobileSignUp>
              </MobileSignBox>
            ) : (
              <MobileLink to="/my"> 마이페이지 </MobileLink>
            )}
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation10"> 10대에게 </MobileLink>
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation20"> 20대에게 </MobileLink>
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation30"> 30대에게 </MobileLink>
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation40"> 40대에게 </MobileLink>
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation50"> 50대에게 </MobileLink>
          </MobileList>
          <MobileList>
            <MobileLink to="/post/view/generation60"> 60대에게 </MobileLink>
          </MobileList>
        </MobileLists>
    </MobileNavBox>
  );
}

export default MobileNavBar