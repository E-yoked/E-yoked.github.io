document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    toggleSwitch.checked = currentTheme === "dark";
  }

  function switchTheme(e) {
    const theme = e.target.checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  toggleSwitch?.addEventListener("change", switchTheme);

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  function toggleNavigation(e) {
    if (e.target.classList.contains("nav-toggle")) {
      navLinks.classList.toggle("active");
      navToggle.classList.toggle("active");
    } else if (e.target.closest(".dropdown")) {
      e.target
        .closest(".dropdown")
        .querySelector(".dropdown-content")
        .classList.toggle("active");
    }
  }

  document.addEventListener("click", function (e) {
    const dropdownContent = document.querySelectorAll(".dropdown-content");
    dropdownContent.forEach((content) => {
      if (
        !content.classList.contains("active") &&
        !e.target.closest(".dropdown")
      ) {
        content.classList.remove("active");
      }
    });
  });

  document.addEventListener("click", toggleNavigation);

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

  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 100);
  });

  const contactForm = document.getElementById("contact-form");
  const formFeedback = document.getElementById("form-feedback");
  const submitButton = document.getElementById("submit-button");

  function handleFormSubmit(e) {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      formFeedback.classList.remove("hidden");
      contactForm.reset();
    }, 2000);
  }

  contactForm?.addEventListener("submit", handleFormSubmit);
});
document.addEventListener("DOMContentLoaded", function () {
  const faqs = document.querySelectorAll(".faq");

  faqs.forEach((faq) => {
    faq.addEventListener("click", function () {
      this.classList.toggle("active");

      const answer = this.querySelector(".faq-answer");
      if (this.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
        this.querySelector(".faq-icon").textContent = "-";
      } else {
        answer.style.maxHeight = "0";
        this.querySelector(".faq-icon").textContent = "+";
      }
    });
  });
});
