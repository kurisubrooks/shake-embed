var socket = io("http://shakeserv.kurisubrooks.com:1190");
var sound = new Audio("nhk.mp3");

$(document).ready(function() {
    socket.on("connect", function() {
        socket.emit("open", {
            version: "1.2"
        });
    });

    socket.on("disconnect", function() {
        console.error("Connection to Shake was dropped, attempting reconnect protocol..");
    });

    socket.on("auth", function(data) {
        if (data.ok) {
            console.info("Connected to Shake");
        } else {
            console.error("Connection to Shake was refused.");
        }
    });

    socket.on("data", function(data) {
        quake(data);
        console.log(data);
    });

    function quake(data) {
        data = JSON.parse(data);
        $("body").css("background", "#E44242");
        $("#epicenter").text(data.epicenter_en);
        $("#seismic").text("Seismic " + data.seismic_en);
        $("#magnitude").text("Magnitude " + data.magnitude);
        $("#depth").text("Depth " + data.depth);
        $("#previous").html("&nbsp;");
        sound.play();

        if (data.situation !== 0) {
            timeout(60000);
        }
    }

    function timeout(time) {
        setTimeout(function() {
            $("body").css("background", "#333333");
            $("#previous").text("Last Quake");
        }, time);
    }

    function time() {
        $("#time").text(moment().tz("Asia/Tokyo").format("YYYY/MM/DD, HH:mm:ss"));
    }

    setInterval(function() {
        time();
    }, 1000);

    time();
});
