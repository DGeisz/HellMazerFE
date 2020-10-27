import { Wall } from "./wall";

export class Maze {
    walls: Wall[];
    dimension: [number, number];

    constructor(walls_template: [[number, number], [number, number]][], dimension: [number, number]) {
        this.dimension = dimension;
        this.walls = walls_template.map(template => {
            return new Wall(template[0], template[1]);
        });
    }
}