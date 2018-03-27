function getData() {
    //   alert('1');
    resetStorage();
    steroids.logger.log('requesting data');
    app.write('g', 255, 255);
}


function createSliders() {
    app.setMessage("Creating Sliders");
    if ($('#boardListSelect').val() === 'universal') {
        $('#BoardModeContainer').show();
        $('#BoardModeContainer2').show();
        initOpenClosed(3);
        //universal show all
        sliders.dwell();
        sliders.dwell2();
        sliders.boardMode();
        sliders.boardMode2();
        sliders.searOnTime();
        sliders.openDelay();
        sliders.pumpOnTime();
        sliders.closeTime();
        sliders.watchTime();
        sliders.searOnTime2();
        sliders.openDelay2();
        sliders.pumpOnTime2();
        sliders.closeTime2();
        sliders.watchTime2();

    } else if ($('#boardListSelect').val() === 'eblade_micro' || $('#boardListSelect').val() === 'eblade_opt') {
        $('#BoardModeContainer').hide();
        $('#BoardModeContainer2').hide();
        //closed bolt
        initOpenClosed(2);
        sliders.searOnTime();
        sliders.openDelay();
        sliders.pumpOnTime();
        sliders.closeTime();
        sliders.watchTime();
        sliders.searOnTime2();
        sliders.openDelay2();
        sliders.pumpOnTime2();
        sliders.closeTime2();
        sliders.watchTime2();

    }
    else {
        //open bolt
        $('#BoardModeContainer').hide();
        $('#BoardModeContainer2').hide();
        initOpenClosed(1);
        sliders.dwell();
        sliders.dwell2();
    }
    sliders.eyesOnROF();
    sliders.eyesOffROF();
    sliders.fireMode();
    sliders.rampMinShots();
    sliders.rampMinBPS();
    sliders.rampInactiveTime();
    sliders.eyeSensitivity();
    sliders.eyeMode();
    sliders.fsdo();
    sliders.dwellRampThreshold();
    sliders.debounce();
    sliders.aceDebounce();
  //  sliders.splash();
    sliders.dwellRampRate();
    sliders.loaderDelay2();

    sliders.fsdo2();
    sliders.dwellRampOnOff2();
    sliders.dwellRampThreshold2();
    sliders.dwellRampRate2();
    sliders.mechDebounce();
    sliders.debounceMode();
    sliders.loaderDelay();


    sliders.gameTimerSeconds();
    sliders.gameTimerMinutes();
    //     sliders.sleepTimeout();
    //     sliders.sleepDelay();
    sliders.powerSave();
    sliders.contrast();
    sliders.rofOnOff();
    sliders.reactiveOnOff();
    sliders.dwellRampOnOff();
    sliders.gameTimerOnOff();
//      sliders.tuningOnOff();
    sliders.profileSave();
    sliders.profileLoad();
    //  alert('here');
    app.setMessage("Data Retrival Complete, loading Config");
    steroids.data.storage.property("sliders").set(true);
    setTimeout(function () {
        showDiv('config');
    }, 500);
}



function splitDual(value) {
    var array = [0, 0];
    array[0] = Math.floor(value);
    array[1] = Math.round((value - Math.floor(value)) * 10);
    // alert(array[1]);
    return array;
}
;

