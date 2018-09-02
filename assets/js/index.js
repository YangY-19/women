$(document).ready(function () {
  let index = 0;
  let mstop = 1;
  let pics_lenght = pics.length;

  //01 - loading页面
  for (let i = 0; i < pics_lenght; i++) {
    const img = new Image();
    img.src = pics[i];
    img.onload = function () {
      index++;
      let percent = Math.floor(index / pics_lenght * 100);
      const percentText = percent + '%';
      $('.loading-text-bg').css("width", percentText);
      $('.loading-percent').text(percentText);
      if (percent == 100) {
        $('.loading').hide();
        $('.cover').show();
        setTimeout(function () {
          $('.cover-text').addClass("cover-text-am")
        }, 2000);
        setTimeout(function () {
          $('.coverArrows').addClass("coverArrows-flash")
        }, 11000);
      }
    };
  };
  $('.loading-yun-img').animate({ left: "-800px" }, 21000);

  //01 - cover页面
  $('.feidie').on('click', function () {
    $('.guang').hide();
    const _this = $(this)
    setTimeout(function () {
      _this.addClass('feidie-go');
      feidieguang()
    }, 500)
  })
  function feidieguang() {
    var myAuto = document.getElementById('myfeifei');
    myAuto.play();
  }
  $('.feidie').on('click', function () {
    $('.cover-text').animate({ opacity: "0" }, 2000);
    setTimeout(function () {
      $('.cover').animate({ opacity: "0" }, 4000);
    }, 4000);
    setTimeout(function () {
      $('.cover').hide();
      $('.choose').show();
      $('.choose').animate({ opacity: "1" }, 2000);
    }, 4000);
    // 4000
  });

  //03 - choose页面
  const WinHeight = -$(window).height()
  function handleClass() {
    $('.choose-jy').closest('li').siblings().hide()
      .end().next().show()
      .end().closest('.item-wrap').css({ 'transform': 'translateY(' + WinHeight + 'px)' });
      setTimeout(function() {
        $('.main-masking').hide();
      }, 4000)//4000
      setTimeout(function () {
        $('.de-arrows').hide();
      }, 6000)//6000
   }


  $('.choose').on('click', '.choose-dm', function () {
    handleClass();
    $('.className').html('动漫一班').addClass('classNameAn');
  });
  $('.choose').on('click', '.choose-jy', function () {
    $(this).closest('li').siblings().hide()
    handleClass();
    $('.className').html('计应一班').addClass('classNameAn');
  });
  $('.choose').on('click', '.choose-rj', function () {
    $(this).closest('li').siblings().hide()
    handleClass();
    $('.className').html('软件一班').addClass('classNameAn');
  });

  //04 -- 答题页
  $('.main').on('click','.ac-shoose', function () {
    var $t = $(this);
    var $li = $t.closest('li');
    var index = $li.index() - 1;
    
    $li.next().show()
       .closest('ul').css({ transform : 'translateY(' +-$(window).height() * index+'px)' });
  })
  //音乐控制
  $('.topMusic').on('click', function () {
    if (mstop == 1) {
      $(this).removeClass("MusiStop");
      autoPlay();
      mstop = 0;
    } else {
      $(this).addClass("MusiStop");
      closePlay();
      mstop = 0;
    }
  })

  function autoPlay() {
    var myAuto = document.getElementById('myaudio');
    myAuto.play();
  }
  function closePlay() {
    var myAuto = document.getElementById('myaudio');
    myAuto.pause();
  }
})