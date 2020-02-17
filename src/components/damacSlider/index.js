export default function DamacSlider( items) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slider-item'),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName('slider-item')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        index = 0,
        allowShift = true;
    // Clone first and last slide
    
    // Mouse and Touch events
    items.onmousedown = dragStart;
    
    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);
    
    // Click events
    // prev.addEventListener('click', function () { shiftSlide(-1) });
    // next.addEventListener('click', function () { shiftSlide(1) });
    
    // Transition events
    items.addEventListener('transitionend', checkIndex);
    
    function dragStart (e) {
      e = e || window.event;
      e.preventDefault();
      posInitial = items.offsetLeft;
      
      if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
      } else {
        posX1 = e.clientX;
        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
      }
    }
  
    function dragAction (e) {
      e = e || window.event;
      if (e.type == 'touchmove') {
        posX2 = posX1 - e.touches[0].clientX;
        posX1 = e.touches[0].clientX;
      } else {
        posX2 = posX1 - e.clientX;
        posX1 = e.clientX;
      }
      items.style.left = (items.offsetLeft - posX2) + "px";
    }
    
    function dragEnd (e) {
        posFinal = items.offsetLeft;
        if(items.offsetLeft>0){
            items.style.left = '0px';
        }  else {
            items.style.left = (posFinal) + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }
    
    function shiftSlide(dir, action) {
      items.classList.add('shifting');
      
      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }
  
        if (dir == 1) {
          items.style.left = (posInitial - 100) + "px";
          index++;      
        } else if (dir == -1) {
          items.style.left = (posInitial + 100) + "px";
          index--;      
        }
      };
      
      allowShift = false;
    }
      
    function checkIndex (){
      items.classList.remove('shifting');
      if (items.offsetLeft >=0) {
        items.style.left = (0) + "px";
      }
      if(items.offetRight <=0)
        items.style.right =(0) + "px";
  
      allowShift = true;
    }
  }