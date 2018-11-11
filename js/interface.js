var DecLayer = document.getElementById("deciderL");
var DecPOI = document.getElementById("deciderPOI");
var ShwallLayer = document.getElementById("shwall");
var HdallLayer = document.getElementById("hdall");
var ShwallMarker = document.getElementById("shwall2");
var HdallMarker = document.getElementById("hdall2");
var Flytodiv = document.getElementById("flytodiv");
var NavdisplayLayer = document.getElementById("navdisplaylayer");
var POIsave = document.getElementById("color6");
var NavdisplayMarker = document.getElementById("navdisplaymarker");
document.getElementById('deciderL').addEventListener('click', function(){
        if (DecLayer.className === 'decider'){
        DecLayer.className = 'activedecider';
        DecPOI.className = 'decider';
        ShwallLayer.style.display = 'block';
        HdallLayer.style.display = 'block';
        Flytodiv.style.display = 'block';
        NavdisplayLayer.style.display = 'block';
        ShwallMarker.style.display = 'none';
        HdallMarker.style.display = 'none';
        POIsave.style.display = 'none';
        NavdisplayMarker.style.display = 'none';
        }
    });
document.getElementById('deciderPOI').addEventListener('click', function(){
    if (DecPOI.className === 'decider'){
        DecLayer.className = 'decider';
        DecPOI.className = 'activedecider';
        ShwallLayer.style.display = 'none';
        HdallLayer.style.display = 'none';
        Flytodiv.style.display = 'none';
        NavdisplayLayer.style.display = 'none';
        ShwallMarker.style.display = 'block';
        HdallMarker.style.display = 'block';
        POIsave.style.display = 'block';
        NavdisplayMarker.style.display = 'block';
    }
});