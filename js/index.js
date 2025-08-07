var ROOT_URL = "https://pageone.com.vn/";
/////////////////////////////// carousel //////////////////////////
$(document).ready(function () {
  let owlCarouselFunction = (element, numDesk = 1, numMobile = 1, loop = false, autoplay = false, nav = true, dots = false, margin = 0, stagePadding = 0, lazyLoad = true) => {
    var carousel = $(`.${element} .owl-carousel`);
    carousel.owlCarousel({
      center: false,
      loop: loop,
      margin: margin,
      stagePadding: stagePadding,
      autoplay: autoplay,
      navSpeed: 800,
      autoplaySpeed: 800,
      nav: nav,
      dots: dots,
      autoplayTimeout: 5000,
      lazyLoad: lazyLoad,
      lazyLoadEager: 1,
      navText: [
        '<i class="fal fa-angle-left" aria-hidden="true"></i>',
        '<i class="fal fa-angle-right" aria-hidden="true"></i>'
      ],
      navContainer: `.${element} .custom-nav`,
      responsive: {
        0: {
          items: numMobile,
        },
        767: {
          items: numDesk,

        }
      }
    });
  }
  owlCarouselFunction('slider_desktop', 1, 1, true, true, false, true);
  owlCarouselFunction('slider_cat', 1, 1, true, true, true, false);
  owlCarouselFunction('slider_cat_m', 1, 1, true, true, false, false, 10, 50);
  //owlCarouselFunction('slider_feedback', 1, 1, true, true, true, false);
  owlCarouselFunction('slider_expert', 1, 1, true, true, true, false);
  owlCarouselFunction('carousel_edu', 9, 5, true, true, false, false, 10);
  owlCarouselFunction('carousel_ho', 6, 3, true, true, true, false, 10);
  owlCarouselFunction('carousel_action', 5, 3, true, true, true, false, 10);

  $('.slider_feedback .owl-carousel').owlCarousel({
    center: false,
    loop: true,
    autoplay: false,
    navSpeed: 800,
    autoplaySpeed: 800,
    nav: true,
    dots: false,
    autoplayTimeout: 5000,
    lazyLoad: true,
    lazyLoadEager: 1,
    navText: [
      '<i class="fal fa-angle-left" aria-hidden="true"></i>',
      '<i class="fal fa-angle-right" aria-hidden="true"></i>'
    ],
    navContainer: '.slider_feedback .custom-nav',
    responsive: {
      0: {
        items: 1,
        margin: 10,
        stagePadding: 50
      },
      767: {
        items: 1

      }
    }
  });
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('header').addClass('fixed');
    } else {
      $('header').removeClass('fixed');
    }
  });
  $('.visible').on('click', function () {
    let input = $(this).prev();
    if (input.attr('type') === 'password') {
      input.attr('type', 'text');
    } else if (input.attr('type') === 'text') {
      input.attr('type', 'password');
    }
  });



  //// cart ///////////
  $('.page_pay').hide();
  $('.go_payment').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 0, function () {
      $('.page_cart').fadeOut(function () {
        $('.page_pay').fadeIn();
      });
    });
  });

  $('.back_page_cart').click(function () {
    $('.page_pay').fadeOut(function () {
      $('.page_cart').fadeIn();
    });
  });


  $('.slider_about .owl-carousel').owlCarousel({
    center: false,
    loop: true,
    margin: 15,

    autoplay: false,
    navSpeed: 800,
    autoplaySpeed: 800,
    nav: true,
    dots: true,
    autoplayTimeout: 5000,
    lazyLoad: true,
    lazyLoadEager: 1,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    navContainer: '.slider_about .custom-nav',
    responsive: {
      0: {
        items: 2,
        stagePadding: 80
      },
      767: {
        items: 3,
        stagePadding: 0

      }
    }
  });
  ////////// owl carousel thumbnail //////////////
  var bigimage = $('.carousel_3 .owl-carousel');
  var thumbs = $('.carousel_4 .owl-carousel');
  //var totalslides = 10;
  var syncedSecondary = true;

  bigimage
    .owlCarousel({
      items: 1,
      slideSpeed: 3000,
      nav: false,
      autoplay: false,
      dots: false,
      loop: true,
      lazyLoad: true


    })
    .on("changed.owl.carousel", syncPosition);

  thumbs
    .on("initialized.owl.carousel", function () {
      thumbs
        .find(".owl-item")
        .eq(0)
        .addClass("current");
    })
    .owlCarousel({
      items: 4,
      dots: false,
      nav: false,
      loop: false,
      smartSpeed: 200,
      slideSpeed: 500,
      margin: 10,
      slideBy: 4,
      touchDrag: false,
      mouseDrag: false,
      lazyLoad: true
    })
    .on("changed.owl.carousel", syncPosition2);

  function syncPosition(el) {
    var count = el.item.count - 1;
    var current = el.item.index;

    // If there are only 2 items, directly handle the index.
    if (el.item.count === 2) {
      current = el.item.index % 2;
    } else {
      current = Math.round(el.item.index - el.item.count / 2 - 0.5);
    }

    if (current < 0) {
      current = count;
    }
    if (current > count) {
      current = 0;
    }
    //to this
    thumbs
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = thumbs.find(".owl-item.active").length - 1;
    var start = thumbs
      .find(".owl-item.active")
      .first()
      .index();
    var end = thumbs
      .find(".owl-item.active")
      .last()
      .index();

    if (current > end) {
      thumbs.data("owl.carousel").to(current, 100, true);
    }
    if (current < start) {
      thumbs.data("owl.carousel").to(current - onscreen, 100, true);
    }
  }

  function syncPosition2(el) {
    if (syncedSecondary) {
      var number = el.item.index;
      bigimage.data("owl.carousel").to(number, 100, true);
    }
  }

  thumbs.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    bigimage.data("owl.carousel").to(number, 300, true);
  });
  ////////// end owl carousel thumbnail //////////////


  $(document).ready(function () {

    $('ul.tabs li').click(function () {
      var tab_id = $(this).attr('data-tab');

      $('ul.tabs li').removeClass('current');
      if (document.documentElement.clientWidth > 797) {
        $('.tab-content').removeClass('current');
      }
      else {
        $('.tab-content').removeClass('currentm');
      }

      $(this).addClass('current');
      if (document.documentElement.clientWidth > 797) {
        $("#" + tab_id + "d").addClass('current');
      }
      else {
        $("#" + tab_id).addClass('currentm');
      }
    });
  });


  $(document).ready(function () {

    $('ul.tabs_faqs li').click(function () {
      var tab_id = $(this).attr('data-tab');

      $('ul.tabs_faqs li').removeClass('current');

      $('.tab-content').removeClass('current');

      $(this).addClass('current');

      $("#" + tab_id).addClass('current');
    });
  });


  $(document).ready(function () {

    $('ul.tabs_pro_detail li').click(function () {
      var tab_id = $(this).attr('data-tab');
      $('ul.tabs_pro_detail li').removeClass('current');
      $('.tab-content').removeClass('current');
      $(this).addClass('current');
      $("#" + tab_id).addClass('current');
    });
  });



  ////////////////////////////////////SCROLL//////////////////////////
  $(window).bind('scroll', function () {
    if ($(window).scrollTop() > 900) {
      $('.tab_scroll').addClass('fixed');
      $('.pr_scroll').addClass('fixed2');
      $('.pr_scroll').show();

    } else {
      $('.tab_scroll').removeClass('fixed');
      $('.pr_scroll').removeClass('fixed2');
      $('.pr_scroll').hide();
    }
  });

  $(".tab_con").click(function () {
    $('html, body').animate({
      scrollTop: $(".top_3").offset().top
    }, 500);
  });
  ////////////////////////////////////    Make head of dropdown link clickable in navbar    //////////////////////////
  $('.navbar-collapse .dropdown-toggle').hover(function () {
    if (document.documentElement.clientWidth > 797) {
      $(this).addClass('disabled');
    }
    else {
      $(this).removeClass('disabled');
    }
  });

  $(window).on("orientationchange", function (event) {
    $('.navbar-collapse .dropdown-toggle').click(function () {
      $(this).removeClass('disabled');
    });
  });


  ////////////////////////////////////    amination dropdown menu    //////////////////////////

  if (document.documentElement.clientWidth > 767) {
    $(".dropdown").hover(
      function () {
        $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).fadeIn(500);
        $(this).toggleClass('open');
      },
      function () {
        $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true, true).fadeOut(100);
        $(this).toggleClass('open');
      }
    );
  }
  ////////////////  animate dropdown menu mobile ////////////
  $(document).ready(function () {
    $('.dropdown')
      .on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
      })
      .on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, false).slideUp(300, function () {
          $(this).parent().removeClass('open');
        });
      })
      .on('hidden.bs.dropdown', function () {
        $(this).addClass('open');
      });
  });

});

