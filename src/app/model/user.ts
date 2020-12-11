export class User {
    id:number;
    full_name:string;
    email:string;
    login:string;
    image:string;
    password:string;
    setId(id:number){
        this.id=id;
    }
    setFullName(full: string) {
        this.full_name=full;
    }
    setEmail(ma: string){
        this.email=ma;
    }
    setLogin(log: string){
        this.login=log;
    }
    setImage(im: string){
        this.image=im;
    }
    setPassword(pass: string){
        this.password=pass;
    }
}