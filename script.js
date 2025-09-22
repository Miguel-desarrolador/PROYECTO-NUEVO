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


const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal-unete');
const enviarBtn = document.getElementById('enviar-whatsapp');
const form = document.getElementById('form-unete');

openModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == modal) modal.style.display = 'none';
});

// Generar link de WhatsApp con datos del formulario
enviarBtn.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const rubro = document.getElementById('rubro').value.trim();
  const edad = document.getElementById('edad').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  if(nombre && rubro && edad && descripcion){
    const mensaje = `👋 Holaa! Quiero unirme a TODOROSARIO y estos son mis datos:%0ANombre: ${nombre}%0ARubro: ${rubro}%0AEdad: ${edad}%0ADescripción: ${descripcion}`;
    enviarBtn.href = `https://wa.me/5493413047240?text=${mensaje}`;
  } else {
    alert('Por favor completa todos los campos antes de enviar.');
  }
});
