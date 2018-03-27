
function enableButtonStates(){
    var buttonElements = $("button, a");

  buttonElements.on('touchstart', function(e){
  if(e.target.classList && e.target.classList.contains('button'))
  {
    e.target.classList.add('activated');
  }
  });

  buttonElements.on('touchend', function(e){
    e.target.classList.remove('activated');
  });
    
}


// Display the native navigation bar with the title "Hello World!"
steroids.view.navigationBar.show("Enoch Paintball");

// Set the WebView background color to black (effective on iOS only)
steroids.view.setBackgroundColor("#000000");

function boardTypeChange(){
    steroids.data.storage.property("board").set($('#boardListSelect').val());
    if(steroids.data.storage.property("sliders").get()==true){
        createSliders();
    }
    
}



function bleChange(){
    steroids.data.storage.property("ble").set($('#bleListSelect').val());
   // alert($('#bleListSelect').val());
    if($('#bleListSelect').val()==='bt05a'||$('#bleListSelect').val()==='enochpb'){
        bluefruit.type= "bt05a";
        bluefruit.serviceUUID=      "0000ffe0-0000-1000-8000-00805f9b34fb";
        bluefruit.txCharacteristic= "0000ffe1-0000-1000-8000-00805f9b34fb"; // transmit is from the phone's perspective
        bluefruit.rxCharacteristic= "0000ffe1-0000-1000-8000-00805f9b34fb"; // receive is from the phone's perspective
        bluefruit.shortUUID= "FFE0";
        bluefruit.shortTX = "FFE1";
        bluefruit.shortRX = "FFE1";
    }else if($('#bleListSelect').val()==='zeroBeacon'){
     
        bluefruit.type= "zeroBeacon";
        bluefruit.serviceUUID=      "0000fff0-0000-1000-8000-00805f9b34fb";  //primary
        bluefruit.txCharacteristic="0000fff2-0000-1000-8000-00805f9b34fb"; // transmit is from the phone's perspective   write write request
        bluefruit.rxCharacteristic= "0000fff1-0000-1000-8000-00805f9b34fb";  // receive is from the phone's perspective   notify
        bluefruit.shortUUID= "FFF0";
        bluefruit.shortTX = "FFF2";
        bluefruit.shortRX = "FFF1";
    }
        steroids.data.storage.property("bleUUID").set(bluefruit.serviceUUID);
        steroids.data.storage.property("bleTX").set(bluefruit.txCharacteristic);
        steroids.data.storage.property("bleRX").set(bluefruit.rxCharacteristic);
        steroids.data.storage.property("bleshortUUID").set(bluefruit.shortUUID);
        steroids.data.storage.property("bleshortTX").set(bluefruit.shortTX);
        steroids.data.storage.property("bleshortRX").set(bluefruit.shortRX);
        //set permanent
        window.localStorage.setItem("enoch_ble", $('#bleListSelect').val());
}

function initOpenClosed(mode){
  //  alert('initOpenClosed'+mode);
    switch(mode){
            case 1:
                  //hide cb settings;
                  $('#shotCb').hide();
                  $('#closedBoltContainer').hide();
                     //show ob settings;        
                  $('#shotOb').show();
                  $('#openBoltContainer').show();           
                break;
            case 2:
                //show cb settings;
                  $('#shotCb').show();
                  $('#closedBoltContainer').show();
                   //hide ob settings;         
                  $('#shotOb').hide();
                  $('#openBoltContainer').hide();
                break;
            default:
                  //hide cb settings;
                  $('#shotCb').hide();
                  $('#closedBoltContainer').hide();
                  //show ob settings;        
                  $('#shotOb').show();
                  $('#openBoltContainer').show();  
                break;
        }
}

