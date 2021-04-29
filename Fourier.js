
class Fourier {

    constructor(x) {
        this.series = this.dft(x);
        this.series.sort((a, b) => b.amp - a.amp);

        this.path = [];
    }

    step(x, y, time) {

        for (const f of this.series) {
            const px = x;
            const py = y;

            x += f.amp * cos(f.freq * time + f.phase);
            y += f.amp * sin(f.freq * time + f.phase);

            stroke(255, 100);
            noFill();
            ellipse(px, py, f.amp * 2);
            stroke(255);
            line(px, py, x, y)
        }

        this.path.unshift(createVector(x, y));

        return TWO_PI / this.series.length;
    }

    draw() {

        beginShape();
        noFill();
        for (const p of this.path) {
            vertex(p.x, p.y);
        }
        endShape();
    }

    reset() {
        this.path = [];
    }

    dft(x) {
        const X = [];
        const N = x.length;

        for (let k = 0; k < N; k++) {
            const sum = new Complex(0, 0);

            for (let n = 0; n < N; n++) {
                const phi = (TWO_PI * k * n) / N;
                const c = new Complex(cos(phi), -sin(phi))

                sum.add(c.mult(x[n]))
            }

            sum.div(N);

            const freq = k;
            const amp = sum.mag();
            const phase = sum.angle();

            X[k] = { freq, amp, phase }
        }

        return X;
    }

}


