
// console.log("sentenceData",sentenceData[1])

function fischerYatesShuffle(array) {
    let index = array.length;
    let newIndex;

    while (index !== 0) {
        newIndex = Math.floor(Math.random() * index);
        index--;
    
        [array[index], array[newIndex]] = [array[newIndex], array[index]];
    }
    return array;
}

const insertingSentence = document.getElementById("sentenceNow");
//const setSentence = Math.floor(sentenceData.length * Math.random());

// document.addEventListener('DOMContentLoaded', () => {
async function main() {
    const response = await fetch('databank/sentence_data.txt');
    const text = await response.text();
    const lines = text.split('\n');
    // console.log("lines", lines);  //debug
    
    const setSentence = Math.floor(lines.length * Math.random());
    // console.log("setSentence", setSentence);  //debug
    // console.log("lines[setSentence]", lines[setSentence]);  //debug
    let [english, hanzi] = lines[setSentence].split(',');
    [english, hanzi] = [english.slice(1,-1), hanzi.replace('\r',"")];
    console.log("hanzi", hanzi);
    //const setSentence = 0;
    insertingSentence.textContent = english;
    //console.log(sentenceData[setSentence])  //debug
    //console.log(sentenceData[setSentence][0])  //debug
    //console.log(sentenceData[setSentence][1])  //debug
    let hanziList = fischerYatesShuffle([...hanzi]);
    // console.log("hanziList",hanziList);  //debug
    let noRepeat = [];
    for(let i = 0; i < hanziList.length; i++) {
        if (noRepeat.includes(hanziList[i]) || hanziList[i]==" ") {
            console.log("hanziList[i]",hanziList[i])
            continue;
        } else {noRepeat.push(hanziList[i])}
        let hanziButton = document.createElement('button');
        hanziButton.dataset.id = `button_${i}`;
        hanziButton.classList.add("hanziButton");
        hanziButton.textContent = hanziList[i];
        // console.log(hanziButton);  //debug
        document.getElementById("setenceSection__buttons").appendChild(hanziButton);
    }

    const buttonArray = Object.values(document.getElementsByClassName("hanziButton"))
    // console.log("buttonArray",buttonArray)  //debug
    buttonArray.forEach((element) => {
        // console.log(element);  //debug
        // console.log(element.textContent);  //debug
        element.addEventListener('click', (event) => {
            // console.log('event',event.target.innerText);  //debug
            const typeArea = document.getElementById("typeArea");
            // typeArea.value += event.target.innerText;

            const startCursor =  typeArea.selectionStart
            typeArea.value = typeArea.value.substring(0, startCursor) +  event.target.innerText + typeArea.value.substring(typeArea.selectionEnd);
            typeArea.selectionStart = typeArea.selectionEnd = startCursor + 1;
            console.log("startCursor", startCursor)
            console.log("typeArea.selectionEnd", typeArea.selectionEnd)
            typeArea.focus();
        })
    });
    
    console.log('typeArea.innerText',typeArea.innerText);
    
    verifyAnswer(hanzi);
}

function verifyAnswer(hanzi) {
    document.querySelector('button[id="analisingButton"]').addEventListener('click', () => {
        const typedAnswer = document.querySelector('textarea[id="typeArea"]').value.trim();
        console.log("typedAnswer", typedAnswer)  //debug
        console.log("hanzi", hanzi)  //debug
        const verifying = typedAnswer.trim() == hanzi.trim();
        // console.log("hanzi_function", hanzi)  //debug
        // console.log("length_hanzi_function", hanzi.trim().length)  //debug
        // console.log("length_typedAnswer", typedAnswer.length)  //debug
        // console.log("typeof_hanzi_function", typeof(hanzi))  //debug
        // console.log("typeof_typedAnswer", typeof(typedAnswer))  //debug
        if (verifying) {
            // alert("Correct answer.")
            document.getElementById("typeArea").style.borderColor = 'green';
            document.getElementById("typeArea").style.backgroundColor = 'greenyellow';
            document.getElementById("typeArea").style.color = 'green';
            document.getElementById("typeArea").style.borderWidth = '3px'
        } else {
            // alert("Wrong answer.")
            document.getElementById("typeArea").style.borderColor = 'darkred';
            document.getElementById("typeArea").style.backgroundColor = 'lightpink';
            document.getElementById("typeArea").style.color = 'darkred';
            document.getElementById("typeArea").style.borderWidth = '3px'
        }
    }) //{once:true}
}

document.addEventListener('DOMContentLoaded', main);