function resetStorage(){
    steroids.data.storage.property("d01").unset();
    steroids.data.storage.property("d02").unset();
    steroids.data.storage.property("e01").unset();
    steroids.data.storage.property("e02").unset();
    steroids.data.storage.property("e03").unset();
    steroids.data.storage.property("e04").unset();
    steroids.data.storage.property("e05").unset();
    steroids.data.storage.property("e06").unset();
    steroids.data.storage.property("e07").unset();
    steroids.data.storage.property("e08").unset();
    steroids.data.storage.property("e09").unset();
    steroids.data.storage.property("e10").unset();
    steroids.data.storage.property("e11").unset();
    steroids.data.storage.property("e12").unset();
    steroids.data.storage.property("e13").unset();
    steroids.data.storage.property("e14").unset();
    steroids.data.storage.property("e15").unset();
    steroids.data.storage.property("e16").unset();
    steroids.data.storage.property("e17").unset();
    steroids.data.storage.property("e18").unset();
    steroids.data.storage.property("e19").unset();
    steroids.data.storage.property("e20").unset();
    steroids.data.storage.property("e21").unset();
    steroids.data.storage.property("e22").unset();
    steroids.data.storage.property("e23").unset();
    steroids.data.storage.property("e24").unset();
    steroids.data.storage.property("e25").unset();
    steroids.data.storage.property("e26").unset();
    steroids.data.storage.property("e27").unset();
    steroids.data.storage.property("e28").unset();
    steroids.data.storage.property("e29").unset();
    steroids.data.storage.property("e30").unset();  
    steroids.data.storage.property("e31").unset();
    steroids.data.storage.property("e32").unset();
    steroids.data.storage.property("e33").unset();
    steroids.data.storage.property("e34").unset();
    steroids.data.storage.property("e35").unset();
    steroids.data.storage.property("e36").unset();
    steroids.data.storage.property("e37").unset();
    steroids.data.storage.property("e38").unset();
    steroids.data.storage.property("e39").unset();
    steroids.data.storage.property("e40").unset();
    steroids.data.storage.property("t01").unset();
    steroids.data.storage.property("t02").unset();
    steroids.data.storage.property("t03").unset();
    steroids.data.storage.property("t04").unset();
    steroids.data.storage.property("t05").unset();
    steroids.data.storage.property("t06").unset();
    steroids.data.storage.property("t07").unset();
    steroids.data.storage.property("t08").unset();
    steroids.data.storage.property("t09").unset();
    steroids.data.storage.property("t10").unset();
    steroids.data.storage.property("t11").unset();
    steroids.data.storage.property("o01").unset();
    steroids.data.storage.property("o02").unset();
    steroids.data.storage.property("o03").unset();
    steroids.data.storage.property("o04").unset();
    steroids.data.storage.property("o05").unset();
    steroids.data.storage.property("o06").unset();
    steroids.data.storage.property("o07").unset();
    steroids.data.storage.property("o08").unset();
    steroids.data.storage.property("sliders").unset();
}

function resetBoard(value){
    //check checkbox value
    if(value==true){
        app.write('r', 255, 255);
        navigator.notification.alert("Reset Command sent", (function() {}), "Reset", "ok");
        resetStorage();
    }else{
        navigator.notification.alert("Select confirmation checkbox prior to resetting", (function() {}), "Reset not completed", "ok"); 
    }
}

function arrayBufferToString(buffer){
    var arr = new Uint8Array(buffer);
    var str = String.fromCharCode.apply(String, arr);
    if(/[\u0080-\uffff]/.test(str)){
        throw new Error("this string seems to contain (still encoded) multibytes");
    }
    return str;
}


function createNavButtons(){


var rightButton = new steroids.buttons.NavigationBarButton();
rightButton.imagePath = "/icons/ble-unconnected.png"
rightButton.imageAsOriginal = "true"
rightButton.onTap = function() { showDiv('connect'); }
rightButton.styleClass = "nav-button";

steroids.view.navigationBar.update({
  buttons: {
    right: [rightButton]
  }
})


steroids.data.storage.property("sliders").set(false);
if(steroids.data.storage.property("board").get()){
            $('#boardListSelect').val(steroids.data.storage.property("board").get());
}


}



function exit(){
    navigator.app.exitApp();
}

