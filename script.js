// Menú hamburguesa con animación
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

// Cerrar menú al hacer clic en un enlace (opcional)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
  });
});


// Buscador de tiendas
const buscarInput = document.getElementById("buscar-tienda");
const gridTiendas = document.getElementById("grid-tiendas");
const cards = gridTiendas.getElementsByClassName("card");

buscarInput.addEventListener("input", function() {
  const filtro = this.value.toLowerCase();

  for (let i = 0; i < cards.length; i++) {
    const titulo = cards[i].getElementsByTagName("h3")[0].textContent.toLowerCase();
    if (titulo.includes(filtro)) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
});
