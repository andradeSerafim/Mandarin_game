function wordSelectionFunction() {
   let words = document.getElementsByClassName("box");
   //console.log(words);
   const card_area = document.getElementById("card_area");
   let selectedButtons = [];

   let wordsArray = Object.values(words);
   //console.log(typeof(wordsArray))
   wordsArray.forEach((element) => {
      console.log("element", element);
      element.addEventListener("click", (event) => {
         let oneClick = event.target;
         selectedButtons.push(oneClick)
         if (selectedButtons.length < 2) {
            //console.log("oneClick.innerText:",oneClick.innerText);
            //console.log("oneClick:",oneClick);
            //console.log("oneClick.dataset.id:",oneClick.dataset.id);
            oneClick.style.backgroundColor = '#ffffa2ff';
         } else {
            oneClick.style.backgroundColor = '#d9d9d9';
            const equalDataId = selectedButtons[0].dataset.id == selectedButtons[1].dataset.id;
            const differentColumns = selectedButtons[0].parentElement.id != selectedButtons[1].parentElement.id
            if (equalDataId && differentColumns) {
               selectedButtons[0].style.backgroundColor = 'greenyellow';
               selectedButtons[1].style.backgroundColor = 'greenyellow';
               selectedButtons[0].disabled = true;
               selectedButtons[1].disabled = true;
               selectedButtons = [];
            } else if (equalDataId && !differentColumns) {
               selectedButtons[0].style.backgroundColor = '#d9d9d9';
               selectedButtons[1].style.backgroundColor = '#d9d9d9';
               selectedButtons = [];
            } else {
               selectedButtons[0].style.backgroundColor = 'lightpink';
               selectedButtons[1].style.backgroundColor = 'lightpink';
               setTimeout( () => {
                  selectedButtons[0].style.backgroundColor = '#d9d9d9';
                  selectedButtons[1].style.backgroundColor = '#d9d9d9';
                  selectedButtons = [];
               }, 500);
            }
         }
         //console.log(selectedButtons);
         //console.log("selectedButtons.length:",selectedButtons.length);
      });

      element.addEventListener("mouseover", (event) => {
         // console.log(event.target.style)
         if (event.target.backgroundColor != "greenyellow") {
            event.target.style.backgroundColo = '#a7a9ac';
         }
      })
   });
} 


