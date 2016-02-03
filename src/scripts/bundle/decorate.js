'use strict';

import $ from 'jquery';
import parser from 'gitignore-parser';

export function decorate(opt) {
  let url =  '/' + [opt.group, opt.repo, 'raw', opt.branchName, '.prignore'].join('/');
  $.ajax({url}).then(data => {
    let ignore = parser.compile(data);
    $('.file-header').each((i, elm) => {
      let filepath = $(elm).attr('data-path');
      ignore.denies(filepath) && hide($(elm));
    });
  });

  $('.file-header').each((i, elm) => {
    let $elm = $(elm);
    let $button = $('<span class="prignore-button octicon">').addClass('octicon-diff-removed').text('-');
    $button.css('color', '#888');
    $button.css('display', 'inline-block');
    $button.css('width', '24px');
    $button.css('height', '32px');
    $button.css('font-size', '20px');
    $button.css('text-align', 'center');
    $button.css('vertical-align', 'top');
    $button.css('cursor', 'pointer');
    $button.css('margin-right', '5px');
    $button.css('-webkit-user-select', 'none');
    $button.on('click', () => {
      if($button.hasClass('octicon-diff-added')) {
        show($elm);
      }else{
        hide($elm);
      }
    });
    $elm.find('.file-info').prepend($button);
  });
};

let hide = $elm => {
  $elm.find('.prignore-button').removeClass('octicon-diff-removed').addClass('octicon-diff-added').text('+')
  $elm.next().hide();
};

let show = $elm => {
  $elm.find('.prignore-button').removeClass('octicon-diff-added').addClass('octicon-diff-removed').text('-');
  $elm.next().show();
};

