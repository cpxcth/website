const pgpButton = document.querySelector("#pgp-key");
let readyToCopy = false;
let resetTimer;

function resetButton() {
    pgpButton.textContent = "PGP Key";
}

// Copy my PGP key

async function copyKey() {
    try {
        const response = await fetch("public-key.asc");

        if (response.ok) {
            const key = await response.text();
            await navigator.clipboard.writeText(key);
            pgpButton.textContent = "Copied!";
        } else {
            pgpButton.textContent = "Copy failed";
        }
    } catch { // AI told me to do this
        pgpButton.textContent = "Copy failed";
    }

    setTimeout(resetButton, 2000);
}


// Double click to copy

function handleClick() {
    if (readyToCopy === false) {
        readyToCopy = true;
        pgpButton.textContent = "Copy?";
        resetTimer = setTimeout(function () {
            readyToCopy = false;
            resetButton();
        }, 3000);
        return;
    }

    clearTimeout(resetTimer);
    readyToCopy = false;
    copyKey();
}

pgpButton.addEventListener("click", handleClick);