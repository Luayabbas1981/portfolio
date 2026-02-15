import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/style.scss";
import * as Projects from "./projects.js";

const header = document.querySelector("header");
const navItems = header.querySelectorAll(".container div");
const main = document.querySelector("main");
const sections = main.querySelectorAll("section");
const worksNavy = document.querySelector(".works-navy");
const startPage = document.querySelector(".start-page");
const worksNavyCon = worksNavy.querySelector(".container");
const worksNavyItems = worksNavyCon.querySelectorAll("div");
const startPageNavItems = document.querySelectorAll(
  ".start-page .list-con div",
);
const imageCon = document.querySelector(".image-con");

// Variables
let currentPage = null;

// Modal
startPageNavItems.forEach((item) => {
  item.addEventListener("click", function () {
    startPageNavItems.forEach((item) => item.classList.add("fade-out"));
    imageCon.classList.add("fade-out");
    currentPage = item.dataset.section;
    setTimeout(() => {
      startPage.classList.add("d-none");
      if (item.dataset.section === "works") {
        worksNavy.classList.remove("d-none");
      } else {
        header.classList.remove("d-none");
        worksNavy.classList.add("position-bottom");
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
    worksNavyItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    worksNavy.classList.add("position-bottom");
    worksNavyCon.classList.add("navy-pressed");
    header.classList.remove("d-none");
  });
});
// Header
navItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    currentPage = item.id;
    item.id === "works"
      ? worksNavy.classList.remove("d-none")
      : worksNavy.classList.add("d-none");
    sections.forEach((section) => {
      item.id === section.dataset.section
        ? section.classList.add("active")
        : section.classList.remove("active");
    });
  });
});
