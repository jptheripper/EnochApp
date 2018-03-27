
var REGISTER_FIRE_MODE        =    "01";
var REGISTER_RAMP_START_MIN_SHOTS ="02";
var REGISTER_RAMP_MIN_BPS         ="03";
var REGISTER_RAMP_INACTIVE_TIME_BETWEEN_PULLS =       "04";
var REGISTER_ROF_ONOFF            ="05";
var REGISTER_REACTIVE             ="06";
var REGISTER_ROF_EYES_ON_INT       =    "07";
var REGISTER_ROF_EYES_ON_FRAC       =   "08";
var REGISTER_ROF_EYES_OFF_INT        =  "09";
var REGISTER_ROF_EYES_OFF_FRAC        = "10";
var REGISTER_EYE_SENSITIVITY   =   "11";
var REGISTER_EYE_MODE      ="12";
var REGISTER_DWELL_INT      =      "13";
var REGISTER_DWELL_FRAC      =     "14";
var REGISTER_FSDO_DWELL       =    "15";
var REGISTER_DWELL_RAMP        =   "16" ;
var REGISTER_DWELL_RAMP_RATE    =  "17";
var REGISTER_DWELL_RAMP_THRESHOLD=   "18";
var REGISTER_DEBOUNCE             ="19";
var REGISTER_MECH_DEBOUNCE        ="20";
var REGISTER_DEBOUNCE_MODE        ="21";
var REGISTER_LOADER_DELAY         ="22";
var REGISTER_BOARD_MODE           ="23";
var REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT=         "24";
var REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC=     "25";
var REGISTER_CLOSED_BOLT_OPEN_DELAY_INT    =      "26";
var REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC    = "27";
var REGISTER_CLOSED_BOLT_PUMP_ON_TIME_INT=         "28";
var REGISTER_CLOSED_BOLT_PUMP_ON_TIME_FRAC=     "29";
var REGISTER_CLOSED_BOLT_CLOSE_TIME_INT =    "30";
var REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC =   "31";
var REGISTER_CLOSED_BOLT_WATCH_TIME       = "32";
var REGISTER_CLOSED_BOLT_EYES_OFF_USE_WATCH = "33";
var REGISTER_ACE_DEBOUNCE      =    "34";
var REGISTER_CONTRAST   =     "35";
var REGISTER_POWER_SAVE  =      "36";
var REGISTER_GAMETIMER_ONOFF   =     "37";
var REGISTER_GAMETIMER_MINUTES             = "38";
var REGISTER_GAMETIMER_SECONDS             = "39";
var REGISTER_SPLASH             = "40";

function createCbShotGraph(){
    var cbchart, cbctx, cbdata, cboptions;

    cbdata = [
    {
      label: 'Sear on Time',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 6 }, 
        { x: 0, y: 6 }
      ]
    },
    {
      label: 'Open Delay',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 5 }, 
        { x: 0, y: 5 }
      ]
    },
    {
      label: 'Pump on Time',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 4 }, 
        { x: 0, y: 4 }
      ]
    },
    {
      label: 'Close Time',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 3 }, 
        { x: 0, y: 3 }
      ]
    },
    {
      label: 'Eyes',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 2 },
        { x: 0, y: 2 }
      ]
    },
    {
      label: 'Ball',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 1 },
        { x: 0, y: 1 }
      ]
    }
  ];

