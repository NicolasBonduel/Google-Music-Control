var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pref = require('sdk/simple-prefs');
var { Hotkey } = require("sdk/hotkeys");



function resetHotKey() {

    if (typeof playHotKey != 'undefined') {
        playHotKey.destroy();
    }
    if (typeof prevHotKey != 'undefined') {
        prevHotKey.destroy();
    }
    if (typeof nextHotKey != 'undefined') {
        nextHotKey.destroy();
    }

	playHotKey = Hotkey({
	  combo: pref.prefs['play'],
	  onPress: function() {
		sendPause();
	  }
	});


	prevHotKey = Hotkey({
	  combo: pref.prefs['previous'],
	  onPress: function() {
		sendPrev();
	  }
	});

	nextHotKey = Hotkey({
	  combo: pref.prefs['next'],
	  onPress: function() {
		sendNext();
	  }
	});
}

resetHotKey();


pref.on("", resetHotKey);

function getGMusicTab(tabs) {
    if (tabs != null) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url.indexOf("play.google.com") != -1) {
                return tabs[i]
            }               
        }
        return null;
    }
}

function sendPause() {
    var tab = getGMusicTab(tabs);
    if (tab != null) {
        tab.attach({
            contentScript: getPauseScript()
        });
    }
}

function sendNext() {
    var tab = getGMusicTab(tabs);
    if (tab != null) {
        tab.attach({
            contentScript: getNextScript()
        });
    }
}

function sendPrev() {
    var tab = getGMusicTab(tabs);
    if (tab != null) {
        tab.attach({
            contentScript: getPrevScript()
        });
    }
}

function getPauseScript() {
    var script = function () {
		var buttons = document.getElementsByTagName('paper-icon-button');
		for (var i = 0; i < buttons.length; i++) {
			if(buttons[i].getAttribute("data-id") == "play-pause") {
				buttons[i].click();
				break;
			}
		}
    }
    return script.toSource() + "()";
}

function getPrevScript() {
    var script = function () {
		var buttons = document.getElementsByTagName('paper-icon-button');
		for (var i = 0; i < buttons.length; i++) {
			if(buttons[i].getAttribute("data-id") == "rewind") {
				buttons[i].click();
				break;
			}
		}
    }
    return script.toSource() + "()";
}

function getNextScript() {
    var script = function () {
		var buttons = document.getElementsByTagName('paper-icon-button');
		for (var i = 0; i < buttons.length; i++) {
			if(buttons[i].getAttribute("data-id") == "forward") {
				buttons[i].click();
				break;
			}
		}
    }
    return script.toSource() + "()";
}
