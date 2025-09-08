let fontSizeOnClick = '100%'

function memorySelectionFunction() {
   let words = document.getElementsByClassName("box");
//    console.log(words);
   const card_area = document.getElementById("card_area");
   let selectedButtons = [];

   let wordsArray = Object.values(words);
   //console.log(typeof(wordsArray))
   wordsArray.forEach((element) => {
      element.addEventListener("click", (event) => {
         let oneClick = event.target;
         selectedButtons.push(oneClick)
         if (selectedButtons.length < 2) {
            //console.log("oneClick.innerText:",oneClick.innerText);
            //console.log("oneClick:",oneClick);
            //console.log("oneClick.dataset.id:",oneClick.dataset.id);
            oneClick.style.backgroundColor = '#ffffa2ff';
            oneClick.style.fontSize = fontSizeOnClick;
         } else {
            oneClick.style.backgroundColor = '#d9d9d9';
            const equalDataId = selectedButtons[0].dataset.id == selectedButtons[1].dataset.id;
            const differentNames = selectedButtons[0].name != selectedButtons[1].name
            if (equalDataId && differentNames) {
               selectedButtons[0].style.backgroundColor = 'greenyellow';
               selectedButtons[1].style.backgroundColor = 'greenyellow';
               selectedButtons[1].style.fontSize = fontSizeOnClick;
               selectedButtons[0].disabled = true;
               selectedButtons[1].disabled = true;
               selectedButtons = [];
            } else if (equalDataId && !differentNames) {
               selectedButtons[0].style.backgroundColor = '#d9d9d9';
               selectedButtons[1].style.backgroundColor = '#d9d9d9';
               selectedButtons[1].style.fontSize = '0';
               selectedButtons = [];
            } else {
               selectedButtons[0].style.backgroundColor = 'lightpink';
               selectedButtons[1].style.backgroundColor = 'lightpink';
               selectedButtons[1].style.fontSize = fontSizeOnClick;
               setTimeout( () => {
                  selectedButtons[0].style.backgroundColor = '#d9d9d9';
                  selectedButtons[1].style.backgroundColor = '#d9d9d9';
                  selectedButtons[0].style.fontSize = '0';
                  selectedButtons[1].style.fontSize = '0';
                  selectedButtons = [];
               }, 500);
            }
         }
         // console.log(selectedButtons);
         // console.log("selectedButtons.length:",selectedButtons.length);
      })

      element.addEventListener("mouseover", (event) => {
         // console.log(event.target.style)
         if (event.target.backgroundColor != "greenyellow") {
            event.target.style.backgroundColo = '#a7a9ac';
         }
      })
   });
} 
