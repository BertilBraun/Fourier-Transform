class Complex {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    div(n) {
        this.re /= n;
        this.im /= n;
        return this;
    }

    add(c) {
        this.re += c.re;
        this.im += c.im;
        return this;
    }

    mult(c) {
        // somehow this doesn't work but the code blow does?!
        // this.re = this.re * c.re - this.im * c.im;
        // this.im = this.re * c.im + this.im * c.re;

        const re = this.re * c.re - this.im * c.im;
        const im = this.re * c.im + this.im * c.re;
        this.re = re;
        this.im = im;
        return this;
    }

    mag() {
        return sqrt(this.re * this.re + this.im * this.im);
    }

    angle() {
        return atan2(this.im, this.re);
    }
}