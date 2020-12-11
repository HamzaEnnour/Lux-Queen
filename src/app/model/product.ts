export class Product {
    id:number;
    name:string;
    description:string;
    image:string;
    price:number;
    quantity:number;
    setId(id:number){
        this.id=id;
    }
    setName(full: string) {
        this.name=full;
    }
    setDescription(des: string){
        this.description=des;
    }
    setImage(im: string){
        this.image=im;
    }
    setPrice(pr: number){
        this.price=pr;
    }
    setQuantity(qu: number){
        this.quantity=qu;
    }
}