/////////////   Lazy load   /////////////////
$(function () {
  $('.lazy').lazy({
    effect: "fadeIn",
    effectTime: 500,
    threshold: 0
  });
});
$(function () {
  $('.lazy2').lazy({
    effect: "fadeIn",
    threshold: 500,
  });
});
////////////////* phu luc *///////////////
$(".phu_luc .show_hide").click(function () {
  var lable = $(".show_hide").html();
  //alert(lable);

  if (lable == '<i class="fa fa-chevron-up" aria-hidden="true"> </i>') {
    $(".show_hide").html('<i class="fa fa-chevron-down" aria-hidden="true"> </i>');
    $(".table_content").slideUp(200);
  } else {
    $(".show_hide").html('<i class="fa fa-chevron-up" aria-hidden="true"> </i>');
    $(".table_content").slideDown(400);
  }

});
$(document).on('click', '.phu_luc a[href^="#"]', function (event) {
  //event.preventDefault();
  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 100
  }, 1000);
});
$(document).ready(function () {
  $('body .pcontent .phu_luc ul li').first().addClass('current');
  $('body .pcontent .phu_luc ul li').hover(function () {
    $('body .pcontent .phu_luc ul li').removeClass('current');
    $(this).addClass('current');
  }, function () {
    $(this).removeClass('current');
  });
});
////////////////load more////////////////////
$(document).ready(function () {
  loadMore = (btnLoad, tabId, element, num) => {
    let ele = "#" + tabId + " ." + element;
    let hidden = ele + ':hidden';
    let btn = "#" + tabId + " ." + btnLoad;
    if ($(ele).length <= num) {
      $(btn).hide();
    }
    $(ele).slice(num).hide();
    $(btn).on("click", function (e) {
      e.preventDefault();
      $(hidden).slice(0, num).slideDown(100);
      if ($(hidden).length == 0) {
        $(btn).hide();
      }
    });
  }
  loadMore('loadmore', 'news_list', 'block_news', 10);
})
//////////   menu mobile /////////
function open_search_mobile() {
  close_click_buy();
  $(".search_mobile").slideToggle();
  if ($('#close_search_mobile_body').length) {
    $("#close_search_mobile_body").remove();
  } else {
    $("body").append('<div id="close_search_mobile_body" onclick="close_search_mobile()"></div>');
    $('.search_mobile .input_text_search').focus();
  }
}

