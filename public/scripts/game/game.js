window.onload = function() {

    //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
    //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
    //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

    var width = 800;
    var height = 600;

    var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var karting, piste, cursors, currentSpeed = 0;

    function preload() {
        game.load.image('piste', '/toad/images/game/piste2.png');
        game.load.image('kart', '/toad/images/game/kart2.png');

    }

    var pisteSize = [877, 1240];
   // var pisteSize = [1754, 2481];

    function create() {
        game.world.setBounds(0, 0, pisteSize[0], pisteSize[1]);

        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = game.input.keyboard.createCursorKeys();

        piste = game.add.tileSprite(0, 0, 1754, 2481, 'piste');
        piste.fixedToCamera = true;

        karting = Karting(game);

        game.camera.follow(karting.sprite);
        game.camera.deadzone = new Phaser.Rectangle(350, 250, 150, 100);
        game.camera.focusOnXY(0, 0);

    }

    

    function update() {
        karting.update();

        piste.tilePosition.x = -game.camera.x;
        piste.tilePosition.y = -game.camera.y;
    }

    function render() {

    }

};