function plot_data(){
    wifi = new Array();
    var x_axis = ['giraffes', 'orangutans', 'monkeys'];
    for (var i = 0; i < 3; i ++) {
        wifi[i] = Math.random()*10;
        console.log(wifi[i]);
    }
    
    var trace2 = {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: wifi,
        name: 'LA Zoo',
        type: 'bar',
      };

      var layout = {
        title: {
          text:'Surrounding WiFi Access Points',
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
            text: 'Signal Strength (DB)',
            font: {
              family: 'Courier New, monospace',
              size: 18,
              color: '#7f7f7f'
            }
          }
        }
      };

    var data = [trace2];
    Plotly.newPlot('myDiv', data, layout);
}


function plot_wifi(x,y){
  wifi = new Array();
  
  var trace2 = {
      x: x,
      y: y,
      name: 'LA Zoo',
      type: 'bar',
    };

    var layout = {
      title: {
        text:'Surrounding WiFi Access Points',
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
  Plotly.newPlot('myDiv', data, layout);
}


function grab_and_plot_wifi(){
    // use AJAX 
    $.ajax({
        type: "GET",
        dataType: 'JSON',
        url: "http://localhost:1234",
    }).done(function(response) {
        console.log("success");
        wifi_x = new Array();
        wifi_y = new Array();
        console.log(response.length);
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].ssid, response[i].quality);
            wifi_x[i] = response[i].ssid;
            wifi_y[i] = response[i].quality;
           
        }
        if(response.length>0) plot_wifi(wifi_x, wifi_y);
    })
}