function close_search_mobile() {
  $(".search_mobile").slideUp();
  $("#close_search_mobile_body").remove();
  close_click_buy();
}

function open_menu(element) {
  close_search_mobile()
  $("." + element).css({ "right": "0px", "transition": "0.5s" });
  $("." + element).after('<div class="close_menu_body" onclick="close_menu()"></div>');
  $("." + element).addClass('active');
  $('.icon_menu').html('<a href="javascript:void(0);" onclick="close_menu()"><img src = "images/index_55.svg" alt = "img" title = "img" class= "img-responsive icon_menu" /></a > ');
  //$(".input_search").focus();
}

function close_menu() {
  $(".menu").css({ "right": "-330px" });
  $(".close_menu_body").remove();
  $(".navbar-ex1-collapse").removeClass('active');
  $(".sidebar_left").css({
    "right": "-300px"
  });
  $(".sidebar_left").removeClass('active');
  $('.icon_menu').html('<a href="javascript:void(0);" onclick="open_menu(\'navbar-ex1-collapse\')"><img src = "images/pageone_38.svg" alt = "img" title = "img" class= "img-responsive icon_menu" /></a > ');
}
function close_click_buy() {
  $('.bl_click_buy').css({ 'bottom': '-500px', "transition": "all ease 0.5s" });
  $(".bg_close_click_buy").remove();
  $(".popup_add_to_cart").hide();
  $('#btn_contact #menu-open').prop('checked', false);
  $("#btn_contact .owl-carousel").trigger('play.owl.autoplay', [1000]);
}

$(".btn_buy_popup").click(function (e) {
  e.preventDefault();
  close_click_buy();
  $('.bl_click_buy').css({ 'bottom': '0px', "transition": "all ease 0.5s" });
  $("body").append('<div class="bg_close_click_buy" onclick="close_click_buy()"></div>');
});
$(".btn_close_click_buy").click(function (e) {
  close_click_buy();
});
function open_filter() {
  $(".sidebar_left").css({
    "right": "0px"
  });
  $("body").append('<div class="close_menu_body" onclick="close_menu()"></div>');
  $(".sidebar_left").addClass('active');
}


////////////////    Fade in Caption Carousel    //////////////////////
$(document).ready(function () {
  var $carousel = $('#myCarousel');
  var $carouselCaptions = $carousel.find('.item .carousel-caption');
  var $carouselImages = $carousel.find('.item img');
  var carouselTimeout;

  $carousel.on('slid.bs.carousel', function () {
    var $item = $carousel.find('.item.active');
    carouselTimeout = setTimeout(function () { // start the delay
      carouselTimeout = false;
      $('.carousel-caption', $item).animate({ 'opacity': 1 }, 1000);
      //$('img', $item).animate({'opacity': 1}, 500);
    }, 100);
  }).on('slide.bs.carousel', function () {
    if (carouselTimeout) { // Carousel is sliding, stop pending animation if any
      clearTimeout(carouselTimeout);
      carouselTimeout = false;
    }
    // Reset styles
    $carouselCaptions.animate({ 'opacity': 0 }, 500);
    $carouselImages.animate({ 'opacity': 1 }, 500);
  });;

  $('#myCarousel').carousel({
    interval: 5000,
    cycle: true,
    pause: "false",
  }).trigger('slid.bs.carousel');

  /////////   Click to top     ///////////////////
  var btn = $('#button');
  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });
})