cboptions = {
        // SUPPORTED GLOBAL OPTIONS

       // Boolean - If we should show the scale at all
       showScale: true,

       // String - Colour of the scale line
       scaleLineColor: "rgba(0,0,0,.1)",

       // Number - Pixel width of the scale line
       scaleLineWidth: 1,

       // Boolean - Whether to show labels on the scale
       scaleShowLabels: true,

       // Interpolated JS string - can access value
       scaleLabel: function(arg){
           switch (arg.value){
               case 6:
                   return "SOT";
               case 5:
                   return "OD";
               case 4:
                   return "POT";
               case 3:
                   return "CT";
               case 2:
                   return "EYES";
               case 1:
                   return "BALL";
           }
       },

       // Interpolated JS string - can access value
       scaleArgLabel: "<%=value%>",

       // String - Message for empty data
       emptyDataMessage: "chart has no data",		

       // SCALE

       // Boolean - Whether grid lines are shown across the chart
       scaleShowGridLines: true,

       // Number - Width of the grid lines
       scaleGridLineWidth: 1,

       // String - Colour of the grid lines
       scaleGridLineColor: "rgba(0,0,0,.05)",

       // Boolean - Whether to show horizontal lines (except X axis)	
       scaleShowHorizontalLines: true,

       // Boolean - Whether to show vertical lines (except Y axis)
       scaleShowVerticalLines: true,

       // SCALE RANGE

       // Boolean - If we want to override with a hard coded scale
       scaleOverride: true,

       // ** Required if scaleOverride is true **
       // Number - The number of steps in a hard coded scale
       scaleSteps: 5,

       // Number - The value jump in the hard coded scale
       scaleStepWidth: 1,

       // Number - The scale starting value
       scaleStartValue: 1,

       // DATE SCALE

       // String - scale type: "number" or "date"
       scaleType: "number",

       // Boolean - Whether to use UTC dates instead local
       useUtc: true,

       // String - short date format (used for scale labels)
       scaleDateFormat: "L",

       // String - short time format (used for scale labels)
       scaleTimeFormat: "L",

       // String - full date format (used for point labels)
       scaleDateTimeFormat: "L",

       // LINES

       // Boolean - Whether to show a stroke for datasets
       datasetStroke: true,

       // Number - Pixel width of dataset stroke
       datasetStrokeWidth: 2,

       // String - Color of dataset stroke
       datasetStrokeColor: '#007ACC',

       // String - Color of dataset stroke
       datasetPointStrokeColor: 'white',

       // Boolean - Whether the line is curved between points
       bezierCurve: true,

       // Number - Tension of the bezier curve between points
       bezierCurveTension: 0.4,

       // POINTS

       // Boolean - Whether to show a dot for each point
       pointDot: true,

       // Number - Pixel width of point dot stroke
       pointDotStrokeWidth: 1,

       // Number - Radius of each point dot in pixels
       pointDotRadius: 4,

       // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
       pointHitDetectionRadius: 4,

       // TEMPLATES

       // Interpolated JS string - can access point fields: 
       // argLabel, valueLabel, arg, value, datasetLabel, size
       tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=argLabel%>; <%=valueLabel%>",

       // Interpolated JS string - can access point fields: 
       // argLabel, valueLabel, arg, value, datasetLabel, size
       multiTooltipTemplate: "<%=argLabel%>; <%=valueLabel%>",

       // Interpolated JS string - can access all chart fields
       legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><%for(var i=0;i<datasets.length;i++){%><li><span class=\"<%=name.toLowerCase()%>-legend-marker\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%=datasets[i].label%></li><%}%></ul>"
};

cbctx = $('#shotGraphCB')[0].getContext("2d");

setTimeout(function(){ 
    
    var t01,t02,t03,t04,t05,t06,t07,t08,t09,t10,t11;
    t01=parseInt(steroids.data.storage.property("t01").get());
    t02=parseInt(steroids.data.storage.property("t02").get());
    t03=parseInt(steroids.data.storage.property("t03").get());
    t04=parseInt(steroids.data.storage.property("t04").get());
    t05=parseInt(steroids.data.storage.property("t05").get());
    t06=parseInt(steroids.data.storage.property("t06").get());
    t07=parseInt(steroids.data.storage.property("t07").get());
    t08=parseInt(steroids.data.storage.property("t08").get());
    t09=parseInt(steroids.data.storage.property("t09").get());
    t10=parseInt(steroids.data.storage.property("t10").get());
    t11=parseInt(steroids.data.storage.property("t11").get());
    
    
    //alert(t01+":"+t02+":"+t03+":"+t04+":"+t05+":"+t06+":"+t07+":"+t08+":"+t09+":"+t10+":"+t11);
    var sot=(t02-t01)/1000;
    var od=(t04-t03)/1000;
    var pot=(t06-t05)/1000;
    var ct=(t08-t07)/1000;

    cbchart = new Chart(cbctx).Scatter(cbdata, cboptions);
    $('#sotObs').html(""+sot);
    if(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC).get()=="10"){
         $('#sotReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT).get()));
     }else{
        $('#sotReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT).get()+"."+steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC).get()));
    }
    $('#odObs').html(""+od);
    if(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC).get()=="10"){
         $('#odReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_OPEN_DELAY_INT).get()));
     }else{
        $('#odReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_OPEN_DELAY_INT).get()+"."+steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC).get()));
    }
    $('#potObs').html(""+pot);
    if(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_PUMP_ON_TIME_FRAC).get()=="10"){
         $('#potReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_PUMP_ON_TIME_INT).get()));
     }else{
        $('#potReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_PUMP_ON_TIME_INT).get()+"."+steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_PUMP_ON_TIME_FRAC).get()));
    }
    $('#ctObs').html(""+ct);
    if(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC).get()=="10"){
         $('#ctReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_CLOSE_TIME_INT).get()));
     }else{
        $('#ctReg').html(""+parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_CLOSE_TIME_INT).get()+"."+steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC).get()));
    }
    
    if(t11==1){
      $('#wtObs').html("Used");  
    }else{
      $('#wtObs').html("Not Used");    
    }
     $('#wtReg').html(""+(parseFloat(steroids.data.storage.property("e"+REGISTER_CLOSED_BOLT_WATCH_TIME).get())*10));
    
    // Set point data { x: 11, y: 4 } at index 3
    
      //sot
    cbchart.datasets[0].setPointData(0, 0, 6);
    cbchart.datasets[0].setPointData(1, (t02-t01)/1000, 6);
    //od
    cbchart.datasets[1].setPointData(0, (t03-t01)/1000, 5);
    cbchart.datasets[1].setPointData(1, (t04-t01)/1000, 5);
    //pot
    cbchart.datasets[2].setPointData(0, (t05-t01)/1000, 4);
    cbchart.datasets[2].setPointData(1, (t06-t01)/1000, 4);
    //ct
    cbchart.datasets[3].setPointData(0, (t07-t01)/1000, 3);
    cbchart.datasets[3].setPointData(1, (t08-t01)/1000, 3);
    //eyes
    if(t09>t01){
    cbchart.datasets[4].setPointData(0, (0), 2);
    cbchart.datasets[4].setPointData(1, (t09-t01)/1000, 2);
    }
    //ball
    if(t10>t01){
    cbchart.datasets[5].setPointData(0, (t10-t01)/1000, 1);
    //close time should be end so end there
    cbchart.datasets[5].setPointData(1, (t08-t01)/1000, 1);
    }

    cbchart.update();
  //  $('#shotGraphCB').scrollIntoView(true);
    
}, 1000);

    
}

