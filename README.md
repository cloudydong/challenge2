# Challenge 2 frontend part

이 프로젝트는 Nomnomadcoders 우버 잇츠 클론 6주 챌린지 프론트엔드 부분입니다.\
[github-link](https://github.com/cloudydong/challenge2)

## 📄 참고 페이지

https://reactrouter.com/web/guides/quick-start  
리액트 라우터  
https://react-hook-form.com/get-started  
리액트 form  
https://testing-library.com/docs/react-testing-library/example-intro  
react-testing-library docs

### 🚨TypeError: expect(...) is not a function

### 🤔에러 해결법

import '@testing-library/jest-dom/extend-expect'를 임포트 하면 해결됩니다.  
jest-dom 이 v4.2.4...v5.0.0 버전으로 바뀌면서 사용방법이  
import "@testing-library/jest-dom"; 를 임포트하는 방법으로 변경되었습니다.  
현재 두가지 방식 모두 에러를 해결합니다.  
[출처](https://github.com/testing-library/jest-dom/compare/v4.2.4...v5.0.0)  
또한 jest는 모든 테스트를 실행하기 전에 default로 setupTests.ts 파일을 먼저 실행합니다.
setupTests.ts 파일 안에 import "@testing-library/jest-dom";을 작성하는 방법이 가장 좋습니다.

### npm 설치 목록

```bash
npm i -D tailwindcss@latest postcss@latest autoprefixer@latest
npm i @apollo/client graphql
npm i react-router-dom
npm i --save-dev @types/react-router-dom
npm i react-hook-form
npm i react-helmet-async

npm i -g apollo

npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome

npm i mock-apollo-client --save-dev
```
