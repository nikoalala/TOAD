window.onload = function() {
    // Taille du jeu et de la piste
    var width = 800;
    var height = 600;
    var pisteSize = [877, 1240];
    // var pisteSize = [1754, 2481];

    // Création du jeu avec les différentes fonctions necessaires.
    var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    var karting, piste, currentSpeed = 0;

    // Préchargement des images
    function preload() {    
        game.load.image('piste', '/toad/images/game/piste2.png');
        game.load.image('kart', '/toad/images/game/kart2.png');

    }

    function create() {
        game.world.setBounds(0, 0, pisteSize[0], pisteSize[1]);

        // Moteur physique du jeu (permet notamment de gérer les collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        piste = game.add.tileSprite(0, 0, pisteSize[0], pisteSize[1], 'piste');
        piste.fixedToCamera = true;

        karting = Karting(game);

        game.camera.follow(karting.sprite);
        game.camera.deadzone = new Phaser.Rectangle(350, 250, 150, 100);
        game.camera.focusOnXY(0, 0);

    }

    /**
    * Fonction appelée avant chaque frame
    */
    function update() {
        karting.update();

        // La caméra suit le karting, mais la piste reste fixe, 
        // on doit donc la bouger en fonction de la caméra
        piste.tilePosition.x = -game.camera.x;
        piste.tilePosition.y = -game.camera.y;
    }

    function render() {

    }

};