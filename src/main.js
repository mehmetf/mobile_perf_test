define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var ScrollContainer = require('famous/views/ScrollContainer');
    var Surface = require('famous/core/Surface');
    var DrawerLayout = require('famous/views/DrawerLayout'); 
    var TouchSync   = require("famous/inputs/TouchSync");

    var mainContext = Engine.createContext();
    var surfaces = [];
    var playlist = [];

    var playlistTitles = ['Reggae', 'Chill', 'Dubstep', 'Indie', 'Rap', 'Cowbell'];
    for (var i = 0; i < 60; i++) {
        playlist.push({title: playlistTitles[i%6], id: i%6 + 1});
    }    

    var scrollcontainer = new ScrollContainer({
      scrollview: {
        speedLimit: 10,
        edgeGrip: 0.0001,
        friction: 0.001
      }
    });


    for (var j = 0; j < playlist.length; j++) {
      var surface = new Surface({
        size: [undefined, true],
        content: '<div class="card"><img src="'+playlist[j].id+'.jpg">' + playlist[j].title + '</div>',
        classes: ['outer_card']
      });
      surface.pipe(scrollcontainer);
      surfaces.push(surface);
    }

    scrollcontainer.sequenceFrom(surfaces);
    var drawerLayout = new DrawerLayout();
    drawerLayout.content.add(scrollcontainer);
    // Menu
    var menu = new Surface({
        size: [300, undefined],
        content: '<div>This is my sample menu</div>',
        classes: ['menu']
      });
    drawerLayout.drawer.add(menu);
    // Clicking anywhere on the app triggers a menu toggle
    Engine.on('click', function() {
      drawerLayout.toggle();
    });
    // We also monitor the touch events
    var touchSync = new TouchSync({
      direction : TouchSync.DIRECTION_X,
      rails : true
    });
    scrollcontainer.pipe(touchSync);
    touchSync.pipe(drawerLayout);
    mainContext.add(drawerLayout);
});
