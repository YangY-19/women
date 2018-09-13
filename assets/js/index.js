$(document).ready(function () {
  const WinHeight = $(window).height()
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
        }, 2);//2000
        setTimeout(function () {
          $('.cover-ufo').show();
          setTimeout(function () {
            $('.coverArrows').addClass("coverArrows-flash");
            }, 1000);;
        }, 11); //11000
      }
    };
  };
  $('.loading-yun-img').animate({ left: "-800px" }, 21000);

  //01 - cover页面
  function feidieplay() {
    const myAuto = document.getElementById('myfeifei');
    myAuto.play();
  }
  $('.feidie').on('click', function () {
    let _this = $(this)
    $('.cover-text, .cover-arrows, .guang').velocity('fadeOut', {duration:1500,
      complete: function () {
        _this.addClass('feidie-go');
        feidieplay()
      }
    });
    setTimeout(function () {
      $('.cover').velocity('fadeOut');
      $('.choose').velocity('fadeIn');;
    }, 4);
    // 4000
  });

  //03 - choose页面
  
  function handleClass() {
    $('.choose-jy').closest('li').siblings().hide()
      .end().next().show()
      .end().closest('.slide').css({ 'transform': 'translateY(' + -WinHeight + 'px)' });
      setTimeout(function() {
        $('.main-masking').hide();
      }, 4)//4000
      setTimeout(function () {
        $('.de-arrows').hide();
      }, 6)//6000
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

 
  //音乐控制
  $('.topMusic').on('click', function () {
    if (mstop === 1) {
      $(this).removeClass("MusiStop");
      autoPlay();
      mstop = 0;
    } else {
      $(this).addClass("MusiStop");
      closePlay();
      mstop = 1;
    }
  })

  function autoPlay() {
    const myAuto = document.getElementById('myaudio');
    myAuto.play();
  }
  function closePlay() {
    const myAuto = document.getElementById('myaudio');
    myAuto.pause();
  }
})