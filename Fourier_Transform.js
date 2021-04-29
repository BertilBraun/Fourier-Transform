
let fourier = null;
let time = 0;

let vals = [];

function setup() {
    createCanvas(800, 600);

    var NUM_POINTS = 1000;

    vals = points.map((x) => new Complex(x[0] * 15 - 150, x[1] * 15 - 150));
    fourier = new Fourier(vals);

    createButton('clear').mousePressed(() => {
        fourier = null;
        vals = [];
        document.getElementById("tipp").innerHTML = "You can now draw some Shapes!"
    });
    createButton('simulate').mousePressed(() => {
        time = 0;
        fourier = new Fourier(vals);
        document.getElementById("tipp").innerHTML = "Your drawing is now being Simulated!"
    });
}


function draw() {

    background(0);
    translate(width / 2, height / 2)

    if (fourier != null) {
        time += fourier.step(0, 0, time);
        fourier.draw();

        if (time > TWO_PI) {
            time = 0;
            fourier.reset();
        }
    }

    beginShape();
    noFill();
    stroke(255);
    for (const p of vals) {
        vertex(p.re, p.im);
    }
    endShape();


    if (mouseIsPressed && mouseX < width && mouseY < height) {
        fourier = null;
        vals.push(new Complex(mouseX - width / 2, mouseY - height / 2))
    }
}
