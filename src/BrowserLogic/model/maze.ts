import { Wall } from "./wall";

export class Maze {
    walls: Wall[];
    dimension: [number, number];

    /** Coordinates describing where the vehicle
     * starts on this map*/
    vehicle_start: [number, number];

    constructor(
        walls_template: [[number, number], [number, number]][],
        dimension: [number, number],
        vehicle_start: [number, number]
    ) {
        this.dimension = dimension;
        this.walls = walls_template.map(template => {
            return new Wall(template[0], template[1]);
        });
        this.vehicle_start = vehicle_start;
    }
}