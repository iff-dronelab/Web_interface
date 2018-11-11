    document.getElementById('flyto').addEventListener('click', function(){
        var client = new MapboxClient('sk.eyJ1IjoiYmFzaG8xMzM3IiwiYSI6ImNqYTNyeTBzcTk2bDQyd3B5OW9pOWw1MWcifQ.JMiyoVKhE35SMDxyGMNW-w')
        client.readStyle('cjbgm3j3gc1fu2rqu464siqdu', function(err, style){
            if (!err) console.log(style);
                client.listTilesets(function(err, tilesets){

                    for (var k=0; k<tilesets.length;k++){
                        if (tilesets[k].name === document.getElementById('layermenu').firstChild.innerHTML){
                            lng = tilesets[k].center[0];
                            lat = tilesets[k].center[1];
                            map.flyTo({
                            center:[
                            lng,
                            lat],
                            zoom: 19
                            });

                        };

                    };   
                });

            });
        console.log(CONFIG)

    });