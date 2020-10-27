import { SceneRender } from "./view/scene_render";
import { Maze } from "./model/maze";
import { Vehicle } from "./model/vehicle";


export class HellMazerSimu {
    /** Frame rate of the simulation*/
    private readonly frame_rate: number;

    /** Renders the scene*/
    private readonly scene_render: SceneRender;

    /** Maze of the simulation*/
    private readonly maze: Maze;

    /** Vehicle in the simulation*/
    private readonly vehicle: Vehicle;

    /**
     * d_wheel is the distance between the vehicle wheels. This informs how sharply
     * the vehicle turns.  grid_width is the pixel width of each grid.
     */
    constructor(maze: Maze, d_wheel: number, grid_width: number, frame_rate: number) {
        this.frame_rate = frame_rate;
        this.maze = maze;
        this.vehicle = new Vehicle(this.maze.vehicle_start, d_wheel);
        this.scene_render = new SceneRender(grid_width, this.maze, this.vehicle);
    }

    /**
     * Runs the simulation
     */
    run() {
        setInterval(() => {
            this.tick();
        }, 1000 / this.frame_rate);
    }


    tick() {
        // syncWithEywa();
        // updateHellMazer();
    }
}
