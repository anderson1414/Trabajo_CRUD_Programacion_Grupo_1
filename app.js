let listaEstudiantes = [];

const objEstudiante = {
    id: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    gmail: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');
const cedulaInput = document.querySelector('#cedula');
const gmailInput = document.querySelector('#gmail');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombresInput.value === '' || apellidosInput.value === '' || cedulaInput.value === '' || gmailInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEstudiante();
        editando = false;
    } else {
        objEstudiante.id = Date.now();
        objEstudiante.nombres = nombresInput.value;
        objEstudiante.apellidos = apellidosInput.value;
        objEstudiante.cedula = cedulaInput.value;
        objEstudiante.gmail = gmailInput.value;

        agregarEstudiante();
    }
}

function agregarEstudiante() {

    listaEstudiantes.push({...objEstudiante});

    mostrarEstudiantes();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEstudiante.id = '';
    objEstudiante.nombres = '';
    objEstudiante.apellidos = '';
    objEstudiante.cedula = '';
    objEstudiante.gmail = '';
}

function mostrarEstudiantes() {
    limpiarHTML();

    const divEstudiantes = document.querySelector('.div-estudiantes');
    
    listaEstudiantes.forEach(estudiante => {
        const {id, nombres, apellidos, cedula, gmail} = estudiante;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} ~ ${nombres} ~ ${apellidos} ~ ${cedula} ~ ${gmail} ~ `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstudiante(estudiante);
        editarBoton.textContent = 'Editar  ';
        editarBoton.classList.add('btn-editar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-pen');
        editarBoton.appendChild(icono);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstudiante(id);
        eliminarBoton.textContent = 'Eliminar  ';
        eliminarBoton.classList.add('btn-eliminar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');
        eliminarBoton.appendChild(icono);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEstudiantes.appendChild(parrafo);
        divEstudiantes.appendChild(hr);
    });
}

function cargarEstudiante(estudiante) {
    const {id, nombres, apellidos, cedula, gmail} = estudiante;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    cedulaInput.value = cedula;
    gmailInput.value = gmail;

    objEstudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEstudiante() {
    objEstudiante.nombres = nombresInput.value;
    objEstudiante.apellidos = apellidosInput.value;
    objEstudiante.cedula = cedulaInput.value;
    objEstudiante.gmail = gmailInput.value;

    listaEstudiantes.map(estudiante => {

        if(estudiante.id === objEstudiante.id) {
            estudiante.id = objEstudiante.id;
            estudiante.nombres = objEstudiante.nombres;
            estudiante.apellidos = objEstudiante.apellidos;
            estudiante.cedula = objEstudiante.cedula;
            estudiante.gmail = objEstudiante.gmail;

        }

    });

    limpiarHTML();
    mostrarEstudiantes();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEstudiante(id) {

    listaEstudiantes = listaEstudiantes.filter(estudiante => estudiante.id !== id);

    limpiarHTML();
    mostrarEstudiantes();
}

function limpiarHTML() {
    const divEstudiantes = document.querySelector('.div-estudiantes');
    while(divEstudiantes.firstChild) {
        divEstudiantes.removeChild(divEstudiantes.firstChild);
    }
}