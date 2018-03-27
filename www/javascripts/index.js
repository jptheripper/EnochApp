// (c) 2014 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global ble  */
/* jshint browser: true , devel: true*/
'use strict';

// ASCII only
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

// ASCII only
function stringToBytes(string) {
    var array = new Uint8Array(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
        array[i] = string.charCodeAt(i);
    }
    return array.buffer;
}

//generic defaults, change in application.js to add additional values
var bluefruit= {
        type: "BT05-A",
    //    deviceId:"00:15:81:00:83:7E",
        serviceUUID:      "0000ffe0-0000-1000-8000-00805f9b34fb",
        txCharacteristic: "0000ffe1-0000-1000-8000-00805f9b34fb", // transmit is from the phone's perspective
        rxCharacteristic: "0000ffe1-0000-1000-8000-00805f9b34fb",  // receive is from the phone's perspective
        shortUUID: "ffe0",
        shortTX: "ffe1",
        shortRX: "ffe1"
        };


// this is ZeroBeacon service





//var deviceList = $( "#deviceList" );

var app = {
    initialize: function() {
        
        //navigator.notification.alert("Message", (function() {}), "initialize", "ok");
        this.bindEvents();
        
        
        
    //    detailPage.hidden = true;
    },
      bindEvents: function() {
        //  alert($('#boardListSelect').val());
        //this.onDeviceReady();
          app.refreshDeviceList();
     //     window.plugins.insomnia.keepAwake();
     //   insomnia.keepAwake();
      //    alert('awake');
       //   alert('here');
     //   document.addEventListener('deviceready', this.onDeviceReady, false);
       // refreshButton.addEventListener('touchstart', this.refreshDeviceList, false);
      //  sendButton.addEventListener('click', this.sendData, false);
      //  disconnectButton.addEventListener('touchstart', this.disconnect, false);
       // deviceList.addEventListener('touchstart', app.connect, false); // assume not scrolling
        
    },
    onDeviceReady: function() {
      //  window.localStorage.getItem("key");
      
     
    },
    refreshDeviceList: function() {
        resultDiv.innerHTML ="";
        $('#deviceList').empty();
        //navigator.notification.alert(cordova.platformId, (function() {}), "scan click", "ok");
      //  deviceList.empty(); // empties the list
   //   alert(device.version); 
   //   app.onConnect(null);
        if (cordova.platformId === 'android') { // Android filtering is broken
            ble.scan([], 20, app.onDiscoverDevice, app.onError);
        } else {
            ble.scan([bluefruit.serviceUUID], 20, app.onDiscoverDevice, app.onError);
        }
    },
    onDiscoverDevice: function(device) {
       // navigator.notification.alert("in onDiscoverDevice", (function() {}), "onDiscoverDevice", "ok");
//        navigator.notification.alert("Message", (function() {}), device.id, "ok");
//        navigator.notification.alert("Message", (function() {}), device.name, "ok");
//        navigator.notification.alert("Message", (function() {}), device.rssi, "ok");
    //    if(device.name ==="ZeroBeacon"){
        console.log('discovered : '+device.name);
      //  alert(device.name +":"+device.id);
        if(device.name==='BT05-A'||device.name==='zeroBeacon'||(device.name==='ZeroBeacon')||(device.name==='Zero Beacon')||(device.name==='Enoch PB')){
       //     console.log(device);
        var listItem = document.createElement('li'),
            html = '<b>' + device.name + '</b><br/>' +
                'RSSI: ' + device.rssi + '&nbsp;|&nbsp;' +
                device.id;

        listItem.dataset.deviceId = device.id;
        listItem.dataset.name = device.name;
        listItem.innerHTML = html;
        bleChange();
    
     //   navigator.notification.alert("Message", (function() {}), "here1"+device.name, "ok");
        bluefruit.deviceId=device.id;
        steroids.data.storage.property("bleID").set(bluefruit.deviceId);
        steroids.data.storage.property("bleUUID").set(bluefruit.serviceUUID);
        steroids.data.storage.property("bleTX").set(bluefruit.txCharacteristic);
        steroids.data.storage.property("bleRX").set(bluefruit.rxCharacteristic);
        steroids.data.storage.property("bleshortUUID").set(bluefruit.shortUUID);
        steroids.data.storage.property("bleshortTX").set(bluefruit.shortTX);
        steroids.data.storage.property("bleshortRX").set(bluefruit.shortRX);
        deviceList.appendChild(listItem);
    //    navigator.notification.alert("Message", (function() {}), jQuery("#deviceList"), "ok");
        listItem.addEventListener('click', app.connect, false);
 //   }
        }
    },
    onConnect: function(device) {
        console.log('after connect');
        console.log(device);
                // subscribe for incoming data
            //  navigator.notification.alert("Message", (function() {}), "in onconnect"+bluefruit.deviceId, "ok");  
          //  navigator.notification.alert("Message", (function() {}), "in onconnect notification started", "ok");  
          //  
              ble.startNotification(bluefruit.deviceId, bluefruit.shortUUID, bluefruit.shortRX, app.onData, app.onError);
             //ble.startNotification(bluefruit.deviceId, "FFE0", "FFE1", app.onData, app.onError);
              
              resultDiv.innerHTML = "connected to "+bluefruit.deviceId;
              updateNavButton('connected');
              $('#getDataButton').show();
            },
    connect: function(e) {
        console.log('connected');
       // console.log(e); 
        resultDiv.innerHTML =  "connecting" + "<br/>";
     //   navigator.notification.alert("Message", (function() {}), bluefruit.serviceUUID, "ok");
       // bluefruit.deviceId = e.target.dataset.deviceId;
   //     navigator.notification.alert("Message", (function() {}), "connecting to "+bluefruit.deviceId, "ok");
            

        ble.connect(bluefruit.deviceId, app.onConnect, app.onError);
    },
    onData: function(data) { // data received from Arduino
       
    //   alert(bluefruit.type+":"+data.byteLength);
     //  navigator.notification.alert("Message", (function() {}), "in data"+bytesToString(data), "ok");  
     if ((data.byteLength<20&&bluefruit.type=="bt05a")||(data.byteLength<20&&bluefruit.type=="rnochpb")
             ||bluefruit.type=="zeroBeacon"||bluefruit.type=="Zero Beacon"||bluefruit.type=="ZeroBeacon"){
         
        //getData();
      //  navigator.notification.alert("Message", (function() {}), "in data"+bytesToString(data), "ok");  
    //   alert(bytesToString(data));
      
        var chars = bytesToString(data).split('');
        if(chars[1]=='l'){
            console.log('tourney lock detected')
            resultDiv.innerHTML = "Tourney Lock Detected";
            navigator.notification.alert("Tourney Lock On", (function() {}), "Aborting Connection", "ok"); 
            app.disconnect();
        }
        //validate data received
        //alert(bytesToString(data));
        if(chars[0]=='{'){
        console.log('receiving register data')
        resultDiv.innerHTML = "Receiving Register Values, please wait";
        }
        if(chars[0]=='{'&&chars[chars.length-3]=='}'&&chars.length==18){
           // alert(chars[1]+chars[2]+chars[3]+chars[4]+chars[5]+chars[6]);
          // alert(chars[1]);
         //  setRegisters();
           processArduinoData(chars.slice(1,chars.length-3));
        }
        //alert(data);
     //   alert(bytesToString(data));
            }
    },
	writeUp: function(event) {
	//navigator.notification.alert("Message", (function() {}), "up", "ok");  
        ble.writeWithoutResponse(
            bluefruit.deviceId,
            bluefruit.serviceUUID,
            bluefruit.txCharacteristic,
            stringToBytes('u'), null, null
        );
	//	bluetoothSerial.write('u', null, null);
	},
	write: function(val1, val2, val3) {
          //  alert('write');
        var success = function() {
           // alert("success"); 
//            resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + val1+":"+val2+":"+val3 + "<br/>";
//            resultDiv.scrollTop = resultDiv.scrollHeight;
            };

        var failure = function() {
            ble.isConnected(
                id,
                function() {
                    //connected but write failed
                     alert("Failed writing data to the board, please try again");
                },
                function() {
                    //not connected
                    alert("Board is *not* connected,  please reconnect");
                    showDiv('connect');
                }
                );
            
            };
           // navigator.notification.alert("Message", (function() {}), "in write", "ok");
             var startSymbol='{';
             var endSymbol='}';
           //  navigator.notification.alert("Message", (function() {}), "here1", "ok");
             var id =steroids.data.storage.property("bleID").get();
           //  navigator.notification.alert("Message", (function() {}), id, "ok");
             var uuid =steroids.data.storage.property("bleshortUUID").get();
          //  navigator.notification.alert("Message", (function() {}), uuid, "ok");
             var tx = steroids.data.storage.property("bleshortTX").get();
           //  navigator.notification.alert("Message", (function() {}), tx, "ok");
          //   navigator.notification.alert("Message", (function() {}), "here2", "ok");
             var uint8 = new Uint8Array(5);
             uint8[0]=startSymbol.charCodeAt(0);
             uint8[1]=val1.charCodeAt(0);
             if(typeof val2 === "string"){
             uint8[2]=val2.charCodeAt(0);
             }else{
             uint8[2]=val2;    
             }
             uint8[3]=val3;
             uint8[4]=endSymbol.charCodeAt(0);
          //   navigator.notification.alert("Message", (function() {}), "here3", "ok");
	//	alert(id+":"+uuid+":"+tx+":"+uint8.buffer);
                
        ble.write(
            id,
            uuid,
            tx,
            uint8.buffer, success, failure    // use three value arrays, [method,value1,value2] 
                    //methods - button, eeprom,getall (b,e,g)
                    //value1 - for button up,select,down (u,s,d)
                    //       - for eeprom eeprom #
                    //       - for getall null
                    //value2 - for button null
                    //       - for eeprom eeprom value
                    //       - for getall null
                    
        );
	//	bluetoothSerial.write('d', null, null);
	},
        toggleWrite: function(val1, val2) {
            //true = 1, false = 2
          //  alert('toggleWrite:'+val1+":"+val2);
            var success = function() {
//            alert("success write value: ");
//            resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + val1+":"+val2+":"+val3 + "<br/>";
//            resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
            alert("Failed writing data to the ble, please try again");
        };
             var startSymbol='{';
             var endSymbol='}';
             var id =steroids.data.storage.property("bleID").get();
             var uuid =steroids.data.storage.property("bleshortUUID").get();
             var tx = steroids.data.storage.property("bleshortTX").get();
             var uint8 = new Uint8Array(5);
             uint8[0]=startSymbol.charCodeAt(0);
             uint8[1]='e'.charCodeAt(0);
             uint8[2]=val1;    
             if(val2==true){
             uint8[3]=1;    
             }else if(val2==false){
             uint8[3]=0;    
             }
             
             uint8[4]=endSymbol.charCodeAt(0);
	//	alert(id+":"+uuid+":"+tx+":"+uint8.buffer);
                ble.isConnected(
                id,
                function() {
                //    alert("Peripheral is connected");
                },
                function() {
                    
                    alert("Peripheral is *not* connected,  please reconnect");
               //     ble.connect(id, app.onConnect, app.onError);
                }
);
        ble.writeWithoutResponse(
            id,
            uuid,
            tx,
            uint8.buffer, success, failure    // use three value arrays, [method,value1,value2] 
                    //methods - button, eeprom,getall (b,e,g)
                    //value1 - for button up,select,down (u,s,d)
                    //       - for eeprom eeprom #
                    //       - for getall null
                    //value2 - for button null
                    //       - for eeprom eeprom value
                    //       - for getall null
                    
        );
	//	bluetoothSerial.write('d', null, null);
	},
    sendData: function(event) { // send data to Arduino

        var success = function() {
            console.log("success");
            resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
            resultDiv.scrollTop = resultDiv.scrollHeight;
        };

        var failure = function() {
            alert("Failed writing data to the bluefruit le");
        };

        var data = stringToBytes(messageInput.value);
        var deviceId = event.target.dataset.deviceId;
        ble.write(
            deviceId,
            bluefruit.serviceUUID,
            bluefruit.txCharacteristic,
            data, success, failure
        );

    },
    disconnect: function(event) {
       // window.plugins.insomnia.allowSleepAgain();
        resultDiv.innerHTML = "disconnected" + "<br/>";
        updateNavButton('disconnected');
        $('#getDataButton').hide();
  //      var deviceId = event.target.dataset.deviceId;
      //  alert(bluefruit.deviceId);
        ble.disconnect(bluefruit.deviceId, app.showMainPage, app.onError);
        
    },
    setMessage: function(message){
        resultDiv.innerHTML = message;
    },
    showMainPage: function() {
      //  mainPage.hidden = false;
      //  detailPage.hidden = true;
    },
    showDetailPage: function() {
     //   mainPage.hidden = true;
      //  detailPage.hidden = false;
    },
    onError: function(reason) {
        alert(reason);
    //    navigator.notification.alert("Message", (function() {}), "Error:"+reason.toString(), "ok");
   //   navigator.notification.alert(reason, (function() {}), "Error scanning", "ok");
      resultDiv.innerHTML =  "";
  //          app.disconnect();
    }
};


function loadBle(){
    //if ios hide exit
   // alert(device.platform);
    if(device.platform==='iOS'){
        
        $('#exitButton').hide();
    }
      if(window.localStorage.getItem("enoch_ble")){
       //   alert("value"+window.localStorage.getItem("enoch_ble"));
          $('#bleListSelect').val(window.localStorage.getItem("enoch_ble"));  
       //   alert("set");
      }else
      {
          $('#bleListSelect').val('bt05a');  
      }
  };
  
  function loadButtons(){
               var buttonElements = $("button, a");

  buttonElements.on('touchstart', function(e){
  if(e.target.classList && e.target.classList.contains('button'))
  {
     // alert('here');
    e.target.classList.add('activated');
  //  alert(e.target.classList);
  }
  });

  buttonElements.on('touchend', function(e){
e.target.classList.remove('activated');
  });
  }
  //StatusBar.show();
  loadButtons();
  
  setTimeout(loadBle, 2000);