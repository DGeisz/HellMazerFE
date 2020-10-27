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
}