let wishCounter = 0;
let arrayOfWishes = [];
let error = 0;
let borrado = 0;
window.onload = () => {
  let btnAddWish = document.getElementById("botonWish");
  let btnClearAll = document.getElementById("clearAll");
  btnAddWish.addEventListener("click", () => {
    wishCounter = arrayOfWishes.length;
    wishCounter = wishCounter + 1;
    if (wishCounter > 1) {
      checkDuplicatedWishes(wishCounter);
    } else {
      addWish(wishCounter);
    }

    if (error == 0) {
      var position = "deseo" + wishCounter;

      var x = document.getElementById("mainContainer").lastElementChild;
      /* newWish = document.getElementById(position); */
      botonDeleteWish = document.createElement("button");
      var ancestor = document.getElementById("mainContainer"),
        descendents = ancestor.getElementsByClassName("deseoClase");

      for (i = 0; i < descendents.length; i++) {
        e = descendents[i];
        e.id = i;
      }

      botonDeleteWish.id = "botonB" + descendents.length;
      botonDeleteWish.classList.add("botonBorrar");
      botonDeleteWish.innerText = "Delete";

      botonTacharWish = document.createElement("button");
      botonTacharWish.id = "botonD" + descendents.length;
      botonTacharWish.classList.add("botonTachar");
      botonTacharWish.innerText = "Cross";

      x.appendChild(botonTacharWish);
      x.appendChild(botonDeleteWish);
    } else {
      error = 0;
    }

    botonTacharWish.addEventListener("click", (event) => {
      ancestor = document.getElementById("mainContainer"),
      descendents = ancestor.getElementsByClassName("botonTachar");

    for (i = 0; i < descendents.length; i++) {
      e = descendents[i];
      e.id =  i + 'b';
    }

    descendentsDiv = ancestor.querySelectorAll('div')
   for (i = 0; i < descendentsDiv.length; i++) {
      eD = descendentsDiv[i];
      eD.id =  i ;
    }
 
      idbotonPulsado = event.currentTarget.id;
      idbotonPulsadox = idbotonPulsado.slice(0,-1)
      crossWish(idbotonPulsadox);
    });

    botonDeleteWish.addEventListener("click", (event) => {
      ancestor = document.getElementById("mainContainer"),
      descendents = ancestor.getElementsByClassName("botonBorrar");

    for (i = 0; i < descendents.length; i++) {
      e = descendents[i];
      e.id =  i + 'b';
    }

    descendentsDiv = ancestor.querySelectorAll('div')
   for (i = 0; i < descendentsDiv.length; i++) {
      eD = descendentsDiv[i];
      eD.id =  i ;
    }
 
      idbotonPulsado = event.currentTarget.id;
      idbotonPulsadox = idbotonPulsado.slice(0,-1)
      deleteWish(idbotonPulsadox);
    });

    btnClearAll.addEventListener("click", () => {
      window.location.reload();
    });
  });
};

addWish = (wishCounter) => {
  newWishDiv = document.createElement("div");
  newWish = document.createElement("p");
  newWish.classList.add("parrafoClase");
  newWishDiv.appendChild(newWish);
  newWishDiv.classList.add("deseoClase");

  getTextWish = document.getElementById("writtenWish").value;
  wishContainer = document.getElementById("mainContainer");
  newWish.innerText = getTextWish.toUpperCase();
  if (newWish.innerText == "") {
    newWish.innerText = "(empty)";
  }
  newWish.id = "deseo";;
  wishContainer.appendChild(newWishDiv);

  arrayOfWishes.push(newWish.innerText);

  return arrayOfWishes;
  
};

checkDuplicatedWishes = (wishCounter) => {
  let arrayOfWishesIntern = [...arrayOfWishes];
  let newWish = document.getElementById("writtenWish").value.toUpperCase();
  //  var error = 0;
  var contador = 0;

  arrayOfWishesIntern.forEach((wish) => {
    contador = contador + 1;
    if (wish == newWish) {
      alert("Wish already in List");
      error = error + 1;
    }
    if (error == 0 && contador == arrayOfWishes.length) {
      addWish(wishCounter);
    } else if (error == 1) {
      wishCounter = 0;
    }
  });

  return error;
};
var crossed;
crossWish = (idbotonPulsadox) => {

    e = document.getElementById(idbotonPulsadox)
 
  
    if (crossed == null) {
      e.setAttribute("style", "text-decoration: line-through");
      crossed = "Y";
    } else if (crossed == "Y") {
      e.setAttribute("style", "text-decoration: none");
      crossed = null;
    }
  
};

 deleteWish = (idbotonPulsadox) => {

  descendentsText = document.querySelectorAll("p");
  arrBefore = [];
  arrAfter = [];

  descendentsText.forEach((item) => {
    arrBefore.push(item.innerText);
  });

try{
  e = document.querySelector
  e = document.getElementById(idbotonPulsadox);
  e.remove()
}catch{
  e = document.getElementById(idbotonPulsadox + 1);
  e.remove()
}


  descendentsText = document.querySelectorAll("p");

  descendentsText.forEach((item) => {
    arrAfter.push(item.innerText);
  });

  arrayOfWishes = arrAfter; //ASIGNAMOS A LA GLOBL EL ARRAY FINAL


};
