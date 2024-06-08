// main.js
import { initTheme } from "./theme.js";
import { initNavigation } from "./navigation.js";
import { initForms } from "./forms.js";
import { initFAQ } from "./faq.js";
import { initSmoothScroll } from "./smoothScroll.js";
import { initStickyHeader } from "./stickyHeader.js";
import { initSteps } from "./steps.js";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initForms();
  initFAQ();
  initSmoothScroll();
  initStickyHeader();
  initSteps();
});

// navigation.js
export function initNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navLinks?.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    const target = e.target.closest(".nav-link");
    if (target?.nextElementSibling?.classList.contains("dropdown-content")) {
      e.preventDefault();
      const expanded = target.getAttribute("aria-expanded") === "true";
      target.setAttribute("aria-expanded", !expanded);
      target.nextElementSibling.classList.toggle("active");
    }
  });
}

// forms.js
export function initForms() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-button");
  const feedback = document.getElementById("form-feedback");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    try {
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Network response was not ok");
      feedback?.classList.remove("hidden");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      feedback.textContent = "Oops! Something went wrong. Please try again.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}

// faq.js
export function initFAQ() {
  const faqs = document.querySelectorAll(".faq-question");

  faqs.forEach((faq) => {
    faq.addEventListener("click", () => {
      const expanded = faq.getAttribute("aria-expanded") === "true";
      faq.setAttribute("aria-expanded", !expanded);
      const answer = faq.nextElementSibling;
      answer.hidden = expanded;
      faq.querySelector(".faq-icon").textContent = expanded ? "+" : "-";
    });

    faq.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        faq.click();
      }
    });
  });
}

// theme.js
export function initTheme() {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleSwitch.checked = currentTheme === "dark";
  }

  toggleSwitch?.addEventListener("change", (e) => {
    const theme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
}

// smoothScroll.js
export function initSmoothScroll() {
  document
    .querySelectorAll('a[href^="#"], .nav-links a, .cta-button, .btn')
    .forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const targetElement = document.querySelector(
          anchor.getAttribute("href")
        );
        targetElement?.scrollIntoView({ behavior: "smooth" });
      });
    });
}

// stickyHeader.js
export function initStickyHeader() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("sticky", window.scrollY > 100);
  });
}

// steps.js
export function initSteps() {
  const steps = document.querySelectorAll(".step");

  steps.forEach((step) => {
    step.addEventListener("touchstart", () => {
      step.classList.add("active");
    });

    step.addEventListener("touchend", () => {
      step.classList.remove("active");
    });
  });
}
