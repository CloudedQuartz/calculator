const calcExtraButtons = ["+", "-", "/", "*"]
const calcExtraRow = [".", 0, "="]

const gridSquareSize = 64


function generateGrid() {
    gridElem = document.createElement('div')
    gridElem.className = "calc-button-elem";
    gridElem.style.height = gridSquareSize + 'px'
    gridElem.style.width = gridSquareSize + 'px'
    container = document.getElementById("calc-buttons-nums")
    function appendElem(i) {
        let toAppendElem = gridElem.cloneNode()
        toAppendElem.textContent = i
        container.appendChild(toAppendElem)
    }
    for (let i = 9; i > 0; i--) {
        appendElem(i)
    }
    calcExtraRow.forEach(appendElem)
}
generateGrid()