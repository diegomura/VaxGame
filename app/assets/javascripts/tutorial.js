var numberOfIndividuals = 25;
var rewire = 0.10;
var meanDegree = 3;
var diseaseIsSpreading = false;
var transmissionRate = .25;
var recoveryRate = 0;
var maxRecoveryTime = 1000;
var vaccinateMode = false;
var graph = generateSmallWorld(numberOfIndividuals,rewire,meanDegree);
var timeToStop = false;
var guideRailsPosition = 0;
var postInitialOutbreak = false;
var finalStop = false;
var endGame = false;
var nonIntervention_series = [];
var intervention_series = [];
var intervention = false;
var tutorial = false;
var charge = -1000;
var newInfections = [];
var xyCoords = [];

var vaccinatedBayStartYCoord = 50;

var start = false;

var nextX = 800;
var nextY = 150;

var guideXCoord = 400;
var guideYCoord = 80;

var colorScale;
var figMargin;
var figWidth;
var figHeight;
var figX;
var figY;
var figLines;
var svgTutorial;
var xLab;
var yLab;
var nonInterventionLegend;
var interventionLegend;
var nonInterventionLab;
var interventionLab;
var tutorialSeries;

var player = graph.nodes[0];

trivialGraph = {};
trivialGraph.nodes = [];
trivialGraph.links = [];

trivialGraph.nodes.push(player);

var width = 960,
    height = 450,
    svg;

var guideTextSVG;

var menuBoxSVG;

var force, link, node;

guideTextSVG = d3.select("body").append("svg")
    .attr("class", "guideTextSVG")

menuBoxSVG = d3.select("body").append("svg")
    .attr("class", "menuBoxSVG")


svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "svg")
    .attr("pointer-events", "all")
    .call(d3.behavior.zoom().on("zoom", redraw))
    .append('svg:g');

guide = d3.select(".guideTextSVG").append("text")
    .attr("class", "guide")
    .attr("x",guideXCoord).attr("y",guideYCoord)
    .attr("font-size", 60)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .text("")

microGuide = d3.select(".guideTextSVG").append("text")
    .attr("class", "microGuide")
    .attr("x",guideXCoord).attr("y", guideYCoord + 20)
    .attr("font-size", 60)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .text("")


var nextArrow = d3.select(".guideTextSVG").append("text")
    .attr("class", "nextArrow")
    .attr("x", 350)
    .attr("y", 100)
    .attr("font-size", 40)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .text("Click to Begin")
    .on("click", advanceTutorial);

var vaxShadow = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "vaxShadow")
    .attr("x", 0)
    .attr("y", 27)
    .attr("width", 125)
    .attr("height", 75)
    .style("fill", "#838383")

var vaxBox = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "vaxBox")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", 120)
    .attr("height", 75)
    .style("fill", "#85bc99")

var vaxText = d3.select(".menuBoxSVG").append("text")
    .attr("class", "vaxText")
    .attr("x", 23)
    .attr("y", 70)
    .style("font-size", 30)
    .style("font-family", "Nunito")
    .style("font-weight", 400)
    .style("fill", "white")
    .text("VAX!")

var menuShadow = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "menuShadow")
    .attr("x", 200)
    .attr("y", 27)
    .attr("width", 800)
    .attr("height", 75)
    .style("fill", "#838383")

var menuBox = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "menuBox")
    .attr("x", 195)
    .attr("y", 20)
    .attr("width", 800)
    .attr("height", 75)
    .style("fill", "#85bc99")


var menuHeaderLeft = d3.select(".menuBoxSVG").append("text")
    .attr("class", "menuHeaderLeft")
    .attr("x", 210)
    .attr("y", 40)
    .style("font-size", 10)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("LESSONS")

var menuHeaderRight = d3.select(".menuBoxSVG").append("text")
    .attr("class", "menuHeaderRight")
    .attr("x", 750)
    .attr("y", 40)
    .style("font-size", 10)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("GAMING")

var moduleOne = d3.select(".menuBoxSVG").append("text")
    .attr("class", "moduleOne")
    .attr("x", 235)
    .attr("y", 68)
    .style("font-size", 14)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Epidemics")

