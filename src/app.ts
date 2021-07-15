import Phaser from "phaser"
import { GameScene } from "./mainScene"

const config: Phaser.Types.Core.GameConfig= {
    type: Phaser.AUTO,
    title: 'Pong!',
    width: 800,
    height: 600,
    parent: "game",
    scene: [GameScene],
    physics:{
        default: 'arcade',
        arcade:{
        }
    }
}

export class Pong extends Phaser.Game{
    constructor(config: Phaser.Types.Core.GameConfig){
        super(config)
    }
}

window.onload = () =>{
    var game = new Pong(config);
}