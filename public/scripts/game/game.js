window.onload = function() {

        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update:update, render:render });

        var karting, piste, cursors, currentSpeed = 0;

        function preload () {
            game.load.image('piste', './images/game/piste.png');
            game.load.image('kart', './images/game/kart.png');

        }

        function create () {
            game.world.setBounds(0, 0, 1754, 2481);

            //  We're going to be using physics, so enable the Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);
            cursors = game.input.keyboard.createCursorKeys();

            piste = game.add.tileSprite(0, 0, 1754, 2481, 'piste');
            piste.fixedToCamera = true;

            karting = game.add.sprite(game.world.centerX, game.world.centerY, 'kart');
            karting.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(karting);
            karting.body.maxVelocity.setTo(300, 300);
            karting.body.maxAngular = 90;
            karting.body.collideWorldBounds = true;

            game.camera.follow(karting);
            //game.camera.deadzone = new Phaser.Rectangle(400, 400, 300, 300);
            game.camera.focusOnXY(0, 0);

        }


        function update () {
           karting.body.velocity.y = karting.body.velocity.y * 0.95;

            if (cursors.left.isDown) {
                karting.body.angularAcceleration = -1000;
            }
            else if (cursors.right.isDown) {
                karting.body.angularAcceleration = 1000;
            } else {
                karting.body.angularAcceleration = 0;
                karting.body.angularVelocity *= 0.80;
            }


            if (cursors.up.isDown) {
                currentSpeed  += 50;        
            }
            else if (cursors.down.isDown) {
                if (currentSpeed > 0) {   
                    currentSpeed -= 50;
                }
            } else {
                currentSpeed *= 0.95;
            }

            if(currentSpeed > 0) {
                game.physics.arcade.velocityFromRotation(karting.rotation, currentSpeed, karting.body.velocity);

                piste.tilePosition.x = -game.camera.x;
                piste.tilePosition.y = -game.camera.y;
            }
        }

        function render () {

        }

    };