function updateNavButton(status){
        var rightButton = new steroids.buttons.NavigationBarButton();
        rightButton.imageAsOriginal = "true"
        rightButton.onTap = function() { showDiv('connect'); }
        rightButton.styleClass = "nav-button";
    switch (status){
            case 'connected':
                rightButton.imagePath = "/icons/ble-connected.png"
                break;
            case 'disconnected':
                rightButton.imagePath = "/icons/ble-unconnected.png"
                break;
                
    }
    steroids.view.navigationBar.update({
        buttons: {
          right: [rightButton]
        }
      })
    }
    
function writeAboutVariables(){
    var totalShots =steroids.data.storage.property("d01").get();
  // alert("shots"+":"+totalShots);
    var firmwareVersion =  steroids.data.storage.property("d02").get();
   // alert("firmwareVersion"+":"+firmwareVersion);
    if(totalShots){
    $('#totalShots').text(totalShots);
    }else{
    $('#totalShots').text('');   
    }
    $('#appVersion').text("v1.0.3");
    if(firmwareVersion){
    $('#firmwareVersion').text("v"+firmwareVersion);
    }else{
     $('#firmwareVersion').text("");   
    }
    
}    

function showDiv(pane){
               //positive not selected
               //balanced selected
        switch(pane){
            case 'reset':
                steroids.view.navigationBar.show('Enoch Paintball');
                $('#subfooter').hide();
                hideFooterButton($('#connectButton'));
                $('#connectTab').hide();
                hideFooterButton($('#buttonsButton'));
                $('#buttonsTab').hide();
                showFooterButton($('#aboutButton'));
                $('#aboutTab').hide();
                $('#resetTab').show();
                hideFooterButton($('#configButton'));
                $('#configTab').hide();
                hideFooterButton($('#tuningButton'));
                $('#tuningTab').hide();
                break;
            case 'connect':
                steroids.view.navigationBar.show('Enoch Paintball');
                $('#subfooter').hide();
                showFooterButton($('#connectButton'));
                $('#connectTab').show();
                hideFooterButton($('#buttonsButton'));
                $('#buttonsTab').hide();
                hideFooterButton($('#aboutButton'));
                $('#aboutTab').hide();
                hideFooterButton($('#configButton'));
                $('#configTab').hide();
                hideFooterButton($('#tuningButton'));
                $('#tuningTab').hide();
                $('#resetTab').hide();
                break;
            case 'config':
                $('#subfooter').show();
                hideFooterButton($('#connectButton'));
                $('#connectTab').hide();
                hideFooterButton($('#buttonsButton'));
                $('#buttonsTab').hide();
                hideFooterButton($('#aboutButton'));
                $('#aboutTab').hide();
                showFooterButton($('#configButton'));
                $('#configTab').show();
                hideFooterButton($('#tuningButton'));
                $('#tuningTab').hide();
                $('#resetTab').hide();
                showConfigPage('FireSettings');
                break;
            case 'tuning':
                steroids.view.navigationBar.show('Tuning');
                $('#subfooter').hide();
                hideFooterButton($('#connectButton'));
                $('#connectTab').hide();
                hideFooterButton($('#buttonsButton'));
                $('#buttonsTab').hide();
                hideFooterButton($('#aboutButton'));
                $('#aboutTab').hide();
                hideFooterButton($('#configButton'));
                $('#configTab').hide();
                showFooterButton($('#tuningButton'));
                $('#tuningTab').show();
                $('#resetTab').hide();
              //  createShotGraph();
                break;
            case 'buttons':
                steroids.view.navigationBar.show('Buttons');
                $('#subfooter').hide();
                hideFooterButton($('#connectButton'));
                $('#connectTab').hide();
                showFooterButton($('#buttonsButton'));
                $('#buttonsTab').show();
                hideFooterButton($('#aboutButton'));
                $('#aboutTab').hide();
                hideFooterButton($('#configButton'));
                $('#configTab').hide();
                hideFooterButton($('#tuningButton'));
                $('#tuningTab').hide();
                $('#resetTab').hide();
                break;
            case 'about':
                steroids.view.navigationBar.show('About');
                $('#subfooter').hide();
                hideFooterButton($('#connectButton'));
                $('#connectTab').hide();
                hideFooterButton($('#buttonsButton'));
                $('#buttonsTab').hide();
                showFooterButton($('#aboutButton'));
                $('#aboutTab').show();
                hideFooterButton($('#configButton'));
                $('#configTab').hide();
                hideFooterButton($('#tuningButton'));
                $('#tuningTab').hide();
                $('#resetTab').hide();
                writeAboutVariables();
                break;
                
        }
}

