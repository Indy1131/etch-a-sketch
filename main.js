const grid = document.querySelector(".grid");
const gridRadius = 5;

const clearButton = document.querySelector("#clearButton");
const resizeButton = document.querySelector("#resizeButton");

const resizeMenu = document.querySelector("#resizeMenu");

const form = document.querySelector("form");
const input = document.querySelector("input");

let currentN = 0;

let painted = [];

let mouseDown = false;

let resizing = false;
let locked = false

document.addEventListener("mousedown", (e) => {
    mouseDown = true;
});

document.addEventListener("mouseup", (e) => {
    mouseDown = false;
});

clearButton.addEventListener("click", (e) => {
    painted.forEach((element) => {
        element.style.backgroundColor = "white";
    })
    painted = [];
});

function toggleResizeMenu(e) {
    if (resizing) {
        resizeMenu.style.marginTop = "600px";
    } else {
        resizeMenu.style.marginTop = "0px";
    }

    resizing = !resizing
}

resizeButton.addEventListener("click", () => {
    if (locked) {
        return
    }
    
    toggleResizeMenu();
});

input.addEventListener("focus", (e) => {
    if (isNaN(input.value)) {
        input.value = "";
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (isNaN(input.value) || input.value > 100) {
        return;
    }

    locked = true;
    resizing = true;
    populateSquares(input.value);
    toggleResizeMenu();
    locked = false;
})

function clearGrid() {
    for (element of grid.children) {
        element.remove();
    }
}

function populateSquares(n) {
    for (i = 1; i <= currentN * currentN; i++) {
        document.querySelector(`#s${i}`).remove();
    }

    currentN = n;
    const dim = 100 / n;

    for (i = 1; i <= n * n; i++) {
        const element = document.createElement("div");
        element.classList.add("square");
        element.style.cssText = `width: ${dim}%; height: ${dim}%`;
        element.setAttribute("id", "s" + i);

        element.addEventListener("mouseover", (e) => {
            if (mouseDown) {
                painted.push(element);
                element.style.backgroundColor = generateColor();
            }
        })

        element.addEventListener("mousedown", (e) => {
            painted.push(element);
            element.style.backgroundColor = generateColor();
        })

        grid.appendChild(element);
    }

    document.querySelector(`#s${1}`).style.cssText += `border-top-left-radius: ${gridRadius}px;`
    document.querySelector(`#s${n}`).style.cssText += `border-top-right-radius: ${gridRadius}px;`
    document.querySelector(`#s${n * n - n + 1}`).style.cssText += `border-bottom-left-radius: ${gridRadius}px;`
    document.querySelector(`#s${n * n}`).style.cssText += `border-top-right-radius: ${gridRadius}px;`

    input.value = n;
}

function generateColor() {
    return "rgb(" + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + ")"
}

console.log(generateColor());



populateSquares(16);