var moduleTwo = d3.select(".menuBoxSVG").append("text")
    .attr("class", "moduleTwo")
    .attr("x", 360)
    .attr("y", 68)
    .style("font-size", 14)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Vaccines")

var moduleThree = d3.select(".menuBoxSVG").append("text")
    .attr("class", "moduleThree")
    .attr("x", 485)
    .attr("y", 68)
    .style("font-size", 14)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Networks")


var moduleFour = d3.select(".menuBoxSVG").append("text")
    .attr("class", "moduleFour")
    .attr("x", 610)
    .attr("y", 68)
    .style("font-size", 14)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Herd Immunity")

var gameModule = d3.select(".menuBoxSVG").append("text")
    .attr("class", "gameModule")
    .attr("x", 765)
    .attr("y", 68)
    .style("font-size", 14)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Play the Full Game")

var navShadow = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "navShadow")
    .attr("x", 753)
    .attr("y", 119)
    .attr("width", 220)
    .attr("height", 30)
    .style("fill", "#838383")

var navBox = d3.select(".menuBoxSVG").append("rect")
    .attr("class", "navBox")
    .attr("x", 750)
    .attr("y", 115)
    .attr("width", 220)
    .attr("height", 30)
    .style("fill", "#85bc99")

var groupText = d3.select(".menuBoxSVG").append("text")
    .attr("class", "groupText")
    .attr("x", 765)
    .attr("y", 135)
    .style("font-size", 14)
    .style("font-weight", 300)
    .style("font-family", "Nunito")
    .style("font-weight", 300)
    .style("fill", "white")
    .text("Salathé Group @ Penn State")

function advanceTutorial() {
    if (start) {
        guideRails();


    }
    else {
        start = true;
        initTutorial()
    };
}


// necessary for drag & zoom
function redraw() {
    svg.attr("transform",
        "translate(" + d3.event.translate + ")"
            + " scale(" + d3.event.scale + ")");
}

// tick function, which does the physics for each individual node & link.
function tick() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

}



function tutorialUpdate() {
    var nodes = removeVaccinatedNodes(graph);
    var links = removeOldLinks(graph);

    graph.links = links;

    updateCommunities();

    force
        .nodes(nodes)
        .charge(charge)
        .links(links)
        .start();

    link = svg.selectAll("line.link")
        .data(links, function(d) { return d.source.id + "-" + d.target.id;});


    link.enter().insert("svg:line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // Exit any old links.
    link.exit().remove();

    // Update the nodes…
    node = svg.selectAll("circle.node")
        .data(nodes, function(d) { return d.id; })
        .style("fill", function(d) {
            var color = null;
            if (d.status == "S") color = "#b7b7b7";
            if (d.status == "E") color = "#ef5555";
            if (d.status == "I") color = "#ef5555";
            if (d.status == "R") color = "#9400D3";
            if (d.status == "V") color = "#ffff00";
            if (d.id == player.id && d.status != "I") color = "#2fa0ef";


            return color;});

    // Enter any new nodes.
    node.enter().append("svg:circle")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 8)
        .style("fill", function(d) {
            var color = null;
            if (d.status == "S") color = "#b7b7b7";
            if (d.status == "E") color = "#ef5555";
            if (d.status == "I") color = "#ef5555";
            if (d.status == "R") color = "#9400D3";
            if (d.status == "V") color = "#ffff00";
            if (d.id == player.id && d.status != "I") color = "#2fa0ef";


            return color;

        })
        .on("click", function(d) {
            if (vaccinateMode) {
                if (vaccineSupply <= 0) {
                    window.alert("Out of Vaccines!")
                    return;
                }
                d.status = "V";
                d.fixed = true;
                d3.select(this)
                    .attr("class", "vaxNode")
                    .style("fill", "yellow")
                vaccinatedBayStartYCoord += 25;
                vaccineSupply--;
                tutorialUpdate();
            }
            else {
                if (diseaseIsSpreading==true) return;   // prevent secondary introductions
                d.status = "I";
                tutorialUpdate();
                tutorialTimesteps();
                diseaseIsSpreading=true;
                spreadingText();

            }

        })
        .call(force.drag);

    // Exit any old nodes.
    node.exit().remove();

    d3.select(".vaccineSupply")
        .text("Vaccines Remaining: " + vaccineSupply)

    if (vaccineSupply == 0 && postInitialOutbreak == true) {
        vaccinateMode = false;
        window.setTimeout(advanceTutorial, 500)
    }

    d3.select(".vaxNode")
        .transition()
        .duration(500)
        .attr("cx", 25)
        .attr("cy", vaccinatedBayStartYCoord)
        .attr("class", "fixedVaxNode")
}

