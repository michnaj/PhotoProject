$(function() {
  const intervalTime = 5000, //slide display time
        animationDuration = 500,
        designImageSrc = 'images/iphone',
        counter = $('#counter');

  let designs,
      designList = $('#design .content'),
      designContainer = $('#design .container'),
      numDesignContent = designList.find('.content-element').length;

  // Menu - smooth scrolling
  $('#main-menu .nav a.menu-pos').click(function(event) {
    event.preventDefault();
		let goTo = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(goTo).offset().top
		}, 1000);
  });

  // Go to top smooth scrolling
  $("#totop a").click(function(event) {
		event.preventDefault();
		$("html, body").animate({scrollTop: 0}, 1000);
  });

  /**
   * Design slider - begin
  */

  function startSlider(slider) {
    if (slider === 'design') {
      designs = setInterval(changeDesignSlide, intervalTime);
    }
  }

  function stopSlider(slider) {
    if (slider === 'design') {
      clearInterval(designs);
    }
  }

  //Getting index of client element
  function getIndexDesign(elem) {
    if (elem === 'active') {
      return designList.find('.content-element.active').index();
    } else if (elem === 'prev') {
      let activeElem = getIndexDesign('active');
      if (activeElem === 0) {
        return numDesignContent - 1;
      } else {
        return activeElem - 1;
      }
    } else {
      let activeElem = getIndexDesign('active');
      if (activeElem === (numDesignContent - 1)) {
        return 0;
      } else {
        return activeElem + 1;
      }
    }
  }

  //Setting Background image in Design section
  function setDesignBackground(elem) {
    designContainer.css('background-image', `url(/${designImageSrc}${elem + 1}.png)`);
  }

  function updateCounter(num) {
    let a = `0${num+1}`.slice(-2),
        q = `0${numDesignContent}`.slice(-2);
    counter.text(`${a}/${q}`);
  }

  function setActiveDesignElem(active, next) {
    designList.find('.content-element').eq(active).fadeOut(animationDuration, () => {
      designList.find('.content-element').eq(active).removeClass('active');
      setDesignBackground(next);
      updateCounter(next);
      designList.find('.content-element').eq(next).addClass('active').hide();
      designList.find('.content-element').eq(next).fadeIn(animationDuration);
    });
  }

  //Change Design slide
  function changeDesignSlide(elem) {
    let activeElem = getIndexDesign('active'),
        nextElem;
    if (elem || elem === 0) { nextElem = elem; }
    else { nextElem = getIndexDesign(); }
    setActiveDesignElem(activeElem, nextElem);
  }

  // Design controls listener - prev
  $('#design-prev').on('click', function(event) {
    event.preventDefault();
    let nextElem = getIndexDesign('prev');
    stopSlider('design');
    changeDesignSlide(nextElem);
    startSlider('design');
  });
  // Design controls listener - next
  $('#design-next').on('click', function(event) {
    event.preventDefault();
    let nextElem = getIndexDesign();
    stopSlider('design');
    changeDesignSlide(nextElem);
    startSlider('design');
  });

  /**
   * Design slider - end
  */

  /**
   * Community slider - begin
  */

  /**
   * Community slider - end
  */

  updateCounter(0); // Set starting value of design slider counter
  startSlider('design');
});