function showFooterButton(div){
    div.removeClass('button-positive');
    div.addClass('button-balanced');
}

function hideFooterButton(div){
    div.removeClass('button-balanced');
    div.addClass('button-positive');    
}

function showSubFooterButton(div){
   // div.show();
    div.removeClass('button-calm');
    div.addClass('button-energized');
}

function hideSubFooterButton(div){
  //  div.hide();
    div.removeClass('button-energized');
    div.addClass('button-calm');    
}

function saveProfile(){
   // alert('here');
   // alert('saving' + $("#ProfileSaveid").data("ionRangeSlider").result.from      );
   app.write('p', 1, $("#ProfileSaveid").data("ionRangeSlider").result.from -1);
}

function loadProfile(){
    app.write('p', 0, $("#ProfileLoadid").data("ionRangeSlider").result.from -1);
    setTimeout(function () {
        showDiv('connect');
    }, 500);
    getData();
}

function showConfigPage(page){
    switch(page){
            case 'FireSettings':
                steroids.view.navigationBar.show('Fire Settings');
                showSubFooterButton($('#fireButton'));
                $('#fireTab').show();
                hideSubFooterButton($('#eyeButton'));
                $('#eyeTab').hide();
                hideSubFooterButton($('#markerButton'));
                $('#markerTab').hide();
//                hideSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').hide();
                hideSubFooterButton($('#timersButton'));
                $('#timersTab').hide();
                hideSubFooterButton($('#profileButton'));
                $('#profileTab').hide();
                break;
            case 'EyeSettings':
                steroids.view.navigationBar.show('Eye Settings');
                hideSubFooterButton($('#fireButton'));
                $('#fireTab').hide();
                showSubFooterButton($('#eyeButton'));
                $('#eyeTab').show();
                hideSubFooterButton($('#markerButton'));
                $('#markerTab').hide();
//                hideSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').hide();
                hideSubFooterButton($('#timersButton'));
                $('#timersTab').hide();
                hideSubFooterButton($('#profileButton'));
                $('#profileTab').hide();
                break;
            case 'MarkerSettings':
                steroids.view.navigationBar.show('Marker Settings');
                hideSubFooterButton($('#fireButton'));
                $('#fireTab').hide();
                hideSubFooterButton($('#eyeButton'));
                $('#eyeTab').hide();
                showSubFooterButton($('#markerButton'));
                $('#markerTab').show();
//                hideSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').hide();
                hideSubFooterButton($('#timersButton'));
                $('#timersTab').hide();
                hideSubFooterButton($('#profileButton'));
                $('#profileTab').hide();
                break;
//            case 'ClosedBoltSettings':
//                steroids.view.navigationBar.show('Closed Bolt Settings');
//                hideSubFooterButton($('#fireButton'));
//                $('#fireTab').hide();
//                hideSubFooterButton($('#eyeButton'));
//                $('#eyeTab').hide();
//                hideSubFooterButton($('#markerButton'));
//                $('#markerTab').hide();
//                showSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').show();
//                hideSubFooterButton($('#timersButton'));
//                $('#timersTab').hide();
//                hideSubFooterButton($('#profileButton'));
//                $('#profileTab').hide();
//                break;
            case 'Timers':
                steroids.view.navigationBar.show('Timer Settings');
                hideSubFooterButton($('#fireButton'));
                $('#fireTab').hide();
                hideSubFooterButton($('#eyeButton'));
                $('#eyeTab').hide();
                hideSubFooterButton($('#markerButton'));
                $('#markerTab').hide();
//                hideSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').hide();
                showSubFooterButton($('#timersButton'));
                $('#timersTab').show();
                hideSubFooterButton($('#profileButton'));
                $('#profileTab').hide();
                break;
            case 'Profiles':
                steroids.view.navigationBar.show('Profile Settings');
                hideSubFooterButton($('#fireButton'));
                $('#fireTab').hide();
                hideSubFooterButton($('#eyeButton'));
                $('#eyeTab').hide();
                hideSubFooterButton($('#markerButton'));
                $('#markerTab').hide();
//                hideSubFooterButton($('#closedBoltButton'));
//                $('#closedBoltTab').hide();
                hideSubFooterButton($('#timersButton'));
                $('#timersTab').hide();
                showSubFooterButton($('#profileButton'));
                $('#profileTab').show();
                break;
                
        }
    
}

