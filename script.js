// --------------------
// Menú hamburguesa
// --------------------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("open");
  });
});

// --------------------
// Modal Únete
// --------------------
const openModal = document.getElementById('open-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal-unete');
const enviarBtn = document.getElementById('enviar-whatsapp');

openModal.addEventListener('click', () => modal.style.display = 'block');
closeModal.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target == modal) modal.style.display = 'none'; });

enviarBtn.addEventListener('click', () => {
  const nombre = document.getElementById('nombre').value.trim();
  const rubro = document.getElementById('rubro').value.trim();
  const edad = document.getElementById('edad').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();

  if (nombre && rubro && edad && descripcion) {
    const mensaje = `👋 Holaa! Quiero unirme a TODOROSARIO:%0A
    Nombre: ${nombre}%0ARubro: ${rubro}%0AEdad: ${edad}%0ADescripción: ${descripcion}`;
    enviarBtn.href = `https://wa.me/5493413047240?text=${mensaje}`;
  } else {
    alert('Por favor completa todos los campos antes de enviar.');
  }
});

// --------------------
// Buscador + Paginación
// --------------------
const buscarInput = document.getElementById("buscar-tienda");
const gridTiendas = document.getElementById("grid-tiendas");
const pageNumbers = document.getElementById("page-numbers");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const itemsPerPage = 8;
let currentPage = 1;
let filteredProductos = productos;

function renderPage(page) {
  gridTiendas.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filteredProductos.slice(start, end);

  paginatedItems.forEach(prod => {
  const card = document.createElement("div");
  card.classList.add("card");

  // <-- Agregás esta línea
  card.setAttribute("data-aos", "flip-left");

  card.innerHTML = `
    <img src="${prod.img}" alt="${prod.nombre}">
    <h3>${prod.nombre}</h3>
    <p><strong>Descripción:</strong> ${prod.descripcion}</p>
    <p><strong>Dirección:</strong> ${prod.direccion}</p>
    <p><strong>Horario de atención:</strong></p>
    <ul>${prod.horario.map(h => `<li>${h}</li>`).join("")}</ul>
    <div class="card-buttons">
      <a href="${prod.url}" target="_blank" class="btn"><i class="fa fa-eye"></i> Visitar</a>
      <a href="${prod.whatsapp}" target="_blank" class="btn-whatsapp"><i class="fab fa-whatsapp"></i> Contactar</a>
    </div>
  `;

  gridTiendas.appendChild(card);
});

  renderPagination(page);
}

function renderPagination(page) {
  pageNumbers.innerHTML = "";
  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === page) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });
    pageNumbers.appendChild(btn);
  }

  // Controlar botones Anterior y Siguiente
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProductos.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(currentPage);
  }
});

buscarInput.addEventListener("input", function () {
  const filtro = this.value.toLowerCase();
  filteredProductos = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(filtro)
  );
  currentPage = 1;
  renderPage(currentPage);
});


AOS.init({
  duration: 1000, // duración de la animación en ms
  once: true,     // animar solo la primera vez que aparece
});

// Inicializar
renderPage(currentPage);


