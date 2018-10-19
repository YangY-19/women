$(document).ready(function () {
  const winHight = $(window).height()
  const map_opt = {0:'A', 1:'B', 2:'C'};
  const map_resut_text = { 'de': '忠匾', 'zhi': '屏风', 'ti': '帽子', 'mei': '玉佩', 'lao': '锐笔'};
  let daojuBtn = 0;
  let daoju;
  let count = 0;
  let number = 1;
  let correctCount = 0;
  let isFinished = 0; 
  let lock_click = true;  
  //04 -- 答题页
 //点击按钮
  $('.main').on('click', '.ac-shoose', function () {
    const $t = $(this);
    var lock = $t.data('lock')
    if (lock == 1) return false;
    count = 0;
    number = 0
    correctCount = 0;
    isFinished = 0;
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' }).children('.answer').show();
    daoju = $t.data('daoju'); //获取点击的道具
    let newData = data['daoju'][daoju][0];
    initData(newData);  //绑定数据到页面上
    $('.answer-upgrade').hide()
  })

 
  function initData(newData) {
    
    let timer;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      isFinished++;
    }, 400)
    number++
    $('.answer .title').text(newData.question); //题目
    $('.answer .opt .opt_span').each((index, item) => {
      const $item = $(item)
      $item.text(newData.opitions[map_opt[index]]); //选项
    })
    $('.answer-box').data('correct', newData.correct); //正确答案到'.answer-box' 上
    $('.num-count .number').text(number);
    
  }

  //点击选项
  
  
    $('.answer .opt').on('click', function () {
      
      $('.opt').data('lock','1')
      if (lock_click) {
        lock_click = false;  
        if ($('.opt').data('lock') == 1) {
          const $t = $(this);
          count++
          if ($(this).data('opt') === $('.answer-box').data('correct')) {  //判断道具点击的答案和正确答案是否一样
            correctCount++
            correct($t);
            $('.opt').data('lock', '0')
           
          } else {  // 错误
            wrong($t)
            $('.opt').data('lock', '0')
          }
        }
        
      }
    })
 
// 每题选择正确

  function correct ($t) {
    $t.find('.animation-correct').velocity('fadeIn', {duration: 700, 
      complete: function () {
        const $t = $(this);
        let newData = data['daoju'][daoju][count];
        $t.velocity('fadeOut');
        lock_click = true;  
        if (isFinished == 3) {
          if(correctCount >= 2) {
            correctResult(daoju)
          } else {
            wrongResult()
          }
        } else {
          initData(newData)
        }
    }})
    var lock = $t.data('lock')
    if (lock == 1) return false;
  }

  //答对两题以上的结果
  function correctResult(daoju) {
    $('.' + daoju).addClass('current-' + daoju);
    $('.result-flag').attr('class', 'result-flag result-flag-' + daoju);
    $('.result-text').text('恭喜你获得' + map_resut_text[daoju]);
    $('.resultSuccess').velocity('fadeIn', {
      complete: function () {
        const $t = $(this);
        $t.velocity('fadeOut', {
          complete: function () {
            $('.slide').css({ transform: 'translateY(' + -winHight + 'px)' });
            $('.main-' + daoju).show().velocity('transition.shrinkIn');
            $('.answer').hide();
            daojuBtn++;
          }, delay: 1500
        })
      }, duration: 1000
    })
    $('.'+ daoju).data('lock', '1');
    if (daojuBtn === 4) {  //入学通知显示
      setTimeout(function () {
        ruxuetongzi();
      }, 4000);
    }
  }

// 每题选择错误
  function wrong($t) {
    $t.find('.animation-wrong').velocity('fadeIn', { duration: 700,
      complete: function () {
        const $t = $(this);
        let newData = data['daoju'][daoju][count];
        lock_click = true; 
        if (isFinished == 3) {
          $t.velocity('fadeOut');
          if (correctCount < 2) {
            wrongResult(daoju)
          } else {
            correctResult(daoju)
          }
        } else {
          $t.velocity('fadeOut');
          initData(newData)
        }
      }
    })
  }


  function wrongResult () {
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
  }


  //显示入学通知
  function ruxuetongzi() {
    $('.result-flag').attr('class', 'result-flag result-flag-ruxue');
    $('.result-title').text('全部解锁成功');
    $('.result-text').text('恭喜你获得入学通知书');
    $('.resultSuccess-ruxue').show().velocity('fadeIn', {
      duration: 5000,
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
  

 

    //入学通知
  let $ruxue = $('.main-ruxue');
  let $memorial = $('.memorial_up_btn');
  let $sjarrows = $('.shengji-arrows');
  let $dayi = $('.class .dayi');
  $ruxue.on('click', function () {
    $(this).closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' }).children('.ruxueongzhi').show();
    setTimeout(() => {
      setInterval(() =>{
        $memorial.velocity('transition.slideUpBigIn');
      }, 3000);
    }, 2000);
  });
  $memorial.on('click',function () {
    $(this).parents('ul').css({ transform: 'translateY(' + -winHight + 'px)' }).children('.ruxueongzhi').hide(); 
    $('.main-ruxue').hide();
    $sjarrows.show();
    $dayi.show().velocity('callout.pulse');
    $('.shengji').hide();
    $('.shengji-kaoshi').show()
    setTimeout(() => {
      $sjarrows.hide();
    }, 3000);
  })


})

