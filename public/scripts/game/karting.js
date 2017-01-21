var frottement = 0.025;
var angleRotation = 2;

var Karting = function(game) {
    this.speed = 0;
    this.vx = 0;
    this.vy = 0;
    this.acc = 0;
    this.angle = 0;
    this.forceMoteur = 0;

    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'kart');
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.maxVelocity.setTo(300, 300);
    this.sprite.body.maxAngular = 180;
    this.sprite.body.collideWorldBounds = true;

    var cursors = game.input.keyboard.createCursorKeys();

    this.update = function() {
        if (cursors.left.isDown) {
            this.sprite.angle -= angleRotation;
        } else if (cursors.right.isDown) {
            this.sprite.angle += angleRotation;
        }


        if (cursors.up.isDown) {
            if(this.forceMoteur < 0.15) {
                this.forceMoteur += 0.01;
            }
        } else if (cursors.down.isDown) {
            this.forceMoteur = -0.02;
        } else {
            this.forceMoteur = 0.00;
        }


        var sina = Math.sin(this.sprite.rotation);
        var cosa = Math.cos(this.sprite.rotation);

        this.acc = this.forceMoteur - frottement*Math.pow(this.speed, 1);

        this.speed += this.acc;

        this.vx = this.speed*cosa;
        this.vy = this.speed*sina;

        this.sprite.body.position.x += this.vx;
        this.sprite.body.position.y += this.vy;
    }
    return this;
}