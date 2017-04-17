/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


 var items = ["one","two","three","four","five"];
 function hidePanel() {
    pgsidebar.hide(function(res){},function(err){
        window.alert("close error : " + err);
    });
}
function showPanel() {
    pgsidebar.show(function(res){
        if(res || res === 0) {
            resultTxt.innerText = items[res];
            hidePanel();
        }
    },
        function(err) {
            window.alert(err);
        },items);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        navigator.splashscreen.show();
        console.log('Received Device Ready Event');
        console.log('calling setup push');
btnShow.addEventListener("click",function(){
        showPanel();
    });
    
    btnHide.addEventListener("touchend",function(){
        hidePanel();
    });

    var url = "https://itunes.apple.com/search?entity=software&term=cordova&explicit=yes&limit=200";
    var reqListener = function(res) {
        window.alert("Loaded items: " + this.response.results.length);
        items = this.response.results.map(
            function(obj){
                return obj.trackName;
            });
    };
    
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", reqListener);

    xhr.open("GET",url);
    xhr.responseType = "json";
    xhr.send(null);


        setTimeout(function() {
            navigator.splashscreen.hide();
            app.setupPush();
        }, 2000);
        
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "322154966713"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);
alert(data.registrationId);
                         dataElement.html("helllo");
            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');


            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            
           
        });
             

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
