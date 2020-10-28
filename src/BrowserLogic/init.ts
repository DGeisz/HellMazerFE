import { basicMaze } from "../Mazes/builtInMazes";
import { HellMazerSimu } from "./HellMazerSimu";

const simu = new HellMazerSimu(basicMaze, 0.1, 0.1, 80, 60);

simu.run();

