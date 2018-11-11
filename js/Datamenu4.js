    document.getElementById('deciderPOI').addEventListener('click',function(){
        var Datanames = [];
        var DataIDs = [];
        var k = 0;
        var client = new MapboxClient('sk.eyJ1IjoiYmFzaG8xMzM3IiwiYSI6ImNqOHlpMmJwaTIyMDAycWs4b2h4bm1jNmcifQ.J0dig_czxKXENWOVg918Lw');



        var popup = new mapboxgl.Popup({
            closeButton:false,
            closeOnClick: false
        });



        client.listDatasets(function(err, datasets){
            for (var i=0; i<datasets.length;i++){
                if (datasets[i].name.search(CONFIG.UAV4.POIName) !== (-1) && datasets[i].features !== 0){   //Nach Drohne suchen ?!
                Datanames[k]=datasets[i].name;
                DataIDs[k]=datasets[i].id;
                k += 1;                
            };
            };

            var markers = document.getElementById('datamenu');
            markers.innerHTML = '';

            for (var j=0; j < DataIDs.length; j++){
            var id2 = Datanames[j];
            var dtid = DataIDs[j];
            var link2 = document.createElement('b');
            link2.href = '#';
            link2.textContent = id2;
            link2.datasetid = dtid;
            if (map.getSource(id2) === undefined ){
                link2.className = '';
            }
            else{
                link2.className = 'active';
            }
            markers.appendChild(link2);

            link2.onclick = function(event){

                var clickedmarkername = this.textContent;
                var clickedmarker = this.datasetid;
                event.preventDefault();
                event.stopPropagation();
                if (map.getLayer(clickedmarkername) === undefined){
                    this.className = "active";
                }
                else{
                    this.className = "";
                }

                client.listFeatures(clickedmarker, function(err, collection){
                    clickedfeatureid = collection.features[0].id;
                    client.readFeature(clickedfeatureid, clickedmarker, function(err, feature){
                        console.log(clickedmarker);
                        console.log(clickedfeatureid);
                        var markerbeschreibung = feature.properties.Beschreibung;
                        var markerlng = feature.geometry.coordinates[0];
                        var markerlat = feature.geometry.coordinates[1];


                        if (map.getLayer(clickedmarkername) === undefined){

                            map.addLayer({
                                "id": clickedmarkername,
                                "type": "symbol",
                                "source":{
                                    "type": "geojson",
                                    "data": {
                                        "type": "FeatureCollection",
                                        "features": [{
                                            "type": "Feature",
                                            "properties":{
                                                "marker-color": '#3bb2d0',
                                                "marker-size": 'large',
                                                "description": markerbeschreibung //,
                                                //"icon": "marker"

                                            },
                                            "geometry":{
                                                "type": "Point",
                                                "coordinates": [markerlng, markerlat]
                                            },
                                        }]
                                    },
                                },
                                "layout":{
                                "icon-image": "markerr",
                                "icon-allow-overlap": true,
                                "icon-size": 0.035
                                }
                            });

                        
                        map.on('mouseenter', clickedmarkername, function(e){
                            map.getCanvas().style.cursor = 'pointer';

                            popup.setLngLat(e.features[0].geometry.coordinates)
                            popup.setHTML(e.features[0].properties.description)
                            popup.addTo(map);
                        });



                        map.on('mouseleave', clickedmarkername, function(){
                            map.getCanvas().style.cursor = '';
                            popup.remove();
                        });
                       
                     }

                        else{
                            map.removeLayer(clickedmarkername);
                            map.removeSource(clickedmarkername);
                        
                        }



                        });
                    });
                //});

                

            };

            hidealldata.onclick = function(event){
                for(i=0; i<Datanames.length; i++){
                    if(map.getLayer(Datanames[i]) !== undefined){
                        map.removeLayer(Datanames[i]);
                        map.removeSource(Datanames[i]);
                        markers.childNodes[i].className = '';
                    }
                }

            }

            showalldata.onclick = function(event){
                var ftrid = [];
                var beschr = [];
                var mrklng = [];
                var mrklat = [];
                var interval = 0;
                var interval2 = 0;
                var interval3 = 0;
                setInterval(function(){
                    if (interval < DataIDs.length){
                        client.listFeatures(DataIDs[interval], function(err, collection){
                            ftrid.push(collection.features[0].id);
                            interval +=1;
                            console.log(ftrid);
                        });
                    }
                    else{
                        clearInterval();
                    }
                }, 180);
                setInterval(function(){
                    if (interval2 < DataIDs.length){
                        client.readFeature(ftrid[interval2], DataIDs[interval2], function(err, feature){
                            beschr.push(feature.properties.Beschreibung);
                            mrklng.push(feature.geometry.coordinates[0]);
                            mrklat.push(feature.geometry.coordinates[1]);
                            interval2 +=1;
                            console.log(beschr);
                        });
                    }
                }, 300);
                setInterval(function(){
                    if (interval3 < DataIDs.length){
                        if(map.getLayer(Datanames[interval3]) === undefined){
                            map.addLayer({
                                "id": Datanames[interval3],
                                "type": "symbol",
                                "source":{
                                    "type": "geojson",
                                    "data": {
                                        "type": "FeatureCollection",
                                        "features": [{
                                            "type": "Feature",
                                            "properties": {
                                                "marker-color": '#3bb2d0',
                                                "marker-size": 'large',
                                                "description": beschr[interval3]
                                            },
                                            "geometry":{
                                                "type": "Point",
                                                "coordinates": [mrklng[interval3], mrklat[interval3]]
                                            },
                                        }]
                                    },
                                },
                                "layout":{
                                    "icon-image": "markerr",
                                    "icon-allow-overlap": true,
                                    "icon-size": 0.035
                                }
                            });

                            map.on('mouseenter', Datanames[interval3], function(e){
                                map.getCanvas().style.cursor = 'pointer';

                                popup.setLngLat(e.features[0].geometry.coordinates)
                                popup.setHTML(e.features[0].properties.description)
                                popup.addTo(map);
                            });

                            map.on('mouseleave', Datanames[interval3], function(){
                                map.getCanvas().style.cursor = '';
                                popup.remove();
                            });
                            console.log(interval3);
                            markers.childNodes[interval3].className = 'active';
                            interval3 += 1;

                        }
                        else{
                            interval3 += 1;
                        }
                    }
                    else{
                        clearInterval();
                    }

                }, 310);
            }

        };


    });

});