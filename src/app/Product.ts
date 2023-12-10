export class Product{
    id:string;
	name:string;
    description:string;
    price:number;
    stock:number;

    constructor(){
        this.id="";
        this.name="";
        this.description="";
        this.price=0;
        this.stock=0;
    }
}