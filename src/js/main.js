import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../scss/style.scss";
import * as Projects from "./projects.js";
import { initializeSlider } from "3d-slider";
import "3d-slider/src/3d-slider.css";
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
const workPages = document.querySelectorAll(".works-pages .page");
const startPageNavItems = document.querySelectorAll(
  ".start-page .list-con div",
);
const aboutMeCategories = document.querySelectorAll(
  ".about-me-categories .title",
);
const contactIcons = document.querySelectorAll(".icon");
const contactInfos = document.querySelector(".infos");
const contactInfosLink = contactInfos.children[0];
const imageCon = document.querySelector(".image-con");
const rotateCover = document.querySelector(".rotate-cover");
const rotateIcon = document.querySelector(".rotate-icon");
const sliderRange = document.querySelector(".slider-range");
const tools = document.querySelector(".tools");

// Variables
let currentPage = null;
let projectsCurrentCategory = "css";
let currentWorkPage = workPages[0];
let sliderCon = currentWorkPage.querySelector(".slider");
let isSliderRotateAlwaysOn = false;
let worksNavyDisable = false;

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
        tools.classList.remove("d-none");
      } else {
        header.classList.remove("d-none");
        worksNavy.classList.add("navy-pressed");
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
    if (worksNavyDisable) return;
    worksNavyItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    worksNavy.classList.add("position-bottom");
    worksNavyCon.classList.add("navy-pressed");
    header.classList.remove("d-none");
    workPages.forEach((page) => {
      page.classList.remove("active");
      page.children[0].innerHTML = "";
      page.children[0].classList.remove("slider");
      if (page.id === item.dataset.category) {
        page.classList.add("active");
        page.children[0].classList.add("slider");
        currentWorkPage = page;
        sliderCon = currentWorkPage.querySelector(".slider");
        projectsCurrentCategory = page.id.slice(0, -8);
        generateCategory(Projects[projectsCurrentCategory]);
      }
    });
  });
});
// Slider
function generateCategory(arr) {
  if (!sliderCon) return;
  sliderCon.querySelectorAll("*").forEach((el) => el.removeAttribute("style"));
  sliderCon.removeAttribute("style");
  // Clear previous slides
  sliderCon.replaceChildren();
  arr.map((card) => {
    const cardCon = document.createElement("div");
    const projectImg = document.createElement("img");
    projectImg.src = card.src;
    cardCon.appendChild(projectImg);
    const projectLink = document.createElement("a");
    projectLink.classList.add("card-link");
    projectLink.href = card.link;
    projectLink.target = "_blank";
    cardCon.appendChild(projectLink);
    const projectTitle = document.createElement("span");
    projectTitle.textContent = card.name;
    cardCon.appendChild(projectTitle);
    sliderCon.appendChild(cardCon);
  });

  initializeSlider({
    sliderContainerClass: "slider",
    perspective: 2,
    transitionDuration: 2.5,
    alwaysOnMode: isSliderRotateAlwaysOn,
    alwaysOnDesktopDuration: 15,
    alwaysOnMobileDuration: 5,
    cardsToShowLargeScreen: 11,
    cardsToShowMediumScreen: 7,
    cardsToShowSmallScreen: 4,
    cardsToShowMobile: 3,
    dotsMode: true,
    dotColor: "#ffffff",
  });
  const slider3d = document.querySelector(".slider-3d");
  if (slider3d) {
    sliderRange.addEventListener("input", function () {
      slider3d.style.setProperty("--rotateX", `${sliderRange.value}deg`);
    });
  }
}
// Slider rotate on handler
rotateIcon.addEventListener("click", function () {
  isSliderRotateAlwaysOn = !isSliderRotateAlwaysOn;
  generateCategory(Projects[projectsCurrentCategory]);
  rotateCover.classList.toggle("d-none");
  worksNavyDisable = !worksNavyDisable;
  isSliderRotateAlwaysOn
    ? (rotateIcon.style.opacity = 1)
    : (rotateIcon.style.opacity = 0.7);
});
// Header
navItems.forEach((item) => {
  item.addEventListener("click", function () {
    navItems.forEach((item) => item.classList.remove("active"));
    item.classList.add("active");
    currentPage = item.id;
    if (item.id === "works") {
      worksNavy.classList.remove("d-none");
      tools.classList.remove("d-none");
    } else {
      worksNavy.classList.add("d-none");
      rotateIcon.classList.add("d-none");
      tools.classList.add("d-none");
   
    }

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

// Contact
contactIcons.forEach((icon) => {
  icon.addEventListener("click", function () {
    if (this.classList.contains("third-icon")) return;
    contactInfos.classList.add("move-contact-info");

    const first = document.querySelector(".first-icon");
    const second = document.querySelector(".second-icon");
    const third = document.querySelector(".third-icon");

    if (this.classList.contains("first-icon")) {
      first.classList.replace("first-icon", "third-icon");
      second.classList.replace("second-icon", "first-icon");
      third.classList.replace("third-icon", "second-icon");
    } else if (this.classList.contains("second-icon")) {
      second.classList.replace("second-icon", "third-icon");
      first.classList.replace("first-icon", "second-icon");
      third.classList.replace("third-icon", "first-icon");
    }

    const thirdIcon = document.querySelector(".third-icon");
    contactInfosLink.target = "_blank";
    setTimeout(() => {
      contactInfos.classList.remove("move-contact-info");
      if (thirdIcon.dataset.contact == "gmail") {
        contactInfosLink.textContent = "abbasluay1981@gmail.com";
        contactInfosLink.href = "mailto:abbasluay1981@gmail.com";
      } else if (thirdIcon.dataset.contact == "github") {
        contactInfosLink.textContent = "Github";
        contactInfosLink.href = "https://github.com/Luayabbas1981";
      } else {
        contactInfosLink.textContent = "Linkedin";
        contactInfosLink.href =
          "https://www.linkedin.com/in/luay-abbas-79531a24a/";
      }
    }, 500);
  });
});
