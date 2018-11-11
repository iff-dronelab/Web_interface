    document.getElementById('deciderL').addEventListener('click', function(){
        var LayerNames = [];
        var LayerIDs = [];
        var opacid = [];
        var k = 0;
        var client = new MapboxClient('sk.eyJ1IjoiYmFzaG8xMzM3IiwiYSI6ImNqOHlpMmJwaTIyMDAycWs4b2h4bm1jNmcifQ.J0dig_czxKXENWOVg918Lw');




        client.listTilesets(function(err, tilesets){
            for (var i=0; i<tilesets.length;i++){
                if (tilesets[i].name.search(CONFIG.UAV4.Name) !== (-1)){   //Nach Drohnenname suchen ?!
                LayerNames[k]=tilesets[i].name;
                LayerIDs[k]=tilesets[i].id;
                k += 1;
            };
            };


            var layers = document.getElementById('layermenu');

            layers.innerHTML ='';


            for (var j=0; j < LayerIDs.length; j++){
            var id = LayerNames[j];
            var tlstid = LayerIDs[j];



            var link = document.createElement('a');            
            link.href = '#';
            if (map.getSource(id) === undefined || map.getLayoutProperty(id,'visibility') === 'none' ){
                link.className = '';
            }
            else{
                link.className = 'active';
            }
            link.textContent = id;
            link.tilesetid = tlstid;
            layers.appendChild(link);

            var label = document.createElement('label');
            label.setAttribute('for', id);
            label.textContent = id;

            if (map.getSource(id) !== undefined){
                opacid.push(id);
            }
            
            

            slider.addEventListener('input', function(e){

                for (var s=0; s< opacid.length; s++){
                map.setPaintProperty(opacid[s],'raster-opacity', parseInt(e.target.value,10)/100);
                sliderValue.textContent = e.target.value + '%';
                };
                });




            link.onclick = function(event){
                var clickedLayer = this.textContent;
                var clickedtileset = this.tilesetid;
                event.preventDefault();
                event.stopPropagation();

                if (map.getSource(clickedLayer) === undefined){    
                    map.addSource(clickedLayer, {
                    type: 'raster',
                    url: 'mapbox://'+clickedtileset
                    });
                    map.addLayer({
                        'id': clickedLayer,
                        'type': 'raster',
                        'source': clickedLayer,
                        'layout': {
                            'visibility': 'visible'
                    },

                });
                    this.className = 'active';
                    opacid.push(clickedLayer);
                }
                   else{
                        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

                        if (visibility === 'visible') {
                            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                            this.className = '';

                }       else{
                            this.className = 'active';
                            map.setLayoutProperty(clickedLayer,'visibility', 'visible');

                }
                    } 
                

            };
            showall.onclick = function(event){                
                for(var i=0; i < LayerNames.length; i++){
                   if (map.getSource(LayerNames[i]) === undefined){
                    map.addSource(LayerNames[i],{
                        type: 'raster',
                        url: 'mapbox://'+LayerIDs[i]
                    });
                    map.addLayer({
                        'id': LayerNames[i],
                        'type': 'raster',
                        'source': LayerNames[i],
                        'layout':{
                            'visibility': 'visible'
                        },
                    });
                    layers.childNodes[i].className = 'active';
                    opacid.push(LayerNames[i])

                   }
                   else{
                    var visibility = map.getLayoutProperty(LayerNames[i], 'visibility');

                    if (visibility !== 'visible'){
                        layers.childNodes[i].className = 'active';
                        map.setLayoutProperty(LayerNames[i], 'visibility', 'visible');
                    }

                   }                   

                };
                
            };
            hideall.onclick = function(event){
                for(var i=0; i < LayerNames.length; i++){
                   if (map.getSource(LayerNames[i]) === undefined){
                    map.addSource(LayerNames[i],{
                        type: 'raster',
                        url: 'mapbox://'+LayerIDs[i]
                    });
                    map.addLayer({
                        'id': LayerNames[i],
                        'type': 'raster',
                        'source': LayerNames[i],
                        'layout':{
                            'visibility': 'none'
                        },
                    });
                    layers.childNodes[i].className = '';
                    opacid.push(LayerNames[i])

                   }
                   else{
                    var visibility = map.getLayoutProperty(LayerNames[i], 'visibility');

                    if (visibility === 'visible'){
                        layers.childNodes[i].className = '';
                        map.setLayoutProperty(LayerNames[i], 'visibility', 'none');
                    }

                   }                   

                };
                
            };                
            
        };
    });
});