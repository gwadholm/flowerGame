










console.log(e.target.parentElement);
















flowerArray.forEach(function(e){ addHighlightEvent(e)});



  
  
highlightedFlower.addEventListener("dragstart", moveToBouquet);





function addHighlightEvent(e) {
  e.addEventListener('click', moveToHighlighted);
}


function moveToHighlighted(e) {
  
  chosenFlower = e.target;  
  //console.log(e)  
  const replaceFlower = chosenFlower.cloneNode(true);
  addHighlightEvent(replaceFlower);
 // console.log(chosenFlower)

  highlightedFlower.innerHTML = '';
  highlightedFlower.insertAdjacentElement("beforeend", chosenFlower);
  

  flowerThumbnail.appendChild(replaceFlower);
  console.log(replaceFlower)
}






function moveToBouquet(e) {

  const flowerPosX = e.target.getBoundingClientRect().x;
  const flowerPosY = e.target.getBoundingClientRect().y;
  const mouseStartPosX = e.pageX;
  const mouseStartPosY = e.pageY;
  const anchorOffsetX = Math.floor(mouseStartPosX - flowerPosX);
  const anchorOffsetY = Math.floor(mouseStartPosY - flowerPosY);

  getOffset = [anchorOffsetX, anchorOffsetY];

};
  





// MOVE FLOWER FROM CHOICE BOX TO BOUQUET

highlightedFlower.addEventListener("dragend", function(e) {
   

  //identify flower picked
  const currentFlower = e.target; 
  const flowerPos = bouquetBox.getBoundingClientRect();
  highlightedFlower.removeChild(currentFlower);
  bouquetBox.insertAdjacentElement("beforeend", currentFlower);
  
  // Placing at drop position

  const vaseWidth = Math.floor(flowerPos["x"]);
  const vaseHeight = Math.floor(flowerPos["y"]);
  currentFlower.classList.add('droppable');
  currentFlower.style.left = Math.floor(e.pageX) - vaseWidth - getOffset[0] + 'px';
  currentFlower.style.top = Math.floor(e.pageY) - vaseHeight - getOffset[1]  +'px';

  currentFlower.removeEventListener('click', moveToHighlighted);   


})









let focusFlower;

function adjustment(e) {

  //marking flower that is being adjusted and allowing for deselection
  e.target.style.filter = "contrast(10%)";
  e.target.addEventListener('click', function(e) {
    e.target.style.filter = "none";
  })
  
  //targeting flower settings
  let flowerTarget = e.target;
  let thisWidth = this.width;
  let scaleValue =  Number(document.querySelector('#scale').value);
  let flowerWidth = this.style.maxWidth
  console.log(this.width, scaleValue)
  
  let initialWidth = this.width;
  let initialHeight = this.height;
  let scaleFactor = Number(document.querySelector('#scale').value);
  //console.log(initialWidth + " , " + initialHeight);
  e.target.style.maxWidth = `${initialWidth + 20}px`;
  e.target.style.maxHeight = `${initialHeight + 20}px`;
  //e.target.addEventListener("dblclick", scaleElement);


  //console.log(flowerTarget + thisWidth);


  // document.querySelector('#scale').addEventListener('input', updateScale);


  // function updateScale() {          
  //   scaleUpdate = document.querySelector('#scale').value;
  //   document.querySelector('#scaleValue').innerText = scaleUpdate;
  //   scaleValue = Number(scaleUpdate);      
  //   console.log(scaleUpdate);
  //   console.log(flowerWidth)
  //   flowerWidth = `${thisWidth + scaleValue}px`;
  //   return scaleValue;
    //return scaleUpdate;

    //let initialWidth = scaleAdjust;
    //console.log(initialWidth);
}
  






// function scaleElement(e) {
//   let initialWidth = this.width;
//   let initialHeight = this.height;
//   let scaleFactor = Number(document.querySelector('#scale').value);
//   //console.log(initialWidth + " , " + initialHeight);
//   e.target.style.maxWidth = `${initialWidth + 20}px`;
//   e.target.style.maxHeight = `${initialHeight + 20}px`;
//   e.target.addEventListener("dblclick", scaleElement);
// }















// // MOVE FLOWER OUT OF BOUQUET
// bouquetBox.addEventListener("dragend", function(e) {
//   //identify flower picked
//   const currentFlower = e.target;  

//   //move flower from bouquet back to choices box
//   bouquetBox.removeChild(currentFlower);
//   flowerChoiceBox.insertAdjacentElement("beforeend", currentFlower);    
//   currentFlower.classList.remove('droppable');

// })




  //console.log(flowerChoicesArray)
  //console.log("The vase is at" + vaseWidth + "and" + vaseHeight);
  //console.log(e.pageX + " " + e.pageY);
  //console.log(e.target.width)
  











    // let flowerTargetzIndex = this.zIndex;
    // console.log(this.width)

    // document.querySelector('body').addEventListener('keydown', function(e) {
    //   if(e.key=="ArrowDown") {
    //     e.target.style.zIndex = thisFlowerIndex - 1;
    //     console.log(thisFlowerIndex)
    //   }
    // })

















// SANDBOX


// function replaceFlower(chosenFlower) {
//   const flowerChoicesArray = document.querySelectorAll("#flowerChoices img");
//   const flowerArray = Array.from(flowerThumbnail.children);
//   flowerArray.push(chosenFlower);
//   console.log(flowerArray)
// }

// flowerChoiceBox.childNodes.addEventListener('click', function(e) {
//   e.target.remove();
// } )


// bouquetBox.childNodes.forEach(function(element) {
//     if (element.nodeName === "IMG") {
//       element.classList.add('droppable')
//     }
//   });


// const mouseXPos = 
// const mouseYPos = 
// const xPos = e.offsetX;
// let x_pos = e.pageX;
// let y_pos = e.




// const currentFlower = e.target; 
// const flowerAnchorPointX = Math.round(flowerChoiceBox.getBoundingClientRect().x);
// const flowerAnchorPointY = Math.round(flowerChoiceBox.getBoundingClientRect().y);
// const flowerWidth = e.target.width;
// const flowerHeight = e.target.height;


//Flower options count within choice box
//   const flowerChoicesLeft = (highlightedFlower.childElementCount);



//flowerThumbnail.addEventListener('click', moveToHighlighted);
