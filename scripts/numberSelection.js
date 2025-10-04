import givingExplanation from "./givingExplanationFile.js";

const hanziCharacters = ['零', '一', '二',  '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万'];
let newHanziButton = 0;
const buttonContinueGame = document.getElementById("continuingGame");
const textField = document.getElementById("centralField__answer");
const numberField = document.getElementById("centralField__number");
const nameField = document.getElementById("centralField__name");
const explanationField =  document.getElementById("learningSection__explanation");

const leftColumn = document.getElementById("left-side");
const rightColumn = document.getElementById("right-side");

function erasingField() {
    textField.value= '';
}

function selectingHidingButtons(newHanziButton) {
    for (let i_hide = 0; i_hide <= newHanziButton; i_hide++) {
        // console.log(document.getElementById(`hanzi-${i_hide}`));
        // console.log(document.getElementById(`hanzi-${i_hide}`).style.display);
        document.getElementById(`hanzi-${i_hide}`).style.display = '';
    }
}

function selectingHidingPowersOfTen(numberLimit, id) {
    if (Number(numberField.innerText) >= numberLimit) {
        console.log('100 now');
        document.getElementById(`hanzi-${id}`).style.display = '';
    }
}

function numbersLeft(verbToBe, quantityOfNumbers, lastIndoarabicNumber) {
    // console.log("lastLine",lastLine);
    // console.log("lastLine",typeof(lastLine));
    // console.log("lastLine",lastLine.substring(0,lastLine.indexOf(',')));
    (quantityOfNumbers > 1) ? verbToBe = 'are' : verbToBe = 'is';
    document.getElementById("learningSection__counting").innerText = `There ${verbToBe} ${quantityOfNumbers} numbers \nleft between 0 and ${lastIndoarabicNumber}.`
}

function coloringFieldInGreen() {
    // textField.style.backgroundColor = "greenyellow";
    // textField.style.color = "darkgreen";
    textField.classList.add('greenCorrectAnimation');
    setTimeout(() => {
        // textField.style.backgroundColor = '';
        // textField.style.color = '';
        textField.classList.remove('greenCorrectAnimation');
    }, 200)
}

function coloringFieldInRed() {
    // textField.style.backgroundColor = "lightpink";
    // textField.style.color = "darkred";
    textField.classList.add('redWrongAnimation');
    setTimeout(() => {
        // textField.style.backgroundColor = '';
        // textField.style.color = '';
        textField.classList.remove('redWrongAnimation');
    }, 400)
}/**/

function hidingButtons(newHanziButton) {
    /* Explicação */
    // console.log("newHanziButton_switch", newHanziButton);
    // console.log('document.getElementsByClassName("numberNumericalButton")[0].innerText1', document.getElementsByClassName("numberNumericalButton")[0].innerText);
    // console.log('numberField.innerText', numberField.innerText);
    for (let selecting = 1; selecting <= hanziCharacters.length - 4; selecting++) {
        switch (newHanziButton) {
            case selecting: selectingHidingButtons(newHanziButton);
        }
    }
    selectingHidingPowersOfTen(99, 11);
    selectingHidingPowersOfTen(999, 12);
    selectingHidingPowersOfTen(9999, 13);
}

function newIndoarabicNumber(numberButtonList, nameButtonList, newHanziButton) {

    numberField.appendChild(numberButtonList[newHanziButton]);
    // console.log("numberButtonList[newHanziButton]",numberButtonList[newHanziButton].innerText)
    nameField.appendChild(nameButtonList[newHanziButton]);

    // console.log("numberField", numberField);
    // console.log("newHanziButton-1", newHanziButton-1);
    if (document.getElementById(`number-${newHanziButton-1}`)) {
        console.log("document.getElementById(`number-${newHanziButton-1}", document.getElementById(`number-${newHanziButton-1}`));
        numberField.removeChild(document.getElementById(`number-${newHanziButton-1}`));
    }
    
    if (document.getElementById(`name-${newHanziButton-1}`)) {
        nameField.removeChild(document.getElementById(`name-${newHanziButton-1}`));
    }
}  //!!!!!

