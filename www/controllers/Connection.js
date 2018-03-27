(function() {
  'use strict';
  angular.module('enochAppApp').controller('ConnectionCtrl', function($scope, $timeout) {
    (function() {})();
    $scope.rofOnOffToggle = {};
    $scope.rofOnOffToggle.value = '';
    $scope.reactiveOnOffToggle = {};
    $scope.reactiveOnOffToggle.value = '';
    $scope.dwellRampOnOff = {};
    $scope.dwellRampOnOff.value = '';
    $scope.GameTimerOnOffContainer = {};
    $scope.GameTimerOnOffContainer.value = '';
    $scope.SaveProfileButtonTap = function() {
      return saveProfile();
    };
    $scope.LoadProfileButtonTap = function() {
      return loadProfile();
    };
    $scope.fireTap = function() {
      return showConfigPage('FireSettings');
    };
    $scope.eyeTap = function() {
      return showConfigPage('EyeSettings');
    };
    $scope.markerTap = function() {
      return showConfigPage('MarkerSettings');
    };
    $scope.timersTap = function() {
      return showConfigPage('Timers');
    };
    $scope.profileTap = function() {
      return showConfigPage('Profiles');
    };
    $scope.connectTap = function() {
      return showDiv('connect');
    };
    $scope.configTap = function() {
      return showDiv('config');
    };
    $scope.tuningTap = function() {
      return showDiv('tuning');
    };
    $scope.boardChange = function() {
      return boardTypeChange();
    };
    $scope.splashChange = function() {
      return splashListChange();
    };
    $scope.bleChange = function() {
      return bleChange();
    };
    $scope.buttonsTap = function() {
      return showDiv('buttons');
    };
    $scope.aboutTap = function() {
      return showDiv('about');
    };
    $scope.blelInitTap = function() {
      return app.bindEvents();
    };
    $scope.refreshButtonTap = function() {
      return app.refreshDeviceList();
    };
    $scope.deviceListTap = function() {};
    $scope.disconnectButtonTap = function() {
      return app.disconnect();
    };
    $scope.exitButtonTap = function() {
      return exit();
    };
    $scope.testButtonTap = function() {
      return loadTestData();
    };
    $scope.cbShotLoader = function() {
      return loadCBTestData();
    };
    $scope.obShotLoader = function() {
      return loadOBTestData();
    };
    $scope.shotLoader = function() {
      return loadShot();
    };
    $scope.upButtonTap = function() {
      return app.write('b', 'u', 255);
    };
    $scope.selectButtonTap = function() {
      return app.write('b', 's', 255);
    };
    $scope.downButtonTap = function() {
      return app.write('b', 'd', 255);
    };
    $scope.getDataTap = function() {
      return getData();
    };
    $scope.checkbox2 = {};
    $scope.checkbox2.value = '';
    $scope.helpButtonTap = function() {
      var webView;
      webView = new steroids.views.WebView("https://www.enochpaintball.com");
      return steroids.layers.push({
        view: webView
      });
    };
    $scope.LicenseButtonTap = function() {
      var webView;
      webView = new steroids.views.WebView("http://www.gnu.org/licenses/gpl-3.0.en.html");
      return steroids.layers.push({
        view: webView
      });
    };
    $scope.ResetButtonTap = function() {
      return showDiv('reset');
    };
    $scope.resetButtonFinalTap = function() {
      return resetBoard($scope.checkbox2.value);
    };
    $scope.boards = {
      "angel_led": "Angel LED",
      "angel_lcd": "Angel LCD-G7fly",
      "angel_a1": "Angel A1",
      "angel_dual": "Angel Dual",
      "angel_mq": "Angel MQ",
      "eblade_micro": "EBlade Micro",
      "eblade_opt": "EBlade Micro",
      "b2k": "ICD B2k",
      "lite": "Lite"
    };
    $scope.splash = {
      1: "ENOCH",
      2: "DIRTY",
      3: "COBRA",
      4: "WARPED",
      5: "JOY",
      6: "IMPACT",
      7: "RIPPER",
      8: "AA",
      9: "ANGEL",
      10: "FLY",
      11: "WINGS",
      12: "FORCE",
      13: "ECA",
      14: "MW",
      15: "METHOD",
      16: "APP",
      17: "RAGE",
      18: "DEVIOUS",
      19: "CUSTOM",
      20: "NONE"
    };
    $scope.bles = {
      "bt05a": "BT05-A",
      "enochpb": "Enoch PB",
      "zeroBeacon": "Zero Beacon"
    };
    return (function() {
      steroids.view.navigationBar.show('Enoch Paintball');
      resetStorage();
      return createNavButtons();
    })();
  });

}).call(this);
