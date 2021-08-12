// Set constraints for the video stream
var constraints = { video: { facingMode: "user"}, audio: false };
var track = null;
var camId = 0;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
    cameraFlip = document.querySelector("#camera--flip");


// Access the device camera and stream to cameraView
function cameraStart() {
    track = null;
        if (camId == 0){
        constraints = { video: { facingMode: "user" }, audio: false };
            alert (camId);
        camId = 1;
            
    }else{
        constraints = { video: { facingMode: "environment" }, audio: false };
        alert (camId);
        camId = 0;
    }
    
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[camId];
        console.log(stream.getTracks()[0]);
            cameraView.srcObject = stream;
        
        cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Flip the camera when cameraFlip is tapped
cameraFlip.onclick = function() {
    //track = null;

    //constraints = { video: { facingMode: "user" }, audio: false };
    cameraStart();
    
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart(), false);
