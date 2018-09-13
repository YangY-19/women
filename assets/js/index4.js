$(document).ready(function () {
// 人物升级
$('.sj-shoose').on('click', function () {
  const $t = $(this);
  // if (status.hasClass('current')) return;
  const $li = $t.closest('li');
  $li.next().show()
    .closest('ul').css({ transform: 'translateY(' + -winHight * 2 + 'px)' });
  //绑定数据到页面上
  $('.answer .title').text(data.daoju['renwu'][0]['question']); //题目
  $('.answer .opt .opt_span').each((index, item) => {
    const $item = $(item)
    $item.text(data.daoju['renwu'][0]['opitions'][map[index]]);
  })
  //绑定正确答案到'.answer-box' 上
  $('.answer').data('correct', data.daoju['renwu'][0]['correct']);
  $('.num-count .total').text('10');
  $('.dq-dayi, .abandon').velocity('fadeIn');
}) 