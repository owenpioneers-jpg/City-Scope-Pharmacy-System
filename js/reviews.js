let current = 0;
const slides = document.querySelectorAll(".review-slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  current++;
  if (current >= slides.length) current = 0;
  showSlide(current);
}

function prevSlide() {
  current--;
  if (current < 0) current = slides.length - 1;
  showSlide(current);
}

setInterval(nextSlide, 4000);
