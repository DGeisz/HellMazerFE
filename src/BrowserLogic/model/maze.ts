import { Wall } from "./wall";
import { Vehicle } from "./vehicle";

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

    /**
     * Returns whether there are walls in front
     * of the position specified by these coordinates
     *
     * The first return is whether there's a vertical wall,
     * second return is whether there's a horizontal wall,
     * (in front of the vehicle, that is)
     */
    wallsInFrontOfVehicle(vehicle: Vehicle): [boolean, boolean] {
        const x = vehicle.x;
        const y = vehicle.y;
        let angle = vehicle.angle;

        const x_floor = Math.floor(x);
        const y_floor = Math.floor(y);

        let verticalWall: Wall;
        let horizontalWall: Wall;

        angle = angle % Math.PI;
        const fraction = angle / (2 * Math.PI);

        if (fraction < 0.25) {
            verticalWall = new Wall([x_floor + 1, y_floor], [x_floor + 1, y_floor + 1]);
            horizontalWall = new Wall([x_floor, y_floor + 1], [x_floor + 1, y_floor + 1]);
        } else if (fraction >= 0.25 && fraction < 0.5) {
            verticalWall = new Wall([x_floor + 1, y_floor], [x_floor + 1, y_floor + 1]);
            horizontalWall = new Wall([x_floor, y_floor], [x_floor + 1, y_floor]);
        } else if (fraction >= 0.5 && fraction < 0.75) {
            verticalWall = new Wall([x_floor, y_floor], [x_floor, y_floor + 1]);
            horizontalWall = new Wall([x_floor, y_floor], [x_floor + 1, y_floor]);
        } else {
            verticalWall = new Wall([x_floor, y_floor], [x_floor, y_floor + 1]);
            horizontalWall = new Wall([x_floor, y_floor + 1], [x_floor + 1, y_floor + 1]);
        }

        return [this.checkForSuperWall(horizontalWall), this.checkForSuperWall(verticalWall)];
    }

    /**
     * Returns true if there's a wall in the maze that contains
     * this sub-wall
     */
    checkForSuperWall(sub_wall: Wall): boolean {
        if (sub_wall.is_vertical()) {
            return this.walls.some(wall => {
                //Make sure wall is vertical
                return wall.is_vertical()
                    //Make sure x coords line up
                    && sub_wall.start[0] === wall.start[0]
                    //Make sure y coords line up
                    && wall.start[1] <= sub_wall.start[1] && sub_wall.end[1] <= wall.end[1];
            });
        } else {
            return this.walls.some(wall => {
                //Make sure wall is horizontal
                return !wall.is_vertical()
                    //Make sure y coords line up
                    && sub_wall.start[1] === wall.start[1]
                    //Check if x coords line up
                    && wall.start[0] <= sub_wall.start[0] && sub_wall.end[0] <= wall.end[0];
            });
        }
    }

    /**
     * Find the distance from coord pointing with angle to nearest
     * in that direction
     */
    distanceToNearestWall(x: number, y: number, angle: number): number {
        let slope = Math.tan(angle);

        if (slope === 0) slope += 0.0001;

        angle = angle % (2 * Math.PI);

        const linear = x_n => (slope * (x_n - x)) + y;
        const inv_linear = y_n => ((1 / slope) * (y_n - y)) + x;

        const intersecting_walls = this.walls.filter(wall => {
            if (angle < Math.PI / 2) {
                if (wall.end[1] < y || wall.end[0] < x) return false;
            } else if (angle >= Math.PI / 2 && angle < Math.PI) {
                if (wall.start[1] > y || wall.end[0] < x) return false;
            } else if (angle >= Math.PI && angle < 3 * Math.PI / 2) {
                if (wall.start[1] > y || wall.start[0] > x) return false;
            } else {
                if (wall.end[1] < y || wall.start[0] > x) return false;
            }

            if (wall.is_vertical()) {
                const y_intercept = linear(wall.start[0]);
                return wall.end[1] >= y_intercept && wall.start[1] <=  y_intercept;
            } else {
                const x_intercept = inv_linear(wall.start[1]);
                return wall.end[0] >= x_intercept && wall.start[0] <= x_intercept;
            }
        });

        const nearest_wall = intersecting_walls.reduce((prev, curr) => {
            return prev.distToWall(x, y) < curr.distToWall(x, y) ? prev : curr;
        });

        if (nearest_wall.is_vertical()) {
            return Math.hypot(x - nearest_wall.start[0], y - linear(nearest_wall.start[0]));
        } else {
            return Math.hypot(x - inv_linear(nearest_wall.start[1]), y - nearest_wall.start[1]);
        }
    }
}