function plot_wifi_radar(x, y){

  data = [{
    type: 'scatterpolar',
    r: y,
    theta: x,
    fill: 'toself'
  }]
  
  layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 100]
      }
    },
    title: {
      text: 'Surrounding WiFi Access Points Live',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
  
    showlegend: false
  }

  Plotly.newPlot('live', data, layout);
}


function plot_wifi(x, y) {
  wifi = new Array();

  var trace2 = {
    x: x,
    y: y,
    name: 'LA Zoo',
    type: 'bar',
  };

  var layout = {
    title: {
      text: 'Surrounding WiFi Access Points',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Access Points',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Quality',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    }
  };

  var data = [trace2];
  Plotly.newPlot('live', data, layout);
}


function grab_and_plot_wifi() {
  // use AJAX 
  $.ajax({
    type: "GET",
    dataType: 'JSON',
    url: "http://localhost:1234",
  }).done(function (response) {
    console.log("success");
    wifi_x = new Array();
    wifi_y = new Array();
    console.log(response.length);
    for (var i = 0; i < response.length; i++) {
      console.log(response[i].ssid, response[i].quality);
      wifi_x[i] = response[i].ssid;
      wifi_y[i] = response[i].quality;

    }
    if (response.length > 0) plot_wifi_radar(wifi_x, wifi_y);
  })
}

function grab_and_plot_history(time_mins) {
  // use AJAX 
  $.ajax({
    type: "GET",
    dataType: 'JSON',
    url: "http://localhost:1234/past/" + time_mins,
  }).done(function (response) {
    console.log("success");
    if (response.length > 0) {
      plot_boxplot(response);
    } else {
      $("#history").empty();
    }
  })
}

$(document).ready(function () {
  console.log("ready!");
  $("#btn").click(function () {
    console.log($("#time_min").val());
    grab_and_plot_history($("#time_min").val());
  });

  setInterval(function(){
  grab_and_plot_wifi();},2000)
  

});

// find a list of unique ssid from raw
function unique_ssids(raw) {
  // grab all the ids
  y = raw.map(function (x) { return x.ssid; });
  //remove duplicates
  z = y.filter((item, index) => y.indexOf(item) === index);
  return z;
}

// create an array of arrays where each array contains
// a series of a particular ssid
function create_series(raw) {
  // raw has the raw data in the form of []
  uids = unique_ssids(raw);
  series = new Array();

  for (var i = 0; i < uids.length; i++) {
    // extract series for each ssid and push to the series array
    series.push(raw.filter(item => (item.ssid == uids[i])));
  }

  return series;
}

function plot_boxplot(raw) {

  data = new Array();
  // array of arrays with ssid, quality and timestamp.
  series = create_series(raw);

  for (var i = 0; i < series.length; i++) {
    // extract the quality only 
    quality = series[i].map(function (x) { return x.quality });
    console.log(quality);

    trace = {
      y: quality,
      type: 'box',
      name: series[i][0].ssid,
      notched:true
    };

    data.push(trace);
  }

  var layout = {
    title: {
      text: 'Surrounding WiFi Access Points History',
      font: {
        family: 'Courier New, monospace',
        size: 24
      },
      xref: 'paper',
      x: 0.05,
    },
    xaxis: {
      title: {
        text: 'Access Points',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      },
    },
    yaxis: {
      title: {
        text: 'Quality',
        font: {
          family: 'Courier New, monospace',
          size: 18,
          color: '#7f7f7f'
        }
      }
    },
    showlegend: false
  };

  Plotly.newPlot('history', data, layout);

}
