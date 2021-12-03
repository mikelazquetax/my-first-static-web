let cont = 0
let precio = 0

window.onload = () =>{
//    p.innerHTML = cont

    let cont = document.getElementById("contador")

    let summar = document.getElementById("sumar")

    let restar = document.getElementById("restar")
    
    let ptotal = document.createElement("p")
    ptotal.setAttribute("id","ptotal")
    document.getElementById("total").appendChild(ptotal)

    summar.addEventListener("click", () => {
        add()
    })

    restar.addEventListener("click", () => {
        sustract()
    })


}

let add = () => {
    cont += 1
    contador.innerText = cont + " un."
    precio += 60
    ptotal.innerText = precio + " €"
    
    if(cont == 1){
        let checkout = document.createElement("button")
        checkout.setAttribute("id", "btncheck")
        checkout.innerText = "Proceed to Checkout"
        checkout.classList.add("btocaja")
        document.getElementById("caja").appendChild(checkout)
    }
   
}

let sustract = () => {
    cont -= 1
    precio -= 60
    if( cont < 0){
        cont = 0
        precio = 0
    }
    contador.innerText = cont + " un."
    ptotal.innerText = precio + " €"
    if(cont == 0 && document.getElementById("btncheck") != null){
        checkout = document.getElementById("btncheck")
        document.getElementById("caja").removeChild(checkout)
    }


}

    