function buildGraph() {
    tutorial = true;

    // add player neighbors
    for (var i = 0; i < graph.nodes.length; i++) {
        if (edgeExists(graph.nodes[i], trivialGraph.nodes[0], graph)) {
            trivialGraph.nodes.push(graph.nodes[i]);
        }
    }

    // add relevant links
    for (var ii = 0; ii < trivialGraph.nodes.length; ii++) {
        for (var iii = 0; iii < trivialGraph.nodes.length; iii++) {
            if (edgeExists(trivialGraph.nodes[ii], trivialGraph.nodes[iii], graph)) {
                var linkString = {source:trivialGraph.nodes[ii],target:trivialGraph.nodes[iii],remove:false};
                if (testDuplicate(trivialGraph.links, linkString)) continue;
                trivialGraph.links.push(linkString);
            }
        }
    }

    stepWiseUpdate();
}


function stepWiseUpdate() {

    var links = trivialGraph.links;
    var nodes = trivialGraph.nodes;

    updateCommunities();

    force
        .nodes(nodes)
        .charge(charge)
        .links(links)
        .start();

    link = svg.selectAll("line.link")
        .data(links, function(d) { return d.source.id + "-" + d.target.id;});


    link.enter().insert("svg:line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    // Exit any old links.
    link.exit().remove();

    // Update the nodes…
    node = svg.selectAll("circle.node")
        .data(nodes, function(d) { return d.id; })
        .style("fill", function(d) {
            var color = null;
            if (d.status == "S") color = "#b7b7b7";
            if (d.status == "E") color = "#ef5555";
            if (d.status == "I") color = "#ef5555";
            if (d.status == "R") color = "#9400D3";
            if (d.status == "V") color = "#ffff00";
            if (d.id == player.id && d.status != "I") color = "#2fa0ef";

            return color;});

    // Enter any new nodes.
    node.enter().append("svg:circle")
        .attr("class", "node")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", 8)
        .style("fill", function(d) {
            var color = null;
            if (d.status == "S") color = "#b7b7b7";
            if (d.status == "E") color = "#ef5555";
            if (d.status == "I") color = "#ef5555";
            if (d.status == "R") color = "#9400D3";
            if (d.status == "V") color = "#ffff00";

            if (d.id == player.id && d.status != "I") color = "#2fa0ef";

            return color;

        })
        .on("click", function(d) {
            if (vaccinateMode) {
                if (vaccineSupply <= 0) {
                    window.alert("Out of Vaccines!")
                    return;
                }
                d.status = "V";
                d.fixed = true;
                d3.select(this)
                    .attr("class", "vaxNode")
                    .style("fill", "yellow")
                vaccinatedBayStartYCoord += 25;
                vaccineSupply--;
                tutorialUpdate();
            }
            else {
                if (diseaseIsSpreading==true) return;   // prevent secondary introductions
                d.status = "I";
                tutorialUpdate();
                tutorialTimesteps();
                diseaseIsSpreading=true;
                spreadingText();

            }

        })
        .call(force.drag);

    // Exit any old nodes.
    node.exit().remove();

    d3.select(".vaccineSupply")
        .text("Vaccines Remaining: " + vaccineSupply)

    if (vaccineSupply == 0 && postInitialOutbreak == true) {
        vaccinateMode = false;
        window.setTimeout(advanceTutorial, 500)
    }

    d3.select(".vaxNode")
        .transition()
        .duration(500)
        .attr("cx", 25)
        .attr("cy", vaccinatedBayStartYCoord)
        .attr("class", "fixedVaxNode")

}

function getPathogen_xyCoords(newInfections) {
    var xyCoords = [];
    var recentTransmitters = [];
    for (var i = 0; i < newInfections.length; i++) {
        recentTransmitters.push(newInfections[i].infectedBy);
        var coordString = {id: i, receiverX: newInfections[i].x, receiverY: newInfections[i].y, transmitterX: newInfections[i].infectedBy.x, transmitterY: newInfections[i].infectedBy.y}
        xyCoords.push(coordString);
    }
    return xyCoords;
}

function movePathogens() {
    d3.selectAll(".pathogen")
        .sort()
        .transition()
        .duration(600)
        .attr("cx", function(d) { return d.receiverX} )
        .attr("cy", function(d) { return d.receiverY} );


}


function createPathogens() {
    var pathogen = svg.selectAll(".pathogen")
        .data(xyCoords)
        .enter()
        .append("circle")
        .attr("class", "pathogen")
        .attr("cx", function(d) { return d.transmitterX })
        .attr("cy", function(d) { return d.transmitterY })
        .attr("r", 4)
        .style("fill", "green")

    // remove old pathogens, may not be useful here...
}

function removePathogens() {
    d3.selectAll(".pathogen")
        .transition()
        .duration(200)
        .style("opacity", 0)

    d3.selectAll(".node")
        .transition()
        .duration(200)
        .attr("r", 8)

    d3.selectAll(".pathogen").remove();
}


function toggleNodeFixation() {
    for (var i = 0; i < graph.nodes.length; i++) {
        graph.nodes[i].fixed = !graph.nodes[i].fixed;
    }
}


function tutorialTimesteps() {

    // run exposure process & consider all potential state changes (recovery, in this case
    infection();
    stateChanges();

    // move all newly exposed individuals to the infected state, record individuals
    newInfections = [];
    newInfections = updateExposures();
    xyCoords = getPathogen_xyCoords(newInfections);


    var I;
    if (intervention) {
        I = getStatuses("I");
        intervention_series.push({group:"Intervention", time:timestep, value:I});
        updateTutorialFig();
    }
    else {
        I = getStatuses("I");
        nonIntervention_series.push({group:"nonIntervention", time:timestep, value:I});
        intervention_series.push({group:"Intervention", time:timestep, value:0});
    }

    this.timestep++;


    d3.select(".timestepTicker")
        .text(timestep);


    detectCompletion();

    if (timeToStop == false) {
        animatePathogens_thenUpdate();
        window.setTimeout(tutorialTimesteps, 600);
    }

    if (timeToStop == true) {
        animatePathogens_thenUpdate();
        if (finalStop == true) return;

        d3.select(".nextArrow")
            .transition()
            .duration(1000)
            .attr("opacity", 1)
            .attr("x", nextX)
            .attr("y", nextY)
            .attr("font-size", 24)
            .text("next >")
    }
}

function animatePathogens_thenUpdate() {

    window.setTimeout(createPathogens, 0)

    window.setTimeout(movePathogens, 100)

    window.setTimeout(popNewInfection, 250)

    window.setTimeout(tutorialUpdate, 350)

    window.setTimeout(removePathogens, 400)

}

function popNewInfection() {
    d3.selectAll(".node")
        .transition()
        .duration(100)
        .attr("r", function(d) {
            var size = 8;
            if (d.status == "I") {
                if (timestep - d.exposureTimestep == 1) size = 12;

            }
            return size;
        })

}



function detectCompletion() {
    var numberOfInfecteds = 0;
    for (var nodeIndex = 0; nodeIndex < graph.nodes.length; nodeIndex++) {
        var node = graph.nodes[nodeIndex];
        if (node.status == "I") numberOfInfecteds++;
    }
    if (numberOfInfecteds == numberOfIndividuals) timeToStop = true;


    if (finalStop) {
      detectEndGame();
      if (endGame) {
          timeToStop = true;
          while (timestep < nonIntervention_series.length) {

              updateExposures();
              infection();
              stateChanges();
              this.timestep++;
              intervention_series.push({group:"Intervention", time:timestep, value:getStatuses("I")});
              updateTutorialFig();
              animatePathogens_thenUpdate();
          }

      }
    }
}

function completeSeries() {
    var discrepancy;

    if (nonIntervention_series.length > intervention_series.length) {
        discrepancy = nonIntervention_series.length - intervention_series.length;

        for (var i = intervention_series.length; i < discrepancy; i++) {
            tutorialSeries[1].push(intervention_series[intervention_series.length-1])

        }

    }
    else {
        discrepancy = intervention_series.length - nonIntervention_series.length;

        for (var i = intervention_series.length; i < discrepancy; i++) {
            tutorialSeries[0].push(nonIntervention_series[nonIntervention_series.length-1])

        }
    }
}

function initTutorial() {
    // initialize force layout. point to nodes & links.  size based on prior height and width.  set particle charge. setup step-wise force settling.
    force = d3.layout.force()
        .nodes(trivialGraph.nodes)
        .links(trivialGraph.links)
        .size([width, height])
        .charge(charge)
        .on("tick", tick)
        .start();

// associate empty SVGs with link data. assign attributes.
    link = svg.selectAll(".link")
        .data(trivialGraph.links)
        .enter().append("line")
        .attr("class", "link");

// associate empty SVGs with node data. assign attributes. call force.drag to make them moveable.
    node = svg.selectAll(".node")
        .data(trivialGraph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 15)
        .style("fill", "#2fa0ef")

.call(force.drag)
        .on("click", function(d) {
            if (vaccinateMode) {
                if (vaccineSupply <= 0) {
                    window.alert("Out of Vaccines!")
                    return;
                }
                d.status = "V";
                d.fixed = true;
                d3.select(this)
                    .attr("class", "vaxNode")
                    .style("stroke", "#636363")
                    .style("stroke-width", 2)
                    .style("fill", "yellow")

                vaccinatedBayStartYCoord += 25;
                vaccineSupply--;
                tutorialUpdate();


            }
            else {
                if (diseaseIsSpreading==true) return;
                d.status = "I";
                tutorialUpdate();
                tutorialTimesteps();
                diseaseIsSpreading=true;
                spreadingText();
            }

        });



    d3.select(".guide")
        .attr("x",guideXCoord)
        .attr("y",guideYCoord)
        .attr("font-size", 20)
        .text("Suppose this is you")

    d3.select(".nextArrow")
        .transition()
        .duration(500)
        .attr("font-size", 24)
        .attr("x", nextX)
        .attr("y", nextY)
        .text("next >")

    // this adds the ellipsis to ".guide" text
    window.setTimeout(guideRails, 1200);


}


function guideRails() {
    guideRailsPosition++;

    if (guideRailsPosition == 1) {
        d3.select(".guide")
            .transition()
            .duration(500)
            .text("Suppose this is you...");

        //window.setTimeout(guideRails, 500)
    }

    if (guideRailsPosition == 2) {
        buildGraph();

        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("x", guideXCoord).attr("y", guideYCoord)
            .text("and this is your immediate contact network")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("x", nextX)
            .attr("y", nextY)
            .text("next >")

        window.setTimeout(guideRails, 500)
    }

    if (guideRailsPosition == 3) {
        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",242).attr("y",35)
            .attr("font-size", 12)
            .text("e.g., everyone you've come in close contact with")

    }

    if (guideRailsPosition == 4) {
        charge = -175;
        tutorialUpdate();

        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("x", guideXCoord).attr("y", guideYCoord)
            .text("and this is a 'big picture' view of a complete contact network")

        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",245).attr("y",35)
            .attr("font-size", 12)
            .text("e.g., the network on which infectious diseases can spread")



    }

    if (guideRailsPosition == 5) {
        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("x", guideXCoord).attr("y", guideYCoord)
            .text("Now, suppose someone is bitten by a zombie...")

        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",312).attr("y",35)
            .attr("font-size", 12)
            .text("(click any circle below to continue)")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("x", nextX)
            .attr("y", nextY)
            .attr("opacity", 0)
            .text("next >")

    }

    if (guideRailsPosition == 6) {

        d3.select(".nextArrow")
            .text("")

        d3.select(".timestepText")
            .transition()
            .duration(500)
            .attr("opacity", 0)

        d3.select(".timestepTicker")
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .text(timestep)

        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("x",guideXCoord).attr("y",guideYCoord)
            .text("But, if we had a 'zombie vaccine' we could prepare...")

        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",275).attr("y",-10)
            .attr("font-size", 12)
            .text("")

        window.setTimeout(advanceTutorial, 2000)

    }

    if (guideRailsPosition == 7) {

        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",360).attr("y",35 )
            .attr("font-size", 12)
            .text("So let's start over...")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("x", nextX)
            .attr("y", nextY)
            .text("next >")




    }

    if (guideRailsPosition == 8) {
        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .text("But, if we had a 'zombie vaccine' we could prepare...")


        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .attr("font-size", 12)
            .text("So let's start over...")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .text("next >")


        window.setTimeout(advanceTutorial, 500)


    }

    if (guideRailsPosition == 9) {

        for (var i = 0; i < graph.nodes.length; i++) {
            graph.nodes[i].status = "S";
        }

        tutorialUpdate();
        window.setTimeout(advanceTutorial, 1000)

    }

    if (guideRailsPosition == 10) {
        d3.select(".guide")
            .transition()
            .duration(500)
            .attr("opacity", 1)
            .text("Efficient distribution of vaccines can 'fragment' the network")

        d3.select(".microGuide")
            .transition()
            .duration(1000)
            .attr("opacity", 1)
            .attr("x",300).attr("y",42)
            .text("(making it harder for diseases to spread)")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("opacity", 1)
            .text("next >")



    }

    if (guideRailsPosition == 11) {
        intervention = true;
        intervention_series = [];



        d3.select(".guide")
            .transition()
            .duration(500)
            .text("Vaccinate people to break this network up into smaller 'communities'")

        d3.select(".microGuide")
            .transition()
            .duration(500)
            .attr("x",250).attr("y",50)
            .text("(click circles below to vaccinate, vaccines are limited)")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("x", nextX)
            .attr("y", nextY)
            .attr("opacity", 0)
            .text("next >")


//        window.setTimeout(guideRails_postOutbreak, 1000);

        vaccineResearched = true;
        vaccineSupply = numberOfIndividuals * 0.20;
        diseaseIsSpreading = false;
        vaccinateMode = true;
        postInitialOutbreak = true;

        d3.select(".svg").append("text")
            .attr("class", "vaccineSupply")
            .attr("x", 300)
            .attr("y", 85)
            .attr("font-size", 17)
            .text("Vaccines Remaining: " + vaccineSupply)
    }

    if (guideRailsPosition == 12) {
        d3.select(".guide").text("")
        d3.select(".microGuide").text("")

        d3.select(".nextArrow")
            .transition()
            .duration(500)
            .attr("x", nextX)
            .attr("y", nextY)
            .text("next >")


        d3.select(".vaccineSupply")
            .transition()
            .duration(500)
            .attr("y", -20)
            .attr("font-size", 17)
            .text("Vaccines Remaining: " + vaccineSupply)


        var numberOfPeople = graph.nodes.length;

        do{
            var randomIndex = Math.floor(Math.random() * numberOfPeople);
            var indexCase = graph.nodes[randomIndex];
        }
        while (indexCase.status == "V");

//        toggleNodeFixation();

        indexCase.status = "I";
        diseaseIsSpreading = true;
        timestep = 0;
        timeToStop = false;
        postInitialOutbreak = false;
        finalStop = true;



        d3.select(".timestepText")
            .transition()
            .duration(500)
            .attr("opacity", 1)

        d3.select(".timestepTicker")
            .transition()
            .duration(500)
            .attr("opacity", 1)
            .text(timestep)

        //initFigure();
        tutorialTimesteps();

    }



}


function spreadingText() {

    d3.select(".guide")
        .transition()
        .duration(500)
        .text("Within weeks, everyone will be infected.")

    d3.select(".microGuide")
        .transition()
        .duration(500)
        .attr("font-size", 12)
        .text("(zombies don't recover...because they're zombies)")

    var timestepText = d3.select(".svg").append("text")
        .attr("class", "timestepText")
        .style("font-size", 30)
        .style("font-family", "Nunito")
        .style("font-weight", 700)
        .style("fill", "#707070")
        .attr("x",35).attr("y",80)
        .text("Day:");

    var timestepTicker = d3.select(".svg").append("text")
        .attr("class", "timestepTicker")
        .style("font-size", 45)
        .style("font-family", "Nunito")
        .style("font-weight", 700)
        .style("fill", "#707070")
        .attr("x",102).attr("y",81)
        .text(timestep);


}



function initFigure() {
    tutorialSeries = [
        [{group: "Intervention", time: 0, value: 0}],
        [{group: "No Intervention", time: 0, value: 0}]
    ];

    d3.select("body").append("div3");

    colorScale = d3.scale.category10();

// canvas margins
    figMargin = {top: 70, right: 10, bottom: 20, left: 90},
        figWidth = 400 - figMargin.left - figMargin.right,
        figHeight = 250 - figMargin.top - figMargin.bottom;

// x scale
    figX = d3.scale.linear()
        .domain([0, nonIntervention_series.length])
        .range([0, figWidth]);

// y scale
    figY = d3.scale.linear()
        .domain([0, numberOfIndividuals])
        .range([figHeight, 0]);

// the lines
    figLines = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return figX(d.time); })
        .y(function(d) { return figY(d.value); });


