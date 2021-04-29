document.querySelectorAll(".carusel").forEach((e) => {
  let r_b = e.querySelector(".r-btn"),
    l_b = e.querySelector(".l-btn"),
    wr = e.querySelector(".wrapp"),
    item = wr.querySelectorAll(".item"),
    dott = e.querySelector(".dott"),
    slider = [],
    w = e.offsetWidth,
    steep = 0,
    t = e.dataset.time,
    time = e.dataset.timeAutoslide,
    r = e.dataset.reverse,
    auto = e.dataset.auto,
    dots = e.dataset.dott,
    count = 0,
    timerId;

  init();

  if (auto == "true") {
    if (r == "true") {
      timerId = setInterval(left, time);
    } else {
      timerId = setInterval(right, time);
    }
  }

  r_b.addEventListener("click", clickRight, false);
  l_b.addEventListener("click", clickLeft, false);

  function clickRight() {
    right();
    if (timerId) clearInterval(timerId);
  }
  function clickLeft() {
    left();
    if (timerId) clearInterval(timerId);
  }

  function next() {
    wr.append(slider[steep]);
    slider[steep].style = `left: ${w}px;`;
    nextSteep();
  }

  function prev() {
    let steep2 = steep;
    for (let i = 0; i < 4; i++) {
      steep2 - 1 < 0 ? (steep2 = slider.length - 1) : steep2--;
    }
    wr.prepend(slider[steep2]);
    slider[steep2].style = `left: -${w}px;`;
    prevSteep();
  }

  function right() {
    l_b.removeEventListener("click", clickLeft, false);
    r_b.removeEventListener("click", clickRight, false);
    let item2 = e.querySelectorAll(".item");
    let offset = -1;
    for (let i = 0; i < item2.length; i++) {
      item2[i].style = `transition: ${t}ms; left: ${offset * w - w}px`;
      offset++;
    }
    count + 1 == slider.length ? (count = 0) : count++;
    checkDott();
    setTimeout(function () {
      item2[0].remove();
      next();
      l_b.addEventListener("click", clickLeft, false);
      r_b.addEventListener("click", clickRight, false);
    }, t);
  }

  function left() {
    l_b.removeEventListener("click", clickLeft, false);
    r_b.removeEventListener("click", clickRight, false);
    let item2 = e.querySelectorAll(".item");
    let offset = -1;
    for (let i = 0; i < item2.length; i++) {
      item2[i].style = `transition: ${t}ms; left: ${offset * w + w}px`;
      offset++;
    }
    count - 1 < 0 ? (count = slider.length - 1) : count--;
    checkDott();
    setTimeout(function () {
      item2[2].remove();
      prev();
      l_b.addEventListener("click", clickLeft, false);
      r_b.addEventListener("click", clickRight, false);
    }, t);
  }

  function init() {
    for (let i = 0; i < item.length; i++) {
      if (dots == "true") {
        let s = document.createElement("span");
        s.setAttribute("data-item", i);
        dott.append(s);
      }
      slider[i] = item[i];
      item[i].remove();
    }
    prevSteep();
    for (let i = -1; i < 2; i++) {
      wr.append(slider[steep]);
      slider[steep].style = `left: ${i * w}px;`;
      nextSteep();
    }
    if (dots == "true")
      dott.querySelectorAll("span")[count].classList.add("active");
  }

  function nextSteep() {
    steep + 1 == slider.length ? (steep = 0) : steep++;
  }

  function prevSteep() {
    steep - 1 < 0 ? (steep = slider.length - 1) : steep--;
  }

  function checkDott() {
    if (dots == "true") {
      let span = dott.querySelectorAll("span");
      span.forEach((j) => {
        j.classList.remove("active");
      });
      span[count].classList.add("active");
    }
  }
});
