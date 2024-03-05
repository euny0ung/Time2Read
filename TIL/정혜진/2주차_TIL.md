# 2024.03.04

특화 2주차 월요일 TIL

## 🌱 한 일

- 주간 스크럼(+Jira)
- 데일리 스크럼
- 전문가 사전 질문 구체화
- TypeScript 강의 수강
  - 2. TypeScript 기본형, 배열, 튜플, 객체 타입, 함수 타입
  - 3. Enum
  - 4. interface
  - 5. 그 밖의 타입들(리터럴,타입별칭,유니온,인터섹션...등)
  - 6. 제네릭
  - 7. tsconfig.json
- 크롤링

<br>

## 🌿 배운 것

### TypeScript의 타입들

> 리터럴 타입

- 특정 숫자나 문자열 같이 변수의 같을 타입으로 하는 타입
- 각 리터럴 타입은 string이나 number같은 더 큰 범위의 타입에 포함된다. 그러나 역은 불가능

> 타입 별칭

- 복잡한 타입에 이름을 붙여 재사용하고 싶을 때 사용

> Union

- A거나 B인 경우를 타입으로 만들고 싶을 때 사용

> InterSection

- A와 B의 성질을 모두 가지는 타입을 만들고 싶을 때 사용

> keyof 연산자

- 객체 타입에서 프로퍼티 이름들을 모아서 Union한 타입으로 만들고 싶을 때 사용

> typ3of 연산자

- js 코드에서 사용하면 결과값이 문자열로 나오지만, ts에서 사용할 때는 결과값이 타입스크립트의 타입으로 나온다.

### Enum vs. Interface vs. 타입 별칭

> Enum 과 타입 별칭

- 거의 같은 역할을 하는 두 코드 중에서 어떤 것을 써야할까

  - Enum (권장)

    ```typescript
    enum UserType {
      Admin = "admin",
      User = "user",
      Guest = "guest",
    }

    const role = UserType.Admin;
    console.log(role === UserType.Guest);
    ```

  - 타입 별칭과 Union을 사용

    ```typescript
    type UserType = "admin" | "user" | "guest";

    const role: UserType = "admin";
    console.log(role === "guest");
    ```

- 코드의 양으로 보면 타입 별칭을 쓰는 것이 나아 보이지만 타입 별칭은 타입스크립트에서만 의미가 있다. Enum 과 달리 타입 별칭은 자바스크립트로 트랜스 파일을 했을 때 객체를 만드는 것이 아니라 단순히 값만 사용한다.
- Enum 문법 권장

<br>

> Interface 와 타입 별칭

- 거의 같은 역할을 하는 두 코드 중에서 어떤 것을 써야할까

  - Interface (권장)

    ```typescript
    interface Entity {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    }

    interface User extends Entity {
      username: string;
      email: string;
    }
    ```

  - 타입 별칭

    ```typescript
    type Entity = {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    };

    type User = Entity & {
      username: string;
      email: string;
    };
    ```

- Interface의 상속과 Intersection의 비교

  - Intersection의 상속과 달리 Intersection은 두 가지 이상의 타입을 한 번에 합칠 수 있다. 그러나 Interface로 불가능한 것은 아니다.
  - Interface의 목적에 맞는 경우라면 Interface 권장

  ```typescript
  interface Entity {
    id: string;
  }

  interface TimestampEntity extends Entity {
    createdAt: Date;
    updatedAt: Date;
  }

  interface User extends TimestampEntity {
    username: string;
    email: string;
  }
  ```

  ```typescript
  type Id = {
    id: string;
  };

  type Entity = {
    createdAt: Date;
    updatedAt: Date;
  };

  type User = Id &
    Entity & {
      username: string;
      email: string;
    };
  ```

  <br>

> 그렇다면 타입 별칭은 언제?

- 타입 별칭은 말그대로 타입의 이름을 정하는 문법이다.
- 따라서 복잡한 타입을 만들고 그 타입을 여러 곳에서 쓸 때 사용하면 좋다.
  ```typescript
  type Point = [number, number];
  type SearchQuery = string | string[];
  type Result = SuccessResult | FailedResult;
  type Coupon = PromotionCoupon | EmployeeCoupon | WelcomCoupon | RewardCoupon;
  ```

<br>

## 🌳 회고

### 오늘 잘한 일 및 개선 방안