// the svg canvas
    svgTutorial = d3.select("div3").append("svg")
        .attr("width", figWidth + figMargin.left + figMargin.right)
        .attr("height", figHeight + figMargin.top + figMargin.bottom)
        .attr("class", "svgTutorial")
        .append("g")
        .attr("transform", "translate(" + figMargin.left + "," + figMargin.top + ")");


    yLab = d3.select(".svgTutorial").append("text")
        .attr("x", 5).attr("y", 115)
        .attr("font-weight", "bold")
        .attr("transform", "rotate(320 55,125)")
        .text("Infected");

//    xLab = d3.select(".svgTutorial").append("text")
//        .attr("x", 220).attr("y", 240)
//        .attr("font-weight", "bold")
//        .text("Day");


    nonInterventionLegend = d3.select(".svgTutorial").append("line")
        .attr("x1", 116).attr("y1", 20)
        .attr("x2", 166).attr("y2", 20)
        .style("stroke", "#1f77b4")
        .style("stroke-width", 5)

    nonInterventionLab = d3.select(".svgTutorial").append("text")
        .attr("x", 90).attr("y", 40)
        .text("Without Vaccines")

    interventionLegend = d3.select(".svgTutorial").append("line")
        .attr("x1", 260).attr("y1", 20)
        .attr("x2", 310).attr("y2", 20)
        .style("stroke", "#ff7f0e")
        .style("stroke-width", 5)

    interventionLab = d3.select(".svgTutorial").append("text")
        .attr("x", 245).attr("y", 40)
        .text("With Vaccines")


// append lines to canvas
    svgTutorial.selectAll(".line")
        .data(tutorialSeries)
        .enter().append("path")
        .attr("class", "line")
        .attr("d", figLines)
        .style("stroke-width", 8)
        .style("stroke", function(d) {return colorScale(d[0].group)});


//x-axis
    svgTutorial.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + figHeight + ")")
        .call(d3.svg.axis().scale(figX).orient("bottom"))

//y-axis
    svgTutorial.append("g")
        .attr("class", "y-axis")
        .call(d3.svg.axis().scale(figY).orient("left"));


}

function updateTutorialFig() {

    updateTutorialSeries();

    d3.selectAll("path")
        .data(tutorialSeries) // set the new data
        .transition()
        .attr("d", figLines) // apply the new data values

}

function updateTutorialSeries() {

        tutorialSeries = [
            [{group: "nonIntervention", time: 0, value: 0}],
            [{group: "Intervention", time:0, value:0}]
        ];

        for (var time = 0; time < timestep-1; time++) {
            tutorialSeries[0].push(nonIntervention_series[time]);
            tutorialSeries[1].push(intervention_series[time]);
        }
    console.log(tutorialSeries);

}



