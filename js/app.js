"use strict";
var form = document.getElementById("form");
var rutInvalido = document.getElementById("error-rut");
var rut = form.elements.namedItem("rut");
var telefono = form.elements.namedItem("telefono");
var lenguajeInvalido = document.getElementById("error-lenguaje");
var numValido = document.getElementById("error-telefono");
var finalizado = document.getElementById("finalizado");
var boton = document.getElementById("limpiar");
var lenguaje = form.elements.namedItem("lenguaje");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // console.log(form);
    console.log(lenguaje);
    var lenguajesMarcados = [];
    lenguaje.forEach(function (l) {
        var checkbox = l;
        if (checkbox.checked)
            lenguajesMarcados.push(checkbox.value);
    });
    if (lenguajesMarcados.length > 0 && validarNum(telefono.value) && validarRut(rut.value)) {
        form.style.display = "none";
        finalizado.innerHTML = "Hemos recibido sus datos, pronto nos estaremos comunicando con usted";
        finalizado.style.display = "block";
        return;
    }
    if (lenguajesMarcados.length < 1) {
        lenguajeInvalido.innerHTML = "Marca al menos 1 casilla";
        lenguajeInvalido.style.display = "block";
    }
    else {
        lenguajeInvalido.style.display = "none";
    }
    if (!validarRut(rut.value)) {
        console.log(rut.value);
        rutInvalido.innerHTML = "Rut no válido";
        rutInvalido.style.display = "block";
        console.log(rutInvalido);
    }
    else {
        rutInvalido.style.display = "none";
        console.log(rut.value);
        console.log(rutInvalido);
    }
    if (!validarNum(telefono.value)) {
        numValido.innerHTML = "Telefono no válido";
        numValido.style.display = "block";
        console.log(numValido);
    }
    else {
        numValido.style.display = "none";
        console.log(telefono.value);
    }
});
function validarRut(rut) {
    var _a = rut.split("-"), numero = _a[0], digito = _a[1];
    // console.log(digito);
    // console.log(numero);
    if (rut.match(/\./) || !rut.match(/\-/g) || rut.split("-").length > 2)
        return false;
    if (!numero.match(/^[0-9]+$/) || !(numero.length <= 8 && numero.length > 6))
        return false;
    if (digito.length === 1 || digito.match(/^[0-9]+$/) || digito === "k") {
        return true;
    }
    return false;
}
function limpiarDatos(event) {
    event.preventDefault();
    form.reset();
}
function validarNum(num) {
    if (num.length === 9)
        return true;
    return false;
}
boton.addEventListener("click", limpiarDatos);