var REGISTER_FIRE_MODE = "01";
var REGISTER_RAMP_START_MIN_SHOTS = "02";
var REGISTER_RAMP_MIN_BPS = "03";
var REGISTER_RAMP_INACTIVE_TIME_BETWEEN_PULLS = "04";
var REGISTER_ROF_ONOFF = "05";
var REGISTER_REACTIVE = "06";
var REGISTER_ROF_EYES_ON_INT = "07";
var REGISTER_ROF_EYES_ON_FRAC = "08";
var REGISTER_ROF_EYES_OFF_INT = "09";
var REGISTER_ROF_EYES_OFF_FRAC = "10";
var REGISTER_EYE_SENSITIVITY = "11";
var REGISTER_EYE_MODE = "12";
var REGISTER_DWELL_INT = "13";
var REGISTER_DWELL_FRAC = "14";
var REGISTER_FSDO_DWELL = "15";
var REGISTER_DWELL_RAMP = "16";
var REGISTER_DWELL_RAMP_RATE = "17";
var REGISTER_DWELL_RAMP_THRESHOLD = "18";
var REGISTER_DEBOUNCE = "19";
var REGISTER_MECH_DEBOUNCE = "20";
var REGISTER_DEBOUNCE_MODE = "21";
var REGISTER_LOADER_DELAY = "22";
var REGISTER_BOARD_MODE = "23";
var REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT = "24";
var REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC = "25";
var REGISTER_CLOSED_BOLT_OPEN_DELAY_INT = "26";
var REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC = "27";
var REGISTER_CLOSED_BOLT_PUMP_ON_INT_TIME = "28";
var REGISTER_CLOSED_BOLT_PUMP_ON_FRAC_TIME = "29";
var REGISTER_CLOSED_BOLT_CLOSE_TIME_INT = "30";
var REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC = "31";
var REGISTER_CLOSED_BOLT_WATCH_TIME = "32";
var REGISTER_CLOSED_BOLT_EYES_OFF_USE_WATCH = "33";
var REGISTER_ACE_DEBOUNCE = "34";
var REGISTER_CONTRAST = "35";
var REGISTER_POWER_SAVE = "36";
var REGISTER_GAMETIMER_ONOFF = "37";
var REGISTER_GAMETIMER_MINUTES = "38";
var REGISTER_GAMETIMER_SECONDS = "39";
var REGISTER_SPLASH = "40";

function splashListChange(){
 // alert('changed'+$('#splashListSelect').val());
  app.write('e', parseInt(REGISTER_SPLASH), $('#splashListSelect').val());
  steroids.data.storage.property("e" + REGISTER_SPLASH).set($('#splashListSelect').val());
}