function createObShotGraph(){
    var obchart, obctx, obdata, oboptions;

    obdata = [
    {
      label: 'FSDO',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 5 }, 
        { x: 0, y: 5 }
      ]
    },
    {
      label: 'Solenoid',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 4 }, 
        { x: 0, y: 4 }
      ]
    },
    {
      label: 'Dwell Ramp',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 3 }, 
        { x: 0, y: 3 }
      ]
    },
//    {
//      label: 'Ball',
//      strokeColor: '#F16220',
//      pointColor: '#F16220',
//      pointStrokeColor: '#fff',
//      data: [
//        { x: 0, y: 2 },
//        { x: 0, y: 2 }
//      ]
//    },
    {
      label: 'Loader Delay',
      strokeColor: '#F16220',
      pointColor: '#F16220',
      pointStrokeColor: '#fff',
      data: [
        { x: 0, y: 1 },
        { x: 0, y: 1 }
      ]
    }
  ];

oboptions = {
        // SUPPORTED GLOBAL OPTIONS

       // Boolean - If we should show the scale at all
       showScale: true,

       // String - Colour of the scale line
       scaleLineColor: "rgba(0,0,0,.1)",

       // Number - Pixel width of the scale line
       scaleLineWidth: 1,

       // Boolean - Whether to show labels on the scale
       scaleShowLabels: true,

       // Interpolated JS string - can access value
       scaleLabel: function(arg){
           switch (arg.value){
               case 4:
                   return "FSDO";
               case 3:
                   return "SOL";
               case 2:
                   return "DR";
//               case 2:
//                   return "EYES";
               case 1:
                   return "LOAD";
           }
       },

       // Interpolated JS string - can access value
       scaleArgLabel: "<%=value%>",

       // String - Message for empty data
       emptyDataMessage: "chart has no data",		

       // SCALE

       // Boolean - Whether grid lines are shown across the chart
       scaleShowGridLines: true,

       // Number - Width of the grid lines
       scaleGridLineWidth: 1,

       // String - Colour of the grid lines
       scaleGridLineColor: "rgba(0,0,0,.05)",

       // Boolean - Whether to show horizontal lines (except X axis)	
       scaleShowHorizontalLines: true,

       // Boolean - Whether to show vertical lines (except Y axis)
       scaleShowVerticalLines: true,

       // SCALE RANGE

       // Boolean - If we want to override with a hard coded scale
       scaleOverride: true,

       // ** Required if scaleOverride is true **
       // Number - The number of steps in a hard coded scale
       scaleSteps: 3,

       // Number - The value jump in the hard coded scale
       scaleStepWidth: 1,

       // Number - The scale starting value
       scaleStartValue: 1,

       // DATE SCALE

       // String - scale type: "number" or "date"
       scaleType: "number",

       // Boolean - Whether to use UTC dates instead local
       useUtc: true,

       // String - short date format (used for scale labels)
       scaleDateFormat: "L",

       // String - short time format (used for scale labels)
       scaleTimeFormat: "L",

       // String - full date format (used for point labels)
       scaleDateTimeFormat: "L",

       // LINES

       // Boolean - Whether to show a stroke for datasets
       datasetStroke: true,

       // Number - Pixel width of dataset stroke
       datasetStrokeWidth: 2,

       // String - Color of dataset stroke
       datasetStrokeColor: '#007ACC',

       // String - Color of dataset stroke
       datasetPointStrokeColor: 'white',

       // Boolean - Whether the line is curved between points
       bezierCurve: true,

       // Number - Tension of the bezier curve between points
       bezierCurveTension: 0.4,

       // POINTS

       // Boolean - Whether to show a dot for each point
       pointDot: false,

       // Number - Pixel width of point dot stroke
       pointDotStrokeWidth: 1,

       // Number - Radius of each point dot in pixels
       pointDotRadius: 4,

       // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
       pointHitDetectionRadius: 4,

       // TEMPLATES

       // Interpolated JS string - can access point fields: 
       // argLabel, valueLabel, arg, value, datasetLabel, size
       tooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=argLabel%>; <%=valueLabel%>",

       // Interpolated JS string - can access point fields: 
       // argLabel, valueLabel, arg, value, datasetLabel, size
       multiTooltipTemplate: "<%=argLabel%>; <%=valueLabel%>",

       // Interpolated JS string - can access all chart fields
       legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><%for(var i=0;i<datasets.length;i++){%><li><span class=\"<%=name.toLowerCase()%>-legend-marker\" style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%=datasets[i].label%></li><%}%></ul>"
};

obctx = $('#shotGraphOB')[0].getContext("2d");

setTimeout(function(){ 
    
    var o01,o02,o03,o04,o05,o06,o07,o08,o09,o10,o11,o12;
    o01=parseInt(steroids.data.storage.property("o01").get());
  //  alert(o01);
    o02=parseInt(steroids.data.storage.property("o02").get());
    o03=parseInt(steroids.data.storage.property("o03").get());
    o04=parseInt(steroids.data.storage.property("o04").get());
    o05=parseInt(steroids.data.storage.property("o05").get());
    o06=parseInt(steroids.data.storage.property("o06").get());
    o07=parseInt(steroids.data.storage.property("o07").get());
    o08=parseInt(steroids.data.storage.property("o08").get());
    o09=parseInt(steroids.data.storage.property("o09").get());
    o10=parseInt(steroids.data.storage.property("o10").get());
    o11=parseInt(steroids.data.storage.property("o11").get());
    o12=parseInt(steroids.data.storage.property("o12").get());
//    alert("o01:"+o01);
//    alert("o02:"+o02);
//    alert("o03:"+o03);
//    alert("o04:"+o04);
//    alert("o05:"+o05);
//    alert("o06:"+o06);
//    alert("o07:"+o07);
//    alert("o08:"+o08);
//    alert("o09:"+o09);
//    alert("o10:"+o10);
    
 // alert(o01+":"+o02+":"+o03+":"+o04+":"+o05+":"+o06+":"+o07+":"+o08);
    
  //  alert(t01+":"+t02+":"+t03+":"+t04+":"+t05+":"+t06+":"+t07+":"+t08+":"+t09+":"+t10+":"+t11+":"+t12);
    
    var fsdo=(o02-o01)/1000;
    var dr=(o04-o03)/1000;
    var sol=(o06-o05)/1000;
    var actdwell = (o12-o11)/1000;
    var ld=(o10-o09)/1000;
    var dwell = 0.0;
   
    obchart = new Chart(obctx).Scatter(obdata, oboptions);

    
    $('#dwellObs').html(""+actdwell);
    if(steroids.data.storage.property("e"+REGISTER_DWELL_FRAC).get()=="10"){
         dwell =parseFloat(steroids.data.storage.property("e"+REGISTER_DWELL_INT).get());
     }else{
       dwell = parseFloat(steroids.data.storage.property("e"+REGISTER_DWELL_INT).get()+"."+steroids.data.storage.property("e"+REGISTER_DWELL_FRAC).get());
    }
    $('#dwellReg').html(""+dwell);
//    $('#dwellReg').html(""+
//            parseFloat(steroids.data.storage.property("e04").get())
//            );
    $('#FSDOObs').html(""+fsdo);
//    alert(steroids.data.storage.property("e"+REGISTER_FSDO_DWELL).get());
    if(steroids.data.storage.property("e"+REGISTER_FSDO_DWELL).get()===6){
     $('#FSDOReg').html(""+"OFF");   
    }else{
    $('#FSDOReg').html(""+
            parseFloat(steroids.data.storage.property("e"+REGISTER_FSDO_DWELL).get())
            );
    } 
    $('#dwellRampObs').html(""+dr);
    if(steroids.data.storage.property("e"+REGISTER_FSDO_DWELL).get()===6){
     $('#dwellRampReg').html(""+"OFF");   
    }else{
    $('#dwellRampReg').html(""+
            parseFloat(steroids.data.storage.property("e"+REGISTER_FSDO_DWELL).get())
            );
    } 
    $('#loaderDelayObs').html(""+ld);
    
    if(steroids.data.storage.property("e"+REGISTER_LOADER_DELAY).get()===21){
     $('#loaderDelayReg').html(""+"OFF");   
    }else{
    $('#loaderDelayReg').html(""+
            parseFloat(steroids.data.storage.property("e"+REGISTER_LOADER_DELAY).get())/4
            );
    }
    
  //  $('#loaderDelayObs').html(""+ld);
//    var total=dwell+ //dwell
//            parseFloat(steroids.data.storage.property("o03").get())+ //fsdo
//            parseFloat(steroids.data.storage.property("o04").get()/10.0);
//    $('#DwellReg').html(""+total);
//    
    $('#totalDwellObs').html(""+sol);
  
    
        //fsdo
    obchart.datasets[0].setPointData(0, (o01-o01)/1000, 4);
    obchart.datasets[0].setPointData(1, (o02-o01)/1000, 4);
        
        //sol
    obchart.datasets[1].setPointData(0, (o11-o01)/1000, 3);
    obchart.datasets[1].setPointData(1, (o12-o01)/1000, 3);
        
        //dr
    obchart.datasets[2].setPointData(0, (o03-o01)/1000, 2);
    obchart.datasets[2].setPointData(1, (o04-o01)/1000, 2);

//    //eyes
//    if(o07>o05){
//    obchart.datasets[3].setPointData(0, (0)/1000, 2);
//    obchart.datasets[3].setPointData(1, (o07-o05)/1000, 2);
//    }
//    if(o08>o05){
//    obchart.datasets[3].setPointData(0, (o08-o05)/1000, 2);
//    obchart.datasets[3].setPointData(1, ((o08-o05)/1000)+10, 2);
//    }
    
    //loader delay
        if(o09>o05){
    obchart.datasets[3].setPointData(0, (o09-o01)/1000, 1);
    obchart.datasets[3].setPointData(1, (o10-o01)/1000, 1); 
        }

    
    obchart.update();
 //   $('#shotGraphOB').scrollIntoView(true);
}, 1000);

    
}