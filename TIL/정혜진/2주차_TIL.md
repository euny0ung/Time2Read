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
