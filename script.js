const div1 = document.querySelector(".div1");
const div2 = document.querySelector(".div2");
const val = document.querySelector(".press");
const key = document.querySelector(".key-code");

// Load the sound effect
const keySound = new Audio("keypress.mp3");

// Array to store key history
const keyHistory = [];
const maxHistory = 10; // Show last 10 keys

window.addEventListener("keydown", (event) => {
    event.preventDefault(); // Prevent default browser shortcuts
    div1.style.display = "none";
    div2.style.display = "block";
    key.style.display = "block";

    let pressedKey = event.key;
    let keyCode = event.keyCode;

    // Detect key combinations (Ctrl, Alt, Shift)
    let comboKeys = [];
    if (event.ctrlKey) comboKeys.push("Ctrl");
    if (event.altKey) comboKeys.push("Alt");
    if (event.shiftKey) comboKeys.push("Shift");

    // Ensure we only add the actual key when a modifier is pressed
    if (comboKeys.length > 0 && pressedKey !== "Control" && pressedKey !== "Shift" && pressedKey !== "Alt") {
        comboKeys.push(pressedKey);
    }

    let fullKeyCombination = comboKeys.join(" + ");

    // Display key and keyCode
    val.innerText = (comboKeys.length > 1) ? fullKeyCombination : pressedKey;
    key.innerText = keyCode;

    // Play sound
    keySound.currentTime = 0;
    keySound.play();

    // Store key history
    keyHistory.push(fullKeyCombination || pressedKey);
    if(comboKeys.length === 2){
        let a = keyHistory.pop();
        keyHistory.pop();
        keyHistory.push(a);
    }
    if (keyHistory.length > maxHistory) keyHistory.shift(); // Keep only last 10 keys
    console.log("Key History:", keyHistory);
});
