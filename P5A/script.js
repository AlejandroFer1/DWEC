// Array en memoria para almacenar las mascotas
let pets = [];
let editingIndex = -1;

// Referencias al DOM
const form = document.getElementById('petForm');
const formTitle = document.getElementById('formTitle');
const petIndexInput = document.getElementById('petIndex');
const petsList = document.getElementById('petsList');

// Expresiones regulares
const imageRegex = /\.(jpeg|jpg|gif|png)$/i;
const codeRegex = /^[A-Za-z]{3}\d{3}$/;

// Validación de formulario
function validateForm(data) {
  const errors = [];

  if (!data.name.trim()) errors.push('El nombre es obligatorio.');
  if (!data.description.trim()) errors.push('La descripción es obligatoria.');
  if (!data.imageUrl.trim()) errors.push('La URL de la imagen es obligatoria.');
  if (!imageRegex.test(data.imageUrl)) errors.push('La URL debe apuntar a una imagen válida (.jpg, .jpeg, .png, .gif).');
  if (!data.birthDate) errors.push('La fecha de nacimiento es obligatoria.');
  if (new Date(data.birthDate) > new Date()) errors.push('La fecha de nacimiento no puede ser futura.');
  if (!data.price || parseFloat(data.price) <= 0) errors.push('El precio debe ser un número positivo mayor que cero.');
  if (!data.code.trim()) errors.push('El código es obligatorio.');
  if (!codeRegex.test(data.code)) errors.push('El código debe tener 3 letras seguidas de 3 números (ej. CAT123).');

  return errors;
}

// Renderizar la lista de mascotas
function renderPets() {
  petsList.innerHTML = '';
  pets.forEach((pet, index) => {
    const card = document.createElement('div');
    card.className = 'pet-card';

    const birthDate = new Date(pet.birthDate).toLocaleDateString();

    card.innerHTML = `
      <img src="${pet.imageUrl}" alt="${pet.name}" onerror="this.src='https://via.placeholder.com/280x180?text=Sin+Imagen'">
      <h3>${pet.name}</h3>
      <p>${pet.description}</p>
      <p><strong>Fecha de nacimiento:</strong> ${birthDate}</p>
      <p><strong>Precio:</strong> $${parseFloat(pet.price).toFixed(2)}</p>
      <p class="code">${pet.code}</p>
      <div class="actions">
        <button class="edit-btn" data-index="${index}">Editar</button>
        <button class="delete-btn" data-index="${index}">Eliminar</button>
      </div>
    `;
    petsList.appendChild(card);
  });

  // Añadir eventos a los botones
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      loadPetToForm(index);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      deletePet(index);
    });
  });
}

// Cargar mascota en el formulario para edición
function loadPetToForm(index) {
  const pet = pets[index];
  document.getElementById('name').value = pet.name;
  document.getElementById('description').value = pet.description;
  document.getElementById('imageUrl').value = pet.imageUrl;
  document.getElementById('birthDate').value = pet.birthDate;
  document.getElementById('price').value = pet.price;
  document.getElementById('code').value = pet.code;
  petIndexInput.value = index;
  formTitle.textContent = 'Editar Mascota';
  editingIndex = index;
}

// Eliminar mascota
function deletePet(index) {
  if (confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
    pets.splice(index, 1);
    renderPets();
    resetForm();
  }
}

// Reiniciar formulario
function resetForm() {
  form.reset();
  formTitle.textContent = 'Agregar Nueva Mascota';
  petIndexInput.value = -1;
  editingIndex = -1;
}

// Manejar el envío del formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value.trim(),
    description: document.getElementById('description').value.trim(),
    imageUrl: document.getElementById('imageUrl').value.trim(),
    birthDate: document.getElementById('birthDate').value,
    price: document.getElementById('price').value,
    code: document.getElementById('code').value.trim().toUpperCase()
  };

  const errors = validateForm(formData);
  if (errors.length > 0) {
    alert('Errores en el formulario:\n' + errors.join('\n'));
    return;
  }

  if (editingIndex === -1) {
    // Agregar nueva mascota
    pets.push(formData);
  } else {
    // Actualizar mascota existente
    pets[editingIndex] = formData;
  }

  renderPets();
  resetForm();
});

// Inicializar
renderPets();