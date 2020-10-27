import { Maze } from "../model/maze";
import { Wall } from "../model/wall";
import { Vehicle } from "../model/vehicle";

export class SceneRender {
    grid_width: number;
    vehicle_element: HTMLDivElement;
    top_left: [number, number];

    constructor(grid_width: number, maze: Maze, vehicle: Vehicle) {
        this.grid_width = grid_width;

        this.top_left = [
            -1 * Math.floor((maze.dimension[0] - 1) / 2),
            Math.floor((maze.dimension[1] - 1) / 2)
        ];

        this.render_maze(maze);

        this.vehicle_element = document.createElement('div');
        this.vehicle_element.setAttribute('class', 'drop');
        this.vehicle_element.style.position = 'absolute';

        this.render_vehicle(vehicle);

        document.getElementById('page').appendChild(this.vehicle_element);
    }

    render_vehicle(vehicle: Vehicle) {
        this.vehicle_element.style.left = [(vehicle.x - this.top_left[0]) * this.grid_width, 'px'].join('');
        this.vehicle_element.style.top = [(this.top_left[1] - vehicle.y) * this.grid_width, 'px'].join('');
        this.vehicle_element.style.transform = ['rotate(', vehicle.angle, 'rad)'].join('');
    }

    render_maze(maze: Maze) {

        maze.walls.forEach(wall => {
            this.render_wall(wall);
        });
    }

    private render_wall(wall: Wall) {

        const wall_element = document.createElement('div');
        wall_element.style.height = '2px';
        wall_element.style.width = '2px';
        wall_element.style.backgroundColor = 'black';
        wall_element.style.position = 'absolute';
        wall_element.style.left = [(wall.start[0] - this.top_left[0]) * this.grid_width, 'px'].join('');
        wall_element.style.top = [(this.top_left[1] - wall.end[1]) * this.grid_width, 'px'].join('');

        if (wall.is_vertical()) {
            const height = wall.end[1] - wall.start[1];
            wall_element.style.height = [(height * this.grid_width), 'px'].join('');
        } else {
            const width = wall.end[0] - wall.start[0];
            wall_element.style.width = [(width * this.grid_width), 'px'].join('');
        }

        const page = document.getElementById("page");
        page.appendChild(wall_element);
    }
}