const numberField = document.getElementById("centralField__number");
const explanationField =  document.getElementById("learningSection__explanation");
const buttonToEnterAnswer = document.querySelector('button[id="continuingGame"]');

function givingExplanation() {
    console.log("First zero");
    let NumHere = Number(numberField.innerText);
    const secondsWaiting = 9*10**3;
    
    if (NumHere == 0) {
        setTimeout(() => {
            // console.log("After setTimeout");
            explanationField.style.padding = '5px'
            const EnterAnswerAdvise = `Press Enter or click \n"${buttonToEnterAnswer.innerText}" button.`
            explanationField.innerText = 'Type the button 零 on the left. \nIt means "zero" in hanzi. \n' + EnterAnswerAdvise;
        }, secondsWaiting/3)
    } else if ([1, 2, 3].includes(NumHere)) {
        let hanziInThisText;
        (NumHere == 1) ? hanziInThisText = '一' : ((NumHere == 2) ? hanziInThisText = '二' : hanziInThisText = '三');
        explanationField.innerText = `Now, select the new button ${hanziInThisText}, \nthe number ${numberField.innerText} in hanzi.`
    } else if ((NumHere > 3) && (NumHere <= 10)) {
        explanationField.innerText = 'Continue selecting new buttons and discover \nthe following hanzi numbers until 10.';
    } else if (NumHere == 11) {
        explanationField.innerText = `From now, continue adding numbers. For example: \n十一 is 11 because 10 + 1 = 11.`;
    } else if (NumHere == 12) {
        explanationField.innerText = `From now, continue adding numbers. For example: \n十二 is 12 because 10 + 2 = 12.`;
    } else if ((NumHere > 12) && (NumHere < 20)) {
        explanationField.innerText = 'Continue selecting \ntwo hanzi numbers buttons until 20.';
    } else if (NumHere == 20) {
        explanationField.innerText = '二十 is 20 because 2 × 10 = 20. \nDo not confuse with 十二, \nwhich is 12.';
    } else if (NumHere == 21) {
        explanationField.innerText = '二十一 is 21 because 2 × 10 + 1 = \n21. Numbers on the left of 十 \nare multiplied by 10.';
    } else if ((NumHere >= 22) && (NumHere < 30)) {
        explanationField.innerText = 'Continue selecting \nthree hanzi numbers buttons \nuntil 30.';
    } else if ((NumHere >= 31) && (NumHere < 100)) {
        explanationField.innerText = 'Continue selecting \nthree hanzi numbers buttons \nuntil 100.';
    } else if (NumHere == 100) {
        setTimeout(() => {
            explanationField.innerText = 'Type the hanzi 百, \nwhich means 100.';
        }, secondsWaiting)
    } else if (NumHere == 101) {
        explanationField.innerText = 'Type 一百一, hundreds need its \nquantity detailed expressed from now.';
    } else if ((NumHere >= 110) || (NumHere <= 119)) {
        explanationField.innerText = 'Except between 010 and 019, \nit is necessary to type "一十", \nas 118.';
    } else if ((NumHere >= 120) || (NumHere <= 999)) {
        explanationField.innerText = '十 and 百 are powers of 10, \ntreated as tens and hundreds \nrespectively for their hanzi on left.';
    } else if (NumHere == 1000) {
        explanationField.innerText = 'Type the hanzi 千, \nwhich means 1000.';
    } else if ((NumHere > 1000) || (NumHere <= 1020)) {
        explanationField.innerText = '十, 百 千 and are powers of 10, \ntreated as tens, hundreds and thousands \nrespectively for their hanzi on left.';
    }  else if (NumHere == 1021) {
        explanationField.innerText = 'Insert 零 in position of hundreds when \nit is zero and there are tens or units, \nbut without 百.';
    }  else if (NumHere == 10000) {
        setTimeout(() => {
            explanationField.innerText = 'Type only the new hanzi on the right';
        }, secondsWaiting * 2/9)
    }
}

export default givingExplanation;
