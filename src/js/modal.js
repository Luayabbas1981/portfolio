const startPage = document.querySelector(".start-page");
const worksNavy = document.querySelector(".works-navy");
const worksNavyCon = worksNavy.querySelector(".container");
const worksNavyItems = worksNavyCon.querySelectorAll("div");
const navItems = document.querySelectorAll(".start-page .list-con div");
const imageCon = document.querySelector(".image-con");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.add("fade-out"));
    imageCon.classList.add("fade-out");
    setTimeout(() => {
      startPage.classList.add("d-none");
      if (item.dataset.section === "works") {
        worksNavy.classList.remove("d-none");
      }
    }, 4000);
  });
});

worksNavyItems.forEach((item) => {
  item.addEventListener("click", function () {
    worksNavyCon.classList.add("navy-pressed")
    worksNavy.style.cssText += `
        height:4rem;
        background-color:transparent;
        inset: unset;
        bottom:0;
        `;
  });
});
