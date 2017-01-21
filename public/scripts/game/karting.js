var frottement = 0.0025;
var angleRotation = 1.5;

var Karting = function(game) {
    // init
    this.speed = 0;
    this.vx = 0;
    this.vy = 0;
    this.acc = 0;
    this.angle = 0;
    this.forceMoteur = 0;

    // Création du sprite avec l'image (préchargée), et init de ses valeurs
    this.sprite = game.add.sprite(550, 914, 'kart');
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    var cursors = game.input.keyboard.createCursorKeys();

    this.update = function() {
        // On tourne
        if (cursors.left.isDown) {
            this.sprite.angle -= angleRotation;
        } else if (cursors.right.isDown) {
            this.sprite.angle += angleRotation;
        }

        // On accélère ou freine
        if (cursors.up.isDown) {
            if(this.forceMoteur < 0) {
                this.forceMoteur = 0.002;
            } else if(this.forceMoteur < 0.025) {
                this.forceMoteur += 0.0025;
            }
        } else if (cursors.down.isDown) {
            this.forceMoteur = -0.02;
        } else {
            this.forceMoteur = 0.00;
        }

        var sina = Math.sin(this.sprite.rotation);
        var cosa = Math.cos(this.sprite.rotation);

        // Somme des forces = m.a, on suppose une masse à 1 (par ce que osef...), 
        // une force moteur et les frottements
        this.acc = this.forceMoteur - frottement*Math.pow(this.speed, 2);

        this.speed += this.acc;

        // On a une vitesse globale du véhicule, 
        // mais on veut bien sûr prendre en compte sa rotation
        this.vx = this.speed*cosa;
        this.vy = this.speed*sina;

        this.sprite.body.position.x += this.vx;
        this.sprite.body.position.y += this.vy;
    }
    return this;
}