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

export class Address{
    street:string;
    zipCode: string;
    city:string;
    country:string;

    constructor(street:string, zipCode:string, city:string, country:string){
        this.street = street;
        this.zipCode = zipCode;
        this.city = city;
        this.country = country;
    }
}

export class Order {
    date:string;
    user:string;
    address:Address
    ifPayed: boolean;
    ifShipped: boolean;
    itemListStr:string;
    quantityListStr:string;
    

    constructor(user:string, address:Address, ifPayed:boolean, ifShipped:boolean, itemListStr:string, quantityListStr:string){
        this.date = new Date().toUTCString();
        this.user = user;
        this.address = address;
        this.ifPayed = ifPayed;
        this.ifShipped = ifShipped;
        this.itemListStr = itemListStr;
        this.quantityListStr = quantityListStr;
    }
}