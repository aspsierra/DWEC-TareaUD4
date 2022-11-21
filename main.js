class Factura{
    constructor(id,fecha){
        this.id=id
        this.fecha = fecha;
        this.precio = 0;
        this.iva = 0
        this.descuento = 0;
        this.precioBase=0;
        this.precioIva=0;
        this.precioTotal=0;
    }

    /**
     * Precio total de todos los productos
     * @param {number} precios 
     */
    calcularPrecio(precios){
        this.precio += precios
    }
    /**
     * Calculo del descuento
     * @param {number} descuento 
     */
    asignarDescuento(){              
        this.precioDescuento = this.descuento/100 * this.precio;
        this.precioDescuento=parseFloat(this.precioDescuento.toFixed(2));
        this.precioBase = this.precio - this.precioDescuento;
    }
    /**
     * Porcentaje de iva 
     * @param {number} iva 
     */
    calcularIva(){
        
        this.precioIva = (this.iva/100) * this.precioBase;
        this.precioIva=parseFloat(this.precioIva.toFixed(2));
        this.precioTotal=this.precioBase + this.precioIva;
        this.precioTotal=parseFloat(this.precioTotal.toFixed(2));
        
    }
    /**
     * guardo los datos asociados al cliente para mostrarlos luego
     * @param {Cliente} datosCliente 
     */
    asignarCliente(datosCliente){
        this.cliente="";
        for (const key in datosCliente) {
            if(typeof(datosCliente[key])!="function"){
                this.cliente += datosCliente[key] + "<br>"; 
            }           
        }
    }
    /**
     * guardo los datos asociados a la empresa para mostrarlos luego
     * @param {Empresa} datosEmpresa 
     */
     asignarEmpresa(datosEmpresa){
        this.empresa="";
        for (const key in datosEmpresa) {
            if(typeof(datosEmpresa[key])!="function"){
                this.empresa += datosEmpresa[key] + "<br>"; 
            }           
        }
    }
    /**
     * transformo el modo a mayus y lo guardo en el objeto
     * @param {string} estado 
     */
    asignarEstado(estado){
        this.estado = estado.toUpperCase();
    }
    /**
     * registro el método de pago en el objeto
     * @param {string} formaPago 
     */
    asignarFormaPago(formaPago){
        this.formaPago = formaPago;
    }

    /**
     * encabezado de la factura, cliente y empresa emisora
     */
    encabezado(){
        this.divCliente = document.createElement("div");
        this.divEmpresa = document.createElement("div");

        this.divCliente.innerHTML = this.cliente;
        this.divEmpresa.innerHTML = this.empresa;

        this.divEmpresa.style.textAlign="right";
    }

    /**
     * nombre de la factura, id + fecha
     */
    nombre(){
        this.titulo = document.createElement("h3")
        this.titulo.innerHTML= "Factura nº: " + this.id + " Fecha: " + this.fecha.toLocaleDateString();
        document.body.append(this.titulo)
    }

    /**
     * tabla de los productos que aparecerán en la factura
     * @param {Array} productos 
     */
    tablaProductos(productos){
        this.seccionProductos=document.createElement("section");
        this.seccionProductos.style.display="grid";
        this.seccionProductos.style.gridTemplateColumns=" 4fr repeat(3, 1fr)"
        this.seccionProductos. innerHTML = "<div><strong>Descripción</strong></div>  <div><strong>Cantidad</strong></div>   <div><strong>Precio (€)</strong></div>   <div><strong>Parcial (€)</strong></div>"
        for (const i in productos) {           
            for (const j in productos[i]) {
                this.seccionProductos.innerHTML +=  "<div>"+productos[i][j]+"</div>"              
            }
        }
    }

    /**
     * Tabla con los precios detallados
     */
    tablaPrecios(){
        this.seccionPrecios = document.createElement("section");
        this.seccionPrecios.style.display ="grid";
        this.seccionPrecios.style.gridTemplateColumns="300px 150px";
        this.seccionPrecios.style.justifyContent="end"
        this.seccionPrecios. innerHTML = "<div><strong>Suma</strong></div>  <div>"+this.precio+"€</div>";
        this.seccionPrecios. innerHTML += "<div><strong>Descuento "+this.descuento+"%</strong></div>   <div>"+this.precioDescuento+"€</div>";
        this.seccionPrecios. innerHTML += "<div><strong>Base imp.</strong></div>   <div>"+this.precioBase+"€</div>"
        this.seccionPrecios. innerHTML += "<div><strong>IVA "+this.iva+"%</strong></div>  <div>"+this.precioIva+"€</div>"
        this.seccionPrecios. innerHTML += "<div><strong>TOTAL</strong></div>  <div>"+this.precioTotal+"€</div>";
    }

    /**
     * muestro la forma de pago
     */
    displayFormaPago(){
        this.dispPago = document.createElement("h4");

        this.dispPago.innerHTML = "Forma de pago: " +this.formaPago;
    }

    /**
     * mostrar estado de la factura
     */
    displayEstado(){
        this.dispEstado =document.createElement("center");
        this.dispEstado.innerHTML = this.estado;

    }

    /**
     * abro una nueva ventana con todos los datos guardados
     */
    nuevaVentana(){
        this.ventana=document.open("","Factura nº "+this.id,"width = 800, height=800");
        this.style=document.createElement("style");
        this.style.innerHTML = "section div{ padding:5px; border:1px solid black }"
        this.ventana.document.head.appendChild(this.style)
        this.ventana.document.body.append(this.divCliente);
        this.ventana.document.body.append(this.divEmpresa);
        this.ventana.document.body.append(this.titulo);
        this.ventana.document.body.append(this.seccionProductos);
        this.ventana.document.body.append(this.seccionPrecios);
        this.ventana.document.body.append(this.dispPago);
        this.ventana.document.body.append(this.dispEstado);
    }
}

