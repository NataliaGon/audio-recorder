var constraints = { audio: true };
        var btnRecord = document.getElementById('js-btn-record-ask');
        var btnRec = document.getElementById('js-btn-record');
        var btnStop = document.getElementById('js-btn-stop');
        var playerTools = document.getElementById('player-tools');
        var aud = document.getElementById('js-audio');
        var audio = [];
        var chunks = [];
        btnRecord.addEventListener('click', function(){
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (stream) {

                    const mediaRecorder = new MediaRecorder(stream);

                    btnRec.onclick = function () {
                        mediaRecorder.start();
                        btnRec.style.background = "red";
                        btnRec.style.color = "black";
                    
                    }
                    btnStop.onclick = function () {
                        mediaRecorder.stop();
                        btnRec.style.background = "";
                        btnRec.style.color = "";
                    }
                    mediaRecorder.ondataavailable = function (e) {
                        chunks.push(e.data);
                    }
                    mediaRecorder.onstop = function (e) {
                        var blob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                        chunks = [];
                        var audioURL = window.URL.createObjectURL(blob);
                        aud.src = audioURL;
                    }
                })
                .catch(function (err) {
                    console.log(err.name + ": " + err.message);
                }); 

        });  