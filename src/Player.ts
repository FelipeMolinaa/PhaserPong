import Phaser from "phaser";
export class Player extends Phaser.Physics.Arcade.Sprite{

    public score = 0;
    public isIA: boolean;
    public velocidade = 400;

    constructor(config: {scene: Phaser.Scene, isIA: boolean, x: number}){
        super(config.scene, config.x, 280, 'player');
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        this.isIA = config.isIA;

        this.setBounce(0);
        this.setCollideWorldBounds(true);
        this.setImmovable();
    }

    public ControlaPersonagem(keyboard: Phaser.Input.Keyboard.KeyboardPlugin, teclas: {Sobe: string, Desce: string}, bola: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody){
        if(!this.isIA){
            keyboard.on(`keydown-${teclas.Sobe}`, ()=>{
                this.setVelocityY(-this.velocidade)
            }, this);
            keyboard.on(`keydown-${teclas.Desce}`, ()=>{
                this.setVelocityY(this.velocidade)
            }, this);
            keyboard.on(`keyup-${teclas.Sobe}`, ()=>{
                this.setVelocityY(0)
            }, this);
            keyboard.on(`keyup-${teclas.Desce}`, ()=>{
                this.setVelocityY(0)
            }, this);

            return
        }

        var qualMetade = this.x < 400 ? bola.x < 400 : bola.x > 400;
        if(qualMetade){
            var bolaAcima = this.y < bola.y ? 1 : -1
            this.setVelocityY(bolaAcima * this.velocidade)
        }
        else{
            var multiplicadorPosicaoPlayer = this.y <= 300 ? 1 : -1
            this.setVelocityY(multiplicadorPosicaoPlayer * this.velocidade)
        }
    }
}