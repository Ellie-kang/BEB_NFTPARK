import React, { useState, useContext, useEffect } from "react";
import { UseContext } from "../User/UserContextProvider";
import "./Detail.css";
import {
  Card,
  Typography,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getString, isRegisterProduction, isEnter ,entry } from "../helper/web3";
import { Loading } from "../component/Loading";
import login from "../component/kakao_login_medium.png";

export const Detail = ({ concertinfo }) => {
  const { id } = useParams();
  const { user, setUsers } = useContext(UseContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(); // 콘서트 원가 설정 true/false
  const [isEntered, setIsEntered] = useState(); // 유저 응모 상태 treu/false
  const [isLogin, setIsLogin] = useState(false); // 유저 응모 상태 treu/false

  const loginHandler = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=408eb292ea89d448bfc9bc935126f27b&redirect_uri=http://localhost:5000/user/auth/kakao&response_type=code";
  };

  const _entry = async() => {
    try {
      setIsLoading(true)
      const result = await entry(user.nickname,concertinfo[id - 1].title,user.address)
      if(result.status) {
        setIsEntered(true)
      }
      setIsLoading(false);
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    try {
      if(user.address !== "") {
        setIsLogin(true)
      }
      setIsLoading(true);
      const titleTypeBytes = getString(concertinfo[id - 1].title);
      const check = async () => {

        // 콘서트 원가 설정이 됬는지 확인
        const _isRegister = await isRegisterProduction(titleTypeBytes);
        setIsRegister(_isRegister);

        if (_isRegister) {
          // 유저 응모했는지 안했는지 확인
          const _isEnter = await isEnter(titleTypeBytes, user.address);
          setIsEntered(_isEnter);
        }
      };
      check();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="detail_container">
      {isLoading ?<Loading/> :<></> }
      <div className="detailcontainer_line" />
      <div className="detail_info">
        <img
          src={concertinfo[id - 1].image}
          alt="concertimg"
          className="detailimg"
        />
        <Card sx={{ width: 370, m: 2 }}>
          <CardContent>
            <Divider textAlign="left">장소</Divider>
            <Typography className="text_info" align="center">
              {concertinfo[id - 1].place}
            </Typography>
            <Divider textAlign="left">공연날짜</Divider>
            <Typography className="text_info" align="center">
              {concertinfo[id - 1].performancePeriod}
            </Typography>
            <Divider textAlign="left">출연진</Divider>
            <Typography className="text_info" align="center">
              {concertinfo[id - 1].singer_name}
            </Typography>
            <Divider textAlign="left">관람연령</Divider>
            <Typography className="text_info" align="center">
              만 {concertinfo[id - 1].ageLimit}세이상
            </Typography>
          </CardContent>
        </Card>
      </div>
      <Card sx={{ width: 480 }}>
        <CardHeader title={concertinfo[id - 1].title} />
        <CardContent>
          <h3>KRW 130,000</h3>
          <div className="detail_line" />
          <Typography variant="body2" gutterBottom>
            응모기간
          </Typography>
          <Typography variant="body1">2023.01.20 ~ 2023.01.24</Typography>
          <div className="detail_line" />
          <Typography variant="body2" gutterBottom>
            당첨자 발표
          </Typography>
          <h2>2023.01.25</h2>
          <div className="detail_line" />
          <Typography variant="body2" gutterBottom>
            당첨자 구매일
          </Typography>
          <Typography variant="body1">2023.01.25 까지</Typography>
          <div className="detail_line" />
          <Typography variant="body2" gutterBottom>
            참여자 수
          </Typography>
          <Typography variant="body1" gutterBottom>
            1000명 참여
          </Typography>
          <div className="separate_line" />
          <Typography sx={{ mt: 1 }}>- 응모 이후 수정은 불가합니다.</Typography>
          <Typography sx={{ mt: 1 }}>
            - 당첨 결과는 마이페이지에서 확인하실 수 있습니다.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            - 당첨 시, 문자로 안내 등이 발송됩니다.{" "}
          </Typography>
          <div className="detail_line" />
          {isLogin ? (isRegister ? (
            isEntered ? (
              <button className="disabled_btn" disabled={true}>
                응모완료
              </button>
            ) : (
              <button className="entry_btn" onClick={async() => await _entry()}>응모하기</button>
            )
          ) : (
            <button className="disabled_btn" disabled={true}>
              응모 대기중
            </button>
          )):<button className="kakao_btn" type="button" onClick={loginHandler}>
          <img className="kakao_login" src={login} alt="kakao login" />
        </button>}
        </CardContent>
      </Card>
    </div>
  );
};
