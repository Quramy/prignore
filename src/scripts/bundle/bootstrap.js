'use strict';

import $ from 'jquery';
import {UrlWatcher} from './urlWatcher';
import {decorate} from './decorate';

let watcher = new UrlWatcher();

watcher.register(/\/pull\/\d+\/files/, pathname => {
  let matched = pathname.match(/([^\/]+)\/([^\/]+)\/?/);
  if(!matched) return;
  let [group, repo] = [matched[1], matched[2]];
  let branchName = $('.gh-header-meta .commit-ref:first>span').text();
  if($('#files_bucket').hasClass('prignore-marked--pr')) return;
  decorate({group, repo, branchName});
  $('#files_bucket').addClass('prignore-marked--pr');
});

watcher.register(/\/commit\//, pathname => {
  let matched = pathname.match(/([^\/]+)\/([^\/]+)\/?/);
  if(!matched) return;
  let [group, repo] = [matched[1], matched[2]];
  let branchName = $('.branches-list .branch:first > a').text();
  if($('#files').hasClass('prignore-marked--commit')) return;
  decorate({group, repo, branchName});
  $('#files').addClass('prignore-marked--commit');
});

watcher.start();

