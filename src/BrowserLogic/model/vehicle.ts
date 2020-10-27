export class Vehicle {
    /** Position of the vehicle */
    x: number;
    y: number;

    /** Angle of vehicle in radians */
    angle: number;

    /** velocities of left and right wheels*/
    v_l: number;
    v_r: number;

    /** distance between wheels*/
    d_wheel: number;

    constructor(starting_coord: [number, number], d_wheel) {
        this.x = starting_coord[0];
        this.y = starting_coord[1];
        this.d_wheel = d_wheel;

        this.v_l = 0;
        this.v_r = 0;

        this.angle = 0.;
    }


    /** Updates the vehicles positions variables*/
    update(d_t: number, v_l, v_r) {
        this.v_l = v_l;
        this.v_r = v_r;

        const d_l = ((this.v_r + this.v_l) / 2) * d_t;
        this.x += d_l * Math.cos(this.angle);
        this.y += d_l * Math.sin(this.angle);

        this.angle += ((this.v_l - this.v_r) / this.d_wheel) * d_t;
    }
}