function loadShot(){
    if($('#boardListSelect').val()==='eblade_micro'||$('#boardListSelect').val()==='eblade_opt'){
        app.write('c', 255, 255);
    }else{
        app.write('o', 255, 255);
    }
}


function loadCBTestData(){
    processArduinoData(['t','0','1','0','0','0','0','0','0','0','0','0','0','0']);
    processArduinoData(['t','0','2','0','0','0','0','0','0','0','6','1','3','0']);
    processArduinoData(['t','0','3','0','0','0','0','0','0','0','6','1','5','0']);
    processArduinoData(['t','0','4','0','0','0','0','0','0','1','6','4','5','0']);
    processArduinoData(['t','0','5','0','0','0','0','0','0','1','6','4','8','0']);
    processArduinoData(['t','0','6','0','0','0','0','0','0','3','6','6','3','0']);
    processArduinoData(['t','0','7','0','0','0','0','0','0','3','6','6','6','0']);
    processArduinoData(['t','0','8','0','0','0','0','0','0','4','1','8','4','0']);
    processArduinoData(['t','0','9','0','0','0','0','0','0','1','9','0','0','0']);
    processArduinoData(['t','1','0','0','0','0','0','0','0','3','1','0','0','0']);
    processArduinoData(['t','1','1','0','0','0','0','0','0','0','0','0','0','0']);
}

function loadOBTestData(){
    processArduinoData(['o','0','1','0','0','0','0','0','0','0','0','0','0','0']);
    processArduinoData(['o','0','2','0','0','0','0','6','1','3','0','0','0','0']);
    processArduinoData(['o','0','3','0','0','0','0','6','1','5','0','0','0','0']);
    processArduinoData(['o','0','4','0','0','0','1','6','4','5','0','0','0','0']);
    processArduinoData(['o','0','5','0','0','0','1','6','4','8','0','0','0','0']);
    processArduinoData(['o','0','6','0','0','0','3','6','6','3','0','0','0','0']);
    processArduinoData(['o','0','7','0','0','0','3','6','6','6','0','0','0','0']);
    processArduinoData(['o','0','8','0','0','0','4','1','8','4','0','0','0','0']);
}


    
function loadTestData(){
    processArduinoData(['e','0','1','0','0','2']);
    processArduinoData(['e','0','2','0','0','3']);
    processArduinoData(['e','0','3','0','0','6']);
    processArduinoData(['e','0','4','0','0','1']);
    processArduinoData(['e','0','5','0','0','2']);
    processArduinoData(['e','0','6','0','0','1']);
    processArduinoData(['e','0','7','0','1','5']);
    processArduinoData(['e','0','8','0','1','0']);
    processArduinoData(['e','0','9','0','0','8']);
    processArduinoData(['e','1','0','0','1','0']);
    processArduinoData(['e','1','1','0','0','5']);
    processArduinoData(['e','1','2','0','0','1']);
    processArduinoData(['e','1','3','0','1','0']);
    processArduinoData(['e','1','4','0','1','0']);
    processArduinoData(['e','1','5','0','0','6']);
    processArduinoData(['e','1','6','0','0','1']);
    processArduinoData(['e','1','7','0','0','1']);
    processArduinoData(['e','1','8','0','1','5']);
    processArduinoData(['e','1','9','0','1','1']);
    processArduinoData(['e','2','0','0','1','0']);
    processArduinoData(['e','2','1','0','0','1']);
    processArduinoData(['e','2','2','0','1','0']);
    processArduinoData(['e','2','3','0','0','1']);
    processArduinoData(['e','2','4','0','0','6']);
    processArduinoData(['e','2','5','0','1','0']);
    processArduinoData(['e','2','6','0','1','0']);
    processArduinoData(['e','2','7','0','1','0']);
    processArduinoData(['e','2','8','0','0','3']);
    processArduinoData(['e','2','9','0','1','0']);
    processArduinoData(['e','3','0','0','0','5']);
    processArduinoData(['e','3','1','0','1','0']);
    processArduinoData(['e','3','2','0','0','8']);
    processArduinoData(['e','3','3','0','0','2']);
    processArduinoData(['e','3','4','0','0','2']);
    processArduinoData(['e','3','5','0','0','1']);
    processArduinoData(['e','3','6','0','1','0']);
    processArduinoData(['e','3','7','0','0','1']);
    processArduinoData(['e','3','8','0','0','2']);
    processArduinoData(['e','3','9','0','0','1']);
    processArduinoData(['e','4','0','0','0','1']);
}



