![Untitled](README/Untitled.png)

## **“세상에 없던 암표 없는 티켓팅 플랫폼”**
<br/>

> **Team NFTPARK 소개**
> 

안녕하세요. Team NFTPARK 입니다. 저희 Team NFTPARK은 코드스테이츠 **커리어 **체린지 *4*기 4명으로 구성되었으며, B2C 티켓팅 사이트 인터파크(INTERPARK)에 NFT 기술을 결합하여 “NFTPARK”라는 프로젝트를 진행하게 됬습니다. 사회적으로 대두되는 “암표거래” 문제를 해결하는것이 저희 NFTPARK” 프로젝트의 궁국적인 목표입니다.

해당 프로젝트는 2.5주 동안 진행되었으며, WEB2와 WEB3가 결합된 NFT 티켓팅 B2C 플랫폼입니다. 티켓을 NFT로 구현하여 Smart Contract로 높은 가격으로 재판매되는 잘못된 “암표”시장을 해결하기 위해 노력했습니다.

| 이름 | 역할 | 이메일 | Github |
| --- | --- | --- | --- | 
| 강영아 | 프론트엔드 | kya034203@gmail.com | https://github.com/Ellie-kang |
| 강석민(팀장) | 스마트컨트랙트 | rkdtjrals2@naver.com | https://github.com/smkang2 |
| 최원혁 | 스마트컨트랙트 | imelon279@gmail.com | https://github.com/imelon2 |
| 신승훈 | 백엔드, 데이터베이스 | sinsu19012@gmail.com | https://github.com/sinsu1004 |
<br/>

> **NFTPARK 주요 기능**
> 
- 커뮤니티 유저가 티켓구매 응모에 참여
- 티켓 구매 담청자 추첨
- 티켓 취소(환불) 및 소각
- 마켓플레이스에서 원가보다 낮은 가격으로만 거래
- 화이트리스트 판매
<br/>

> **기술 스택**
> 

![Untitled](README/Untitled_1.png)
<br/>

## How To Play  **NFTPARK**

> git clone
> 

```jsx
# Clone this repository
$ git clone git@github.com:codestates-beb/BEB-06-returnFarm.git
```
<br/>

> .env setting
> 

```jsx
## client en
REACT_APP_PARKt_ERC20 = 
REACT_APP_PARK_ERC721 = 
REACT_APP_Ticketing = 
REACT_APP_Market = 

REACT_APP_INFURA_API_KEY = 

REACT_APP_PROJECTID = 
REACT_APP_PROJECTSECRET = 

REACT_APP_NMEMONIC = 
PRIVATEKEY = 

##basic_server env
DB_NAME = 
USER_NAME = 
USER_PASSWD = 
DB_HOST = 
DB_PORT = 
client_id = 
redirect_uri = 
SECRET_KEY = 

PARKt_ERC20 = 
PARK_ERC721 = 
Ticketing = 
Market = 

NMEMONIC = 
INFURA_API_KEY = 

## NFTPARK_SERVER
DB_NAME = 
USER_NAME = 
USER_PASSWD = 
DB_HOST = 
DB_PORT = 
client_id = 
redirect_uri = 
SECRET_KEY = 

INFURA_KEY = 
REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

SENS_SERVICE_ID = 
SENS_SECRET_KEY = 
SENS_ACCESS_KEY = 
```
<br/>

> Client
> 

```jsx
$ npm install 
$ npm start
```
<br/>

> basic_server
> 

```jsx
$ npm install 
$ npm start
```
<br/>

> NFTPARK_SERVER
> 

```jsx
$ npm install 
$ npm start
```
<br/>

## NFTPARK 특징 기술

> Mui, react-slickl
> 

  Mui은 리액트와 호환성이 높고, 충분한 개발자 자료와 컴포넌트들이 있어 빠르게 퀄리티 있는 리액트 앱을 개발할 수 있어서 mui-material을 선택했습니다. 그리고 react-slick은 기본 CSS 파일을 제공하고 있고, 다양하게 수정도 가능하여 단시간에 Carousel을 제작할 수 있어서 선택했습니다.
<br/>

> 스마트컨트랙트, ERC20, ERC721
> 

  스마트컨트랙에 콘서트 티켓의 저작자가 컨텐츠의 원가를 저장하여, NFT 거래 시 원가보다 높은 거래를 억제하는 솔루션으로 문제를 해결했습니다. 만약, 콘서트 저작자가 컨텐츠의 가격을 스마트 컨트랙 에 저장하지 않을 경우, 해당 티켓의 응모는 위와 같이 UI 상에 [응모 대기중]으로 응모가 보여주며 버튼이 비활성화 됩니다. 컨텐츠의 저작자는 위와 같이 API를 통해 콘서트의 원가를 설정하여, 원가보다 높은 가격으로 티켓(NFT)이 거래되는 상황을 막을 수 있습니다. 콘서트의 원가가 설정이 되면 위와 같이 UI상에 [응모하기] 버튼이 활성화됩니다.
  응모는 콘서트 당 1회만 가능하며, 이미 응모가 됬을 경우 UI 상에 [응모완료]가 보여지면 버튼은 비활성화 됩니다. EVM내에서 응모 기능은 위와 같은 코드로 구현됬습니다. 응모 데이터는 Smart Contract Data Storage가 아닌, Event Logs를 활용하여 Block의 Transaction Receipt에 저장됩니다.
  isEntry[title][applicant]를 통해 응모는 1회만 진행 할 수 있도록 구현했습니다. NFT PARK에서 진행되는 응모는, 모두가 공평하게 응모하여 티켓을 구매할 수 있는 기회를 얻습니다. Event Logs를 통해 Block의 Transaction Receipt에 저장된 응모 내역을 불러와 당첨자를 추첨합니다. 당첨자는 위와 같은 코드로 무작위로 정해진 인원을 선별하여 티켓(nft)구매권을 지급합니다. 응모에 당첨된 사람은 MyPage의 [The NFT 응모 내역]에서 [구매] 버튼을 눌러 티켓을 구매 할 수 있습니다. 구매하기 버튼을 누르면, 사용자의 지갑주소로 티켓의 KRW 가격만큼 ERC20 토큰이 민팅됩니다. 그리고 민팅된 토큰을 사용하여 NFT가 민팅됩니다. MyPage의 [구매내역 확인 & 취소]에 [상세] 버튼을 누르면 위와 같은 UI가 나타나게 됩니다. [취소하기] 버튼을 누르면 ERC721 Smart Contract의 Burn()함수를 통해 해당 NFT는 소각됩니다.
<br/>

> Oauth2.0, 네이버 클라우드 SMS api, reddis
> 

  백엔드 분야에서는 사용자에 편리를 위해 로그인 관리는 Oauth2.0 방식에 카카오로그인으로 구현하였고, 네이버 클라우드 SMS API를 활용해 추첨이 끝나면 당첨자에게 문자 메세지 발송하는 기능도 구현했습니다. 응모를 하게되면 DB에도 정보를 저장하게 되는데 이부분은 레디스에 저장을 하고 추첨이 끝나면 DB에 한번에 insert 시키는 방식으로 db에 부하를 줄였습니다. 또 sets로 정보를 저장하기 때문에 SCARD 명령어로 현재 응모자 수를 반환 합니다