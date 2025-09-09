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

function randomLines(array) {
    let selectedIndexes = [];
    for(let i = 0; i<12; i++) {
        let index = Math.round(Math.random() * (array.length - 1));
        console.log("index_in_for", index)
        if (selectedIndexes.includes(index)) {
            console.log("repeated")
            i--;
        } else {
            selectedIndexes.push(index);
        }
    }
    return selectedIndexes;
}

async function main() {
    const response = await fetch('databank/word_data.txt');
    //console.log("response",response);  //debug
    const text = await response.text();
    //console.log("text",text);  //debug
    const lines = text.split('\n');
    // console.log("lines",lines);  //debug
    let wordData = [];
    let selectedLines = [];
    let randomSelectedLines = randomLines(lines);
    console.log("randomSelectedLines",randomSelectedLines)
    
    randomSelectedLines.forEach((selectedIndex) => {
        selectedLines.push(lines[selectedIndex]);
    })
    console.log("selectedLines",selectedLines)
    selectedLines.forEach((line) => {
        let [hanzi, english] = line.split(',');
        [hanzi, english] = [hanzi.trim(), english.trim()];
        // console.log("[hanzi, english]:", [hanzi, english]);
        wordData.push([hanzi, english]);
    });
    console.log('wordData',wordData)  //debug
    // console.log('wordData0 type', typeof(wordData0))  //debug
    // return wordData;
    let i = 0;
    let leftArray = [];
    let rightArray = [];
    wordData.forEach((element) => {
        // console.log("element[0]",element[0]);  //debug
        // console.log("element[1]",element[1]);  //debug
        let createdButton0 = document.createElement("button");
        createdButton0.dataset.id = `${i}`;
        createdButton0.classList.add("box");
        createdButton0.innerText = element[0];
        //leftSide.appendChild(createdButton0);
        leftArray.push(createdButton0);

        let createdButton1 = document.createElement("button");
        createdButton1.dataset.id = `${i}`;
        createdButton1.classList.add("box");
        createdButton1.innerText = element[1];
        //rightSide.appendChild(createdButton1);
        rightArray.push(createdButton1);

        i++;
    })

    // console.log("typeof(wordData):",typeof(wordData));  //debug
    // console.log("wordData:",wordData);  //debug
    // console.log("wordData[2]:",wordData[2]);  //debug
    leftSide = document.getElementById("cards__left");
    rightSide = document.getElementById("cards__right");

    leftArray = fischerYatesShuffle(leftArray);
    rightArray = fischerYatesShuffle(rightArray);

    leftArray.forEach((element) => {
        leftSide.appendChild(element);
    });
    //console.log(leftSide);

    rightArray.forEach((element) => {
        rightSide.appendChild(element);
    });
    wordSelectionFunction();
}

document.addEventListener('DOMContentLoaded', main);

// wordData = Object.values(getFile('scripts/word_data.txt'));
// const wordData = getFile('scripts/word_data.txt');

