$(document).ready(function () {
  const map = {0:'A', 1:'B', 2:'C'};
  const winHight = $(window).height();
  // 人物升级

  function shengjidata(classData) {
    $('.sj-shoose').on('click', function () {
      const $t = $(this);
      // if (status.hasClass('current')) return;
      const $li = $t.closest('li');
      $li.next().show()
        .closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' });
    
      





      //绑定数据到页面上
      $('.answer .title').text(data.daoju[classData][0]['question']); //题目
      $('.answer .opt .opt_span').each(function (index, item) {
        const $item = $(item)
        $item.text(data.daoju[classData][0]['opitions'][map[index]]);
      })
      //绑定正确答案到'.answer-box' 上
      $('.answer').data('correct', data.daoju[classData][0]['correct']);
      alert($('.answer').data('correct'));
      $('.num-count .total').text('10');
      $('.dq-dayi, .abandon').velocity('fadeIn');
    })
  }
  
  
  $('.choose-dm').on('click', function () {
    shengjidata('dongman');
    $('.item-wrap').data('zhuanye', data.daoju['dongman'][3]['major']);
  })


  $('.choose-jy').on('click', function () {
    shengjidata('jiying')
    $('.item-wrap').data('zhuanye', data.daoju['jiying'][3]['major']);
  })

  $('.choose-rj').on('click', function () {
    shengjidata('ruanjian')
    $('.item-wrap').data('zhuanye', data.daoju['ruanjian'][3]['major']);
  })











  $('.main-lao').on('click', function () {
    const $t = $(this);
    const $li = $t.closest('li');
    $li.next().show()
      .closest('ul').css({ transform: 'translateY(' + -winHight * 3 + 'px)' }).children('.biye-name').show();
  })


  $('.notarize-name').on('click', function () {
    let nameValue = $('.nameInput').val();
    var myReg = /^[\u4e00-\u9fa5]+$/;
    if (myReg.test(nameValue) && nameValue.length >= 2 && nameValue.length < 5) {
      const $t = $(this);
      $('.nameInput').hide()
      const $li = $t.closest('li');
      $li.next().show()
        .closest('ul').css({ transform: 'translateY(' + -winHight * 4 + 'px)' }).children('.byzs').show();
      $('.uers-name').text(nameValue);
      var zhuanyeData = $('.item-wrap').data('zhuanye');
      $('.uers-major').text(zhuanyeData)
    } else {
      $('.name-wrong').show()
    }
    setInterval( () => {
      $('.dyzs-share').show();
      setTimeout(() => {
        $('.dyzs-share').hide();
      }, 2000);
    },5000)
    $('.topMusic').hide()
  })
})