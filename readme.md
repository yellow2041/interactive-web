# 강의내용 정리
## Seaction 1 CSS 변환과 애니메이션
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
- 