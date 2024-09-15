const calcExtraButtons = ["+", "-", "/", "*"]
const calcExtraRow = [".", 0, "="]

const gridSquareSize = 64

const inputBoxId = "calc-input-box"
const inputBox = document.getElementById(inputBoxId);

function handleEqual() {

    let result = eval(inputBox.value);
    console.log(inputBox.value);
    inputBox.value = result

}
function handleVirtKeypadInput(e) {
    elementInfo = e.target.innerText
    console.log(elementInfo)
    if (elementInfo == "=") {
        handleEqual()
    } else {
        inputBox.value += elementInfo
    }

}

function generateGrid() {
    let calcNumsToPrint = new Array() // wont contain 0 as that is in extraRow
    for (let i = 9; i > 0; i--) {
        calcNumsToPrint.push(i)
    }
    __generateGrid("calc-buttons-nums", calcNumsToPrint)
    __generateGrid("calc-buttons-nums", calcExtraRow)
    __generateGrid("calc-buttons-ops", calcExtraButtons)


}

function __generateGrid(containerId, elements) {
    gridElem = document.createElement('div')
    gridElem.className = "calc-button-elem";
    gridElem.style.height = gridSquareSize + 'px'
    gridElem.style.width = gridSquareSize + 'px'
    container = document.getElementById(containerId)
    function appendElem(i) {
        let toAppendElem = gridElem.cloneNode()
        toAppendElem.textContent = i
        toAppendElem.onclick = (e) => handleVirtKeypadInput(e)

        container.appendChild(toAppendElem)
    }
    // for (let i = 9; i > 0; i--) {
    //     appendElem(i)
    // }
    elements.forEach(appendElem)
}

function generateHandleAC() {
    calcAcButton = document.querySelector("#calc-ac")
    calcAcButton.onclick = (e) => {
        calcInputBox.value = ''
    }
}

function sanitizeInput(input) {
    test = Array.from(input).filter((i) => {
        if ((i >= '0' && i <= '9') || ['+', '-', '/', '*'].includes(i)) {
            return true
        } else {
            return false
        }
    }).join("")
    console.log(test)
    return test
}

function generateSanitizeTextInp() {
    calcInputBox.oninput = (e) => {
        e.target.value = sanitizeInput(e.target.value);
    }
}
calcInputBox = document.querySelector('#calc-input-box')

generateGrid()
generateHandleAC()
generateSanitizeTextInp()