/* ///////  rating  ////////// */
$('.rating').rating();
$('.rating_detail').rating({
  extendSymbol: function (rate) {
    $(this).tooltip({
      container: 'body',
      placement: 'top',
      title: rate + ' Sao'
    });
  }
});
$(document).ready(function () {
  $(".rating-symbol").click(function () {
    var point = $('.rating_detail').val();
    var alias = $('#alias').val();
    var rating = point;
    var link = "/rating.ajax/" + alias + "/" + rating;
    console.log(link);
    $.get(link).done(function (data) {
      $("#view-rating").html(data);
    });
  });

  function setCookie(name, value, days) {
    var expires;
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return false;
  }

  if (!readCookie("rating")) {
    //code init rating
  }
  setCookie("rating", 6, 6);

});
$(document).ready(function () {
  $(document).on('click', 'a.btn_click', function (e) {
    console.log(12345);
    //event.preventDefault();
    $('.close_menu_body').trigger('click');
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 100
    }, 1000);
  });
  $(".fancybox").fancybox({
    padding: 0,
    scrolling: 'auto',
    openEffect: 'elastic',
    closeEffect: 'elastic',
    afterClose: function () {
    }
  });

  ////////////////Popup Cart///////////////////////
  const showPopup = () => {
    clearTimeout($('.shopping_cart').data('timeoutId'));
    $('.popup_cart').stop(true, true).fadeIn();
  }

  const hidePopup = () => {
    let timeoutId = setTimeout(function () {
      $('.popup_cart').fadeOut();
    }, 500);
    $('.shopping_cart').data('timeoutId', timeoutId);
  }

  $('.shopping_cart, .popup_cart').hover(showPopup, hidePopup);
  $('.nav-pills li').click(function () {
    $(this).find('input[type=radio]').prop('checked', true);
  });


  $(document).on("click", ".add_to_cart", function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
    let num = $(this).attr('data-num');
    if (!num) {
      num = 1;
    }
    $.ajax({
      url: ROOT_URL + "index.php?module=ajaxCart",
      type: "POST",
      data: { "action": "addCart", "id": id, "num": num },
      success: function (data) {
        openFancyPopup('#popup-noti', 'Thêm vào giỏ hàng thành công !', 2000);
        loadInfoCart('count');
        loadInfoCart('loadInfoCart');
      }
    });
  });
  $(document).on("click", ".del_cart", function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');
    $.ajax({
      url: ROOT_URL + "index.php?module=ajaxCart",
      type: "POST",
      data: {
        "action": "delCart",
        "id": id
      },
      success: function (data) {
        loadInfoCart('count');
        loadInfoCart('loadInfoCart');
      }
    });
  });
  $(document).on("click", ".copyVc", function (e) {
    e.preventDefault();
    let div = $(this);
    let id = div.attr('data-id');
    let btn = div.children().first();
    $.ajax({
      url: ROOT_URL + "index.php?module=ajaxCart",
      type: "POST",
      data: {
        "action": "copyVc",
        "id": id
      },
      success: function (data) {
        btn.text('Đã chép');
        div.removeAttr('class');
        div.removeAttr('data-id');
      }
    });
  });
});

const loadInfoCart = (action, data = null) => {
  $.ajax({
    url: ROOT_URL + "index.php?module=ajaxCart",
    type: "POST",
    data: { 'action': action, data },
    success: function (data) {
      if (action == 'count') {
        $(".num").text(data);
      }
      if (action == 'loadInfoCart') {
        $(".popup_cart").html(data);
      }
    }
  });
}


//loadInfoCart('count');
//loadInfoCart('loadInfoCart');

////////////////// Modal ///////////////////
const openFancyPopup = (div, str = '', time = 0) => {
  if (str !== '') {
    $(div).find('p').html(str);
  }
  $.fancybox.open({
    src: div,
    type: 'inline'
  });
  if (time !== 0) {
    setTimeout(function () {
      $.fancybox.close();
    }, time);
  }
}
const openGiftModal = () => {
  if (window.innerWidth < 768) {
    //$('#giftModal').modal('show');
    openFancyPopup('#giftModal');
  }
  close_menu();
}
const loadMemberModal = (action) => {
  $.ajax({
    url: ROOT_URL + "member/",
    type: "POST",
    data: { 'action': action },
    success: function (data) {
      if (action == 'loadInfo') {
        $('#resultMember').html(data);
      }
    }
  });
}
const openMemberModal = () => {
  //loadMemberModal('loadInfo');
  openFancyPopup('#accountModal');
  close_menu();
}
