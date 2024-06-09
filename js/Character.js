function Character({ xPos, speed }) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `<div class="character-face-con character-head">
  <div class="character-face character-head-face face-front"></div>
  <div class="character-face character-head-face face-back"></div>
</div>
<div class="character-face-con character-torso">
  <div class="character-face character-torso-face face-front"></div>
  <div class="character-face character-torso-face face-back"></div>
</div>
<div class="character-face-con character-arm character-arm-right">
  <div class="character-face character-arm-face face-front"></div>
  <div class="character-face character-arm-face face-back"></div>
</div>
<div class="character-face-con character-arm character-arm-left">
  <div class="character-face character-arm-face face-front"></div>
  <div class="character-face character-arm-face face-back"></div>
</div>
<div class="character-face-con character-leg character-leg-right">
  <div class="character-face character-leg-face face-front"></div>
  <div class="character-face character-leg-face face-back"></div>
</div>
<div class="character-face-con character-leg character-leg-left">
  <div class="character-face character-leg-face face-front"></div>
  <div class="character-face character-leg-face face-back"></div>
</div>`;
  document.querySelector(".stage").appendChild(this.mainElem);

  this.mainElem.style.left = xPos + "%";
  this.scrollState = false;
  this.lastScrolltop = 0;
  this.xPos = xPos;
  this.speed = speed;
  this.direction;
  this.rafId;
  this.runningState = false;
  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;
    window.addEventListener("scroll", function () {
      // 스크롤을 할 때마다 계속 clearTimeout이 실행되어 밑에 있는 setTimeout이 실행되지 않는다.
      // 스크롤을 멈춰야 clear를 안해주기때문에 마지막 스크롤 타이밍에 해당하는 것만 500ms 후에 setTimeout 콜백 실행
      // 500ms가 지나기 전에 스크롤이 계속 발생하기때문에 setTimeout 콜백이 실행되기 전에 타이머가 clear됨.
      clearTimeout(self.scrollState);

      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }

      self.scrollState = setTimeout(function () {
        self.scrollState = false;
        self.mainElem.classList.remove("running");
      }, 500);

      if (self.lastScrolltop > this.scrollY) {
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        self.mainElem.setAttribute("data-direction", "forward");
      }
      self.lastScrolltop = this.scrollY;
    });

    window.addEventListener("keydown", function (e) {
      if (self.runningState) return;
      if (e.key === "ArrowLeft") {
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run();
        self.runningState = true;
      } else if (e.key === "ArrowRight") {
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run();
        self.runningState = true;
      }
    });

    window.addEventListener("keyup", function (e) {
      self.mainElem.classList.remove("running");
      this.cancelAnimationFrame(self.rafId);
      self.runningState = false;
    });
  },
  run: function () {
    const self = this;

    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }
    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      this.xPos = 88;
    }
    self.mainElem.style.left = self.xPos + "%";
    self.rafId = requestAnimationFrame(self.run.bind(self));
  },
};