var sliders = {
    eyesOnROF: function () {
        //dual int/frac eeprom

        var eeprom = REGISTER_ROF_EYES_ON_INT;
        var eepromfrac = REGISTER_ROF_EYES_ON_FRAC;
        var offset = 0;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        var $range = $("#EyesOnROFid");
        var $input = $("#EyesOnROFInputid");
        $input.val(init);
        var min = 1;
        var max = 30.9;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        from: init,
                        grid: true,
                        postfix: 'bps',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    eyesOffROF: function () {
        //dual int/frac eeprom
        var eeprom = REGISTER_ROF_EYES_OFF_INT;
        var eepromfrac = REGISTER_ROF_EYES_OFF_FRAC;
        var offset = 0;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        var $range = $("#EyesOffROFid");
                var $input = $("#EyesOffROFInputid");
        $input.val(init);
        var min = 1;
        var max = 30.9;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {

            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        from: init,
                        grid: true,
                        postfix: 'bps',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    fireMode: function () {
        var eeprom = REGISTER_FIRE_MODE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        //  alert('e01'+init);
        var $range = $("#FireModeid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "SEMI", "AUTO", "RAMP", "TRUESEMI"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    rampMinShots: function () {
        var eeprom = REGISTER_RAMP_START_MIN_SHOTS;
        var offset = 0;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        var $range = $("#RampMinShotsid");
        var $input = $("#RampMinShotsInputid");
        $input.val(init);
        var min = 1;
        var max = 10;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        from: init,
                        type: 'single',
                        grid: true,
                        grid_snap: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property('e' + eeprom).set(tmp);
                            $input.val(data.from);

                        },
                        onUpdate: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property('e' + eeprom).set(tmp);
                            $input.val(data.from);
                        }
                    }
            );
         //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    rampMinBPS: function () {
        var eeprom = REGISTER_RAMP_MIN_BPS;
        var offset = 0;
        var $range = $("#RampMinBPSid");
        var $input = $("#RampMinBPSInputid");
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        $input.val(init);
        var min = 1;
        var max = 15;
        
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        from: init,
                        type: 'single',
                        grid: true,
                        grid_snap: true,
                        postfix: "bps",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property('e' + eeprom).set(tmp);
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property('e' + eeprom).set(tmp);
                            $input.val(data.from);
                        }
                    }
            );
            //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    eyeSensitivity: function () {
        var eeprom = REGISTER_EYE_SENSITIVITY;
        var offset = 0;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#EyeSensitivityid");
        var $input = $("#EyeSensitivityInputid");
        $input.val(init);
        var min = 1;
        var max = 10;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        from: init,
                        step: 1,
                        type: 'single',
                        grid: true,
                        grid_snap: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    aceDebounce: function () {
        var eeprom = REGISTER_ACE_DEBOUNCE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#AceDebounceid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
//    splash: function () {
//        var eeprom = REGISTER_SPLASH;
//        var offset = 1;
//        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
//        var $range = $("#Splashid");
//        if ($range.data("ionRangeSlider")) {
//            $range.data("ionRangeSlider").update({
//                from: init
//            });
//        } else {
//            $range.ionRangeSlider(
//                    {
//                        values: [
//                            "ENOCH", 
//                            "COBRA", 
//                            "WARPED", 
//                            "JOY", 
//                            "RIPPER",
//                            "AA",
//                            "ANGEL",
//                            "FLY",
//                            "ECA",
//                            "DIRTY",
//                            "MW"
//                        ],
//                        type: 'single',
//                        grid: true,
//                        from: init,
//                        onStart: function (data) {
//                            console.log("onStart");
//                        },
//                        onChange: function (data) {
//                            console.log("onChange");
//                        },
//                        onFinish: function (data) {
//                            // var tmp = data.from+offset;
//                            var tmp = data.from + offset;
//                            app.write('e', parseInt(eeprom), tmp);
//                            steroids.data.storage.property("e" + eeprom).set(tmp);
//                        },
//                        onUpdate: function (data) {
//                            console.log("onUpdate");
//                        }
//                    }
//            );
//        }
//        //   alert('here2');
//    },
    rampInactiveTime: function () {
        var eeprom = REGISTER_RAMP_INACTIVE_TIME_BETWEEN_PULLS;
        var offset = 1;
        var $range = $("#RampInactiveTimeid");
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "500", "1000", "1500", "2000", "2500", "3000", "3500", "4000", "4500", "5000"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        grid_num: 1,
                        postfix: "ms",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    eyeMode: function () {
        var eeprom = REGISTER_EYE_MODE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#EyeModeid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "BREAKBEAM", "REFLECTIVE", "OFF"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwell: function () {
        var eeprom = REGISTER_DWELL_INT;
        var eepromfrac = REGISTER_DWELL_FRAC;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        var $range = $("#Dwellid");
        var $input = $("#DwellInputid");
        $input.val(init);
        var min = 1;
        var max = 30.9;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#Dwellid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#Dwellid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    dwell2: function () {
        var eeprom = REGISTER_DWELL_INT;
        var eepromfrac = REGISTER_DWELL_FRAC;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        var $range = $("#Dwellid2");
        var $input = $("#DwellInputid2");
        $input.val(init);
        var min = 1;
        var max = 10;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: 1,
                        max: 30.9,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#Dwellid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            app.write('e', parseInt(eeprom), values[0]);
                            steroids.data.storage.property("e" + eeprom).set(values[0]);
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#Dwellid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    fsdo: function () {
        var eeprom = REGISTER_FSDO_DWELL;
        var offset = 1;
        var $range = $("#FSDOid");
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "OFF"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#FSDOid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    fsdo2: function () {
        var eeprom = REGISTER_FSDO_DWELL;
        var offset = 1;
        var $range = $("#FSDOid2");
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "OFF"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#FSDOid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwellRampThreshold: function () {
        var eeprom = REGISTER_DWELL_RAMP_THRESHOLD;
        var offset = 0;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRampThresholdid");
        var $input = $("#DwellRampThresholdInputid");
        $input.val(init);
        var min = 1;
        var max = 30;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        type: 'single',
                        from: init,
                        grid: true,
                        grid_snap: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampThresholdid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                           
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
                             var tmp = val + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampThresholdid2").data("ionRangeSlider").update({
                                from: val 
                            });
            });
        }
        //   alert('here2');
    },
    dwellRampThreshold2: function () {
        var eeprom = REGISTER_DWELL_RAMP_THRESHOLD;
        var offset = 0;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRampThresholdid2");
                var $input = $("#DwellRampThresholdInputid2");
        $input.val(init);
        var min = 1;
        var max = 30;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        type: 'single',
                        from: init,
                        grid: true,
                        grid_snap: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampThresholdid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                       // var tmp = data.from+offset;
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampThresholdid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    debounce: function () {
        var eeprom = REGISTER_DEBOUNCE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#Debounceid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "OFF"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwellRampRate: function () {
        var eeprom = REGISTER_DWELL_RAMP_RATE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRampRateid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "0.1", "0.2", "0.3", "0.4", "0.5"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampRateid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwellRampRate2: function () {
        var eeprom = REGISTER_DWELL_RAMP_RATE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRampRateid2");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "0.1", "0.2", "0.3", "0.4", "0.5"
                        ],
                        type: 'single',
                        from: init,
                        grid: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRampRateid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    mechDebounce: function () {
        var eeprom = REGISTER_MECH_DEBOUNCE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#MechDebounceid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    debounceMode: function () {
        var eeprom = REGISTER_DEBOUNCE_MODE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DebounceModeid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "SEQUENTIAL", "DELAY", "FINE-GRAIN"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    loaderDelay: function () {
        var eeprom = REGISTER_LOADER_DELAY;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#LoaderDelayid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "1.75", "2.0", "2.25",
                            "2.5", "2.75", "3.0", "3.25", "3.5", "3.75", "4.0", "4.25",
                            "4.5", "4.75", "5.0", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#LoaderDelayid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    loaderDelay2: function () {
        var eeprom = REGISTER_LOADER_DELAY;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#LoaderDelayid2");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "0.25", "0.5", "0.75", "1.0", "1.25", "1.5", "1.75", "2.0", "2.25",
                            "2.5", "2.75", "3.0", "3.25", "3.5", "3.75", "4.0", "4.25",
                            "4.5", "4.75", "5.0", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#LoaderDelayid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    boardMode: function () {
        var eeprom = REGISTER_BOARD_MODE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        if ($('#boardListSelect').val() == 'universal') {
            initOpenClosed(init + offset);
        }
        var $range = $("#BoardModeid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "Open Bolt", "Closed Bolt"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            //   alert(data.from);
                            if ($('#boardListSelect').val() == 'universal') {
                                initOpenClosed(data.from + offset);
                            }

                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#BoardModeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    boardMode2: function () {
        var eeprom = REGISTER_BOARD_MODE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        //   alert(init);
        if ($('#boardListSelect').val() == 'universal') {
            initOpenClosed(init + offset);
        }
        var $range = $("#BoardModeid2");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "Open Bolt", "Closed Bolt"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            //  alert(tmp);
                            if ($('#boardListSelect').val() == 'universal') {
                                initOpenClosed(data.from + offset);
                            }
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            //    alert('set');
                            $("#BoardModeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    searOnTime: function () {
        //dual int/frac eeprom
        var eeprom = REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC;
        var off = 20;
        var init = 0.0;
        var $range = $("#SearOnTimeid");
        var $input = $("#SearOnTimeInputid");
        $input.val(init);
        var min = 0;
        var max = 19.9;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            


            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#SearOnTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#SearOnTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    openDelay: function () {
        //dual int/frac eeprom
        var eeprom = REGISTER_CLOSED_BOLT_OPEN_DELAY_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC;
        var off = 30;
        var init = 0.0;
        var $range = $("#OpenDelayid");
        var $input = $("#OpenDelayInputid");
        $input.val(init);
        var min = 0;
        var max = 29.9;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            


            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#OpenDelayid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#OpenDelayid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    pumpOnTime: function () {
        //dual int/frac eeprom
        var eeprom = REGISTER_CLOSED_BOLT_PUMP_ON_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_PUMP_ON_TIME_FRAC;
        var off = 50;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#PumpOnTimeid");
        var $input = $("#PumpOnTImeInputid");
        $input.val(init);
        var min = 0;
        var max = 49.9;

        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#PumpOnTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                      // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#PumpOnTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
//    openCycle: function () {
//        var eeprom = REGISTER_CLOSED_BOLT_OPEN_CYCLE_INT_DELAY;
//        var eepromfrac = REGISTER_CLOSED_BOLT_OPEN_CYCLE_FRAC_DELAY;
//        var off = 30;
//        var init = 0.0;
//        if(steroids.data.storage.property("e"+eepromfrac).get()=="10"){
//         init =    parseFloat(steroids.data.storage.property("e"+eeprom).get());
//        }else{
//        init = parseFloat(steroids.data.storage.property("e"+eeprom).get()+"."+steroids.data.storage.property("e"+eepromfrac).get());
//        }
//        if (init>=off){
//            init=0.0;
//        }
//        var $range = $("#OpenCycleid");
//        
//
//
//        $range.ionRangeSlider(
//                {
//                    min: 0,
//                    max: 29.9,
//                    step: 0.1,
//                    type: 'single',
//                    from:init,
//                    grid: true,
//                    postfix:'ms',
//                    onStart: function (data) {
//                        console.log("onStart");
//                    },
//                    onChange: function (data) {
//                        console.log("onChange");
//                    },
//                    onFinish: function (data) {
//                         // var tmp = data.from+offset;
//                        var values = splitDual(data.from);
//                        //override 0 as OFF
//                        if(values[0]==0){
//                        app.write('e', parseInt(eeprom), off);
//                        steroids.data.storage.property("e"+eeprom).set(off);
//                        }else{
//                        app.write('e', parseInt(eeprom), values[0]);
//                        steroids.data.storage.property("e"+eeprom).set(values[0]);
//                        }
//                        app.write('e', parseInt(eeprom) + 1, values[1]);
//                        steroids.data.storage.property("e"+eepromfrac).set(values[1]);
//                        $("#OpenCycleid2").data("ionRangeSlider").update({
//                            from:data.from
//                        });
//                    },
//                    onUpdate: function (data) {
//                        console.log("onUpdate");
//                    }
//                }
//        );
//        //   alert('here2');
//    },
//    ballInPlace: function () {
//        var eeprom = REGISTER_CLOSED_BOLT_BALL_IN_PLACE_INT_DELAY;
//        var eepromfrac = REGISTER_CLOSED_BOLT_BALL_IN_PLACE_FRAC_DELAY;
//        var off = 30;
//        var init = 0.0;
//        if(steroids.data.storage.property("e"+eepromfrac).get()=="10"){
//         init =    parseFloat(steroids.data.storage.property("e"+eeprom).get());
//        }else{
//        init = parseFloat(steroids.data.storage.property("e"+eeprom).get()+"."+steroids.data.storage.property("e"+eepromfrac).get());
//        }
//        if (init>=off){
//            init=0.0;
//        }
//        var $range = $("#BallInPlaceid");
//
//
//        $range.ionRangeSlider(
//                {
//                    min: 0,
//                    max: 29.9,
//                    step: 0.1,
//                    type: 'single',
//                    from:init,
//                    grid: true,
//                    postfix:'ms',
//                    onStart: function (data) {
//                        console.log("onStart");
//                    },
//                    onChange: function (data) {
//                        console.log("onChange");
//                    },
//                    onFinish: function (data) {
//                         // var tmp = data.from+offset;
//                        var values = splitDual(data.from);
//                        //override 0 as OFF
//                        if(values[0]==0){
//                        app.write('e', parseInt(eeprom), off);
//                        steroids.data.storage.property("e"+eeprom).set(off);
//                        }else{
//                        app.write('e', parseInt(eeprom), values[0]);
//                        steroids.data.storage.property("e"+eeprom).set(values[0]);
//                        }
//                        app.write('e', parseInt(eeprom) + 1, values[1]);
//                        steroids.data.storage.property("e"+eepromfrac).set(values[1]);
//                        $("#BallInPlaceid2").data("ionRangeSlider").update({
//                            from:data.from
//                        });
//                    },
//                    onUpdate: function (data) {
//                        console.log("onUpdate");
//                    }
//                }
//        );
//        //   alert('here2');
//    },
    closeTime: function () {
        var eeprom = REGISTER_CLOSED_BOLT_CLOSE_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC;
        var off = 30;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#CloseTimeid");
        var $input = $("#CloseTimeInputid");
        $input.val(init);
        var min = 0;
        var max = 29.9;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        from: init,
                        grid: true,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#CloseTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#CloseTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    watchTime: function () {
        var eeprom = REGISTER_CLOSED_BOLT_WATCH_TIME;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#WatchTimeid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "50", "100", "150", "200", "250",
                            "300", "350", "400", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        grid_num: 1,
                        postfix: "ms",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#WatchTimeid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    searOnTime2: function () {
        var eeprom = REGISTER_CLOSED_BOLT_SEAR_ON_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_SEAR_ON_TIME_FRAC;
        var off = 20;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#SearOnTimeid2");
        var $input = $("#SearOnTimeInputid2");
        $input.val(init);
        var min = 0;
        var max = 19.9;

        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#SearOnTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                        // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#SearOnTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    openDelay2: function () {
        var eeprom = REGISTER_CLOSED_BOLT_OPEN_DELAY_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_OPEN_DELAY_FRAC;
        var off = 30;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#OpenDelayid2");
        var $input = $("#OpenDelayInputid2");
        $input.val(init);
        var min = 0;
        var max = 29.9;

        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#OpenDelayid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                       // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#OpenDelayid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
//    openCycle2: function () {
//        var eeprom = REGISTER_CLOSED_BOLT_OPEN_CYCLE_INT_DELAY;
//        var eepromfrac = REGISTER_CLOSED_BOLT_OPEN_CYCLE_FRAC_DELAY;
//        var off = 30;
//        var init = 0.0;
//        if(steroids.data.storage.property("e"+eepromfrac).get()=="10"){
//         init =    parseFloat(steroids.data.storage.property("e"+eeprom).get());
//        }else{
//        init = parseFloat(steroids.data.storage.property("e"+eeprom).get()+"."+steroids.data.storage.property("e"+eepromfrac).get());
//        }
//        if (init>=off){
//            init=0.0;
//        }
//        var $range = $("#OpenCycleid2");
//        
//
//        $range.ionRangeSlider(
//                {
//                    min: 0,
//                    max: 29.9,
//                    step: 0.1,
//                    type: 'single',
//                    from:init,
//                    grid: true,
//                    postfix:'ms',
//                    onStart: function (data) {
//                        console.log("onStart");
//                    },
//                    onChange: function (data) {
//                        console.log("onChange");
//                    },
//                    onFinish: function (data) {
//                         // var tmp = data.from+offset;
//                        var values = splitDual(data.from);
//                        //override 0 as OFF
//                        if(values[0]==0){
//                        app.write('e', parseInt(eeprom), off);
//                        steroids.data.storage.property("e"+eeprom).set(off);
//                        }else{
//                        app.write('e', parseInt(eeprom), values[0]);
//                        steroids.data.storage.property("e"+eeprom).set(values[0]);
//                        }
//                        app.write('e', parseInt(eeprom) + 1, values[1]);
//                        steroids.data.storage.property("e"+eepromfrac).set(values[1]);
//                        $("#OpenCycleid").data("ionRangeSlider").update({
//                            from:data.from
//                        });
//                    },
//                    onUpdate: function (data) {
//                        console.log("onUpdate");
//                    }
//                }
//        );
//        //   alert('here2');
//    },
//    ballInPlace2: function () {
//        var eeprom = REGISTER_CLOSED_BOLT_BALL_IN_PLACE_INT_DELAY;
//        var eepromfrac = REGISTER_CLOSED_BOLT_BALL_IN_PLACE_FRAC_DELAY;
//        var off = 30;
//        var init = 0.0;
//        if(steroids.data.storage.property("e"+eepromfrac).get()=="10"){
//         init =    parseFloat(steroids.data.storage.property("e"+eeprom).get());
//        }else{
//        init = parseFloat(steroids.data.storage.property("e"+eeprom).get()+"."+steroids.data.storage.property("e"+eepromfrac).get());
//        }
//        if (init>=off){
//            init=0.0;
//        }
//        var $range = $("#BallInPlaceid2");
//
//
//        $range.ionRangeSlider(
//                {
//                    min: 0,
//                    max: 29.9,
//                    step: 0.1,
//                    type: 'single',
//                    from:init,
//                    grid: true,
//                    postfix:'ms',
//                    onStart: function (data) {
//                        console.log("onStart");
//                    },
//                    onChange: function (data) {
//                        console.log("onChange");
//                    },
//                    onFinish: function (data) {
//                         // var tmp = data.from+offset;
//                        var values = splitDual(data.from);
//                        //override 0 as OFF
//                        if(values[0]==0){
//                        app.write('e', parseInt(eeprom), off);
//                        steroids.data.storage.property("e"+eeprom).set(off);
//                        }else{
//                        app.write('e', parseInt(eeprom), values[0]);
//                        steroids.data.storage.property("e"+eeprom).set(values[0]);
//                        }
//                        app.write('e', parseInt(eeprom) + 1, values[1]);
//                        steroids.data.storage.property("e"+eepromfrac).set(values[1]);
//                        $("#BallInPlaceid").data("ionRangeSlider").update({
//                            from:data.from
//                        });
//                    },
//                    onUpdate: function (data) {
//                        console.log("onUpdate");
//                    }
//                }
//        );
//        //   alert('here2');
//    },
    pumpOnTime2: function () {
        var eeprom = REGISTER_CLOSED_BOLT_PUMP_ON_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_PUMP_ON_TIME_FRAC;
        var off = 50;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#PumpOnTimeid2");
        var $input = $("#PumpOnTimeInputid");
        $input.val(init);
        var min = 0;
        var max = 49.9;

        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        grid: true,
                        from: init,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#PumpOnTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                                                      // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#PumpOnTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    closeTime2: function () {
        var eeprom = REGISTER_CLOSED_BOLT_CLOSE_TIME_INT;
        var eepromfrac = REGISTER_CLOSED_BOLT_CLOSE_TIME_FRAC;
        var off = 30;
        var init = 0.0;
        if (steroids.data.storage.property("e" + eepromfrac).get() == "10") {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get());
        } else {
            init = parseFloat(steroids.data.storage.property("e" + eeprom).get() + "." + steroids.data.storage.property("e" + eepromfrac).get());
        }
        if (init >= off) {
            init = 0.0;
        }
        var $range = $("#CloseTimeid2");
        var $input = $("#CloseTimeInputid2");
        $input.val(init);
        var min = 0;
        var max = 29.9;
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {

            $range.ionRangeSlider(
                    {
                        min: min,
                        max: max,
                        step: 0.1,
                        type: 'single',
                        from: init,
                        grid: true,
                        postfix: 'ms',
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#CloseTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        },
                        onUpdate: function (data) {
                            // var tmp = data.from+offset;
                            var values = splitDual(data.from);
                            //override 0 as OFF
                            if (values[0] == 0) {
                                app.write('e', parseInt(eeprom), off);
                                steroids.data.storage.property("e" + eeprom).set(off);
                            } else {
                                app.write('e', parseInt(eeprom), values[0]);
                                steroids.data.storage.property("e" + eeprom).set(values[0]);
                            }
                            app.write('e', parseInt(eeprom) + 1, values[1]);
                            steroids.data.storage.property("e" + eepromfrac).set(values[1]);
                            $("#CloseTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                            $input.val(data.from);
                        }
                    }
            );
    //text box below slider
            $input.on("change", function () {
                 var val = $input.val();
    
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }

            $range.data("ionRangeSlider").update({
                                from: val
                            });
            });
        }
        //   alert('here2');
    },
    watchTime2: function () {
        var eeprom = REGISTER_CLOSED_BOLT_WATCH_TIME;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#WatchTimeid2");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "50", "100", "150", "200", "250", "300", "350", "400", "OFF"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        grid_num: 1,
                        postfix: "ms",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#WatchTimeid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    gameTimerMinutes: function () {
        var eeprom = REGISTER_GAMETIMER_MINUTES;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#GameTimerMinutesid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "15"
                                    , "20", "25", "30", "35", "40", "45", "50", "55", "60"
                        ],
                        type: 'single',
                        grid: true,
                        grid_num: 1,
                        from: init,
                        postfix: "m",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    gameTimerSeconds: function () {
        var eeprom = REGISTER_GAMETIMER_SECONDS;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#GameTimerSecondsid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "0", "10", "20", "30", "40", "50"
                        ],
                        type: 'single',
                        grid: true,
                        grid_num: 1,
                        from: init,
                        postfix: "s",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    powerSave: function () {
        var eeprom = REGISTER_POWER_SAVE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#PowerSaveid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        grid_num: 1,
                        postfix: "m",
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    contrast: function () {
        var eeprom = REGISTER_CONTRAST;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#Contrastid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "Min", "10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90", "Max"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        grid_num: 1,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    rofOnOff: function () {
        var eeprom = REGISTER_ROF_ONOFF;
        var offset = 1;
        //   alert("e"+eeprom+":"+steroids.data.storage.property("e"+eeprom).get());
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#ROFonOffid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    reactiveOnOff: function () {
        var eeprom = REGISTER_REACTIVE;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#ReactiveonOffid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwellRampOnOff: function () {
        var eeprom = REGISTER_DWELL_RAMP;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRamponOffid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRamponOffid2").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    dwellRampOnOff2: function () {
        var eeprom = REGISTER_DWELL_RAMP;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#DwellRamponOffid2");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                            $("#DwellRamponOffid").data("ionRangeSlider").update({
                                from: data.from
                            });
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    gameTimerOnOff: function () {
        var eeprom = REGISTER_GAMETIMER_ONOFF;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#GameTimeronOffid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    tuningOnOff: function () {
        var eeprom = REGISTER_TUNING;
        var offset = 1;
        var init = parseFloat(steroids.data.storage.property("e" + eeprom).get()) - offset;
        var $range = $("#TuningonOffid");
        if ($range.data("ionRangeSlider")) {
            $range.data("ionRangeSlider").update({
                from: init
            });
        } else {
            $range.ionRangeSlider(
                    {
                        values: [
                            "OFF", "ON"
                        ],
                        type: 'single',
                        grid: true,
                        from: init,
                        force_edges: true,
                        onStart: function (data) {
                            console.log("onStart");
                        },
                        onChange: function (data) {
                            console.log("onChange");
                        },
                        onFinish: function (data) {
                            var tmp = data.from + offset;
                            app.write('e', parseInt(eeprom), tmp);
                            steroids.data.storage.property("e" + eeprom).set(tmp);
                        },
                        onUpdate: function (data) {
                            console.log("onUpdate");
                        }
                    }
            );
        }
        //   alert('here2');
    },
    profileSave: function () {
        //  var eeprom = 31;
        var offset = 0;
        var $range = $("#ProfileSaveid");

        $range.ionRangeSlider(
                {
                    min: 1,
                    max: 5,
                    step: 1,
                    type: 'single',
                    grid: true,
                    onStart: function (data) {
                        console.log("onStart");
                    },
                    onChange: function (data) {
                        console.log("onChange");
                    },
                    onFinish: function (data) {
//                        alert('save 1');
//                        var tmp = data.from + offset;
//                        app.write('p', 1, tmp);
//                        alert('saving profile :'+tmp);
                    },
                    onUpdate: function (data) {
                        console.log("onUpdate");
                    }
                }
        );
        //   alert('here2');
    },
    profileLoad: function () {
        //  var eeprom = 31;
        var offset = 0;
        var $range = $("#ProfileLoadid");
        $range.ionRangeSlider(
                {
                    min: 1,
                    max: 5,
                    step: 1,
                    type: 'single',
                    grid: true,
                    onStart: function (data) {
                        console.log("onStart");
                    },
                    onChange: function (data) {
                        console.log("onChange");
                    },
                    onFinish: function (data) {
//                        var tmp = data.from + offset;
//                        app.write('p', 0, tmp);
//                        alert('loading profile :'+tmp);
                    },
                    onUpdate: function (data) {
                        console.log("onUpdate");
                    }
                }
        );
        //   alert('here2');
    }


};