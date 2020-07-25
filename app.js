    'use strict'

    var productsNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck", "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];
    var numberOfselections = 25;
    var randomIndexArray = [];
    var productArray = [];
    var index; //index for productArray 
    var selectedProductsArray = [];
    var imagesSection = document.getElementById("imagesSection");
    var aside = document.getElementById("results");

    //Object constructor
    function Product(name) {
        this.name = name;
        this.imgPath = this.imageExtension();
        this.displayed = false;
        this.displayTimes = 0;
        this.clicks = 0;
        this.percentage = this.clicks * 100 / productsNames.length;
    }
    Product.prototype.imageExtension = function () {
        var path = ""
        if (this.name === "usb") {
            path = `img/${this.name}.gif`;
        } else if (this.name === "sweep") {
            path = `img/${this.name}.png`;
        } else {
            path = `img/${this.name}.jpg`;

        }
        return path;

    };

    // create the objects
    function createProducts() {
        for (let i = 0; i < productsNames.length; i++) {
            var productx = new Product(productsNames[i]);
            productArray[i] = productx;
        }
    }

    //generates a random integer 
    function randomIndex() {
        return Math.trunc(Math.random() * productsNames.length);
    }

    //resets the value of displayed to false 
    function resetDisplayed() {
        for (let i = 0; i < productArray.length; i++) {
            productArray[i].displayed = false;
        }
    }

    // create and append elements
    function renderImages() {
        for (let i = 0; i < selectedProductsArray.length; i++) {
            var figure = document.createElement("figure");
            figure.className=`${selectedProductsArray[i].name}`
            figure.innerHTML = `<img class=\"${selectedProductsArray[i].name}\" src=\"${selectedProductsArray[i].imgPath}\">`;

            imagesSection.appendChild(figure);
        }
    }

    //select three objects from the productArray
    function selectThreeProducts() {

        resetDisplayed(); //make sure previous Product.displayed is back to default

        for (let i = 0; i < 3; i++) {
            do {
                index = randomIndex();
                selectedProductsArray[i] = productArray[index]; //apdat the array of selected items (only three)
                randomIndexArray[i]=index  //update the array that has the selected indecies          
            } while (productArray[index].displayed)
            productArray[index].displayed = !productArray[index].displayed;
            productArray[index].displayTimes++;

        }
        renderImages();
    }

    //event listener
    imagesSection.addEventListener("click", newThreeImages);
    function newThreeImages(event) { //eventlistener

        resetDisplayed();
        if (numberOfselections > 0) {
            imagesSection.innerHTML = "";
            numberOfselections--;
            for(let i=0; i<randomIndexArray.length;i++){
                if (event.target.className === productArray[randomIndexArray[i]].name){
                productArray[randomIndexArray[i]].clicks++;
            }
            }

            selectThreeProducts();
        } else if (numberOfselections == 0) {
            imagesSection.removeEventListener("click", newThreeImages);
            renderResults();
        }


    }

    function renderResults(){
        var ul = document.createElement("ul");
        ul.textContent="Results";
        var item;
        for(let i=0 ; i<productArray.length ;i++){
            var li =document.createElement("li");
            item = productArray[i];


            li.textContent=`${item.name} had ${item.clicks} votes and was shown ${item.displayTimes} times`;
            ul.appendChild(li);
        }
        aside.appendChild(ul);
    }

    createProducts();
    selectThreeProducts();