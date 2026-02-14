const startPage = document.querySelector(".start-page");
const navItems = document.querySelectorAll(".start-page .list-con div");
const imageCon = document.querySelector(".image-con");
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.add("fade-out"));
    imageCon.classList.add("fade-out");
    setTimeout(() => {
      startPage.classList.add("d-none");
    }, 4000);
  });
});
