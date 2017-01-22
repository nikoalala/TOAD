var frottement = 0.0025;
var angleRotation = 1.5;

var Karting = function(game, checkCollisionObj) {
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
            this.forceMoteur = -0.04;
        } else {
            this.forceMoteur = 0.00;
        }

        var sina = Math.sin(this.sprite.rotation);
        var cosa = Math.cos(this.sprite.rotation);

        //En cas de collision, on rebondi legerement
        if(this.checkCollision()) {
            this.speed *= -0.25;
        } else {
            // Somme des forces = m.a, on suppose une masse à 1 (par ce que osef...), 
            // une force moteur et les frottements
            var signe = 1;
            if(Math.sign(this.speed) < 0) {
                signe = -1;
            }
            this.acc = this.forceMoteur - (Math.abs(frottement*Math.pow(this.speed, 2)))*signe;

            this.speed += this.acc;
        }

        // On a une vitesse globale du véhicule, 
        // mais on veut bien sûr prendre en compte sa rotation
        this.vx = this.speed*cosa;
        this.vy = this.speed*sina;

        this.sprite.body.position.x += this.vx;
        this.sprite.body.position.y += this.vy;
    }

    /**
    * Vérifie la collision avec les bords de la piste.
    * Si vrai, alors collision.
    */
    var margeCollision = 0.8;
    var timeoutCollision = 10;
    this.checkCollision = function() {
        // On laisse un peu de temps pour se remettre de la collision
        if(this.collisionDetected > 0) {
            this.collisionDetected--;
            return false;
        }

        var body = this.sprite.body;

        // pisteColl a été calculé lors du lancement du jeu
        // C'est le tableau des couches alpha de l'image (0 transparent donc vide, 1 plein donc circuit)
        var pisteColl = checkCollisionObj.transparancyData;

        var x = body.center.x;
        var y = body.center.y;

        // On laisse une marge car le sprite est par endroit un peu plus grand que l'image (l'avant, en particulier)
        var h = (body.height * margeCollision)/2;
        var w = (body.width * margeCollision)/2;

        // Cacul des différents coins du sprite par rapport à la rotation du kart
        var p1 = _rotation(-w,-h, this.sprite.rotation, x, y);
        var p2 = _rotation(w,-h, this.sprite.rotation, x, y);
        var p3 = _rotation(-w,h, this.sprite.rotation, x, y);
        var p4 = _rotation(w,h, this.sprite.rotation, x, y);

        // On ne vérifie que la collision des coins pour aller plus vite, 
        // et par ce que ça suffit pour nos vitesses
        if(pisteColl && pisteColl.length > 0 && body.height & body.width) {
            if(pisteColl[p1.y][p1.x] == 0 ||
               pisteColl[p2.y][p2.x] == 0 ||
               pisteColl[p3.y][p3.x] == 0 ||
               pisteColl[p4.y][p4.x] == 0 ) {

                this.collisionDetected = timeoutCollision;
                return true;
            }
        }
        return false;
    }

    /**
    * Calcul de la rotation et de la position du point par rapport au centre de la sprite
    *
    */
    function _rotation(x, y, angle, baseX, baseY) {
        var sina = Math.sin(angle);
        var cosa = Math.cos(angle);

        // Vive la matrice de rotation...
        return {x:Math.round(baseX + (x*cosa-y*sina)) , y:Math.round(baseY + (x*sina+y*cosa))};
    }

    return this;
}