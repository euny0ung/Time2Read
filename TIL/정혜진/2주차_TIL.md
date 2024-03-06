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

## 🌳 회고

```
- 초기 세팅에서 헤매다 실습을 많이 못했다. 내일은 더 어려운 것을 해볼 것.
-
```

# 2024.03.06

특화 2주차 수요일 TIL

## 🌱 한 일

- three.js 실습
  - 어제 실습해봤던 회전하는 큐브 코드를 리액트랑 타입스크립트에 맞게 리팩토링
- three.js 실습 - 자전과 공전 따라해보기
- R3F 강의 듣기

  <br>

## 🌿 배운 것

#### Three.js 예제 코드를 React에서 적용해보면서 겪은 것

- DOM요소에 접근하는 방식에 대해 이해가 부족했다는 것을 알았음

- React와 Three.js를 함께 사용하는 경우, 일반적으로는 React 컴포넌트 내에서 **ref를 사용**하여 DOM 요소에 접근하고, Three.js 렌더러를 해당 DOM 요소에 마운트하는 방식이 권장됨

  - React의 데이터 흐름을 따르면서도 Three.js 씬을 효과적으로 관리할 수 있음

  **1) 처음에 시도했던 방법 :**

  **(1) `document.body.appendChild`**

  HTML 문서의 **`<body>`**에 직접 요소를 추가

  ```tsx
  //App.tsx

  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  ```

  **(2) `document.querySelector`**

  특정 CSS 선택자와 일치하는 첫 번째 요소를 찾아 해당 요소에 대한 조작을 수행

  ```tsx
  //App.tsx

  const renderer = new THREE.WebGLRenderer();
  document.querySelector("#app").appendChild(san);
  ```

  ```tsx
  //index.html

  <div id="app"></div>
  ```

  **2) 개선한 방법 :** **`useRef`**를 사용한 **`mountRef.current.appendChild`**

  React에서 **`useRef`**를 사용하여 컴포넌트가 마운트된 DOM 요소에 접근하고, 해당 요소 내에 다른 요소를 추가

  ```tsx
  //App.tsx

  import React, { useRef, useEffect } from "react";

  const App = () => {
    const mountRef = useRef(null); // Ref를 생성하여 DOM 요소에 접근

    useEffect(() => {
      const renderer = new THREE.WebGLRenderer();
      mountRef.current.appendChild(renderer.domElement);
      //...다른코드 생략

      return () => mountRef.current.removeChild(renderer.domElement); // 컴포넌트 언마운트 시 리소스 정리
    }, []);

    return <div ref={mountRef} />;
  };

  export default App;

  const mountRef = useRef(null);
  ```

  #### 개선한 코드 설명

  useRef 훅을 사용해 div 요소에 대한 참조(mountRef)를 생성하고, 이를 useEffect 훅 내에서 Three.js 렌더러를 초기화하고 해당 div에 마운트하는 데 사용

  컴포넌트가 언마운트될 때는 정리(clean-up) 함수가 실행되어 div에서 렌더러의 canvas를 제거함으로써, 메모리 누수를 방지

  이 방법을 통해 React 컴포넌트 내에서 Three.js 씬을 효율적으로 관리할 수 있으며, React의 데이터 흐름과 생명주기에 맞춰 외부 라이브러리를 사용

  ***

  #### 관련 개념 정리

  DOM 요소를 선택하고 조작하는 데 사용되는 세 가지 방식

  #### **1. `document.body.appendChild`**

  - **목적**: **`document.body`** 는 HTML 문서의 **`<body>`** 태그를 나타내는 객체. **`appendChild`** 메소드를 사용하면, 지정된 자식 노드(요소)를 **`document.body`** 의 자식 노드로 추가할 수 있음
  - **사용 사례**: 페이지의 가장 바깥층에 새로운 요소를 추가하고 싶을 때 사용. 예를 들어, 전역적인 알림이나 모달을 추가할 때 유용함
  - **차이점 및 한계**: 전역 **`body`** 태그에 직접적으로 요소를 추가하기 때문에, React와 같은 컴포넌트 기반의 라이브러리에서 사용 시 컴포넌트의 캡슐화를 깨뜨리고 메모리 누수를 일으킬 수 있음. 컴포넌트의 생명주기와 관리가 어려움

  #### **2. `document.querySelector`**

  - **목적**: **`document.querySelector`** 메소드는 제공된 선택자와 일치하는 문서 내의 첫 번째 Element를 반환함. CSS 선택자를 인자로 사용 가능
  - **사용 사례**: 특정 ID, 클래스, 태그 등을 가진 DOM 요소를 선택하여 조작하고 싶을 때 사용. 예를 들어, 특정 버튼에 이벤트 리스너를 추가하거나, 특정 섹션의 스타일을 변경하고자 할 때 유용함
  - **차이점 및 한계**: 정확한 선택자를 알고 있어야 하며, 선택자에 해당하는 요소가 문서에 존재하지 않으면 **`null`** 을 반환. React에서 DOM 요소를 직접 조작할 필요가 있는 경우에 사용 가능하지만, 가능한 한 React의 데이터 흐름 내에서 상태와 스타일을 관리하는 것을 권장

  #### **3. `useRef`를 사용한 `mountRef.current.appendChild`**

  - **목적**: React에서 **`useRef`** 훅을 사용하여 생성된 **`ref`** 객체의 **`current`** 속성은 컴포넌트가 마운트된 후 해당 DOM 요소를 참조합니다. **`appendChild`** 메소드를 사용하여, **`ref`** 로 참조된 요소에 자식 노드를 추가할 수 있습니다.
  - **사용 사례**: React 컴포넌트 내에서 외부 라이브러리(예: Three.js)를 사용하여 생성된 DOM 요소(예: 캔버스)를 특정 위치에 삽입하고 싶을 때 사용. 이 방식은 React의 라이프사이클과 데이터 흐름에 맞춰서 외부 요소를 통합 및 관리 가능
  - **차이점 및 이점**: **`mountRef.current.appendChild`** 를 사용하면 React 컴포넌트의 구조 내에서 요소를 조작하므로, **컴포넌트의 캡슐화를 유지하고 React의 라이프사이클에 따른 요소의 생성과 제거를 자연스럽게 관리 가능**. React의 **`ref`** 시스템을 활용하여 컴포넌트와 외부 DOM 요소 간의 상호 작용을 용이하게 함

  각 방식은 사용 목적과 상황에 따라 선택해 사용할 수 있으며, React 애플리케이션에서는 **`ref`** 와 함께 컴포넌트 내부에서 DOM 요소를 관리하는 **`mountRef.current.appendChild`** 방식이 가장 일관된 관리를 가능하게 함!

  #### **요약**

  **`document.body.appendChild`** 는 전역 **`<body>`** 요소에 직접 추가하는 가장 단순한 방법이고, **`document.querySelector`** 는 조금 더 구체적인 위치를 타겟팅할 때 사용

  React에서 **`useRef`** 와 **`mountRef.current.appendChild`** 를 사용하면, React의 라이프사이클과 상태 관리 시스템 내에서 안전하게 DOM 요소를 조작 가능