async function main() {
    const response = await fetch('databank/basic/numbers.txt');
    // console.log(response);
    // console.log(response.status);
    // console.log(response.url);
    const allNumbers = await response.text();
    // console.log("allNumbers", allNumbers);
    const lines = allNumbers.split('\n');
    let quantityOfNumbers = lines.length;
    // console.log("lines", lines);

    let numberButtonList = [];
    let hanziButtonList = [];
    let nameButtonList = [];
    let answerHanzi = []
    let numberBlock;
    let nameBlock;
    let hanziBlock;
    let i = 0;

    lines.forEach((aNumber) => {
        // console.log("aNumber", aNumber);
        // console.log(aNumber.split(','));
        aNumber = aNumber.split(',');
        // console.log(aNumber[0], aNumber[2]);

        numberBlock = document.createElement('div');
        numberBlock.id = `number-${i}`;
        numberBlock.classList.add(`numberNumericalButton`);
        numberBlock.innerText = aNumber[0];
        numberButtonList.push(numberBlock);

        answerHanzi.push(aNumber[1]);

        nameBlock = document.createElement('div');
        nameBlock.id = `name-${i}`;
        nameBlock.classList.add(`nameNumericalButton`);
        nameBlock.innerText = aNumber[2];
        nameButtonList.push(nameBlock);
        //document.querySelector('div[class="left-side"]').appendChild(numberBlock);
        i++;
    })
    const lastIndoarabicNumber = lines[i-1].substring(0,lines[i-1].indexOf(','))

    let selectHanzi = 0;
    hanziCharacters.forEach((hanzi) => {
        hanziBlock = document.createElement('button');
        hanziBlock.id = `hanzi-${selectHanzi}`;
        hanziBlock.classList.add(`hanziNumericalButton`);
        hanziBlock.innerText = hanzi;
        hanziButtonList.push(hanziBlock);
        if (selectHanzi <= 6) {
            leftColumn.appendChild(hanziButtonList[selectHanzi]);
        } else {
            rightColumn.appendChild(hanziButtonList[selectHanzi]);
        }

        if (selectHanzi > 0) {
            hanziBlock.style.display = 'none';
        }
        selectHanzi++;
    })
    // console.log("hanziButtonList",hanziButtonList);


    // console.log("hanziButtonList",hanziButtonList);
    numberField.appendChild(numberButtonList[0]);
    nameField.appendChild(nameButtonList[0]);
    givingExplanation();
    let verbToBe;
    numbersLeft(verbToBe, quantityOfNumbers, lastIndoarabicNumber);
    
    let listHanziNumericalButton = Object.values(document.getElementsByClassName("hanziNumericalButton"));
    listHanziNumericalButton.forEach((button) => {
        button.addEventListener('click', (event) => {
            // textField.value += event.target.innerText; 
            const startCursor =  textField.selectionStart
            textField.value = textField.value.substring(0, startCursor) +  event.target.innerText + textField.value.substring(textField.selectionEnd);
            textField.selectionStart = textField.selectionEnd = startCursor + 1;
            console.log("startCursor", startCursor)
            console.log("textField.selectionEnd", textField.selectionEnd)
            textField.focus();
        })

        button.addEventListener('keydown', (event) => { //Avoiding a repeated character insertion.
            if (event.key = 'Enter') {
                event.preventDefault();
            }

        })
    })

    buttonContinueGame.addEventListener('click', () => {
        // console.log("textField.value", textField.value)
        // console.log("answerHanzi[newHanziButton].trim()", answerHanzi[newHanziButton].trim())
        if (answerHanzi[newHanziButton].trim() == textField.value) {
            // console.log("answerHanzi", answerHanzi);
            coloringFieldInGreen();
            newHanziButton++;
            // console.log("textField.value",textField.value);
            // console.log("newHanziButton", newHanziButton);
            hidingButtons(newHanziButton);
            newIndoarabicNumber(numberButtonList, nameButtonList, newHanziButton);
            erasingField();
            quantityOfNumbers--;
            numbersLeft(verbToBe, quantityOfNumbers, lastIndoarabicNumber);
            explanationField.innerText = '';
            givingExplanation();
        } else {
            coloringFieldInRed();
        }
    })

    document.addEventListener('keydown', (event) => {
        // console.log("event.key",event.key);
        if (event.key == "Enter") {
            // console.log("textField.value", textField.value)
            // console.log("answerHanzi[newHanziButton].trim()", answerHanzi[newHanziButton].trim())
            if (answerHanzi[newHanziButton].trim() == textField.value) {
                // console.log("answerHanzi", answerHanzi);
                coloringFieldInGreen();
                // console.log("answerHanzi", answerHanzi);
                newHanziButton++;
                // console.log("textField.value",textField.value);
                // console.log("newHanziButton", newHanziButton);
                hidingButtons(newHanziButton);
                newIndoarabicNumber(numberButtonList, nameButtonList, newHanziButton);
                erasingField();
                quantityOfNumbers--;
                numbersLeft(verbToBe, quantityOfNumbers, lastIndoarabicNumber);
                explanationField.innerText = '';
                givingExplanation();
            } else {
                coloringFieldInRed();
            }
        }
    })
}

textField.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
    }
})

main();

