export class HellMazerSimu {
    private frame_rate: number;
    /** Time width of the maze*/
    private maze_width: number;
    /** Tile height of the maze*/
    private maze_height: number;

    /** Side length of the tile in pixels*/
    private tile_side_length: number;

    /** Mazer x and y position*/
    private x: number;
    private y: number;

    constructor(maze_width: number, maze_height: number, tile_side_length, frame_rate: number) {
        this.maze_height = maze_height;
        this.maze_width = maze_width;
        this.frame_rate = frame_rate;
        this.tile_side_length = tile_side_length;

        this.x = 0;
        this.y = 0;
    }

    run() {
        setInterval(() => {
            this.tick();
        }, 1000 / this.frame_rate);
    }

    tick() {
        syncWithEywa();
        updateHellMazer();
    }


}
