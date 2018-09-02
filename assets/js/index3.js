$(document).ready(function () {

  let map = {0:'A', 1:'B', 2:'C'}
  $('.answer .title').text(data.question);
  $('.answer .opt .opt_span').each(function (index, item) {
    var $item = $(item)
    $item.text(data.opitions[map[index]]);
    $item.data('opt',map[index]);
  })
  $('.answer-box').data('correct', data.correct)
  $('.answer .opt').on('click', function() {
    if ($(this).find('.opt_span').data('opt') == $('.answer-box').data('correct')) {
      $(this).find('.animation-correct').velocity('fadeIn',{duration:1000, complete:function() {
        $('.result-success').velocity('fadeIn',{complete:function() {
          setTimeout(function() {
            $('.slide').css({transform: 'translateY(0)'})
            $('.result-success, .animation-correct, animation-wrong').velocity('fadeOut');
          },2000);
          $('.de').addClass('current');       
        }});
      }})
      $(this).css({ 'backgroundColor': "#e0ded7"});
      
     
    } else {
      $(this).find('.animation-wrong').velocity('fadeIn', {
        duration: 1000, complete: function () {
          $('.tips_failed').velocity('fadeIn', {
            complete: function () {
              setTimeout(function () {
                $('.slide').css({ transform: 'translateY(0)'})
                $('.result-success, .animation-correct, animation-wrong').velocity('fadeOut');
              }, 2000);
            }
          });
        }
      })
      $(this).css({ 'backgroundColor': "#e0ded7" });
    }
  })
})

