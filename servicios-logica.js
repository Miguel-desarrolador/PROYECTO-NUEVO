// --------------------
// Variables
// --------------------
const buscarServicioInput = document.getElementById("buscar-servicio");
const gridServicios = document.getElementById("grid-servicios");
const pageNumbersServicios = document.getElementById("page-numbers-servicios");
const prevBtnServicios = document.getElementById("prev-btn-servicios");
const nextBtnServicios = document.getElementById("next-btn-servicios");

const itemsPerPageServicios = 8;
let currentPageServicios = 1;
let filteredServicios = servicios;

// --------------------
// Renderizado de servicios
// --------------------
function renderServiciosPage(page) {
  gridServicios.innerHTML = "";

  const start = (page - 1) * itemsPerPageServicios;
  const end = start + itemsPerPageServicios;
  const paginatedItems = filteredServicios.slice(start, end);

 paginatedItems.forEach(serv => {
  const card = document.createElement("div");
  card.classList.add("card"); // misma clase que tiendas

  card.innerHTML = `
    <img src="${serv.img}" alt="${serv.nombre}">
    <h3>${serv.nombre}</h3>
    <p><strong>Descripción:</strong> ${serv.descripcion}</p>
    <p><strong>Dirección:</strong> ${serv.direccion}</p>
    <p><strong>Horario de atención:</strong></p>
    <ul>
      ${serv.horario.map(h => `<li>${h}</li>`).join("")}
    </ul>
    <div class="card-buttons">
      <a href="${serv.url}" target="_blank" class="btn"><i class="fa fa-eye"></i> Visitar</a>
      <a href="${serv.whatsapp}" target="_blank" class="btn-whatsapp"><i class="fab fa-whatsapp"></i> Contactar</a>
    </div>
  `;

  // <-- Aquí agregás AOS
  card.setAttribute("data-aos", "flip-left");

  gridServicios.appendChild(card);
});


  renderPaginationServicios(page);
}

// --------------------
// Renderizado de paginación
// --------------------
function renderPaginationServicios(page) {
  pageNumbersServicios.innerHTML = "";
  const totalPages = Math.ceil(filteredServicios.length / itemsPerPageServicios);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === page) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPageServicios = i;
      renderServiciosPage(currentPageServicios);
    });
    pageNumbersServicios.appendChild(btn);
  }

  prevBtnServicios.disabled = page === 1;
  nextBtnServicios.disabled = page === totalPages;
}

// --------------------
// Eventos botones anterior/siguiente
// --------------------
prevBtnServicios.addEventListener("click", () => {
  if (currentPageServicios > 1) {
    currentPageServicios--;
    renderServiciosPage(currentPageServicios);
  }
});

nextBtnServicios.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredServicios.length / itemsPerPageServicios);
  if (currentPageServicios < totalPages) {
    currentPageServicios++;
    renderServiciosPage(currentPageServicios);
  }
});

// --------------------
// Buscador dinámico
// --------------------
buscarServicioInput.addEventListener("input", function () {
  const filtro = this.value.toLowerCase();
  filteredServicios = servicios.filter(serv =>
    serv.nombre.toLowerCase().includes(filtro)
  );
  currentPageServicios = 1;
  renderServiciosPage(currentPageServicios);
});

// --------------------
// Inicializar
// --------------------
renderServiciosPage(currentPageServicios);
