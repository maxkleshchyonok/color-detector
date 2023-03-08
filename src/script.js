let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hexValRef = document.getElementById("hex-val-ref");
let rgbValRef = document.getElementById("rgb-val-ref");
let customAlert = document.getElementById("custom-alert");
let pickedColorRef = document.getElementById("picked-color-ref");
let eyeDropper;

const rgbObject = {
    black: [0, 0, 0],
    white: [255, 255, 255],
    red: [255, 0, 0],
    green: [0,128,0],
    blue: [0,0,255],
    yellow: [255, 255, 0],
    aqua: [0, 255, 255],
    purple: [128,0,128],
    gray: [128, 128, 128],
    orange: [255,165,0],
    brown: [165,42,42],
}

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




            // if(rgbArr[0] > 200 && rgbArr[1] < 10 && rgbArr[2] < 10) {
            //     audio.src = './assets/audio/red.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] <10 && rgbArr[1] > 200 && rgbArr[2] < 10) {
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 10 && rgbArr[1] < 10 && rgbArr[2] > 200) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            //
            // if (rgbArr[0] > 100 && rgbArr[1] < 10 && rgbArr[2] < 10 && rgbArr[0] < 200) {
            //         //let audio = new Audio();
            //         //audio.preload = 'auto';
            //         audio.src = './assets/audio/red.mp3';
            //         audio.play();
            // }
            // if (rgbArr[0] > 200 && rgbArr[1] < 80 && rgbArr[2] < 50) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/red.mp3';
            //     audio.play();
            // }
            // if (rgbArr[0] < 5 && rgbArr[1] > 100 && rgbArr[2] < 5) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // if (rgbArr[0] < 60 && rgbArr[1] > 100 && rgbArr[2] < 80) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // if (rgbArr[0] < 40 && rgbArr[1] < 40 && rgbArr[2] < 40) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // if (rgbArr[0] < 100 && rgbArr[1] < 100 && rgbArr[2] < 100) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // if (rgbArr[0] > 100 && rgbArr[0] < 175 && rgbArr[1] > 100 && rgbArr[2] < 160) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/green.mp3';
            //     audio.play();
            // }
            // // if (rgbArr[0] > 30 && rgbArr[0] < 170 && rgbArr[1] > 30 && rgbArr[2] < 60) {
            // //     //let audio = new Audio();
            // //     //audio.preload = 'auto';
            // //     audio.src = './assets/audio/red.mp3';
            // //     audio.play();
            // // }
            // if (rgbArr[0] > 130 && rgbArr[1] < 100 && rgbArr[2] < 80) {
            //     //let audio = new Audio();
            //     //audio.preload = 'auto';
            //     audio.src = './assets/audio/red.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 30 && rgbArr[1] < 30 && rgbArr[2] > 100 && rgbArr[2] < 150) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 70 && rgbArr[1] > 120 && rgbArr[2] > 150) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 170 && rgbArr[1] > 190 && rgbArr[2] > 210) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 70 && rgbArr[1] < 70 && rgbArr[2] > 200) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] < 70 && rgbArr[1] < 100 && rgbArr[2] > 110) {
            //     audio.src = './assets/audio/blue.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] > 180 && rgbArr[1] > 130 && rgbArr[2] < 40) {
            //     audio.src = './assets/audio/yellow.mp3';
            //     audio.play();
            // }
            // if(rgbArr[0] > 220 && rgbArr[1] > 200 && rgbArr[2] < 80) {
            //     audio.src = './assets/audio/yellow.mp3';
            //     audio.play();
            // }


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


let copy = (textId) => {
    document.getElementById(textId).select();
    document.execCommand("copy");
    customAlert.style.transform = "scale(1)";
    setTimeout(() => {
        customAlert.style.transform = "scale(0)";
    }, 2000);
};
