import dayjs from "dayjs";
var updateLocale = require("dayjs/plugin/updateLocale");
require("dayjs/locale/zh-tw");

//  函数防抖（debounce）
let timeoutDebounce = null;
export function debounce(fn, wait) {
  if (timeoutDebounce !== null) clearTimeout(timeoutDebounce);
  timeoutDebounce = setTimeout(fn, wait);
}

// 將物件捲動到最下面
export function scrollElementToBottom(elementId) {
  var ele = document.getElementById(elementId);

  if (ele) {
    ele.scrollTo({ top: ele.scrollHeight, behavior: "smooth" });
  }
}

// 產生亂數種子
export function generatorUUID() {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// 日期格式化
export function dateTimeFormat(
  date,
  format,
  isShowPrefix = true,
  isShortYear = false
) {
  if (isShortYear) {
    format = format.replace("YYYY", "YY");
  }

  if (isTimeStamp(date)) {
    var dateTime = new Date(date * 1000);
    date = dayjs(dateTime);
  } else {
    date = dayjs(date);
  }

  const now = dayjs();
  const today = now;
  const tomorrow = dayjs().add(1, "day");
  const yesterday = dayjs().subtract(1, "days");

  const isToday = date.isSame(today, "day");
  const isTomorrow = date.isSame(tomorrow, "day");
  const isYesterday = date.isSame(yesterday, "day");

  let datePrefix = "";

  if (isShowPrefix) {
    if (isToday) {
      datePrefix = "今天";
    } else if (isTomorrow) {
      datePrefix = "明天";
    } else if (isYesterday) {
      datePrefix = "昨天";
    }
  }

  const result = stringFormat(format, [datePrefix]);

  dayjs.extend(updateLocale);

  dayjs.updateLocale("zh-tw", {
    weekdays: "周日_周一_周二_周三_周四_周五_周六".split("_"),
  });

  return date.locale("zh-tw").format(result);
}

// string format
export function stringFormat(formatted, args) {
  for (let i = 0; i < args.length; i++) {
    const regexp = new RegExp("\\{" + i + "\\}", "gi");
    formatted = formatted.replace(regexp, args[i]);
  }
  return formatted;
}

// 判斷是不是 time stamp
export function isTimeStamp(date) {
  if (isDate(date)) {
    return false;
  }

  var valid = new Date(date).getTime() > 0;
  if (date.toString().indexOf("-") > -1 || date.toString().indexOf("/") > -1) {
    valid = false;
  }
  return valid;
}

// 判斷是不是日期
export function isDate(date) {
  return typeof date.getMonth === "function";
}
