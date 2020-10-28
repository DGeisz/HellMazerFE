export class Wall {
    start: [number, number];
    end: [number, number];

    constructor(start: [number, number], end: [number, number]) {
        if (start[0] === end[0]) {
            if (start[1] > end[1]) {
                this.end = start;
                this.start = end;
            } else {
                this.start = start;
                this.end = end;
            }
        } else {
            if (start[0] > end[0]) {
                this.end = start;
                this.start = end;
            } else {
                this.start = start;
                this.end = end;
            }
        }
    }

    is_vertical(): boolean {
        return this.start[0] === this.end[0];
    }

    /**
     * Returns the distance from point to the center of this wall
     */
    distToWall(x: number, y: number): number {
        const wall_x = (this.start[0] + this.end[0]) / 2;
        const wall_y = (this.start[1] + this.end[1]) / 2;

        return Math.sqrt(((x - wall_x) ** 2) + ((y - wall_y) ** 2));
    }
}