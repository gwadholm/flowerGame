
(function() {

  const flowerThumbnail = document.querySelector('#flowerChoices');
  const highlightedFlower = document.querySelector("#highlightedFlower")
  const bouquetBox = document.querySelector('#flowerBouquet');
  const flowerArray = Array.from(flowerThumbnail.children);
  let getOffset = [0,0]

  //EVENT LISTENERES
  
  // give each item in flowerThumbnail box a click event to move it to the highlight box
  flowerArray.forEach(function(item){ 
    item.addEventListener('click', copyToHighlighted);
  })

  //FUNCTIONS

  // copy chosen flower from Thumbnail box to the Highlighted box, leaving original in place
  function copyToHighlighted(e) {    
    const replaceFlower = e.target.cloneNode();  
    highlightedFlower.innerHTML = '';
    highlightedFlower.insertAdjacentElement("beforeend", replaceFlower); 
  }

  // Grabbing initial position when drag starts
  highlightedFlower.addEventListener("dragstart", initialFlowerPosition);

  // Once drag is over, remove from highlightbox and place in bouquet
  highlightedFlower.addEventListener("dragend", function(e) {
    highlightedFlower.removeChild(e.target);
    bouquetBox.insertAdjacentElement("beforeend", e.target);        
    placeFlower(e); 
  })

  
  // Gets offset value between where you place cursor and the 0,0 corner of image
  function initialFlowerPosition(e) {
    const flowerPosX = e.target.getBoundingClientRect().x;
    const flowerPosY = e.target.getBoundingClientRect().y;
    const mouseStartPosX = e.pageX;
    const mouseStartPosY = e.pageY;
    const anchorOffsetX = Math.floor(mouseStartPosX - flowerPosX);
    const anchorOffsetY = Math.floor(mouseStartPosY - flowerPosY);
    getOffset = [anchorOffsetX, anchorOffsetY];
  }

  // Placing at drop position - it doesn't have to be dropped into the box, can go anywhere on the page. 
  function placeFlower(e) {
    const chosenFlower = e.target;
    const flowerPos = bouquetBox.getBoundingClientRect();
    const vaseWidth = Math.floor(flowerPos["x"]);
    const vaseHeight = Math.floor(flowerPos["y"]);
    e.target.classList.add('droppable');


    e.target.style.left = Math.floor(e.pageX) - vaseWidth - getOffset[0] + 'px';
    e.target.style.top = Math.floor(e.pageY) - vaseHeight - getOffset[1]  +'px';

    chosenFlower.addEventListener("dragstart", initialFlowerPosition);
    chosenFlower.addEventListener("dragend", placeFlower);
    chosenFlower.addEventListener("dblclick", adjustment);
  }
  
  let flowerTarget = document.querySelectorAll(".selected");

  // document.querySelector('body').addEventListener('keydown', function(e) {
  //   console.log(e.key)
  // })

  function adjustment(e) {

    if (flowerTarget.length === 1) {      
      flowerTarget[0].style.filter = "none";
      flowerTarget[0].classList.remove("selected");
      flowerTarget = [];
    }


    //marking flower that is being adjusted and allowing for deselection
    e.target.style.filter = "contrast(40%)";
    document.querySelector('#scale').value = '0';

    // Getting out of Adjustment Mode
    e.target.addEventListener('click', removeAdjustable)
    function removeAdjustable(e) {
      e.target.style.filter = "none";
      e.target.classList.remove("selected");
      e.target.removeEventListener('click', removeAdjustable)
      document.querySelector('#scale').removeEventListener('input', updateScale);
      document.querySelector('body').removeEventListener('keydown', moveUpScale);      
      document.querySelector('#flip').removeEventListener('click', flipFlower); 
      document.querySelector('#rotation').removeEventListener('input', rotateFlower);
      document.querySelector('#scale').value = "0";
      document.querySelector('#rotation').value = "0";
      flowerTarget = document.querySelectorAll(".selected");
    }
    //targeting flower settings
    e.target.classList.add("selected");
    flowerTarget = document.querySelectorAll(".selected");    
    
    
    //move target flower back and forward

    let changeIndex = "1";
    document.querySelector('body').addEventListener('keydown', moveUpScale)
    
    function moveUpScale(button) {      
      button.preventDefault();
      if(button.key === "ArrowUp") {
        changeIndex++;
        flowerTarget[0].style.zIndex = changeIndex;
        console.log(flowerTarget[0].style.zIndex);
        //document.querySelector('body').addEventListener('keydown', moveUpScale)
      }
      
      if(button.key === "ArrowDown") {
        changeIndex--;
        flowerTarget[0].style.zIndex = changeIndex;
        console.log(flowerTarget[0].style.zIndex);
        //document.querySelector('body').addEventListener('keydown', moveUpScale)
      }
    }
   

    //scaling Adjustment
    let initialWidth = this.width;
    let initialHeight = this.height;      
    const scaleValue =  Number(document.querySelector('#scale').value);  
    flowerTarget[0].style.maxWidth =`${initialWidth + scaleValue}px`;
    flowerTarget[0].style.maxHeight = `${initialHeight + scaleValue }px`;
    document.querySelector('#scale').addEventListener('input', updateScale);

    function updateScale() {
      scaleUpdate = Number(((document.querySelector('#scale').value))*2);
      flowerTarget[0].style.maxWidth =`${initialWidth + scaleUpdate}px`;
      flowerTarget[0].style.maxHeight = `${initialHeight + scaleUpdate }px`;
      document.querySelector('#scale').addEventListener('input', updateScale);
    }

      //scaling Adjustment
    //let initialRotation = this.width;
    document.querySelector('#rotation').addEventListener('input', rotateFlower);

    function rotateFlower() {
      rotationValue = Number((document.querySelector('#rotation').value));
      console.log(rotationValue);
      flowerTarget[0].style.rotate =`${rotationValue}deg`;
      //document.querySelector('#rotation').addEventListener('input', rotateFlower);
    }


    //delete option
    document.querySelector('#flip').addEventListener('click', flipFlower);

    function flipFlower() {   
      if (flowerTarget.length)   {
        flowerTarget[0].classList.toggle("flipped")  
        } 
      }


    //delete option
    document.querySelector('#delete').addEventListener('click', deleteFlower);

    function deleteFlower() {   
      if (flowerTarget.length)   {
        bouquetBox.removeChild(flowerTarget[0]);
        flowerTarget = [];         
        document.querySelector('#delete').removeEventListener('click', deleteFlower);
        document.querySelector('#flip').removeEventListener('click', flipFlower); 
        document.querySelector('#scale').removeEventListener('input', updateScale);  

        } 
      }
    }


 }());