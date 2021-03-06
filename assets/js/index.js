$(document).ready(function () {
  const WinHeight = $(window).height()
  let index = 0;
  let mstop = 1;

  //01 - loading页面
  let pics_lenght = pics.length;
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
        }, 2000);//2000
        setTimeout(function () {
          $('.cover-ufo').show();
          setTimeout(function () {
            $('.coverArrows').addClass("coverArrows-flash");
            setTimeout(()=> {
              $('.coverArrows').hide();
            },700)
            }, 1000);;
        }, 11000);
      }
    };
  };
  $('.loading-yun-img').animate({ left: "-800px" }, 21000);     

  //02 - cover页面
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
    }, 4000);
  });

  //03 - choose页面
  
  function handleClass(chooseClass) {
    $('.choose-jy').closest('li').siblings().hide()
      .end().next().show()
      .end().closest('.slide').css({ 'transform': 'translateY(' + -WinHeight + 'px)' });
      setTimeout(function() {
        $('.main-masking').hide();
      }, 3000)
      setTimeout(function () {
        $('.de-arrows').hide();
      }, 5000)
      setInterval(function () {
        $('.ren').addClass('animation-renwu')
        setTimeout(function () {
          $('.ren').removeClass('animation-renwu')
        },500)
      },4000)
    $(this).closest('li').siblings().hide();
    $('.className').html(chooseClass).addClass('classNameAn');
   }


  $('.choose').on('click', '.choose-dm', function () {
    handleClass('动漫班');
      });
  $('.choose').on('click', '.choose-jy', function () {
        handleClass('计应班');
  });
  $('.choose').on('click', '.choose-rj', function () {
    handleClass('软件班');

  });

  $('.shengji-kaoshi').on('click', function () {
    const $t = $(this);
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -WinHeight * 3 + 'px)' }).children('.answer-upgrade').show();
  })
 
  //音乐控制
  $('.topMusic').on('click', function () {
    if (mstop === 1) {
      $(this).addClass("MusiStop");
      closePlay();
      mstop = 0;
    } else {
      $(this).removeClass("MusiStop");
      autoPlay();
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