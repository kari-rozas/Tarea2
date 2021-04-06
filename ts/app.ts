let form = <HTMLFormElement> document.getElementById("form");
const rutInvalido = <HTMLSpanElement> document.getElementById("error-rut");
const rut = <HTMLInputElement> form.elements.namedItem("rut");
const telefono = <HTMLInputElement> form.elements.namedItem("telefono");
const lenguajeInvalido = <HTMLSpanElement> document.getElementById("error-lenguaje");
const numValido = <HTMLSpanElement> document.getElementById("error-telefono");
const finalizado = <HTMLSpanElement> document.getElementById("finalizado");
let boton = <HTMLButtonElement> document.getElementById("limpiar");
const lenguaje= <RadioNodeList> form.elements.namedItem("lenguaje");


form.addEventListener("submit", function(event: Event){ 
    event.preventDefault();
    // console.log(form);
    console.log(lenguaje);

    let lenguajesMarcados: string[] = [];
    lenguaje.forEach((l: Node) => {
        const checkbox = <HTMLInputElement>l;
        if (checkbox.checked) lenguajesMarcados.push(checkbox.value);
    });

    if(lenguajesMarcados.length>0 && validarNum(telefono.value) && validarRut(rut.value)){
        form.style.display="none";
        finalizado.innerHTML="Hemos recibido sus datos, pronto nos estaremos comunicando con usted";
        finalizado.style.display="block";
        return;

    }

    if(lenguajesMarcados.length<1){
        lenguajeInvalido.innerHTML="Marca al menos 1 casilla";
        lenguajeInvalido.style.display="block";
    }
    else{
        lenguajeInvalido.style.display="none";
    }

    if(!validarRut(rut.value)){
        console.log(rut.value);
       rutInvalido.innerHTML="Rut no válido";
       rutInvalido.style.display="block"; 
        console.log(rutInvalido);
    }
    else{
        rutInvalido.style.display="none"; 
        console.log(rut.value);
        console.log(rutInvalido);
    }
    if(!validarNum(telefono.value)){
       numValido.innerHTML="Telefono no válido";
       numValido.style.display="block"; 
        console.log(numValido);
    }
    else{
        numValido.style.display="none"; 
        console.log(telefono.value);
    }
})

function validarRut(rut:string):boolean{
    const [numero, digito] = rut.split("-");
    // console.log(digito);
    // console.log(numero);
  if (rut.match(/\./) || !rut.match(/\-/g) || rut.split("-").length > 2) return false;
   if (!numero.match(/^[0-9]+$/) || !(numero.length <= 8 && numero.length > 6)) return false;
     if (digito.length === 1 || digito.match(/^[0-9]+$/) || digito === "k") {
       return true;
    }
  return false;

}

function limpiarDatos(event:Event){
    event.preventDefault();
    form.reset();
}

function validarNum(num:string):boolean{
    if(num.length===9) return true;
    return false;

}

boton.addEventListener("click", limpiarDatos);