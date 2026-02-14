const startPage = document.querySelector(".start-page");
const worksNavy = document.querySelector(".works-navy");
const navItems = document.querySelectorAll(".start-page .list-con div");
const imageCon = document.querySelector(".image-con");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.add("fade-out"));
    imageCon.classList.add("fade-out");
    setTimeout(() => {
      startPage.classList.add("d-none");
      worksNavy.classList.remove("d-none");
    }, 4000);
  });
});
