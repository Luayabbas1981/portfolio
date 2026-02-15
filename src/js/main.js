import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/style.scss";
import "./modal.js";

const header = document.querySelector("header");
const navItems = header.querySelectorAll(".container div");
const main = document.querySelector("main");
const sections = main.querySelectorAll("section");

navItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    sections.forEach((section) => {
      item.id === section.dataset.section
        ? section.classList.add("active")
        : section.classList.remove("active");
    });
  });
});
