var population;
var information;


function setup() {
    createCanvas(1800, 300);
    colorMode(RGB,1.0, 1.0, 1.0, 1.0);

    var population_size = 5;
    var mutation_rate = 0.05;

    population = new Population(mutation_rate, population_size);

    button = createButton("New Generation");
    button.mousePressed(next_generation);
    button.position(10,250);
    info = createDiv('');
    info.position(10,275);
}

function draw() {
    background(1);
    population.display();
    population.rollover(mouseX, mouseY);
    info.html("Generation # " + population.get_generation());
}

function next_generation() {
    population.selection();
    population.reproduction();
}