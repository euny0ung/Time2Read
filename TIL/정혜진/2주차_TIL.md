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

  HTML 문서의 **`<body>`** 에 직접 요소를 추가

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

  **2) 개선한 방법 :** **`useRef`** 를 사용한 **`mountRef.current.appendChild`**

  React에서 **`useRef`** 를 사용하여 컴포넌트가 마운트된 DOM 요소에 접근하고, 해당 요소 내에 다른 요소를 추가

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

#### Three.js 객체들과 관련된 함수에 타입을 지정하는 방법

- React와 TypeScript를 함께 사용할 때, 컴포넌트 내부에서 생성된 객체와 함수에 타입을 지정해주면 TypeScript의 타입 체킹 기능을 통해 더 안정적인 코드를 작성 가능
- 명령어 **`npm install @types/three --save-dev`**

#### Property 'removeChild' does not exist on type 'never' 오류

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
  - **`useRef`** 를 사용할 때, 참조하려는 DOM 요소의 타입을 **`useRef`** 에 제네릭 타입으로 전달하여 해결. 예를 들어, **`mountRef`** 가 **`div`** 요소를 참조하게 한다.
  - 이렇게 하면 mountRef.current는 HTMLDivElement 타입 또는 null이 될 수 있으며, HTMLDivElement는 removeChild 메소드를 가지고 있기 때문에 위의 오류가 해결됨

#### 자전과 공전 실습 결과
  ![solarsystem](/uploads/2540844fd290b99c8b7ebaaa652a0b69/solarsystem.gif)

<br>

## 🌳 회고

```
- 예제 코드가 있어도 내가 쓰는 환경에 맞춰 리팩토링해서 쓰려니 오래 걸렸다. 게다가 기초 지식이 없어서 더 오래 걸린 것 같다. 지금이라도 짚고 넘어가서 다행이다. 다신 안 헷갈릴 듯.
```

<br>
