const header = document.querySelector("header");
const navItems = header.querySelectorAll(".container div");
const startPage = document.querySelector(".start-page");
const worksNavy = document.querySelector(".works-navy");
const worksNavyCon = worksNavy.querySelector(".container");
const worksNavyItems = worksNavyCon.querySelectorAll("div");
const startPageNavItems = document.querySelectorAll(
  ".start-page .list-con div",
);
const imageCon = document.querySelector(".image-con");
startPageNavItems.forEach((item) => {
  item.addEventListener("click", function () {
    startPageNavItems.forEach((item) => item.classList.add("fade-out"));
    imageCon.classList.add("fade-out");
    setTimeout(() => {
      startPage.classList.add("d-none");
      if (item.dataset.section === "works") {
        worksNavy.classList.remove("d-none");
      } else {
        header.classList.remove("d-none");
      }
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
        navItem.id === item.dataset.section
          ? navItem.classList.add("active")
          : navItem.classList.remove("active");
      });
    }, 4000);
  });
});

worksNavyItems.forEach((item) => {
  item.addEventListener("click", function () {
    worksNavyCon.classList.add("navy-pressed");
    header.classList.remove("d-none");
    worksNavy.style.cssText += `
        height:4rem;
        background-color:transparent;
        inset: unset;
        bottom:0;
        `;
  });
});
