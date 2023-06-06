import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { H1, Paragraph } from './Components';
import { Link } from 'react-router-dom';
import KakaoLogin from 'react-kakao-login';

function MainPage() {

    const CLIENT_ID = "6f0cc6b79f0415550390c0c0e47a9f07";

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [email, setEmail] = useState(null);

    // 성공 시 동작을 정의
    const onSuccess = async (data) => {
        // 카카오 로그인 성공 시 오는 데이터(토큰을 비롯한 여러 데이터들의 객체가 명시)
        setLoggedIn(true);
        console.log(isLoggedIn, data);
        setAccessToken(data.response.access_token);
        setImgUrl(data.profile.properties.profile_image);
        setNickname(data.profile.properties.nickname);
        setEmail(data.profile.kakao_account.email);
        console.log(accessToken, imgUrl, nickname, email);
        localStorage.setItem("accessToken", data.response.access_token);
        localStorage.setItem("profileUrl", data.profile.properties.profile_image);
        localStorage.setItem("email", data.profile.kakao_account.email);
        localStorage.setItem("userName", data.profile.properties.nickname)
    }

    // 실패 시 동작을 정의
    const onFailure = (error) => {
        setLoggedIn(false);
        console.log(isLoggedIn, error);
    }

    const logout = () => {
        setLoggedIn(false);
        setAccessToken(null);
        setImgUrl(null);
        setNickname(null);
        setEmail(null);
        console.log(accessToken, imgUrl, nickname, email);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profileUrl")
        localStorage.removeItem("email")
        localStorage.removeItem("userName")
    }

    const Section = styled.div`
        background-image: linear-gradient(103.24deg, rgba(0, 8, 29, 0.9) 23.83%, rgba(0, 8, 29, 0.3) 96.1%), url("https://assets.nflxext.com/ffe/siteui/vlv3/ceb3b1eb-2673-4dd9-a6e3-0cd7a5e130ee/d110b57b-6acd-48f7-9626-01e92c747b19/KR-ko-20230522-popsignuptwoweeks-perspective_alpha_website_large.jpg");
        width: 100%;
        height: 800px;
        position: relative
    `;

    // width를 percentage로 설정한 상태에서, left: 0;, right: 0;로 설정함으로서 가로로 꽉 차게 설정하고, margin-left: auto;와 margin-right: auto;는 가운데 정렬을 의미. top을 설정하여 부모 요소(relative)로부터 자식요소(absolute)가 30px 떨어지도록 함.
    const Nav = styled.nav`
        top: 30px;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        display: flex;
        justify-content: space-between;
        position: absolute;
    `;

    const Logo = styled.img`
        width: 12%;
        min-width: 100px;
        display: block;
    `;

    const Btn = styled.img`
        width: 12%;
        min-width: 120px;
        display: block;
        &:hover{
            cursor: pointer;
        }
    `;

    const Description = styled.div`
        width: 80%;
        position: absolute;
        display: block;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        top: 100px;
        padding: 80px;
    `;

    const UserInfo = styled.div`
        width: 20%;
        height: 100%
        min-width: 300px;
        display: flex;
        flex-direction: row;
        position: absolute;
        right: 100px;
    `;

    const ProfileImage = styled.img`
        width: 30%;
        border-radius: 50%;
    `;

    const UserInfoText = styled.div`
        width: 70%;
        height: 100%;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        color: white;
        font-size: 16px;
    `;

    const Nickname = styled.div`
        width: 100%
        font-weight: 900;
    `;

    const Email = styled.div`
        width: 100%;
    `;

    const Logout = styled.button`
        width: 50%;
        background-color: white;
        color: black;
        border: 3px solid gray;
        border-radius: 10%;
    `;
    
  return (
    <Section>
        <Nav>
            <Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png?20190206123158'/>
            {accessToken ? null : (
                <KakaoLogin
                    token={CLIENT_ID}
                    onSuccess={onSuccess}
                    onFailure={onFailure} />
            )}

            {accessToken ? (
                <UserInfo>
                    <ProfileImage src={localStorage.getItem("profileUrl")} />
                    <UserInfoText>
                        <Nickname>{localStorage.getItem("userName")}</Nickname>
                        <Email>{localStorage.getItem("email")}</Email>
                        <Logout onClick={logout}>로그아웃</Logout>
                    </UserInfoText>
                </UserInfo>
            ) : null}
            

        </Nav>
        <Description>
            <H1>영화, 시리즈 등을 무제한으로</H1>
            <Paragraph>다양한 디바이스에서 시청하세요. 언제든 해지하실 수 있습니다.</Paragraph>
            <Paragraph>시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</Paragraph>
        </Description>
    </Section>
        
  )
}

export default MainPage