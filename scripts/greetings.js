const selectedSentence = document.getElementById("selectedSentence");
const pinyinSentence = document.getElementById("pinyinSentence");
const englishSentence = document.getElementById("englishSentence");

const hanziInserction = document.getElementById("hanzi-inserction");
const pinyinInserction = document.getElementById("pinyin-inserction");
const hanziMeaning = document.getElementById("hanzi-meaning");

function randomLineChoice(array) {
    let index = Math.round(Math.random() * (array.length - 1));
    // console.log("index", index);
    return array[index];
}

async function getSentences() {
    const sentences = await fetch('./databank/basic/greetings.txt');
    // console.log(sentences.text())
    const content = await sentences.text();
    // console.log(content);
    const lines = content.split('\n');
    // console.log(lines);
    let sentenceBank = [];
    lines.forEach((line) => {
        console.log(line);
        let [hanzi, pinyin, english] = line.split(';');
        // console.log(pinyin.trim());
        sentenceBank.push([hanzi, pinyin, english]);
    });

    const sentences2 = await fetch('./databank/basic/hanzi_greetings.txt');
    const content2 = await sentences2.text();
    const lines2 = content2.split('\n');
    let hanziBank = [];
    lines2.forEach((line) => {
        console.log(line);
        let [hanzi2, pinyin2, english2] = line.split(';');
        console.log(hanzi2.trim());
        hanziBank.push([hanzi2, pinyin2, english2]);
    });
    console.log("hanziBank",hanziBank);

    // console.log("sentenceBank", sentenceBank);
    // console.log("sentenceBank", randomLineChoice(sentenceBank));
    let [hanzi, pinyin, english] = randomLineChoice(sentenceBank);
    selectedSentence.innerText = hanzi.trim();
    selectedSentence.classList.add("newBox");
    pinyinSentence.innerText = pinyin.trim();
    pinyinSentence.classList.add("newBox");
    englishSentence.innerText = english.trim();
    englishSentence.classList.add("newBox");
    console.log("hanzi", hanzi);
    let idBox = 0;
    let newBox;
    for (character of hanzi) {
        console.log(character);
        // hanziInserction.innerText +=  character+'\n';
        newBox = document.createElement('div');
        newBox.innerText = character;
        newBox.classList.add("newBox")
        hanziInserction.appendChild(newBox);
        for (let i=0; i<hanziBank.length; i++) {
            if (character == hanziBank[i][0]) {
                // document.getElementById("pinyin-inserction").innerText += hanziBank[i][1].trim()+'\n';
                newBox = document.createElement('div');
                newBox.innerText = hanziBank[i][1].trim();
                newBox.classList.add("newBox")
                pinyinInserction.appendChild(newBox);

                // document.getElementById("hanzi-meaning").innerText += hanziBank[i][2].trim()+'\n';
                newBox = document.createElement('div');
                newBox.innerText = hanziBank[i][2].trim();
                newBox.classList.add("newBox")
                hanziMeaning.appendChild(newBox);
                break;
            };
        }
        idBox++;
    };
}

getSentences();