'use strict';

import $ from 'jquery';
import parser from 'gitignore-parser';

let decoreate = (opt) => {
  let branchName = $('.gh-header-meta .commit-ref:first>span').text();
  //console.log('start: ', opt.group, opt.repo, branchName);
  let url =  '/' + [opt.group, opt.repo, 'raw', branchName, '.prignore'].join('/');
  $.ajax({url}).then(data => {
    //console.log('request ignore file:', url);
    //console.log(data);
    let ignore = parser.compile(data);

    $('.file-header').each((i, elm) => {
      let filepath = $(elm).attr('data-path');
      ignore.denies(filepath) && hide($(elm));
    });
  });

  $('.file-header').each((i, elm) => {
    let $elm = $(elm);
    let $button = $('<span class="prignore-button octicon">').addClass('octicon-diff-removed');
    $button.css('color', '#777');
    $button.css('font-size', '20px');
    $button.css('display', 'inline-block');
    $button.css('vertical-align', 'middle');
    $button.css('cursor', 'pointer');
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
  $elm.find('.prignore-button').removeClass('octicon-diff-removed').addClass('octicon-diff-added');
  $elm.next().hide();
};

let show = $elm => {
  $elm.find('.prignore-button').removeClass('octicon-diff-added').addClass('octicon-diff-removed');
  $elm.next().show();
};

let prePathname;

setInterval( () => {
  if(location.pathname !== prePathname && location.pathname.match(/\/pull\/\d+\/files$/)) {
    if(!$('#files_bucket').hasClass('prignore-marked')) {
      let matched = location.pathname.match(/([^\/]+)\/([^\/]+)\/?/);
      if(!matched) return;
      let [group, repo] = [matched[1], matched[2]];
      decoreate({group, repo});
    }
    $('#files_bucket').addClass('prignore-marked');
  }
  prePathname = location.pathname;
}, 50);

