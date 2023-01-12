## 1. 서비스 소개


<br>

&nbsp; **새물은 우리 동네 세탁소 O2O 플랫폼**입니다. 새물은 ‘빨래하여 갓 입은 옷’을 의미하는 순우리말입니다.

&nbsp; 나를 위한 일상 속에 작은 정성을 담고 싶는 사람들이 누구나 쉽게 빨래하여 갓 입은 옷을 입을 수 있는 서비스를 만들겠다는 고민을 담았습니다.

<br>
 
![image](https://user-images.githubusercontent.com/98931081/212100775-d4dbb8d3-a692-4402-8d1a-88de795d44b3.png)

<br>

&nbsp; 새물은 **비대면 서비스 이용 증대로 위기에 처한 동네 세탁소**와 **바쁜 일상에도 정성을 더하고 싶은 소비자를 연결**하는 O2O(Online to Offline) 플랫폼입니다.

&nbsp; 나아가 배달, 세탁 노동자에게 새로운 일거리 플랫폼이 됩니다. 따라서 새물은 다음의 서비스들이 유기적으로 연결됩니다.

```
- 일반 사용자 서비스(B2C)
- 세탁/배달 파트너 서비스(B2B)
- 플랫폼 관리자 서비스
```

<br>

&nbsp; 사용자의 이용 환경에 따라 일반 사용자, 파트너 서비스는 모바일, 관리자 서비스는 PC 레이아웃으로 개발합니다.

<br>

![image](https://user-images.githubusercontent.com/98931081/212122170-77089c64-79f2-4f0f-aa28-bf33653b8666.png)

<br>

새물은 아래와 같은 **비즈니스 컨셉으로 기획**했습니다.

<br>

```
1.  너무 바빠서 세탁할 여유도 없는 소비자는 휴대폰으로 편하게 세탁 서비스 신청을 합니다.

2.  세탁물은 다음과 같은 여러 방법들로 세탁소로 전달됩니다.

    - 소비자는 직접 매칭된 세탁소에 세탁물을 전달
    - 문 앞에 세탁물을 두면 배달 노동자가 동네 세탁소로 배달
    - 문 앞에 두면 세탁 노동자가 수거

3.  배달 노동자가 세탁소로 배달하면 동네 세탁소에서 깨끗이 세탁 후 고객에게 전달하거나

4.  세탁 노동자는 근처 코인세탁소 등을 이용하여 세탁하고 고객에게 다시 전달합니다.

```

 <br>

&nbsp; 다만 이번 프로젝트에서 구현한 v 1.0은 다음의 기능들을 우선적으로 구현했습니다.

<br>

```

- O2O 플랫폼 기본 기능
- 세탁 파트너 서비스
- 세탁 현황 조회
- 세탁물 정찰제 기능

```

<br>

&nbsp; 차후에 배달/세탁 플랫폼 노동자 연계 기능, 동네 기반 매칭 기능을 추가할 예정입니다.

<br>

## 2. 프로젝트 구조 및 주요 **기술 스택**


<br>

![image](https://user-images.githubusercontent.com/98931081/212101507-8bf8963f-9b60-43c8-8206-f0baf132b3bb.png)


### (1) **FE: CSR SPA / Atomic Design Pattern**

- React (Core SPA Framwork)
- styled components (Style)
- React Router (Client Side Routing)
- Redux Toolkit (Client Statement Management)
- React Hook Form (Form Statement Management)
- React Query (Server Statement Management)
- AXIOS (Http Client Library)
- VITE (Build)

<br>

### (2) **BE: 3 Layer achitecture**

- nest JS (NodeJS framework)
- TYPEORM (ORM)
- MySQL (DB)
- NginX (Webserver)

<br>


## 3. 각 팀원의 역할과 기여한 부분, 고민

<br>

<table>
    <thead>
        <tr>
            <th> 이름
            </th>
            <th >역할
            </th>
            <th>담당 부분
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=2 >
            신현규
            </td>
            <td >
            백엔드 서버 개발
            </td>
            <td>
            1. DB 설계, API 문서 작성, API 서버 배포 및 운영 <br> 2. (User) 회원 관련 CRUD, JWT 인증 및 인가 처리 API 개발 <br> &nbsp; &nbsp; - 회원가입 / 로그인, 정보 조회 / 정보 수정, 삭제 기능 구현 <br> 3. (Wallet) 지갑 관련 CRUD API 개발 <br> &nbsp; &nbsp;- 지갑 생성 / 잔액 조회 / 충전 및 결제 / 삭제 기능 구현 <br> 4. (Partner) 세탁소 관련 CRUD API 개발 <br> &nbsp; &nbsp; - 세탁소 생성 / 정보 조회 / 정보 수정 / 삭제 기능 구현 <br> 5. (Admin) 파트너 승인 기능 API 개발                  
            </td>
        </tr>
        <tr>
            <td>
            고민
            </td>
            <td>
            - (효과적인 Model) 좋은 모델을 바탕으로 프로젝트를 진행할 시 개발 생산성을 크게 높일 수 있다. 이를 위해 DB 모델링에 대한 많은 고민을 했다. 하지만 지식이 부족하여 좋은 모델을 만들지 못 한 것 같다는 생각에 많이 아쉬웠다. <br> <br> - (좋은 Achitecture) 좋은 아키텍처에 대한 고민을 많이 했다. Controller → Service → Repository의 구조를 이용했는데 각 레이어별 역할과 책임에 대한 고민을 많이 했다. 프로젝트를 진행하면서 계속해서 생각이 바뀌어서 결국 프로젝트 막바지에 나름대로 각 레이어의 역할과 책임을 정의할 수 있었다. 이를 통해 가독성 있고 유지보수가 용이한 구조를 채택하지 못 한 점이 아쉬웠다.
            </td>
        </tr>
        <tr>
            <td rowspan=2 >
            홍정완
            </td>
            <td >
            백엔드 서버 개발
            </td>
            <td>
             1. DB 설계, API 문서 작성, API 서버 배포 및 운영 <br>
             2. (Product) 세탁 상품 리소스 CRUD API 개발 <br>
              &nbsp; &nbsp; - 관리자 권한 상품 데이터 생성 / 상품 데이터 조회 / 상품 정보 수정, 삭제 기능 구현 <br>
             3. (Order) 세탁 주문 리소스 CRUD API 개발<br>
             &nbsp; &nbsp; - 주문 생성 / 주문 조회(주문 상태, 이용자 정보) / 주문 상태에 따른 주문 정보 수정 / 관리자 권한시 주문 삭제 / 주문 테이블 관계 설정 및 조회시 외부 정보 포함 기능 구현 <br>
             4. (OrderProducts) 주문 상품 스냅샷 리소스 CRUD API 개발 <br>
             &nbsp; &nbsp;- 주문 생성시 상품 정보 별도 생성 / 주문 조회시 연동 조회 / 트랜잭션 별도 관리 / 트랜잭션 제어로 오류 발생시 전체 롤백처리 기능 구현
             </td>
        </tr>
        <tr>
            <td>고민</td>
            <td> - (RDB 사용) 관계형 데이터베이스에 대해 이론적으로 이해하고 있었으나 잊고 있던 부분도 있고, 요구사항에 맞게 실제로 구현하는 과정이 쉽지는 않았다. TypeORM에서 기능적으로 제공하는 부분도 있었지만 매뉴얼을 숙지하는 것 외에도 RDB에 대한 근원적인 이해가 필요했다.
            관계를 맺고 있는 테이블 간에 필요한 데이터를 참조할 일이 잦았는데, 이러한 부분을 구현하는 과정에서 개념적인 이해와 RDB의 장점을 실감할 수 있었다.
            <br><br> - (Transaction 제어) 주문 상품 스냅샷 기능을 하는 테이블을 구성하고 이를 주문 생성과 동시에 데이터가 입력되도록 구상함에 있어 트랜잭션 제어가 불가피했다. 다행히 TypeORM에서 기본적으로 제공하는 트랜잭션 제어 기능이 있었는데, 이를 이해하고 제약사항들을 피해 활용하는 것이 쉽지 않았지만 해냈다.
            </td>
        </tr>
    </tbody>
</table>

<br>

## 4. 백엔드 세부 **기능 설명 - server API**


<br>

### (1) DB 스키마

<br>

- [Semul ERD](https://www.erdcloud.com/d/AwTJnuj73mMjkEggB)

<br>

![image](https://user-images.githubusercontent.com/98931081/212104804-5a552fb0-1b4c-412e-8f53-616b4d662a8d.png)

<br>

### (2) API 문서

<br>

- [ API 명세서 ](http://bit.ly/3CtpS0i)

<br>

## 4. 프론트엔드 세부 **기능 설명 - UI/UX**

---

<br>

### (1) 와이어프레임(Figma)

<br>

- [와이어 프레임](https://www.figma.com/file/49RfU1jP7U7lSoYo4DDSkP/WireFrame?node-id=0%3A1&t=d0KmmT6qabARyYLN-0)

<br>

### (2) 세부 페이지 기능 소개

<br>

- [B2C 서비스 세부 페이지 기능 소개](https://www.notion.so/B2C-d1cf8be8008d49c4a7484345feea49f2)

<br>

- [B2B 서비스 세부 페이지 기능 소개](https://www.notion.so/B2B-68fd171d9a8144baabec7c49f2169d96)

<br>

- [Admin 서비스 세부 페이지 기능 소개](https://www.notion.so/Admin-b608e249fe2a4f0abbb9c6221238fcf7)

<br>

## 6. 주요 성과

---

<br>

- **엘리스 SW 트랙 3기 프로젝트II 대상 수상(종합점수 1위)**

<br>

![image](https://user-images.githubusercontent.com/98931081/212105325-d98bd76a-86fe-4bb1-b6af-5c0205a4b950.png)
