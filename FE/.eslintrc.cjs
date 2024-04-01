module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb-base',
    'prettier/prettier',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect', // 사용자가 설치한 버전을 자동으로 선택
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
      // TSX, JSX 지원하도록 설정
    },
  },
  ignorePatterns: ['.eslintrc.cjs', '*.css', 'vite.config.js'], // eslint, css, vite.config는 lint 검사 X
  plugins: ['react', 'import', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/extensions': ['error', 'ignorePackages'],
    'no-unused-vars': 'warn',
    'import/no-unresolved': 'error',
    // 'linebreak-style': 0, // CRLF 문제
    'react/react-in-jsx-scope': 'off', // react import 안해도됨
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }], // JSX를 사용하는 파일 확장자로 .jsx와 .tsx를 허용
    'react/jsx-pascal-case': 'error', // 컴포넌트는 PascalCase 사용
    // 'filenames/match-regex': ['error', '^[a-z-]+$', true],  // 파일 이름이 컴포넌트 이름과 일치하도록 설정
    'jsx-quotes': ['error', 'prefer-double'], // JSX 속성에는 쌍따옴표 사용
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
        beforeClosing: 'never',
      },
    ], //  JSX 태그와 중괄호 내의 띄어쓰기:
    'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
    'react/jsx-props-no-multi-spaces': 'error', // 속성 사이의 여러 공백 방지
    'react/jsx-boolean-value': ['error', 'never'], // 명확한 true 값은 생략
    'react/jsx-no-literals': ['off', { noStrings: true }], // 문자열 리터럴을 변수로 치환
    'react/prop-types': 'off', // PropType 사용 중지 (TypeScript 사용 시)
    'react/no-string-refs': 'error', // 문자열 참조 사용 금지
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ], // JSX 괄호
    'react/self-closing-comp': 'error', // 자체 닫힘 태그 사용
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // 닫힘 괄호 위치 설정
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ], // 메소드

    //JS 규칙
    // 1) 참조(References)
    'prefer-const': 'error',
    'no-var': 'error',

    // 2) 오브젝트(Objects)
    'no-new-object': 'error',
    'object-shorthand': ['error', 'always'],

    // 3) 배열(Arrays)
    'no-array-constructor': 'error',

    // 4) 구조화 대입(Destructuring)
    'prefer-spread': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: true,
        object: true,
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // 5) 문자열(Strings)
    quotes: ['error', 'single'],
    // 'max-len': ['error', { 'code': 100 }],

    // 6) 함수(Functions)
    'prefer-rest-params': 'error',
    'space-before-function-paren': ['error', 'always'],

    // 7) Arrow 함수(Arrow Functions)
    'prefer-arrow-callback': 'error',

    // 9) 모듈(Modules)
    // 'no-commonjs': 'error',
    // 'no-amd': 'error',

    // 10) 이터레이터와 제너레이터(Iterators and Generators)
    'no-iterator': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for-in loops are not allowed',
      },
      {
        selector: 'ForOfStatement',
        message: 'for-of loops are not allowed',
      },
    ],

    // 11) 프로퍼티(Properties)
    'dot-notation': 'error',

    // 12) 변수(Variables)
    'one-var': ['error', 'never'],

    // 13) 연산자(Operators)
    'no-plusplus': 'error',

    // 15) 공백(Whitespace)
    indent: 'off',
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],

    // 16) 콤마(Commas)
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],

    // 18) 명명규칙(Naming Conventions)
    camelcase: 'error',
    'new-cap': 'error',

    // 19) 콘솔 - 일시적으로 꺼둠
    'no-console': 'off',

    // 20) 알려지지 않은 props - 꺼둠
    'react/no-unknown-property': 'off',

    // 21) eslint 자체 에러 원래 에러 뜨면 안되는건데 해결되지 않은 이슈
    'import/no-unresolved': 'off',
  },
};
