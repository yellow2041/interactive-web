# 강의내용 정리
## Section 1 CSS 변환과 애니메이션
### Transform
- transform은 브라우저 가속을 활용하여 더 빠르고 효과적이다.
- 아래와 같이 작성시 absolute로 top, left 등을 변경하는것보다 효과적이다
  - top, left를 변경하면 브라우저가 주변 element들의 위치를 다시 계산해야한다.
```css
        .box:hover {
            transform: scale(2) rotate(45deg);
        }
```
- 이동은 `translate` 사용
- 값에 %도 사용가능 (left top 기준으로 0% 0% 시작)
### Transition
- 수치로 표현되는 값을 조절할 때 사용
```css
        .box {
            width:100px;
            height: 100px;
            border: 2px solid black;
            background: rgba(255,255,0,0.7);
            transition:1s;
        }
        .box:hover {
          width:200px;
          background:red;
        }
```
- width가 auto인 경우는 조절이 안된다.(수치로 표현되어야함. px 등)
- 개발자도구를 이용하여 transition-timing-function `cubic-bezier()`값 쉽게 설정 가능
### Animation
- animation은 keyframe을 추가할 수 있다.(transition과 다른 부분)
  ```css
        @keyframes sample-ani {
            0%{
                transform: translate(0,0);
            }
            50%{
                background-color: aqua;
                transform: translate(500px,0);
            }
            100%{
                transform: translate(700px,500px);
            }
        }
        .box2 {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 100px;
            border: 2px solid #000;
            background: #fff000;
            animation: sample-ani 3s cubic-bezier(0.84,-0.11, 0.37, 0.94) infinite alternate;
        }
  ```
- 색상도 지정 가능
- fowards: 애니메이션이 끝나면 그자리에 있음
- alternate: 갔다가 돌아옴
- reverse: 끝지점에서 거꾸로 시작
- alternate-reverse: 끝에서 시작해서 왔다갔다
  ```css
        .box2:hover {
            animation-play-state: paused;
        }
  ```
- 이렇게 하면 hover시 애니메이션 멈출 수 있다.
#### frame by frame 
  ```css
        .spaceship {
            width: 150px;
            height: 150px;
            background : url('images/sprite_spaceship.png') no-repeat 0 0 / auto 150px;
            animation: spaceship-ani 1s infinite steps(17)
        }
  ```
- step로 이미지를 쪼개서 position 이동 가능
- git는 투명도가 표현이 안돼서 이 방식 사용.
- duration만 바꾸면 속도 조절 가능
- reverse를 통해 거꾸로도 재생 가능
## Section 2 CSS 3D
> 전체 코드는 실습 코드 참고
- vw, vh단위: 열려있는 브라우저 가로 전체가 100vw 세로 전체가 100vh
- 부모에 perspective 속성을 주면 거리 조절 효과
  - 픽셀이 클수록 우리 눈에서 멀리 있는 효과.
  - 자식에 주면 같은 위치?에서 보는 느낌?
- 변화 없는 디폴트 상태도 지정해주는게 성능상 좋음
  ```
  transform: rotateY(0deg);
  ```
  이게 있을 경우 브라우저가 trasform이 발생하지 않아도 일어날 준비?를 한다고함.(화면상으로는 0deg라 변화가 없는 상태)
- 중간에 엘리먼트가 끼워져있는경우 부모 3D효과가 제대로 전달되지 않음.
  ```html
    <div class="world">
        <div class="card">
            <div class="card-side card-side-front">NELL</div>
            <div class="card-side card-side-back">넬</div>
        </div>
    </div>
  ```
  이 경우에 card에 `transform-style: preserve-3d;`속성을 줘야 3d가 잘 먹힘
- transform-origin 속성을 활용해서 회전하는 축 변경 가능
- 사파리 호환을 위해 ` -webkit-backface-visibility: hidden;` 추가 필요
  - 브라우저별 호환을 위해 -moz-, -o-, -ms- 접두어 필요.
  - 표준속성을 마지막에 적어주는게 좋다.(CSS는 같은속성이 여러개면 아래에 쓴게 먼저쓴걸 덮어씀)
- 익스플로어는 `transform-style: preserve-3d;` 지원이 안된다.
  - card 클래스 계층하나를 삭제하고 card-side 앞면을 0->180도, 뒷면을 180->360로 돌리기
    > 그냥 익스플로어 안쓰면 안되나?
   ```html
    <div class="world">
        <div class="card-side card-side-front">NELL</div>
        <div class="card-side card-side-back">넬</div>
    </div>
  ``` 
  ```css
          .card-side {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left:50%;
            top: 50%;
            width: 100px;
            height: 150px;
            margin: -75px 0 0 -50px;
            border-radius: 0.5em;
            font-size: 1.5rem;
            background: #217074;
            color:#E7EAEF;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
        }
        .card-side-front {
            z-index: 1;
            background: #217074;
        }
        .card-side-back {
            background: #37745B;
            transform: rotateY(180deg);
        }
        .world:hover .card-side-front {
            transform: rotateY(180deg);
        }
        .world:hover .card-side-back {
            transform: rotateY(360deg);
        }
  ```