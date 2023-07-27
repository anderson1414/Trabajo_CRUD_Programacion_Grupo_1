let listaCursos = [];

const objCurso = {
    id: '',
    grado: '',
    paralelo: '',
    asignatura: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const gradoInput = document.querySelector('#grado');
const paraleloInput = document.querySelector('#paralelo');
const asignaturaInput = document.querySelector('#asignatura');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(gradoInput.value === '' || paraleloInput.value === '' || asignaturaInput.value === '' ) {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarCurso();
        editando = false;
    } else {
        objCurso.id = Date.now();
        objCurso.grado = gradoInput.value;
        objCurso.paralelo = paraleloInput.value;
        objCurso.asignatura = asignaturaInput.value;

        agregarCurso();
    }
}

function agregarCurso() {

    listaCursos.push({...objCurso});

    mostrarCursos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objCurso.id = '';
    objCurso.grado = '';
    objCurso.paralelo = '';
    objCurso.asignatura = '';
}

function mostrarCursos() {
    limpiarHTML();

    const divCursos = document.querySelector('.div-cursos');
    
    listaCursos.forEach(curso => {
        const {id, grado, paralelo, asignatura} = curso;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} ~ ${grado} ~ ${paralelo} ~ ${asignatura} ~ `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarCurso(curso);
        editarBoton.textContent = 'Editar  ';
        editarBoton.classList.add('btn-editar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-pen');
        editarBoton.appendChild(icono);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarCurso(id);
        eliminarBoton.textContent = 'Eliminar  ';
        eliminarBoton.classList.add('btn-eliminar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');
        eliminarBoton.appendChild(icono);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divCursos.appendChild(parrafo);
        divCursos.appendChild(hr);
    });
}

function cargarCurso(curso) {
    const {id, grado, paralelo, asignatura} = curso;

    gradoInput.value = grado;
    paraleloInput.value = paralelo;
    asignaturaInput.value = asignatura;

    objCurso.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarCurso() {
    objCurso.grado = gradoInput.value;
    objCurso.paralelo = paraleloInput.value;
    objCurso.asignatura = asignaturaInput.value;

    listaCursos.map(curso => {

        if(curso.id === objCurso.id) {
            curso.id = objCurso.id;
            curso.grado = objCurso.grado;
            curso.paralelo = objCurso.paralelo;
            curso.asignatura = objCurso.asignatura;

        }

    });

    limpiarHTML();
    mostrarCursos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarCurso(id) {

    listaCursos = listaCursos.filter(curso => curso.id !== id);

    limpiarHTML();
    mostrarCursos();
}

function limpiarHTML() {
    const divCursos = document.querySelector('.div-cursos');
    while(divCursos.firstChild) {
        divCursos.removeChild(divCursos.firstChild);
    }
}