function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json("/metadata/"+sample).then((metadata3) => {
    console.log(metadata3)
    // sampleNames.sort(compare);
    // Use d3 to select the panel with id of `#sample-metadata`
    var selector = d3.select("#sample-metadata");


    // Use `.html("") to clear any existing metadata
    selector.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // Object.entries(metadata).forEach(([key, value]) => console.log(`${key}: ${value}`));
    var WFREQ = metadata3.WFREQ;
    delete metadata3.WFREQ;
    d3.select("#sample-metadata").append("table").append("tbody");
    // Object.entries(metadata3).forEach(([key, value]) => d3.select("#sample-metadata").append("div").html(`${key},${value}`));
    Object.entries(metadata3).forEach(([key, value]) => 
      d3.select("tbody").append("tr").html(`<td><b>${key}</b><br/>${value}</td>`)
    );
    // d3.select("#sample-metadata").selectAll("div")
    // .data(metadata3)
    // .enter() // creates placeholder for new data
    // .append("div") // appends a div to placeholder
    // // .classed("col-md-4 thumbnail", true) // sets the class of the new div
    // .html(function(d) {
    //   console.log(d)
    //   // return `<img title="${d.title}" alt="${d.title}" src="${d.url}">`;
    //   return d;
    // }); // sets the html in the div to an image tag with the link
  
    

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    var level = WFREQ;

    // Trig to calc meter point
    var degrees = 180 - (level*22.5) +10, radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [
      {
        type: 'scatter',
        x: [0],
        y:[0],
        marker: {
          size: 25,
          color:'850000'
        },
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'
      },
      {
        values: [50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50/8, 50],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4','2-3','1-2'],
        textinfo: 'text',
        textposition:'inside',
        marker: {
          colors:
          [
            'rgba(14, 127, 0, .5)',
            'rgba(80, 114, 2, .5)',
            'rgba(100, 134, 12, .5)',
            'rgba(110, 154, 22, .5)',
            'rgba(170, 202, 42, .5)',
            'rgba(202, 209, 95, .5)',
            'rgba(210, 206, 145, .5)',
            'rgba(232, 226, 202, .5)',
            'rgba(255, 255, 255, 0)'
          ]
        },
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4','2-3','1-2'],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
      }
    ];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: 'Belly Botton Washing Frequency',
      height: 500,
      width: 500,
      xaxis: {
        zeroline:false,
        showticklabels:false,
        showgrid: false,
        range: [-1, 1]
      },
      yaxis: {
        zeroline:false,
        showticklabels:false,
        showgrid: false,
        title: 'Scrubs per Week',
        range: [-1, 1]
      }
    };

    Plotly.newPlot('gauge', data, layout);

  });
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
  d3.json("/samples/"+sample).then((sampleNames) => {
    // console.log(sampleNames)
    // sampleNames.sort(compare);
    var data = [{
      labels: sampleNames.otu_ids.slice(0, 10),
      values: sampleNames.sample_values.slice(0, 10),
      hovertext: sampleNames.otu_labels.slice(0, 10),
      type: 'pie'
    }];
    var layout = {
      // height: 400,
      //  width: 900
    };
    
    Plotly.newPlot('pie', data, layout);

  
    // @TODO: Build a Bubble Chart using the sample data
    // var len2 = [...Array(sampleNames.otu_ids.length).keys()].map(i => i + 1);
    // console.log(len2)
    var trace1 = {
      x: sampleNames.otu_ids,
      y: sampleNames.sample_values,
      text: sampleNames.otu_labels,
      mode: 'markers',
      marker: {
        size: sampleNames.sample_values,
        color: sampleNames.otu_ids,
        // color: len2,
        // color: range(1,sampleNames.otu_ids.length+1),
        // color: [
        //   'rgb(93, 164, 214)',
        //   'rgb(255, 144, 14)',
        //   'rgb(54, 160, 101)',
        //   'rgb(255, 65, 54)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',
        //   'rgb(191, 233, 115)',

        // ],
        showscale: true
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Out ID',
      showlegend: false,
      height: 600,
      // width: 900
    };
    
    Plotly.newPlot('bubble', data, layout);
  });
  

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

// Weekly Washing Frequency
function buildFrequency(sample) {
   d3.json("/metadata/"+sample).then((metadata1) => {
     // Enter a speed between 0 and 180
     console.log(metadata1.WFREQ);
    }); 
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    // buildFrequency(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  // buildFrequency(newSample);
}

// Initialize the dashboard
init();


