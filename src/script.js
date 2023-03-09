let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hexValRef = document.getElementById("hex-val-ref");
let rgbValRef = document.getElementById("rgb-val-ref");
let customAlert = document.getElementById("custom-alert");
let pickedColorRef = document.getElementById("picked-color-ref");
let liveButton = document.getElementById('live');
let eyeDropper;


window.onload = () => {
    if ("EyeDropper" in window) {
        pickColor.classList.remove("hide");
        eyeDropper = new EyeDropper();
    } else {
        error.classList.remove("hide");
        error.innerText = "Your browser doesn't support Eyedropper API";
        pickColor.classList.add("hide");
        return false;
    }
};


const colorSelector = async () => {
    const color = await eyeDropper
        .open()
        .then((colorValue) => {
            error.classList.add("hide");
            let hexValue = colorValue.sRGBHex;
            let rgbArr = [];
            for (let i = 1; i < hexValue.length; i += 2) {
                rgbArr.push(parseInt(hexValue[i] + hexValue[i + 1], 16));
                //console.log(rgbArr);
            }
            console.log(rgbArr);
            let rgbValue = "rgb(" + rgbArr + ")";
            console.log(hexValue, rgbValue);
            result.style.display = "grid";
            hexValRef.value = hexValue;
            rgbValRef.value = rgbValue;
            pickedColorRef.style.backgroundColor = hexValue;

            let r = rgbArr[0];
            let g = rgbArr[1];
            let b = rgbArr[2];
            let hsl;


            const RGBToHSL = () => {
                r /= 255;
                g /= 255;
                b /= 255;
                const l = Math.max(r, g, b);
                const s = l - Math.min(r, g, b);
                const h = s
                    ? l === r
                        ? (g - b) / s
                        : l === g
                            ? 2 + (b - r) / s
                            : 4 + (r - g) / s
                    : 0;

                hsl = [
                    60 * h < 0 ? 60 * h + 360 : 60 * h,
                    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
                    (100 * (2 * l - s)) / 2,
                ];
            };
            RGBToHSL();

            let audio = new Audio();
            audio.preload = 'auto';

            console.log(hsl);

            if (hsl[0] > 40 && hsl[0] < 70 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/yellow.mp3';
                audio.play();
            }
            if (hsl[0] > 70 && hsl[0] < 150 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/green.mp3';
                audio.play();
            }
            if (hsl[0] > 175 && hsl[0] < 240 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/blue.mp3';
                audio.play();
            }
            if (hsl[0] > 245 && hsl[0] < 290 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/purple.mp3';
                audio.play();
            }
            if (hsl[0] > 290 && hsl[0] < 330 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/pink.mp3';
                audio.play();
            }
            if (hsl[0] > 330 && hsl[0] < 360 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/red.mp3';
                audio.play();
            }
            if (hsl[0] > 0 && hsl[0] < 20 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/red.mp3';
                audio.play();
            }
            if (hsl[0] > 20 && hsl[0] < 40 && hsl[2] > 10 && hsl[2] < 90) {
                audio.src = './assets/audio/orange.mp3';
                audio.play();
            }
            if (hsl[2] > 90) {
                audio.src = './assets/audio/white.mp3';
                audio.play();
            }
            if (hsl[2] < 10) {
                audio.src = './assets/audio/black.mp3';
                audio.play();
            }



        })
        .catch((err) => {
            error.classList.remove("hide");
            if (err.toString().includes("AbortError")) {
                error.innerText = "";
            } else {
                error.innerText = err;
            }
        });
};


pickColor.addEventListener("click", colorSelector);


fileInput.onchange = () => {
    result.style.display = "none";
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        image.setAttribute("src", reader.result);
    };
};

function startVideo() {
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

liveButton.addEventListener('click', () => {
    const video = document.createElement('video');
    video.className = 'video';
    image.remove();
    const container = document.querySelector('.image-container');
    container.append(video);
    video.id = 'video';
    video.autoplay = true;
    video.muted = true;
    startVideo();
});


let copy = (textId) => {
    document.getElementById(textId).select();
    document.execCommand("copy");
    customAlert.style.transform = "scale(1)";
    setTimeout(() => {
        customAlert.style.transform = "scale(0)";
    }, 2000);
};
