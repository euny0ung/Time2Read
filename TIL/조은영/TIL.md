한 일

3차 아이디어 회의
아이디어 설계
팀미팅
TypeScript 공부

배운 것

[TypeScript]

한 프로젝트 안에서 JS와 TS 같이 사용하기

1. tsconfig.json 파일을 만들어주고 allowJs:true 추가

{
    // 어디에 ts 파일이 있는지. include 배열에는 js로 컴파일하고 싶은 모든 디렉토리가 들어감
    // ts가 모든 src의 파일을 확인한다는 것을 의미.
    "include": ["src"],

    // outDir은 js 파일이 생성될 디렉터리를 지정한다. ts는 컴파일러니까 이 파일을 js로 컴파일 시켜줄 것
    // 따라서 우리는 ts에게 저 js 파일을 어디에 만들지 알려줘야함
    "compilerOptions": {
        "outDir": "build",
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "strict": true,
        "allowJs": true
    }
}
 

이제 ts가 기존 자바스크립트 코드의 콜 시그니처를 추측할 수 있게 된다.

 

2. js 파일 코드 맨 위에 // @ts-check 추가

기존 코드를 수정하지 않으면서도 기존 js파일이 ts의 보호를 받게 만들 수 있다. ts 파일에게 js파일도 확인해달라고 알리는거다. 안써줘도 문제는 없으나, ts의 보호를 받고 싶다면 써준다. ts-check를 추가하니 이런 에러가 뜬다. 이 에러를 없애주기 위해 JSDoc을 사용해보겠다. 이렇게 해주면 js 파일에서도 타입을 지정해줄 수 있다.

TypeScript의 @ts-check 디렉티브는 JavaScript 파일에서 TypeScript의 타입 검사를 활성화한다. 이를 통해 JavaScript 파일에서 TypeScript의 타입 검사 도구를 사용할 수 있다.


 

3. JSDoc이란?

코멘트로 이루어진 문법. 함수 바로 위에 코멘트를 적으면 됨.

/** 까지 입력하면 자동완성이 된다. 일단 코멘트를 열어준다.


- 1. 이 함수가 어떤 함수인지 설명하기. 초기화 역할을 하므로 initializes the project라고 써줬다.

- 2. param 추가하고 입력받을 데이터 타입과 데이터 이름 써주기. object 타입의 config을 매개변수로 받는다.

- 3. param 추가하고 config 객체 안에는 boolean 타입이 있고, boolean 타입은 config.debug 안에 들어있다.

- 4. param 추가하고 string 타입의 config.url

- 5. return 값은 boolean

 

코드를 수정한게 아니고 단순히 함수 위에 코멘트를 추가한 것이다. TS가 이 코멘트를 읽고 타입을 확인해줄 것이다. 그러니까 단순히 JS 파일에 코멘트만 추가하면 TS의 보호를 받을 수 있는 것이다.

 

이제 exit 함수의 코멘트를 추가해보자.

- 1. 프로그램을 종료시키는 역할을 하고 있다. Exits the program이라고 써준다.

- 2. number타입의 code라는 매개변수를 받는다.

- 3. return 값은 number 타입니다.


 

 

3. ts 파일로 돌아가면 이제 myPackage.js 파일에 있는 함수들을 import하여 사용할 수 있다. 이렇게 함수 위에 마우스를 올리면 어떤 타입의 매개변수를 받고 어떤 타입을 반환하는지 나온다. 단순히 코멘트를 추가했을 뿐인데.


 

 
정리
TS의 보호는 받고 싶지만 기존의 JS 코드를 수정하기 싫을 때

1. JS 파일에 @ts-check 추가

2. tsconfig.json 파일의 compilerOptions에 "allowJs": true 추가

3. JS 파일에 코멘트 달기

 

참고로 코멘트의 return 부분에서 타입을 중괄호로 감싸지 않아도 작동한다.

함수나 메서드에 반환 타입을 명시할 때, TS에서는 중괄호 유무에 상관없이 동일하게 동작한다. 위처럼 반환 타입을 명시할 때 중괄호를 쓰는 것은 JSDoc 스타일을 따르른 것이고, 중괄호를 사용하지 않는 것은 TS 문법을 따르는 것이다.






아직 잘 모르는 것

TS를 리액트에 어떻게 적용시킬지 모르겠다.
