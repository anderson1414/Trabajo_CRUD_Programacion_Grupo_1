let listaDocentes = [];

const objDocente = {
    id: '',
    nombres: '',
    apellidos: '',
    asignatura: '',
    curso: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombresInput = document.querySelector('#nombres');
const apellidosInput = document.querySelector('#apellidos');
const asignaturaInput = document.querySelector('#asignatura');
const cursoInput = document.querySelector('#curso');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombresInput.value === '' || apellidosInput.value === '' || asignaturaInput.value === '' || cursoInput.value === '' ) {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarDocente();
        editando = false;
    } else {
        objDocente.id = Date.now();
        objDocente.nombres = nombresInput.value;
        objDocente.apellidos = apellidosInput.value;
        objDocente.asignatura = asignaturaInput.value;
        objDocente.curso = cursoInput.value;

        agregarDocente();
    }
}

function agregarDocente() {

    listaDocentes.push({...objDocente});

    mostrarDocentes();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objDocente.id = '';
    objDocente.nombres = '';
    objDocente.apellidos = '';
    objDocente.asignatura = '';
    objDocente.curso = '';
}

function mostrarDocentes() {
    limpiarHTML();

    const divDocentes = document.querySelector('.div-docentes');
    
    listaDocentes.forEach(docente => {
        const {id, nombres, apellidos, asignatura, curso} = docente;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} ~ ${nombres} ~ ${apellidos} ~ ${asignatura} ~ ${curso} ~ `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarDocente(docente);
        editarBoton.textContent = 'Editar  ';
        editarBoton.classList.add('btn-editar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-pen');
        editarBoton.appendChild(icono);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarDocente(id);
        eliminarBoton.textContent = 'Eliminar  ';
        eliminarBoton.classList.add('btn-eliminar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');
        eliminarBoton.appendChild(icono);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divDocentes.appendChild(parrafo);
        divDocentes.appendChild(hr);
    });
}

function cargarDocente(docente) {
    const {id, nombres, apellidos, asignatura, curso} = docente;

    nombresInput.value = nombres;
    apellidosInput.value = apellidos;
    asignaturaInput.value = asignatura;
    cursoInput.value = curso;

    objDocente.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarDocente() {
    objDocente.nombres = nombresInput.value;
    objDocente.apellidos = apellidosInput.value;
    objDocente.asignatura = asignaturaInput.value;
    objDocente.curso = cursoInput.value;
    
    listaDocentes.map(docente => {
        if(docente.id == objDocente.id) {
            docente.id = objDocente.id;
            docente.nombres = objDocente.nombres;
            docente.apellidos = objDocente.apellidos;
            docente.asignatura = objDocente.asignatura;
            docente.curso = objDocente.curso;


        }

    });

    limpiarHTML();
    mostrarDocentes();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarDocente(id) {

    listaDocentes = listaDocentes.filter(docente => docente.id !== id);

    limpiarHTML();
    mostrarDocentes();
}

function limpiarHTML() {
    const divDocentes = document.querySelector('.div-docentes');
    while(divDocentes.firstChild) {
        divDocentes.removeChild(divDocentes.firstChild);
    }
}