```
- 강의 듣기
- 강의 내용 노션에 정리
- 저녁먹고 도서관 가서 공부(내일도 할 것)
```

<br>

# 2024.03.05

특화 2주차 화요일 TIL

## 🌱 한 일

- FE 기능 구체화 회의
- 컨벤션 정하기
  - 코드, 브랜치, 커밋 컨벤션
  - 폴더구조, 네이밍 규칙
- 타입스크립트 강의 남은 거 다 듣기
- three.js 공부
  <br>

## 🌿 배운 것

### three.js 기본 4요소

1. Scene (씬)

- 3D 공간을 나타내는 컨테이너 역할을 합니다.
- 카메라, 오브젝트, 조명 등을 포함합니다.
- 배경색 설정 가능

2. Objects (오브젝트)

- 씬에 표시되는 3D 모델, 메시 등을 의미합니다.
- 기하학적 형태 (Geometry)와 재질 (Material)을 조합하여 생성
- 여러 오브젝트를 그룹화하여 관리 가능

3. Camera (카메라)

- 3D 공간을 시점에 따라 렌더링하는 역할을 합니다.
- 투시도 (Perspective) 또는 평행 투영 (Orthographic) 선택 가능
- 위치, 시야각, 종횡비 등을 설정하여 렌더링 결과 조절 가능

4. Renderer (렌더러)

- 씬을 2D 화면에 표시하는 역할을 합니다.
- WebGL을 사용하여 3D 그래픽을 렌더링
- 캔버스 크기, 안티엘리어싱 등을 설정 가능

#### three.js 코드 실습

1. 라이브러리 import 및 씬 설정

   - THREE 라이브러리 import
   - Scene 객체 생성 및 배경색 설정

   ```TypeScript
   import * as THREE from "three";

   // 씬(Scene) 생성
   const scene = new THREE.Scene();
   scene.background = new THREE.Color(0xeeeeee); // 씬 배경색 설정
   ```

2. 카메라 생성 및 설정

   - PerspectiveCamera 객체 생성
   - 시야각, 종횡비, 근접 평면, 원거리 평면 설정
   - 카메라 위치 설정 (z축 방향으로 5만큼 이동)

   ```TypeScript
   // 카메라(Camera) 생성
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.z = 5;
   ```

3. 렌더러 생성 및 설정

   - WebGLRenderer 객체 생성
   - 렌더러 크기 설정 (윈도우 크기와 동일하게 설정)
   - 렌더러 캔버스를 HTML body에 추가

   ```TypeScript
   // 렌더러(Renderer) 생성
   const renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);
   ```

4. 메시 생성 및 씬에 추가

   - BoxGeometry (큐브 형태) 및 MeshPhongMaterial (Phong 재질) 생성
   - Mesh 객체 생성 (기하학적 형태와 재질을 결합)
   - 메시를 씬에 추가

   ```TypeScript
   // 기하학적 형태(Geometry)와 재질(Material)로 메시(Mesh) 생성
   const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
   const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xabcdef });
   const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
   scene.add(cube);
   ```

5. 광원 생성 및 설정

   - SpotLight 객체 생성 및 씬에 추가
   - AmbientLight (환경 조명) 객체 생성 및 추가
   - SpotLight 타겟을 큐브로 설정

   ```TypeScript
   //광원 생성
   const spotLight = new THREE.SpotLight(0xffffff);
   scene.add(spotLight);

   // 환경 조명 추가
   const ambientLight = new THREE.AmbientLight(0x404040);
   spotLight.target = cube;
   scene.add(ambientLight);
   ```

6. 지면 생성 및 설정

   - PlaneGeometry (평면 형태) 및 MeshPhongMaterial (Phong 재질)

   ```TypeScript
   // 지면 생성
   const planeGeometry = new THREE.PlaneGeometry(500, 500);
   const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
   const plane = new THREE.Mesh(planeGeometry, planeMaterial);
   plane.rotation.x = -Math.PI / 2;
   plane.position.y = -2;
   plane.receiveShadow = true; // 지면이 그림자 받기
   scene.add(plane);
   ```
7. 결과
  ![image](/uploads/51fbd4ce45a145e861b6af6a538f9cb7/image.png)

## 🌳 회고

```
- 초기 세팅에서 헤매다 실습을 많이 못했다. 내일은 더 어려운 것을 해볼 것.
-
```
