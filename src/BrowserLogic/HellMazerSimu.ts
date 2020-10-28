import axios from 'axios';
import { SceneRender } from "./view/scene_render";
import { Maze } from "./model/maze";
import { Vehicle } from "./model/vehicle";

/**
 * Describes the body of an http request
 * to eywa-server
 */
interface SensorHttpBody {
    forward: number,
    forward_pain: number,
    left: number,
    left_pain: number,
    right: number,
    right_pain: number,
    back: number,
    back_pain: number,
}

/**
 * Describes the json response from
 * eywa-server
 */
interface ActuatorHttpResponse {
    left_forward: number,
    left_backward: number,
    right_forward: number,
    right_backward: number,
}

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
     * This is the pain threshold to determine
     * if the vehicle is close enough to the wall
     * to feel pain
     */
    private readonly painThreshold;
    /**
     * d_wheel is the distance between the vehicle wheels. This informs how sharply
     * the vehicle turns.  grid_width is the pixel width of each grid.
     */
    constructor(maze: Maze, painThreshold: number, d_wheel: number, grid_width: number, frame_rate: number) {
        this.frame_rate = frame_rate;
        this.maze = maze;
        this.vehicle = new Vehicle(this.maze.vehicle_start, d_wheel);
        this.scene_render = new SceneRender(grid_width, this.maze, this.vehicle);
        this.painThreshold = painThreshold;
    }

    /**
     * Runs the simulation
     */
    run() {
        setInterval(async () => {
            await this.tick();
        }, 1000 / this.frame_rate);
    }


    async tick() {
        const input = this.getSensoryInput();
        try {
            const actuatorResponse = await this.callEywa(input);
            this.updateSimu(actuatorResponse);
        } catch (e) {
            console.log(e);
        }
    }

    getSensoryInput(): SensorHttpBody {
        const front_distance = this.maze.distanceToNearestWall(this.vehicle.x, this.vehicle.y, this.vehicle.angle);
        const front_pain = front_distance < this.painThreshold ? 1.0 : 0.0;

        const right_distance = this.maze.distanceToNearestWall(this.vehicle.x, this.vehicle.y, this.vehicle.angle + (Math.PI / 4));
        const right_pain = right_distance < this.painThreshold ? 1.0 : 0.0;

        const back_distance = this.maze.distanceToNearestWall(this.vehicle.x, this.vehicle.y, this.vehicle.angle + (Math.PI / 2));
        const back_pain = back_distance < this.painThreshold ? 1.0 : 0.0;

        const left_distance = this.maze.distanceToNearestWall(this.vehicle.x, this.vehicle.y, this.vehicle.angle + ((3 * Math.PI) / 4));
        const left_pain = left_distance < this.painThreshold ? 1.0 : 0.0;

        return {
            forward: front_distance,
            forward_pain: front_pain,
            right: right_distance,
            right_pain,
            back: back_distance,
            back_pain,
            left: left_distance,
            left_pain
        }
    }

    async callEywa(sensory_input: SensorHttpBody): Promise<ActuatorHttpResponse> {
        return await axios.put('http://localhost:4200/sensactio', sensory_input);
    }

    updateSimu(actuatorInput: ActuatorHttpResponse) {
        this.vehicle.update(
            1 / this.frame_rate,
            actuatorInput.left_forward - actuatorInput.left_backward,
            actuatorInput.right_forward - actuatorInput.right_backward,
            this.maze.wallsInFrontOfVehicle(this.vehicle)
        );
    }
}
