// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;
var camId = 0;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");
    cameraFlip = document.querySelector("#camera--flip");

// Access the device camera and stream to cameraView
function cameraStart(camId) {
    console.log(camId);
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[camId];
        console.log(stream.getTracks());
            cameraView.srcObject = stream;
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
    if (camId == 0){
        camId = 1;   
    }else{
        camId 0;
    }
    cameraStart(camId);
    
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart(camId), false);