/**
 * objeto cliente
 */
class Cliente{
    constructor(nombre, dir, tlfno, nif){
        this.nombre=nombre;
        this.dir=dir;
        this.tlfno=tlfno;
        this.nif=nif
    }
}   

class Empresa extends Cliente{
    constructor(...sup){
        super(...sup)
    }
}

class Producto{
    constructor(nombre, num, precio){
        this.nombre=nombre;
        this.num = num;
        this.precio = precio;
    }
    /**
     * calculo del precio total de los productos del mismo tipo
     */
    precioTotal(){
        this.total = this.num * this.precio;
    }
}

/**
 * Muestro uno de los ejemplos creados
 * @param {Factura} ejFactura 
 * @param {Cliente} ejCliente 
 * @param {Empresa} ejEmpresa 
 * @param {Array} ejProductos 
 */
function ejemploFacturas(ejFactura, ejCliente, ejEmpresa, ejProductos){
    for (let i = 0; i < ejProductos.length; i++) {
        ejProductos[i].precioTotal()
        ejFactura.calcularPrecio(ejProductos[i].total)       
    }

    

    ejFactura.asignarCliente(ejCliente);
    ejFactura.asignarEmpresa(ejEmpresa);
    ejFactura.asignarDescuento(10);
    ejFactura.calcularIva(21);  
    ejFactura.encabezado();
    ejFactura.nombre();
    ejFactura.tablaProductos(ejProductos);
    ejFactura.tablaPrecios();  
    ejFactura.displayFormaPago();
    ejFactura.displayEstado();
    ejFactura.nuevaVentana();


}



function main(){
    var ejemplo
    var clienteEjemplo
    var empresaEjemplo
    var productoEj

    document.getElementById("Ej1").addEventListener("click",evt=>{
        ejemplo = new Factura(4500, new Date("2021-03-14"));
        clienteEjemplo = new Cliente("Ferretería Paquiño", "Avda de Galicia", "986986986", "12345678A");
        empresaEjemplo = new Empresa("Mecanizados María José", "Estrada Vella de Madrid", "986547320", "99887744E");
        productoEj = new Array(new Producto("Pieza mecanizada",1, 640), new Producto("Piezas varias", 10, 15));
        ejemplo.iva=21;
        ejemplo.descuento=10
        
        ejemplo.asignarFormaPago("Transferencia");
        ejemplo.asignarEstado("pagado");
        ejemploFacturas(ejemplo, clienteEjemplo, empresaEjemplo, productoEj);
    })

    document.getElementById("Ej2").addEventListener("click",evt=>{
        ejemplo = new Factura(2597, new Date("2016-9-4"));
        clienteEjemplo = new Cliente("Gasolineras Lucho", "Avda de Alcalde Lavadores", "321654987", "3204789T");
        empresaEjemplo = new Empresa("Mesón Manolo", "Avenida de Martínez Garrido", "123456789", "99856214U");
        productoEj = new Array(new Producto("Menú do día", 15, 15), new Producto("O especial de Manolo", 3, 25), new Producto("Gran reserva da Luisa", 6, 40));
        ejemplo.iva=21;
        ejemplo.descuento=7.5;
        
        ejemplo.asignarFormaPago("Al contado");
        ejemplo.asignarEstado("pagado");
        ejemploFacturas(ejemplo, clienteEjemplo, empresaEjemplo, productoEj);
    })


}

main()