'use strict';

export class UrlWatcher {
  constructor() {
    this.list = [];
    this.prePathname = '';
  }

  start() {
    setInterval(() => {
      if(location.pathname === this.prePathname) return;
      //let matched = location.pathname.match(/([^\/]+)\/([^\/]+)\/?/);
      //if(!matched) return;
      this.list.forEach(obj => {
        if(location.pathname.match(obj.pattern)) {
          typeof obj.cb === 'function' && obj.cb(location.pathname);
        }
      });
      this.prePathname = location.pathname;
    }, 50);
    return this;
  }

  register(pattern, cb) {
    this.list.push({pattern, cb});
    return this;
  }

}

