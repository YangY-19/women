$(document).ready(function () {
  const winHight = $(window).height()
  const map = {0:'A', 1:'B', 2:'C'};
  const map_resut_text = { 'de': '忠匾', 'zhi': '屏风', 'ti': '帽子', 'mei': '玉佩', 'lao': '锐笔'};
  let daojuBtn = 0;
  let daoju;
  //04 -- 答题页
  //点击按钮
  $('.main').on('click', '.ac-shoose', function () {
    const $t = $(this);
    // if (status.hasClass('current')) return;
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' });
      //绑定数据到页面上
     daoju = $t.data('daoju');
    $('.answer .title').text(data.daoju[daoju][0]['question']); //题目
    $('.answer .opt .opt_span').each((index, item) => {
      const $item = $(item)
      $item.text(data.daoju[daoju][0]['opitions'][map[index]]);
     
    })
    //绑定正确答案到'.answer-box' 上
    $('.answer-box').data('correct', data.daoju[daoju][0]['correct']);
  }) 
   
  function result(daoju, $t) {
    $('.' + daoju).addClass('current-' + daoju);
    $t.find('.animation-correct').velocity('fadeIn', {
      duration: 1000, complete: function () {
        const $t = $(this);
        $t.velocity('fadeOut');
        $('.result-flag').attr('class', 'result-flag result-flag-' + daoju);
        $('.result-text').text('恭喜你获得'+ map_resut_text[daoju] );
        $('.resultSuccess').velocity('fadeIn', {
          complete: function () {
            const $t = $(this);
            $t.velocity('fadeOut', {
              complete: function () {
                $('.slide').css({ transform: 'translateY(' + -winHight + 'px)' });
                $('.main-' + daoju).show().velocity('transition.shrinkIn');
                daojuBtn++;
              }, delay: 1500
            })
          }, duration: 1000
        })
      }, duration: 2000
    });
  }
    $('.answer .opt').on('click', function () {      
      //判断点击的答案和正确答案是否一样
      if ($(this).data('opt') === $('.answer-box').data('correct')) {
        result(daoju, $(this));
      } else {
        $(this).find('.animation-wrong').velocity('fadeIn', {
          duration: 1000, complete: function () {
            const $t = $(this);
            $t.velocity('fadeOut');
            $('.tipsFailed').velocity('fadeIn', {
              complete: function () {
                const $t = $(this);
                $t.velocity('fadeOut', {
                  complete: function () {
                    $('.slide').css({ transform: 'translateY(' + -winHight + 'px)' });
                  }, delay: 1500
                })
              }, duration: 1000
            })
          }, duration: 2000
        });
      }
      //显示入学通知
      function ruxuetongzi() {
        $('.result-flag').attr('class', 'result-flag result-flag-ruxue');
        $('.result-text').text('恭喜你获得入学通知书');
        $('.resultSuccess-ruxue').show().velocity('fadeIn', {
          duration: 6000,
          complete: function () {
            const $t = $(this);
            $t.velocity('fadeOut', {
              complete: function () {
                $('.main-ruxue').show().velocity('callout.pulse');
              }, delay: 1500
            })
          }, duration: 1000
        })
      }
      if (daojuBtn === 4) {
        setTimeout( function () {
          ruxuetongzi();
        }, 4000);
      }
    })

    //入学通知
  let $ruxue = $('.main-ruxue');
  let $memorial = $('.memorial_up_btn');
  let $sjarrows = $('.shengji-arrows');
  let $dayi = $('.class .dayi');
  $ruxue.on('click', function () {
    $(this).closest('ul').css({ transform: 'translateY(' + -winHight * 3 + 'px)' }).children('.ruxueongzhi').show();
    setTimeout(() => {
      $memorial.velocity('transition.slideUpBigIn');
    }, 2000);
  });
  $memorial.on('click',function () {
    
    $(this).parents('ul').css({ transform: 'translateY(' + -winHight + 'px)' });
    $('.main-ruxue').hide();
    $sjarrows.show();
    $dayi.show().velocity('callout.pulse');;
    setTimeout(() => {
      $sjarrows.hide();
    }, 3000);
  })
})

