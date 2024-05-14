document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".float-menu");

  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
});

const contactBtn = document.querySelector("#contact-btn");
const contactInput = document.querySelector("#contact-input");
const fakeModal = document.querySelector(".fake-modal");
const closeModalBtn = document.querySelector("#close-modal-btn");

contactBtn.addEventListener("click", () => {
  contactInput.value = "";
  fakeModal.classList.toggle("active");
});

closeModalBtn.addEventListener("click", () => {
  fakeModal.classList.remove("active");
});

const carouselInner = document.querySelector(".carousel-inner");
fetch("testimonials.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((testimonial) => {
      const testimonialContainer = document.createElement("div");
      testimonialContainer.classList.add("testimonial");

      const testimonialPic = document.createElement("img");
      testimonialPic.classList.add("testimonialPic");
      testimonialPic.setAttribute("src", testimonial.photo);

      const testimonialElement = document.createElement("div");

      testimonialElement.classList.add("testimonial-name");
      testimonialElement.textContent = testimonial.name;

      testimonialElement.appendChild(testimonialPic);

      const testimonialMessage = document.createElement("p");
      testimonialMessage.classList.add("testimonial-message");
      testimonialMessage.textContent = testimonial.message;

      testimonialContainer.appendChild(testimonialElement);
      testimonialContainer.appendChild(testimonialMessage);
      carouselInner.appendChild(testimonialContainer);
    });

    startCarousel();
  })
  .catch((error) => console.error("Error al cargar los testimonios:", error));

let currentIndex = 0;
const totalTestimonials = carouselInner.children.length;

function slideNext() {
  currentIndex < carouselInner.children.length - 1
    ? (currentIndex = currentIndex + 1)
    : (currentIndex = 0);
  updateCarousel();
}

function slidePrev() {
  currentIndex === 0
    ? (currentIndex = carouselInner.children.length - 1)
    : (currentIndex = currentIndex - 1);
  updateCarousel();
}

function updateCarousel() {
  const newPosition = -currentIndex * 100 + "%";
  carouselInner.style.transform = `translateX(${newPosition})`;
}

function cleanInterval() {
  clearInterval(intervalId);
}

setInterval(slideNext, 5000);
window.addEventListener("unload", cleanInterval);

function startCarousel() {
  const prevBtn = document.querySelector(".prevBtn");
  prevBtn.textContent = "<";
  prevBtn.addEventListener("click", slidePrev);
  carouselInner.parentNode.appendChild(prevBtn);

  const nextBtn = document.querySelector(".nextBtn");
  nextBtn.textContent = ">";
  nextBtn.addEventListener("click", slideNext);
  carouselInner.parentNode.appendChild(nextBtn);
}
