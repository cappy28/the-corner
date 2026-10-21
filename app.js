const siteHeader = document.getElementById("siteHeader");
const scrollProgress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const mobilePanel = document.getElementById("mobilePanel");

/* HEADER AU SCROLL */

function updateScrollState() {
  const scrollTop = window.scrollY;
  const pageHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  siteHeader.classList.toggle("is-scrolled", scrollTop > 20);

  if (pageHeight > 0) {
    const progress = (scrollTop / pageHeight) *
