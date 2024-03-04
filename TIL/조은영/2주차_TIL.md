# 24.03.04

## 한 일
- 뉴스기사 크롤링
- Three.js 공부
- Three.js 에셋 체크

## 배운 것
- three.js에서 물체를 화면에 보이게 하기 위해서는 mesh, camera, renderer 세가지 요소가 필요하다.
- mesh는 geometry와 material이 합쳐진 것이다. 따라서 각각 두개를 생성한 후에 new THREE.Mesh 생성자 함수 호출을 통해 합체해야한다.
- mesh는 scene에 추가해야 눈에 보인다.
- perspective camera는 두개의 인자를 받는다. 
    - 첫번째 인자는 시야각으로, 작을 수록 물체가 크게 보인다. 보통 75로 둔다.
    - 두번째 인자는 aspect ratio로, 보통 캔버스 너비 / 높이 값이다.
- renderer는 카메라의 시점에서 보이는 모습을 캔버스에 그려준다.
    - 1. html 파일에 canvas 태그를 추가한다.
    - 2. js 파일에서 renderer를 생성한다.
    - 3. 카메라, 오브젝트의 위치를 조정한다. (반드시 렌더링 전에 해야함)
        - 디폴트는 scene 중앙이다.
        - 위치 변경은 position, rotation, scale을 이용한다.
    - 4. renderer.render(scene, camera)

## 아직 잘 모르는 것
- 이론은 알겠으나 응용이 어렵다.
