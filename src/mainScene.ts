import Phaser from "phaser";
import { Player } from "./Player";

export class GameScene extends Phaser.Scene{

    player1: Player;
    player2: Player;
    bola: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    gameInputs: Phaser.Input.Keyboard.KeyboardPlugin;
    sons: Phaser.Sound.BaseSound[];
    player1ScoreText: Phaser.GameObjects.Text;
    player2ScoreText: Phaser.GameObjects.Text;

    velocidadeBola = 120;

    constructor(){
        super({
            key: "GameScene"
        })
    }

    preload(){
        this.load.image('player', '../assets/playerSprite.png');
        this.load.image('bola', '../assets/bola.png');
        this.load.image('divisoria', '../assets/divisoria.png');
        this.load.audio('hit1', '../assets/hit1.ogg')
        this.load.audio('lose', '../assets/lose.ogg')
    }

    create(){
        this.add.image(400, 300, 'divisoria');
        this.player1ScoreText = this.add.text(190, 34, '0', {fontSize: '50px', fontFamily: 'Qahiri'});
        this.player2ScoreText = this.add.text(593, 34, '0', {fontSize: '50px', fontFamily: 'Qahiri'});

        this.sons = [
            this.sound.add('hit1'),
            this.sound.add('lose')
        ];

        this.player1 = this.add.existing(new Player({
            scene: this,
            isIA: false,
            x: 30
        }));

        this.player2 = this.add.existing(new Player({
            scene: this,
            isIA: true,
            x: 770
        }));

        this.bola = this.physics.add.sprite(400, 300, 'bola')
            .setBounce(1.1)
            .setCollideWorldBounds(true)
            .setVelocity(this.velocidadeBola);
        this.bola.body.onWorldBounds = true;

        this.physics.add.collider(this.bola, this.player1, ()=>{
            this.sons[0].play();
        });

        this.physics.add.collider(this.bola, this.player2, ()=>{
            this.sons[0].play();
        })

        //ControlaPontuacao
        this.physics.world.on('worldbounds', (body: any)=>{
            if(body.blocked.right){
                this.HandleLose(this.player1, 1)
            }
            else if(body.blocked.left){
                this.HandleLose(this.player2, -1)
            }
            else{
                this.sons[0].play();
            }
        })
    }

    update(){
        //controles player1 - player2
        var keyboard = this.input.keyboard
        this.player1.ControlaPersonagem(keyboard, {Sobe: 'W', Desce: 'S'}, this.bola);
        this.player2.ControlaPersonagem(keyboard, {Sobe: 'UP', Desce: 'DOWN'}, this.bola);
    }

    HandleLose(player: Player, lado: -1 | 1){
        player.score ++
        this.player1ScoreText.setText(this.player1.score.toString());
        this.player2ScoreText.setText(this.player2.score.toString());
        this.bola.setPosition(400, 300)
            .setVelocity(lado * this.velocidadeBola)
        this.sons[1].play();
    }
}