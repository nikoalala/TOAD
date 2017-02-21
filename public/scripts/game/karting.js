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
    this.checkpointIndex = 0;

    // Création du sprite avec l'image (préchargée), et init de ses valeurs
    this.sprite = game.add.sprite(863, 330, 'kart');
    this.sprite.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.angle = -90;
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
            if (this.forceMoteur < 0) {
                this.forceMoteur = 0.002;
            } else if (this.forceMoteur < 0.025) {
                this.forceMoteur += 0.0025;
            }
        } else if (cursors.down.isDown) {
            if(this.speed > 0) {
                this.forceMoteur = -0.04;
            } else {
                this.forceMoteur = -0.0025;
            }
        } else {
            this.forceMoteur = 0.00;
        }

        var sina = Math.sin(this.sprite.rotation);
        var cosa = Math.cos(this.sprite.rotation);

        //En cas de collision, on rebondi legerement
        if (this.checkCollision()) {
            this.speed *= -0.25;
        } else {
            // Somme des forces = m.a, on suppose une masse à 1 (par ce que osef...), 
            // une force moteur et les frottements
            var signe = 1;
            if (Math.sign(this.speed) < 0) {
                signe = -1;
            }
            this.acc = this.forceMoteur - (Math.abs(frottement * Math.pow(this.speed, 2))) * signe;

            this.speed += this.acc;
        }

        // On a une vitesse globale du véhicule, 
        // mais on veut bien sûr prendre en compte sa rotation
        this.vx = this.speed * cosa;
        this.vy = this.speed * sina;

        this.sprite.body.position.x += this.vx;
        this.sprite.body.position.y += this.vy;

        //Gestion temps au tour
        if(this.checkTourComplet()) {
            if(this.dateDebut) {
                var dateFin = new Date();
                this.tempsTour = dateDiff(this.dateDebut, dateFin);
            }

            this.dateDebut = new Date();
        }

    }

    var margeCollision = 0.8;
    var timeoutCollision = 10;
    /**
     * Vérifie la collision avec les bords de la piste.
     * Si vrai, alors collision.
     */

    this.checkCollision = function() {
        // On laisse un peu de temps pour se remettre de la collision
        if (this.collisionDetected > 0) {
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
        var h = (body.height * margeCollision) / 2;
        var w = (body.width * margeCollision) / 2;

        // Cacul des différents coins du sprite par rapport à la rotation du kart
        var p1 = _rotation(-w, -h, this.sprite.rotation, x, y);
        var p2 = _rotation(w, -h, this.sprite.rotation, x, y);
        var p3 = _rotation(-w, h, this.sprite.rotation, x, y);
        var p4 = _rotation(w, h, this.sprite.rotation, x, y);

        // On ne vérifie que la collision des coins pour aller plus vite, 
        // et par ce que ça suffit pour nos vitesses
        if (pisteColl && pisteColl.length > 0 && body.height & body.width) {
            if (pisteColl[p1.y][p1.x] == 0 ||
                pisteColl[p2.y][p2.x] == 0 ||
                pisteColl[p3.y][p3.x] == 0 ||
                pisteColl[p4.y][p4.x] == 0) {

                this.collisionDetected = timeoutCollision;
                return true;
            }
        }
        return false;
    }


    var listCheckPoint = [{x1:837, y1:251, x2:938, y2:251}, {x1:38, y1:570, x2:129, y2:570}, {x1:544, y1:5, x2:544 , y2:100}, {x1:610, y1:610, x2:610 , y2:710}];
    /**
    * Vérifie la position du kart dans le circuit et passe les chckpoint au fur et à mesure.
    * Retourne vrai si le kart passe par la case départ après être passée dans tous les checkpoints (ou la 1ere fois)
    */
    this.checkTourComplet = function() {
        if(this.oldPosition) {
            var cp = listCheckPoint[this.checkpointIndex];
            if(checkLineIntersection(this.sprite.body.position.x, this.sprite.body.position.y, this.oldPosition.x, this.oldPosition.y, cp.x1, cp.y1, cp.x2, cp.y2)) {
                if(this.checkpointIndex == 0) {                
                    this.checkpointIndex++;
                    this.oldPosition = {x: this.sprite.body.position.x, y: this.sprite.body.position.y};
                    return true;
                } else if(this.checkpointIndex >= listCheckPoint.length-1) {
                    this.checkpointIndex = 0;
                } else {
                    this.checkpointIndex++;
                }
            }
        }

        this.oldPosition = {x: this.sprite.body.position.x, y: this.sprite.body.position.y};
        return false;
    }

    return this;
}