import { Maze } from "./model/maze";
import { SceneRender } from "./view/scene_render";
import { Vehicle } from "./model/vehicle";

//@ts-ignore
declare module "../Images/fireball.jpg" {
        const value: any;
        export = value;
}

const maze = new Maze([
        [[-3, 3], [2, 3]],
        [[2, 3], [2, 1]],
        [[2, 1], [4, 1]],
        [[4, 1], [4, -2]],
        [[4, -2], [-1, -2]],
        [[-1, -2], [-1, 0]],
        [[-1, 0], [-3, 0]],
        [[-3, 0], [-3, 3]],

        [[-2, 2], [-1, 2]],
        [[-1, 2], [-1, 1]],
        [[-1, 1], [-2, 1]],
        [[-2, 1], [-2, 2]],

        [[0, 2], [1, 2]],
        [[1, 2], [1, 1]],
        [[1, 1], [0, 1]],
        [[0, 1], [0, 2]],

        [[0, 0], [1, 0]],
        [[1, 0], [1, -1]],
        [[1, -1], [0, -1]],
        [[0, -1], [0, 0]],

        [[2, 0], [3, 0]],
        [[3, 0], [3, -1]],
        [[3, -1], [2, -1]],
        [[2, -1], [2, 0]],
    ],
    [10, 10]
);

const vehicle = new Vehicle(-0.5, 0.5, 0.1);

const scene_render = new SceneRender(80, maze, vehicle);

