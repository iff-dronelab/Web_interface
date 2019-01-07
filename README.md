# Web_interface for tileset visualization
This is the repository for visualize tilesets from your personal Mapbox Database and sharing custom point of interests using Mapbox API.
It is currently in alpha state, so don't expect a polished and bugfree application.

Feel free to fork and contribute.

# Preview
<p align="center">
  <img  src="https://github.com/msteinbo1337/Studienarbeit---Webseite/blob/master/images/layersinterfacetest.png?raw=true">
</p>

# Introduction
This web-application can be used to visualize custom georeferenced images which were uploaded to Mapbox. 
It is an HTML and Javascript based website running with node.js.
The idea of this webapplication is to have a helpful feature, for i.e. rescuemissions, where people can get livedata from a drone to
their devices.
It was developed during my student research project at TU Braunschweig and can be operated with my pythonscript from my other Repository.
(check out my other repository "Mapbox-Uploadscript-and-GUI" for more information about the uploadapplication).

For a detailed desription of these scripts refer to my elaboration. It is located in the IFF at TU Braunschweig. 
Feel free to ask me for a digital version.

### What it can do

- Choose between various datasets
- Using a config file for easy setup the datasets
- Constantly checking for new Data
- Possibilty to share point of interests
- Interact with the tilesetdata and pointofinterestdata (like hide and show) on a map
- Locate yourself with GPS
- Zoom to lat/lon of latest tileset from the dataset
- Mobile friendly design

### What NOT to expect

- Upload new files
- Change uploaded tilesets 
- bugfree and polished application

### Dependencies

Node.js

Mapbox Account with Access to uploaded Data

-> https://www.mapbox.com/

### Quick Start;

**Step 1:** Get and install Node.js

https://nodejs.org/en/

**Step 2:** Install dependent packages:

change directory to this repository

```sh
$ npm install
```

**Step 3:** Run server: 

```sh
$ node app
```

The URL of the server will be **localhost:8081**

**Step 4:** Login on webpage:
```sh
user: admin
password: testpassword
```
Note:  The login is a dummy with hardcoded logindata without any further encoding

**Step 5:** Select dataset:

On the forwarded page you can select specific datasets (filtered by name) for the following webinterface.
This Datasets can be configured in the **CONFIG.js** json-file from this repository.

In addition, you need to change the accesstoken in the UAV1-4.html files to one of yours. (get it from your accountinfo)

**Step 6:** Enjoy testing the features
