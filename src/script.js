let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hslValRef = document.getElementById("hex-val-ref");
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


fileInput.onchange = () => {
    //result.style.display = "none";
    let reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = () => {
        //image.setAttribute("src", reader.result);
        img.setAttribute("src", reader.result);
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
    //image.remove();
    const container = document.querySelector('.wrapper');
    container.append(video);
    video.id = 'video';
    video.autoplay = true;
    video.muted = true;
    startVideo();

    setInterval(processFrames, 24);
    function processFrames() {
        ctx.drawImage(video, 0, 0, 300, 400);
    }

});


let copy = (textId) => {
    document.getElementById(textId).select();
    document.execCommand("copy");
    customAlert.style.transform = "scale(1)";
    setTimeout(() => {
        customAlert.style.transform = "scale(0)";
    }, 2000);
};



const img = new Image();
img.crossOrigin = "anonymous";
img.src = "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
img.addEventListener("load", () => {
    ctx.drawImage(img, 0, -70, 300, 400);
    img.style.display = "none";
});
const hoveredColor = document.getElementById("hovered-color");
const selectedColor = document.getElementById("selected-color");

function pick(event, destination) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    const pixel = ctx.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    destination.style.background = rgba;
    destination.textContent = rgba;

    rgbValRef.value = rgba;

    pickedColorRef.style.backgroundColor = rgba;


    let r = data[0];
    let g = data[1];
    let b = data[2];
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

    hslValRef.value = hsl;

    return rgba;
}

//canvas.addEventListener("mousemove", (event) => pick(event, hoveredColor));
//canvas.addEventListener("click", (event) => pick(event, selectedColor));

//canvas.addEventListener("touchmove", (event) => pick(event, hoveredColor));
canvas.addEventListener("pointerdown", (event) => pick(event, selectedColor));

