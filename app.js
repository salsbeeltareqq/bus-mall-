'use strict'

var productsNames = ["bag", "banana", "bathroom", "boots", "breakfast", "bubblegum", "chair", "cthulhu", "dog-duck",
    "dragon", "pen", "pet-sweep", "scissors", "shark", "sweep", "tauntaun", "unicorn", "usb", "water-can", "wine-glass"];
var colorArray = ['#ffe0e0', '#ffebe0', '#fff0e0', '#fff5e0', '#fffae0', '#ffffe0', '#faffe0', '#f5ffe0', '#f0ffe0', '#ebffe0',
    '#e6ffe0', '#e0ffe0', '#e0ffe6', '#e0ffeb', '#e0fff0', '#e0fff5', '#e0fffa', '#e0ffff', '#e0faff', '#e0f5ff'];
var numberOfselections = 25;
var randomIndexArray = [];
var productArray = [];
var index; //index for productArray 
var currentSelectedProducts = [];

var displayTimesArray = [];
var clicksArray = [];
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
var emptyObject = new Product("placehold"); //create after the function is defined because it's an inline function
var previousRoundSelection = [emptyObject, emptyObject, emptyObject];


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
    for (let i = 0; i < currentSelectedProducts.length; i++) {
        var figure = document.createElement("figure");
        figure.className = `${currentSelectedProducts[i].name}`
        figure.innerHTML = `<img class=\"${currentSelectedProducts[i].name}\" src=\"${currentSelectedProducts[i].imgPath}\">`;

        imagesSection.appendChild(figure);
    }
}

//searches for one product in the previous selection
function isDisplayedPreviousRound(index) {
    let flag = false;
    for (let i = 0; i < 3; i++) {
        if (previousRoundSelection[i] === currentSelectedProducts[index]) {
            flag = true;
        }
    }
    return flag;
}

function updatePreviousRoundSelection() {
    for (let i = 0; i < currentSelectedProducts.length; i++) {
        previousRoundSelection[i] = currentSelectedProducts[i];
    }
}
//select three objects from the productArray
function selectThreeProducts() {

    resetDisplayed(); //make sure previous Product.displayed is back to default

    for (let i = 0; i < 3; i++) {
        do {
            index = randomIndex();
            currentSelectedProducts[i] = productArray[index]; //apdat the array of selected items (only three)
            randomIndexArray[i] = index  //update the array that has the selected indecies
            //   debugger;
        } while (productArray[index].displayed || isDisplayedPreviousRound(i))

        productArray[index].displayed = !productArray[index].displayed;
        productArray[index].displayTimes++;
    }
    renderImages();
    updatePreviousRoundSelection();


}

//event listener
imagesSection.addEventListener("click", newThreeImages);
function newThreeImages(event) { //eventlistener

    resetDisplayed();
    if (numberOfselections > 0) {
        imagesSection.innerHTML = "";
        numberOfselections--;
        for (let i = 0; i < randomIndexArray.length; i++) {
            if (event.target.className === productArray[randomIndexArray[i]].name) {
                productArray[randomIndexArray[i]].clicks++;
            }
        }

        selectThreeProducts();
    } else if (numberOfselections == 0) {
        imagesSection.removeEventListener("click", newThreeImages);
        renderResults();
        generateChart();
    }


}

function renderResults() {
    var ul = document.createElement("ul");
    ul.textContent = "Results";
    var item;
    for (let i = 0; i < productArray.length; i++) {
        var li = document.createElement("li");
        item = productArray[i];

        clicksArray[i] = item.clicks;
        displayTimesArray[i] = item.displayTimes;
        li.textContent = `${item.name} had ${item.clicks} votes and was shown ${item.displayTimes} times`;
        ul.appendChild(li);
    }
    aside.appendChild(ul);
}

createProducts();
selectThreeProducts();

///////// create a chart//////////
function generateChart() {
    var cnvs1 = document.getElementById("resultclickschart").getContext('2d');
    var resultClicksChart = new Chart(cnvs1, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: "clicks",
                data: clicksArray,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var cnvs2 = document.getElementById("resultdisplayschart").getContext('2d');
    var resultdisplyChart = new Chart(cnvs2, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: "display times",
                data: displayTimesArray,
                backgroundColor: colorArray,
                borderColor: colorArray,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });




}