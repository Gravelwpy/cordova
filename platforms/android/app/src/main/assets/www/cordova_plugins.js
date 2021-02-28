cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-statusbar.statusbar",
      "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
      "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
      "pluginId": "phonegap-plugin-barcodescanner",
      "clobbers": [
        "cordova.plugins.barcodeScanner"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
      "pluginId": "cordova-plugin-geolocation",
      "runs": true
    },
    {
      "id": "cordova-plugin-baidumaplocation.baidumap_location",
      "file": "plugins/cordova-plugin-baidumaplocation/www/baidumap_location.js",
      "pluginId": "cordova-plugin-baidumaplocation",
      "clobbers": [
        "baidumap_location"
      ]
    },
    {
      "id": "com.pylonproducts.wifiwizard.WifiWizard",
      "file": "plugins/com.pylonproducts.wifiwizard/www/WifiWizard.js",
      "pluginId": "com.pylonproducts.wifiwizard",
      "clobbers": [
        "window.WifiWizard"
      ]
    },
    {
      "id": "es6-promise-plugin.Promise",
      "file": "plugins/es6-promise-plugin/www/promise.js",
      "pluginId": "es6-promise-plugin",
      "runs": true
    },
    {
      "id": "wifiwizard2.WifiWizard2",
      "file": "plugins/wifiwizard2/www/WifiWizard2.js",
      "pluginId": "wifiwizard2",
      "clobbers": [
        "window.WifiWizard2"
      ]
    },
    {
      "id": "cordova-plugin-hotspot.HotSpotPlugin",
      "file": "plugins/cordova-plugin-hotspot/www/HotSpotPlugin.js",
      "pluginId": "cordova-plugin-hotspot",
      "clobbers": [
        "cordova.plugins.hotspot"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-vibration": "3.1.0",
    "cordova-plugin-statusbar": "2.4.2",
    "phonegap-plugin-barcodescanner": "8.1.0",
    "cordova-plugin-camera": "4.0.3",
    "cordova-plugin-geolocation": "4.0.1",
    "cordova-plugin-baidumaplocation": "3.2.0",
    "com.pylonproducts.wifiwizard": "0.2.11",
    "es6-promise-plugin": "4.1.0",
    "wifiwizard2": "3.1.1",
    "cordova-plugin-hotspot": "1.2.10",
    "cordova-plugin-device": "2.0.3"
  };
});