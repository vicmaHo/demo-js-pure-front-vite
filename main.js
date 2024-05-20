
// const url = 'http://localhost:8080/api/persons';

const url = 'https://demo-app-spring-production.up.railway.app/api/persons';

// elementos de la pagina
const table = document.querySelector('#users-table tbody');
const editModal = new bootstrap.Modal(document.getElementById('editModal'), {}); // dialogo boostrap de edicion, funciones show y hide
const editForm = document.querySelector('#edit-form');
const editId = document.querySelector('#edit-id');
const editName = document.querySelector('#edit-name');
const editEmail = document.querySelector('#edit-email');
const editCompany = document.querySelector('#edit-company');
const editCity = document.querySelector('#edit-city');


// cargar los usuarios desde la api, peticion get, retorno una array de objetos
const CargarUsuarios = async() => {
    console.log("cargando objetos");
    const array = [];
    // const res = await fetch('data.json');
    const res = await fetch(url);
    const data = await res.json();
    data.forEach(user => {
        array.push(user);
    });
    return array;
}

// Array de objetos usuarios
let usuarios = await CargarUsuarios();

// limpiar la tabla
function limpiar() {
    table.innerHTML = '';
}
// Eliminar usuario, peticion delete
async function  Eliminar(id) {
    await fetch(`${url}/${id}`, {
        method: 'DELETE',
    })



    // usuarios = usuarios.filter(user => user.id !== id);
    usuarios = await CargarUsuarios();

    console.log(usuarios);
    // limpiar();
    MostrarUsuarios(usuarios);

}

// Rellenar tabla de usuarios
function MostrarUsuarios(users) {
        console.log("mostrando");
        limpiar();
         users.forEach(user => {
            const row = document.createElement('tr')
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.company}</td>
                <td>${user.city}</td>
                <td>
                <a href="#" class="btn btn-danger btn-delete" data-id="${user.id}">Eliminar</a>
                <button type="button" class="btn btn-primary btn-edit" data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                </td>
            `;
            table.appendChild(row);
});


// `
// <a href="#" class="btn btn-primary btn-edit" data-id="${user.id}">Editar</a>
// `


    //eventos delete
    const deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault();
            const userId = parseInt(event.target.getAttribute('data-id'));
            console.log(userId);
            await Eliminar(userId); //await para que espere la respuesta y se actualice la tabla al tiempo
        });
    });


    //eventos edit - no implementados en el backend aun (cambios reflejados en el array local)
    const editButtons = document.querySelectorAll('.btn-edit');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const userId = parseInt(event.target.getAttribute('data-id'));
            Editar(userId);
        });
    });

}

// Captura de campos para edicion
function Editar(id) {
    const user = usuarios.find(user => user.id === id);
    editId.value = user.id;
    editName.value = user.name;
    editEmail.value = user.email;
    editCompany.value = user.company;
    editCity.value = user.city;
    editModal.show();
}

// modificacion de objeto en el array
function GuardarCambios(event) {
    event.preventDefault();
    const id = parseInt(editId.value);
    const userIndex = usuarios.findIndex(user => user.id === id);
    usuarios[userIndex].name = editName.value;
    usuarios[userIndex].email = editEmail.value;
    usuarios[userIndex].company = editCompany.value;
    usuarios[userIndex].city = editCity.value;
    editModal.hide();
    MostrarUsuarios(usuarios);
}


function CancelarEdicion() {
    editForm.style.display = 'none';
}


document.querySelector('#edit-form').addEventListener('submit', GuardarCambios);
// editForm.querySelector('form').addEventListener('submit', GuardarCambios);
// document.querySelector('#cancel-edit').addEventListener('click', CancelarEdicion);



console.log(usuarios);
MostrarUsuarios(usuarios);

//fetch('http://localhost:8080/api/persons').then(res => res.json()).then(data => console.log(data))