document.getElementById('sharedataset').addEventListener('click', function(){
    if (long === 0 && lati === 0){
        alert("No coordinates set! Choose a point of interest by clicking on the map!")
    }
    else{
            var dt = new Date();
            var hours = dt.getHours();
            var minutes = dt.getMinutes();
            var seconds = dt.getSeconds();
            var timestamp = hours + ":" + minutes + ":" + seconds;
        
            var beschreibung = document.getElementById('Markerbeschreibung').value;
            var feature = {
                "type": "Feature",
                "properties": {
                    "Beschreibung": beschreibung
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [long, lati]
                }
            };
            var client = new MapboxClient('sk.eyJ1IjoiYmFzaG8xMzM3IiwiYSI6ImNqOHlpMmJwaTIyMDAycWs4b2h4bm1jNmcifQ.J0dig_czxKXENWOVg918Lw');
            client.createDataset({ name: CONFIG.UAV4.POIName + ' '+ timestamp, description: 'Testuser'}, function(err, dataset){
                client.insertFeature(feature, dataset.id, function(err, feature){
                    client.listDatasets(function(err, datasets){
                        document.getElementById('Markerbeschreibung').value = "";
                        long = 0;
                        lati = 0;
                        document.getElementById('info').innerHTML = "lng= " + long + "</br>" + "lat= " + lati
                        alert("Your marker has been shared!");
                    });

                });

            });
        };
    });

