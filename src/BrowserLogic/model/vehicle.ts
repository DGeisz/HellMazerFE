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

        this.angle =  3.9 * Math.PI / 2;
    }


    /** Updates the vehicles positions variables
     *
     * The 0th index of wallInFront indicates if there's
     * a horizontal wall in front of the vehicles position
     * and the 1st index indicates if there's a vertical wall
     * in front of the vehicles position
     */
    update(d_t: number, v_l: number, v_r: number, wallsInFront: [boolean, boolean]) {
        console.log(wallsInFront);

        const x_floor = Math.floor(this.x);
        const y_floor = Math.floor(this.y);

        this.v_l = v_l;
        this.v_r = v_r;

        const d_l = ((this.v_r + this.v_l) / 2) * d_t;
        const new_x = this.x + (d_l * Math.sin(this.angle));
        const new_y = this.y + (d_l * Math.cos(this.angle));

        const new_x_floor = Math.floor(new_x);
        const new_y_floor = Math.floor(new_y);

        //Only update coords if the car doesn't move through walls
        if (!(wallsInFront[1] && x_floor !== new_x_floor)) {
            this.x = new_x;
        }

        if (!(wallsInFront[0] && y_floor !== new_y_floor)) {
            this.y = new_y;
        }

        this.angle += ((this.v_l - this.v_r) / this.d_wheel) * d_t;
    }

}