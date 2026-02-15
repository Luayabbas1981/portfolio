import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/style.scss";
import * as Projects from "./projects.js";
// check device
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
// Elements
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
const aboutMeCategories = document.querySelectorAll(
  ".about-me-categories .title",
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
      sections.forEach((section) => {
        item.dataset.section === section.dataset.section
          ? section.classList.add("active")
          : section.classList.remove("active");
      });
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
navItems.forEach((item) => {
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

// About me
aboutMeCategories.forEach((category, index) => {
  const categoryWidth = isMobile ? "100%" : "75%";
  const categoryHeight = isMobile ? "50%" : "100%";
  if (index === 0) {
    category.parentElement.style.cssText += `
    width: ${categoryWidth} !important;
    height: ${categoryHeight} !important;
    `;
    category.style.setProperty("--color", "#ff9800");
  } else {
    if (!isMobile) {
      category.parentElement.style.cssText += `
    width: 5% !important;
    height: ${categoryHeight} !important;
    `;
    }
  }
  isMobile ? (category.parentElement.style.border = "none") : "";
  category.addEventListener("click", function () {
    aboutMeCategories.forEach((sec) => {
      const textWidth = isMobile ? "100%" : "5%";
      const textHeight = isMobile ? "5%" : "100%";
      sec.parentElement.style.cssText += `
      width: ${textWidth} !important;
      height: ${textHeight} !important;
      `;
      sec.nextElementSibling.classList.remove("about-me-sec-scale");
      sec.nextElementSibling.children[0].classList.remove("about-me-sec-list");
      sec.nextElementSibling.classList.add("d-none");
      isMobile ? sec.classList.remove("about-me-title-trans") : "";
      sec.style.setProperty("--color", "white");
    });

    category.parentElement.style.cssText += `
    width: ${categoryWidth} !important;
    height: ${categoryHeight} !important;
    `;
    category.style.setProperty("--color", "#ff9800");
    category.nextElementSibling.classList.remove("d-none");
    isMobile ? category.classList.add("about-me-title-trans") : "";
    setTimeout(() => {
      category.nextElementSibling.children[0].classList.add(
        "about-me-sec-list",
      );
    }, 1500);
    setTimeout(() => {
      category.nextElementSibling.classList.add("about-me-sec-scale");
    }, 500);
  });
});
