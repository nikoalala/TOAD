window.onload = function() {
    // Taille du jeu et de la piste
    
    var offset = 100;
    var pisteSize = [877, 1240];
    // var pisteSize = [1754, 2481];

    var windowSize = getBrowserDimensions();
    if(windowSize.height > 900) {
            windowSize.height = 900;
    }
    
    // Création du jeu avec les différentes fonctions necessaires.
    var game = new Phaser.Game(windowSize.width/2, windowSize.height-offset, Phaser.AUTO, 'kartingGameCanvas', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }, true);

    var karting, piste, currentSpeed = 0;

    // Préchargement des images
    function preload() {
        game.load.image('piste', '/toad/images/game/piste3.png');
        game.load.image('kart', '/toad/images/game/kart2.png');

    }

    function create() {
        game.world.setBounds(0, 0, pisteSize[0], pisteSize[1]);

        // Moteur physique du jeu (permet notamment de gérer les collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        piste = game.add.tileSprite(0, 0, pisteSize[0], pisteSize[1], 'piste');
        piste.fixedToCamera = true;
        var checkCollisionObj = new CheckCollisionPiste();

        karting = Karting(game, checkCollisionObj);


        game.camera.follow(karting.sprite);
        //game.camera.deadzone = new Phaser.Rectangle(350, 250, 150, 100);
        game.camera.focusOnXY(0, 0);

        activateWindowSizeCheck(game);
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
        game.debug.text('Vitesse : ' + karting.speed, 32, 32);


        if(karting.dateDebut) {
            var time = dateDiff(karting.dateDebut, new Date());
            game.debug.text('Temps : ' + time.min + ":"+ time.sec, 32, 72);
        }
        
        if(karting.tempsTour) {
            game.debug.text('Temps au tour : ' + karting.tempsTour.min + ":"+ karting.tempsTour.sec, 32, 92);
        }

        if(karting.checkpointIndex != undefined) {
            game.debug.text('Checkpoint : ' + karting.checkpointIndex, 32, 52);
        }
    }

};

var CheckCollisionPiste = function() {
    var that = this;
    // Doit contenir toutes les infos de transparence de l'image
    // transparancyData[x][y]
    this.transparancyData = [];
    var pisteTransparentSrc = '/toad/images/game/piste2_transparent.png';
    var width = 877,
        height = 1240;
    var start = false;
    var context = null;
    var c = document.createElement("canvas");
    if (c.getContext) {
        context = c.getContext("2d");
        if (context.getImageData) {
            start = true;
        }
    }
    if (start) {
        var alphaData = [];
        var loadImage = new Image();
        loadImage.style.position = "absolute";
        loadImage.style.left = "-10000px";
        document.body.appendChild(loadImage);
        loadImage.onload = function() {
            c.width = width;
            c.height = height;
            c.style.width = width + "px";
            c.style.height = height + "px";
            context.drawImage(this, 0, 0, width, height);
            try {
                try {
                    var imgDat = context.getImageData(0, 0, width, height);
                } catch (e) {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                    var imgDat = context.getImageData(0, 0, width, height);
                }
            } catch (e) {
                throw new Error("unable to access image data: " + e);
            }
            var imgData = imgDat.data;
            for (var i = 0, n = imgData.length; i < n; i += 4) {
                var row = Math.floor((i / 4) / width);
                var col = (i / 4) - (row * width);
                if (!alphaData[row]) alphaData[row] = [];
                alphaData[row][col] = imgData[i + 3] == 0 ? 0 : 1;
            }
            that.transparancyData = alphaData;

            /*
            console.log(alphaData);
            var str = "";
            for(var x = 0 ; x < 1240 ; x++) {
                for(var y = 0 ; y < 877 ; y++) {
                    str += alphaData[x][y];
                }
                str+="\n";
            }
            console.log(str);*/
        };
        loadImage.src = pisteTransparentSrc;
    }
    return this;
}


/**
* Gestion du changement de traille de la fenêtre
*/
function activateWindowSizeCheck(game) {
    $( window ).resize(function() {
        var windowSize = getBrowserDimensions();
        if(windowSize.height > 900) {
            windowSize.height = 900;
        }
        game.scale.setGameSize(windowSize.width/2, windowSize.height);
    });
}