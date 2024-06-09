(function () {
  const houseElem = document.querySelector(".house");
  const barElem = document.querySelector(".progress-bar");
  const stageElem = document.querySelector(".stage");
  const selectCharacterElem = document.querySelector(".select-character");
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue = 0;

  const resizeHandler = () => {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  };

  window.addEventListener("scroll", () => {
    const scrollPer = scrollY / maxScrollValue;
    const zMove = scrollPer * 980 - 490;
    houseElem.style.transform = "translateZ(" + zMove + "vw)";

    // progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("mousemove", (e) => {
    mousePos.x = -1 + (e.clientX / window.innerHeight) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    stageElem.style.transform =
      "rotateX(" + mousePos.y * 5 + "deg) rotateY(" + mousePos.x * 5 + "deg";
  });

  window.addEventListener("resize", resizeHandler);
  stageElem.addEventListener("click", (e) => {
    console.log();
    new Character({
      xPos: (e.clientX / window.innerWidth) * 100,
      speed: Math.random() * 0.3 + 0.2,
    });
  });

  selectCharacterElem.addEventListener("click", function (e) {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });
  resizeHandler();
})();
