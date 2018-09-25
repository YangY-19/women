$(document).ready(function () {
  const map_opt = {0:'A', 1:'B', 2:'C'};
  const winHight = $(window).height();
  let sjCount = 0;
  let sjIsFinished = 0; 
  let topic = 0;
  // 人物升级

 

  function shengjidata(classData) {
    $('.item-wrap').data('zhuanye', data.daoju[classData][10]['major']);
    $('.ren').addClass(classData + '-ren');
    $('.ren-daer').addClass(classData + '-daer')
    $('.ren-dasan').addClass(classData + '-dasan')
    $('.main-zhi').addClass('main-zhi2')
// 点击考试 跳转
    $('.shengji-kaoshi').on('click', function () {
      topic = 0;
      sjCount = 0;
      sjIsFinished = 0;
      $('.dq-daer, .dq-dasan,.result-flag-daer,.result-flag-dasan, .ren-daer, .result-renwu-box').hide();
      $('.result-flag-dayi, .ren, .main-ti, .main-mei').show();
      const $t = $(this);
      const $li = $t.closest('li');
      $li.next().show()
        .closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' });
      let sjNewdata = data.daoju[classData][0]
      sjInitData(sjNewdata)
      $('.num-count .total').text('10');
      $('.dq-dayi, .abandon').velocity('fadeIn');
    })
    

//点击选项
    $('.answer-upgrade').on('click','.opt', function () {
      sjCount++;
      if (sjCount > 10) {
        sjCount = '10'
      }
      const $t = $(this);
      if ($(this).data('opt') === $('.answer-upgrade').data('sjcorrect')) {  //判断人物点击的答案和正确答案是否一样
        renwucorrect($t)
      } else {
        renwuwrong($t);
      }
    })

//正确时显示
   function renwucorrect($t) {
     topic++;
     $t.find('.animation-correct').velocity('fadeIn', {
        duration: 700,
        complete: function () {
          const $t = $(this);
          let sjNewdata = data.daoju[classData][sjCount];
          $t.velocity('fadeOut');
          sjInitData(sjNewdata)
        }
      })
     $('.answer-upgrade-bg').addClass('answer-bg' + topic)
     //当前年级显示
     if (topic > 10) {
       topic = '10'
     }
     $('.topic-corect .topic-num').text(topic)
     if (topic == 4) {
       $('.dq-class .dq-dayi').velocity('fadeOut', {
         complete: function () {
           $('.dq-class .dq-daer').velocity('transition.shrinkIn')
         }
       })
     } else if (topic == 8) {
       $('.dq-class .dq-daer').hide();
       $('.dq-class .dq-dasan').show();
     }
    }

//错误时显示
    function renwuwrong($t) {
      $t.find('.animation-wrong').velocity('transition.shrinkIn', {
        duration: 700,
        complete: function () {
          const $t = $(this);
          let sjNewdata = data.daoju[classData][sjCount];
          $t.velocity('fadeOut');
          sjInitData(sjNewdata)
        }
      })
    }

//放弃回答
    $('.abandon').on('click', function() {
      $('.topic-corect .topic-num').text('0')
      $('.slide').css({ transform: 'translateY(' + -winHight + 'px)' });
    })

 //数据加载 
    function sjInitData(sjNewdata) {
      if (sjIsFinished == 10) {
        $('.result-title3 span').text(topic)
        $('.result-renwu-box').velocity('fadeIn', {
          complete: function () {
            let $t = $(this);
            if (topic >= 4 && topic < 8) {
              $('.result-flag-daer, .daer, .ren-daer, .daer-paibian').show();
              $('.result-flag-dayi, .result-flag-dasan, .dayi, .ren, .main-ti, .main-mei').hide();

            } 
             if (topic >= 8) {
               $('.result-flag-dayi, .result-flag-daer, .shengji-kaoshi, .dayi, .daer, .ren, .ren-daer, .main-ti, .main-mei, daer-paibian').hide();
               $('.result-flag-dasan, .shengji-biye, .dasan, .ren-dasan, dasan-paibian').show();
               $('.main-de').addClass('dasan-paibian')
            }
            setTimeout(() => {
              $('.slide').css({ transform: 'translateY(' + -winHight + 'px)' });
            }, 1000)
            $('.shengji-arrows').velocity('fadeIn', {
              complete: function () {
                let $t = $(this);
                setTimeout(() => {
                  $t.velocity('fadeOut')
                },2500)
              }
          });

          }
        })
      }
      sjIsFinished++;
      if (sjIsFinished >= 10) {
        sjIsFinished = '10'
      }
      $('.upgrade-count .number').text(sjIsFinished)
      $('.answer-upgrade .title').text(sjNewdata.question); //题目
      $('.answer-upgrade .opt .opt_span').each(function (index, item) {  //选项
        const $item = $(item)
        $item.text(sjNewdata.opitions[map_opt[index]]);
      })
      $('.answer-upgrade').data('sjcorrect', sjNewdata.correct); //绑定正确答案到'.answer-box' 上
      
     
    }
  }

  $('.choose-dm').on('click', function () {
    shengjidata('dongman');
  })
  $('.choose-jy').on('click', function () {
    shengjidata('jiying')
    
  })
  $('.choose-rj').on('click', function () {
    shengjidata('ruanjian')
    $('.ren').addClass('ruanjian-ren').removeClass('animation-renwu');
  })


  $('.shengji-biye').on('click', function () {
    const $t = $(this);
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -winHight * 3 + 'px)' }).children('.biye-name').show();
  })


  function addName(nameNum, $t) {
    $('.nameInput').hide()
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -winHight * 4 + 'px)' }).children('.byzs').show();
    $('.uers-name, .uers-name2').text(nameNum);
    var zhuanyeData = $('.item-wrap').data('zhuanye');
    $('.uers-major, .uers-major2').text(zhuanyeData)
  }

  $('.notarize-name').on('click', function () {
    let nameValue = $('.nameInput').val();
    var myReg = /^[\u4e00-\u9fa5]+$/;
    if (myReg.test(nameValue) && nameValue.length >= 2 && nameValue.length < 5) {
      const $t = $(this);
      // const $nbsp = $('.nbsp').html();
      if (nameValue.length == 2) {
        var nameValue2 = nameValue.charAt(0) + '  ' + nameValue.charAt(1)
        addName(nameValue2, $t);
      } else {
        addName(nameValue, $t);
      }
    } else {
      $('.name-wrong').show()
    }
    setTimeout(() => {
      $('.dyzs-share, .byzs-revampImg').hide();
      $('.topMusic').hide()
    }, 5000);
    setTimeout(() => {
      $('.photo-title').velocity('transition.flipBounceXOut')
    },2000 );
  })
  //更换毕业证书
  let $byzsChoose = $('.swiper-wrapper li')
  $byzsChoose.on('click', 'img', function () {
    let bgImg = $(this).attr("src");
    $('.swiper-container, .top200, .change-byzs-info, .uers-photo2, .photohide2 ').show()
    $('.byzs-choose').hide();  
    $('.byzsImg').attr('src', bgImg)
  })
  $('.top200').on('click',function() {
    $(this).hide();
    $('.change-byzs-info, .uers-photo2, .photohide2').hide()
    $('.revamp-school, .byzs-choose, .swiper-wrapper, .swiper-container').show()
  })

  $('.uers-name, .uers-school, .byzs-wrapper').on('click', function () {
    $('.revamp-school, .byzs-choose, .swiper-wrapper, .swiper-container').show()
    $('.top200').hide()
  })


  $('.notarize-revamp ').on('click', function () {
    var myReg = /^[\u4e00-\u9fa5]+$/;
    let $revampSchool = $('.revampSchool').val();
    let $revampName = $('.revampName').val();
    if (myReg.test($revampName)  && $revampName.length >= 2 ) {
      if ($revampName.length == 2) {
        let $revampName2 = $revampName.charAt(0) + '    ' + $revampName.charAt(1)
        $('.uers-name').text($revampName2);
      } else {
        $('.uers-name').text($revampName);
      }
    }
    if (myReg.test($revampSchool) && $revampSchool.length >= 4) {
      $('.uers-school').text($revampSchool);
    }
    $('.revamp-school, .byzs-choose').hide();
    
  })

  $('.preview-revamp').on('click', function () {
    var myReg = /^[\u4e00-\u9fa5]+$/;
    let $revampSchool = $('.revampSchool').val();
    let $revampName = $('.revampName').val();
    if (myReg.test($revampName) && $revampName.length >= 2) {
      if ($revampName.length == 2) {
        let $revampName2 = $revampName.charAt(0) + '    ' + $revampName.charAt(1)
        $('.uers-name2').text($revampName2);
      } else {
        $('.uers-name2').text($revampName);
      }
    }
    if (myReg.test($revampSchool) && $revampSchool.length >= 4) {
      $('.uers-school2').text($revampSchool);
    }
  })

  $("#photoInput, #photoInput2").change(function () {
    var objUrl = getObjectURL(this.files[0]);
    if (objUrl) {
      $("#upphoto, #upphoto2").attr("src", objUrl);
      $("#upphoto, .urlhide").removeClass("urlhide");
    }
  });
  //建立一個可存取到該file的url
  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
      url = window.createObjectURL(file);
    }
    else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    }
    else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

})