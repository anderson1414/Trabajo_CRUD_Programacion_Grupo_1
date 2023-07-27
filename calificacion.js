let listaCalificaciones = [];

const objCalificacion = {
    id: '',
    grado: '',
    docente: '',
    nota_quimestre_1: '',
    nota_quimestre_2: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const gradoInput = document.querySelector('#grado');
const docenteInput = document.querySelector('#docente');
const nota_quimestre_1Input = document.querySelector('#nota1');
const nota_quimestre_2Input = document.querySelector('#nota2');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(gradoInput.value === '' || docenteInput.value === '' || nota_quimestre_1Input.value === '' || nota_quimestre_2Input.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarCalificacion();
        editando = false;
    } else {
        objCalificacion.id = Date.now();
        objCalificacion.grado = gradoInput.value;
        objCalificacion.docente = docenteInput.value;
        objCalificacion.nota_quimestre_1 = nota_quimestre_1Input.value;
        objCalificacion.nota_quimestre_2 = nota_quimestre_2Input.value;

        agregarCalificacion();
    }
}

function agregarCalificacion() {

    listaCalificaciones.push({...objCalificacion});

    mostrarCalificaciones();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objCalificacion.id = '';
    objCalificacion.grado = '';
    objCalificacion.docente = '';
    objCalificacion.nota_quimestre_1 = '';
    objCalificacion.nota_quimestre_2 = '';
}

function mostrarCalificaciones() {
    limpiarHTML();

    const divCalificaciones = document.querySelector('.div-calificaciones');
    
    listaCalificaciones.forEach(calificacion => {
        const {id, grado, docente, nota_quimestre_1, nota_quimestre_2} = calificacion;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} ~ ${grado} ~ ${docente} ~ ${nota_quimestre_1} ~ ${nota_quimestre_2} ~ `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarCalificacion(calificacion);
        editarBoton.textContent = 'Editar  ';
        editarBoton.classList.add('btn-editar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-pen');
        editarBoton.appendChild(icono);
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarCalificacion(id);
        eliminarBoton.textContent = 'Eliminar  ';
        eliminarBoton.classList.add('btn-eliminar');
        var icono = document.createElement('i');
        icono.classList.add('fas', 'fa-trash');
        eliminarBoton.appendChild(icono);
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divCalificaciones.appendChild(parrafo);
        divCalificaciones.appendChild(hr);
    });
}

function cargarCalificacion(calificacion) {
    const {id, grado, docente, nota_quimestre_1, nota_quimestre_2} = calificacion;

    gradoInput.value = grado;
    docenteInput.value = docente;
    nota_quimestre_1Input.value = nota_quimestre_1;
    nota_quimestre_2Input.value = nota_quimestre_2;

    objCalificacion.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarCalificacion() {
    objCalificacion.grado = gradoInput.value;
    objCalificacion.docente = docenteInput.value;
    objCalificacion.nota_quimestre_1 = nota_quimestre_1Input.value;
    objCalificacion.nota_quimestre_2 = nota_quimestre_2Input.value;

    listaCalificaciones.map(calificacion => {

        if(calificacion.id === objCalificacion.id) {
            calificacion.id = objCalificacion.id;
            calificacion.grado = objCalificacion.grado;
            calificacion.docente = objCalificacion.docente;
            calificacion.nota_quimestre_1 = objCalificacion.nota_quimestre_1;
            calificacion.nota_quimestre_2 = objCalificacion.nota_quimestre_2;

        }

    });

    limpiarHTML();
    mostrarCalificaciones();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarCalificacion(id) {

    listaCalificaciones = listaCalificaciones.filter(calificacion => calificacion.id !== id);

    limpiarHTML();
    mostrarCalificaciones();
}

function limpiarHTML() {
    const divCalificaciones = document.querySelector('.div-calificaciones');
    while(divCalificaciones.firstChild) {
        divCalificaciones.removeChild(divCalificaciones.firstChild);
    }
}