let current = 0;
const slides = document.querySelectorAll(".review-slide");
function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  if (slides[i]) slides[i].classList.add("active");
}
function nextSlide() { current = (current + 1) % slides.length; showSlide(current); }
function prevSlide() { current = (current - 1 + slides.length) % slides.length; showSlide(current); }
setInterval(nextSlide, 4500);
