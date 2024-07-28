class Car{
    #brand;
    #model;
    speed = 0;
    isTrunkOpen;

    constructor(carDetails){
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
    }

    displayInfo(){
        return `${this.#brand} ${this.#model} ${this.speed} km/h and the trunk is ${this.isTrunkOpen === true ? 'open' : 'close'}.`;
    }

    go(){
        if(this.isTrunkOpen === true){
            this.speed = 0;
        }else if(this.speed === 200){
            this.speed = 200;
            this.isTrunkOpen = false;

        }else{
            this.speed += 5;
            this.isTrunkOpen = false;

        }

    }

    brake(){
        if(this.speed === 0 ){
            this.speed = 0;
        }else{
            this.speed -=5;
        }
    }

    openTrunk(){
        this.isTrunkOpen = true;
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(carDetails){
        super(carDetails);
        this.acceleration = carDetails.acceleration;
    }

    go(){
        if(this.speed >= 300){
            this.speed = 300;
        }else{
            this.speed += this.acceleration;
        }
    }
}
// const car1 = new Car({
//     brand: "Toyota",
//     model : "Corolla"
// });

const cars = [{
    brand: "Toyota",
    model : "Corolla"
},
{
    brand : "Tesla",
    model : "Model 3"
}
].map((carDetails)=>{
    return new Car(carDetails)
});

// cars.forEach((car) => {
//     car.openTrunk();
//     car.go();
//     console.log(car.displayInfo());
// })

const raceCar = new RaceCar({
    brand: "McLaren",
    model : "F1",
    acceleration : 100
});
raceCar.go();
raceCar.go();
raceCar.go();
raceCar.go();
console.log(raceCar.displayInfo());

