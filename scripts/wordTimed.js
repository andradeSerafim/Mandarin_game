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
    console.log("randomSelectedLines",randomSelectedLines);  //debug

    randomSelectedLines.forEach((selectedIndex) => {
        selectedLines.push(lines[selectedIndex]);
    })
    console.log("selectedLines",selectedLines)
    selectedLines.forEach((line) => {
        let [hanzi, english] = line.split(',');
        [hanzi, english] = [hanzi.trim(), english.trim()];
        // console.log("[hanzi, english]:", [hanzi, english]);  //debug
        wordData.push([hanzi, english]);
    });
}

function teste() {
    var aDiv = document.createElement("div");
    aDiv.innerText = "ssss"
    document.querySelector('section').appendChild(aDiv)
}

document.addEventListener('DOMContentLoaded', main);
teste();