function processArduinoData(array){
    steroids.logger.log('receiving'+array);
    switch(array[0]){
       
        case 'd':
            app.setMessage("Received Config value "+array[2]+" of 3");
            if(array[2]=='1'){
            var prop = 'd'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]+array[6]+array[7]+array[8]+array[9]+array[10]+array[11]+array[12]+array[13]);
           // alert(prop+":"+val2);
            }
            else if
            (array[2]=='2'){
            var prop = 'd'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]);
          //  alert(prop+":"+val2);
            }
            else if
            (array[2]=='3'){
            var prop = 'd'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]);
            //set board type
            //switch select selector
            switch(val2){
                case 1:
                    $('#boardListSelect').val('lite');   
                    break;
                case 2:
                    $('#boardListSelect').val('angel_led');   
                    break;
                case 3:
                    $('#boardListSelect').val('angel_lcd');   
                    break;
                case 4:
                    $('#boardListSelect').val('angel_dual');   
                    break;
                case 5:
                    $('#boardListSelect').val('angel_mq');   
                    break;
                case 6:
                    $('#boardListSelect').val('angel_a1');    
                    break;
                case 7:
                    $('#boardListSelect').val('eblade_micro');   
                    break;
                case 8:
                    $('#boardListSelect').val('eblade_opt');   
                    break;
                case 9:
                    $('#boardListSelect').val('b2k');   
                    break;
                case 10:
                    $('#boardListSelect').val();        
                    break;
                case 11:
                    $('#boardListSelect').val();   
                    break;

                }

                //get selector value
                steroids.data.storage.property("board").set($('#boardListSelect').val());
            }
            steroids.data.storage.property(prop).set(val2);
            break;
        //eeprom
        case 'e':
            app.setMessage("Received Register value "+array[1]+array[2]+" of 40 with raw:"+array[4]+array[5]);
          //  app.setMessage("Data Received"); 
            var prop = 'e'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]);
//            if(prop=='e07'||prop=='e08'){
//            alert(prop+":"+val2);
//            }
            steroids.data.storage.property(prop).set(val2);
            if(prop=='e40'){
                createSliders();
                
            }
            break;
        //tuning variable 8 digit millis is almost a full day    
        case 't':
        //    alert(array);
            var prop = 't'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]+array[6]+array[7]+array[8]+array[9]+array[10]+array[11]+array[12]+array[13]);
            steroids.data.storage.property(prop).set(val2);
            
            if(prop=='t11'){
               // alert('creating cb graph');
                createCbShotGraph();                  
            }
            break;
         case 'o':
      //  alert(array[0]+array[1]+array[2]+array[3]);
            var prop = 'o'+array[1]+array[2];
            var val2 = parseInt(array[4]+array[5]+array[6]+array[7]+array[8]+array[9]+array[10]+array[11]+array[12]+array[13]);
            steroids.data.storage.property(prop).set(val2);
          //  alert(prop+":"+val2);
            if(prop=='o12'){
                createObShotGraph();                  
            }
            break;
    }
}

