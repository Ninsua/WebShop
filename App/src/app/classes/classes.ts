export class Product {
    name: string;
    brand: string;
    imageURL: string;
	imagePath: string;
    price: number;
    numInStock:number;
    description: string;
    
    constructor(name:string, brand:string, imageURL:string, imagePath:string, price:number, numInStock, desc:string){
        this.name=name;
        this.brand = brand;
        this.imageURL = imageURL;
		this.imagePath = imagePath;
        this.price=price;
        this.numInStock=numInStock;
        this.description=desc;
    }
}

export class Category {
    name: string;

    constructor(name:string){
        this.name = name;
    }
}

export class Order {
    
}