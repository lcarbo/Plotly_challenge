function gatherDataset(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultList = metadata.filter(sampleObj => sampleObj.id == sample);
        result = resultList[0];
        PANEL = d3.select("#sample-alldata"); 
        PANEL.html("");
        object.entries(result).forEach(([key, value]) => { 
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
        buildGauge(result.wfreq);
    });
}

function chartBuilder(sample) { 
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var resultList = samples.filter(sampleObj => sampleObj.id == sample);
        result2 = resultList[0];

        var otu_ids = result2.otu_ids;
        var otu_labels = result2.otu_labels; 
        var sample_values = result2.sample_values;

        var bubbleChart = { 
            title: "Bacteria in each sample", 
            margin: {t: 0},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}, 
            margin: {t: 25}
        }; 

        var chartData = [
            {x: otu_ids,
            y: sample_values, 
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values, 
                color: otu_ids,
                colorscale: "Water"
            }
        }
    ];
    
    Plotly.newPlot("bubble", chartData, bubbleChart); 

    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() { 
    var selector = d3.select("#selDataset"); 

    d3.json("samples.json").then((data) => { 
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
}

function newInput (newSample) { 
    chartBuilder(newSample); 
    gatherDataset(newSample)
}
       

init(); 
