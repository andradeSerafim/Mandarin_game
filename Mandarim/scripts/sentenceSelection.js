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
    const response = await fetch('scripts/sentence_data.txt');
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
        document.getElementById("setenceSection").appendChild(hanziButton);
    }

    const buttonArray = Object.values(document.getElementsByClassName("hanziButton"))
    // console.log("buttonArray",buttonArray)  //debug
    buttonArray.forEach((element) => {
        // console.log(element);  //debug
        // console.log(element.textContent);  //debug
        element.addEventListener('click', (event) => {
            // console.log('event',event.target.innerText);  //debug
            const typeArea = document.getElementById("typeArea");
            typeArea.value = typeArea.value + event.target.innerText;
        })
    });
    
    console.log('typeArea.innerText',typeArea.innerText);
    
    verifyAnswer(hanzi)
}

function verifyAnswer(hanzi) {
    document.querySelector('button[id="analisingButton"]').addEventListener('click', () => {
        const typedAnswer = document.querySelector('textarea[id="typeArea"]').value.trim();
        const verifying = typedAnswer.trim() == hanzi.trim();
        // console.log("hanzi_function", hanzi)  //debug
        // console.log("typedAnswer", typedAnswer)  //debug
        // console.log("length_hanzi_function", hanzi.trim().length)  //debug
        // console.log("length_typedAnswer", typedAnswer.length)  //debug
        // console.log("typeof_hanzi_function", typeof(hanzi))  //debug
        // console.log("typeof_typedAnswer", typeof(typedAnswer))  //debug
        if (verifying) {
            alert("Correct answer.")
        } else {
            alert("Wrong answer.")
        }
    })
}

document.addEventListener('DOMContentLoaded', main);
