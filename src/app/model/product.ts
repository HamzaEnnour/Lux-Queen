export class Product {
    id:number;
    name:string;
    description:string;
    image:string;
    price:number;
    categorie:string;
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
    setCategorie(cat : string){
        this.categorie=cat;
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