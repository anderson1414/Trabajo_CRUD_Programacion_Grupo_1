let listaEstado_de_estudiantes = [];

const objEstado_de_estudiante = {
    id: '',
    aprobado: '',
    reprobado: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const aprobadoInput = document.querySelector('#aprobado');
const reprobadoInput = document.querySelector('#reprobado');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(aprobadoInput.value === '' || reprobadoInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarEstado_de_estudiante();
        editando = false;
    } else {
        objEstado_de_estudiante.id = Date.now();
        objEstado_de_estudiante.aprobado = aprobadoInput.value;
        objEstado_de_estudiante.reprobado = reprobadoInput.value;

        agregarEstado_de_estudiante();
    }
}

function agregarEstado_de_estudiante() {

    listaEstado_de_estudiantes.push({...objEstado_de_estudiante});

    mostrarEstado_de_estudiantes();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objEstado_de_estudiante.id = '';
    objEstado_de_estudiante.aprobado = '';
    objEstado_de_estudiante.reprobado = '';
}

function mostrarEstado_de_estudiantes() {
    limpiarHTML();

    const divEstado_de_estudiantes = document.querySelector('.div-estado_de_estudiantes');
    
    listaEstado_de_estudiantes.forEach(estado_de_estudiante => {
        const {id, aprobado, reprobado} = estado_de_estudiante;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} ~ ${aprobado} ~ ${reprobado} ~ `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEstado_de_estudiante(estado_de_estudiante);
        editarBoton.textContent = 'Editar  ';
        editarBoton.classList.add('btn-editar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-pen');
        editarBoton.appendChild(icono);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEstado_de_estudiante(id);
        eliminarBoton.textContent = 'Eliminar  ';
        eliminarBoton.classList.add('btn-eliminar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');
        eliminarBoton.appendChild(icono);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEstado_de_estudiantes.appendChild(parrafo);
        divEstado_de_estudiantes.appendChild(hr);
    });
}

function cargarEstado_de_estudiante(estado_de_estudiante) {
    const {id, aprobado, reprobado} = estado_de_estudiante;

    aprobadoInput.value = aprobado;
    reprobadoInput.value = reprobado;

    objEstado_de_estudiante.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarEstado_de_estudiante() {
    objEstado_de_estudiante.aprobado = aprobadoInput.value;
    objEstado_de_estudiante.reprobado = reprobadoInput.value;

    listaEstado_de_estudiantes.map(estado_de_estudiante => {

        if(estado_de_estudiante.id === objEstado_de_estudiante.id) {
            estado_de_estudiante.id = objEstado_de_estudiante.id;
            estado_de_estudiante.aprobado = objEstado_de_estudiante.aprobado;
            estado_de_estudiante.reprobado = objEstado_de_estudiante.reprobado;

        }

    });

    limpiarHTML();
    mostrarEstado_de_estudiantes();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarEstado_de_estudiante(id) {

    listaEstado_de_estudiantes = listaEstado_de_estudiantes.filter(estado_de_estudiante => estado_de_estudiante.id !== id);

    limpiarHTML();
    mostrarEstado_de_estudiantes();
}

function limpiarHTML() {
    const divEstado_de_estudiantes = document.querySelector('.div-estado_de_estudiantes');
    while(divEstado_de_estudiantes.firstChild) {
        divEstado_de_estudiantes.removeChild(divEstado_de_estudiantes.firstChild);
    }
}