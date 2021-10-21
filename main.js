class Product{
    constructor(id, name, amount, cost){
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.cost = cost;
        this.next=null;
    }
    getTotal(){
        return this.amount * this.cost;
    }
    infoHTML(){
        return `| ${this.id} | ${this.name} | ${this.amount} | ${this.cost} | ${this.getTotal()} |<br>`;
    }
}
class Depot{
    constructor(){
        this.products = null;
    }
    add(product){
        if (this.products==null) {
            this.products=product;
        } else if (this.search(product.id)==null){
            let aux = this.products;
            while (aux.next!=null) {
                aux=aux.next;
            }
            aux.next=product;
        } else {
            return null
        } 
        console.log(this.products)
        return product;
    }
    insert(index,product){
        if (this.products==null) {
            this.products=product;
        }else if (this.search(product.id)==null) {
            let last = this.products;
            let now = this.products.next;
            let i = 1
            while (last!=null&&i<=index) {
                if (i==index-1) {
                    last.next=product;
                    product.next=now;
                } else {
                    last = now;
                    now = now.next;
                }
                i++
            }
            console.log(this.products)
        }else{
            return null;
        }
        return product;
    }
    delete(id){
        let deleteData = null;
        if (!this.products) {
            return deleteData;
        }else if (this.products.id==id) {
            deleteData = this.products;
            this.products=this.products.next;
        } else {
            let last = this.products;
            let now = this.products.next;
            while (now!=null) {
                if (now.id==id) {
                    last.next=now.next
                    deleteData = now;
                    deleteData.next=null
                    return deleteData;
                }else{
                    last = now;
                    now = now.next;
                }
            }
            return null;
        }
        console.log(this.products)
    }

    search(id){
        let aux = this.products;
        if (this.products==null) {
            return null;
        } else {
            while (aux!=null) {
                if (aux.id==id) {
                    return aux;
                }
                aux=aux.next;
            }
            console.log(this.products)
            return null;
        }
    }

    listDefautl(){
        let list='';
        let aux=this.products;
        while (aux!=null) {
            list += aux.infoHTML() + '';
            aux=aux.next;
        }
        return list;
    }
}

class Interface{
    showProduct(newData){
        let details=document.getElementById('details');
        details.innerHTML = `${newData}`;
    }
}
let depot = new Depot();
let ui = new Interface();
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    //TOMA DATOS HTML
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.showProduct(depot.add(product).infoHTML());
});

const btnInsert=document.getElementById('btnInsert');
btnInsert.addEventListener('click',()=>{
    //TOMA DATO HTML
    let id = document.getElementById('idAdd').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let productInsert = new Product(id, name, amount, cost);
    let indexInsert = document.getElementById('indexInsert').value;
    ui.showProduct(depot.insert(indexInsert,productInsert).infoHTML());
});

const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    //TOMA DATO HTML
    let id = document.getElementById('idDelete').value;
    if (depot.delete(id)==null) {
        let msg="Sin resultados"
        ui.showProduct(msg)
    }else{
        ui.showProduct(depot.delete(id).infoHTML());
    }
});

const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    //TOMA DATO HTML
    let id = document.getElementById('idSearch').value;
    if (depot.search(id)==null) {
        let msg="Sin resultados"
        ui.showProduct(msg)
    }else{
        ui.showProduct(depot.search(id).infoHTML());
    }
});

const btnDefault=document.getElementById('btnListDefault');
btnDefault.addEventListener('click',()=>{
    ui.showProduct(depot.listDefautl());
});