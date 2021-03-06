export default function (date, fmt = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  const week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

const friendlyDate = (function () {
  let DAY, DEFAULT_FORMAT, HOUR, MINUTE, MONTH, SECOND, YEAR, entry, getFullTime, map, replace, time, two, unify;
  YEAR = "year";
  MONTH = "month";
  DAY = "day";
  HOUR = "hour";
  MINUTE = "minute";
  SECOND = "second";
  DEFAULT_FORMAT = "%y-%M-%d %h:%m:%s";
  map = {
    "%y": YEAR,
    "%M": MONTH,
    "%d": DAY,
    "%h": HOUR,
    "%m": MINUTE,
    "%s": SECOND
  };
  unify = function(time) {    // php时间戳10位，转为js时间戳13位 (*1000)
    time -= 0;
    if (("" + time).length === 10) {
      time *= 1000;
    }
    return time;
  };
  two = function(str) {
    let s;
    s = "" + str;
    if (s.length === 1) {
      s = "0" + s;
    }
    return s;
  };
  replace = function(str, src, dst) {
    let reg;
    reg = new RegExp(src, "g");
    return str.replace(reg, dst);
  };
  getFullTime = function(time) {
    let date;
    date = new Date(unify(time));
    return {
      year: date.getFullYear(),
      month: two(date.getMonth() + 1),
      day: two(date.getDate()),
      hour: two(date.getHours()),
      minute: two(date.getMinutes()),
      second: two(date.getSeconds())
    };
  };
  time = {
    "default": function(time, format) {
      let fullTime, ret, src;
      if (format && (typeof format) !== "string") {
        throw new Error("format must be a string.");
      }
      fullTime = getFullTime(time);
      console.info(fullTime);
      ret = format || DEFAULT_FORMAT;
      for (src in map) {
        if(map.hasOwnProperty(src)){
          ret = replace(ret, src, fullTime[map[src]]);
        }
      }
      return ret;
    },
    human: function(time) {
      let ago, curTime, diff, int;
      time = unify(time);
      int = parseInt;
      curTime = +new Date();
      diff = curTime - time;
      ago = "";
      if (1000 * 60 > diff) {
        ago = "刚刚";
      } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
        ago = int(diff / (1000 * 60)) + "分钟前";
      } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
        ago = int(diff / (1000 * 60 * 60)) + "小时前";
      } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24)) + "天前";
      } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前";
      } else {
        ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前";
      }
      return ago;
    }
  };
  entry = time["default"];
  entry.human = entry.ago = time.human;
  return entry
})();

export {
  friendlyDate
}
