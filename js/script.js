$(function() {
  const intervalTime = 5000, //slide display time
        animationDuration = 500,
        designImageSrc = 'images/iphone',
        counter = $('#counter');

  let designs,
      designList = $('#design .content'),
      designContainer = $('#design .container'),
      numDesignContent = designList.find('.content-element').length, // number of slides
      community,
      communityList = $('#community .community-images'),
      numCommunity = communityList.find('.images').length; // number of slides

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

  //Toggle special class menu while scrolling page
  $(window).scroll(function() {
		if ($(this).scrollTop() > 90) {
			$("nav.navbar-fixed-top").addClass('sticky');
		} else {
			$("nav.navbar-fixed-top").removeClass('sticky');
		}
	});

  /**
   * Design slider - begin
  */

  // Sliders control
  function startSlider(slider) {
    if (slider === 'design' || slider === 'both') {
      designs = setInterval(changeDesignSlide, intervalTime);
    }
    if (slider === 'community' || slider === 'both') {
      community = setInterval(changeCommunitySlide, intervalTime);
    }
    return;
  }

  function stopSlider(slider) {
    if (slider === 'design') {
      clearInterval(designs);
    } else if (slider === 'community') {
      clearInterval(community);
    }
    return;
  }

  /**
   * Design slider - begin
  */

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

  //Getting index of images
  function getIndexCommunity(elem) {
    if (elem === 'active') {
      return communityList.find('.images.active').index();
    } else if (elem === 'prev') {
      let activeElem = getIndexCommunity('active');
      if (activeElem === 0) {
        return numCommunity - 1;
      } else {
        return activeElem - 1;
      }
    } else {
      let activeElem = getIndexCommunity('active');
      if (activeElem === (numCommunity - 1)) {
        return 0;
      } else {
        return activeElem + 1;
      }
    }
  }
  function setActiveCommunityElem(active, next) {
    communityList.find('.images').eq(active).fadeOut(animationDuration, () => {
      communityList.find('.images').eq(active).removeClass('active');
      communityList.find('.images').eq(next).addClass('active').hide();
      communityList.find('.images').eq(next).fadeIn(animationDuration);
    });
  }

  //Change Community slide
  function changeCommunitySlide(elem) {
    let activeElem = getIndexCommunity('active'),
        nextElem;
    if (elem || elem === 0) { nextElem = elem; }
    else { nextElem = getIndexCommunity(); }
    setActiveCommunityElem(activeElem, nextElem);
  }

  // Community controls listener - prev
  $('#community-prev').on('click', function(event) {
    event.preventDefault();
    let nextElem = getIndexCommunity('prev');
    stopSlider('community');
    changeCommunitySlide(nextElem);
    startSlider('community');
  });
  // Community controls listener - next
  $('#community-next').on('click', function(event) {
    event.preventDefault();
    let nextElem = getIndexCommunity();
    stopSlider('community');
    changeCommunitySlide(nextElem);
    startSlider('community');
  });

  /**
   * Community slider - end
  */

  updateCounter(0); // Set starting value of design slider counter
  startSlider('both');
});