### Three.js 객체들과 관련된 함수에 타입을 지정하는 방법

- React와 TypeScript를 함께 사용할 때, 컴포넌트 내부에서 생성된 객체와 함수에 타입을 지정해주면 TypeScript의 타입 체킹 기능을 통해 더 안정적인 코드를 작성 가능
- 명령어 **`npm install @types/three --save-dev`**

### Property 'removeChild' does not exist on type 'never' 오류

- 오류 발생 코드

  ```typescript
  const mountRef = useRef(null);
  ```

  - **`Property 'removeChild' does not exist on type 'never'`** 오류는 TypeScript에서 **`mountRef.current`** 의 타입이 **`never`** 로 추론되었음을 나타냄.
  - 일반적으로 TypeScript가 **`mountRef.current`** 의 타입을 올바르게 추론하지 못했을 때 발생.
  - **`useRef`** 를 사용할 때 타입을 명시적으로 지정하지 않으면, 초기 값 **`null`**을 기반으로 타입을 추론하기 때문에 이러한 오류가 발생

- 개선 코드
  ```typescript
  const mountRef = useRef<HTMLDivElement | null>(null);
  ```
  - **`mountRef`** 에 대한 타입을 **`HTMLDivElement`** 로 명시적으로 지정해주면 문제 해결 가능
  - **`useRef`** 를 사용할 때, 참조하려는 DOM 요소의 타입을 **`useRef`** 에 제네릭 타입으로 전달하여 해결. 예를 들어, **`mountRef`**가 **`div`** 요소를 참조하게 한다.
  - 이렇게 하면 mountRef.current는 HTMLDivElement 타입 또는 null이 될 수 있으며, HTMLDivElement는 removeChild 메소드를 가지고 있기 때문에 위의 오류가 해결됨

<br>

## 🌳 회고

```
- 예제 코드가 있어도 내가 쓰는 환경에 맞춰 리팩토링해서 쓰려니 오래 걸렸다. 게다가 기초 지식이 없어서 더 오래 걸린 것 같다. 지금이라도 짚고 넘어가서 다행이다. 다신 안 헷갈릴 듯.
```

<br>
