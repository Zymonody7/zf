var dayjs = require('dayjs')

/**
 * 获取指定时间与现在时间差
 * date 指定时间 [YYYY-MM-DD HH:mm:ss]
 */
function getDifference(date) {
  // 当前日期
  let now = dayjs()
  // 要显示的日期
  let showDate = dayjs(date)

  let d_year = now.diff(showDate, 'year') // 几年前
  let d_month = now.diff(showDate, 'month') // 几月前
  let d_week = now.diff(showDate, 'week') // 几周前
  let d_day = now.diff(showDate, 'day') // 几天前
  let d_hour = now.diff(showDate, 'hour') // 几小时前
  let d_minute = now.diff(showDate, 'minute') // 几分钟前

  if (d_year >= 1) {
    return d_year + ' 年前'
  } else if (d_month >= 1) {
    return d_month + ' 月前'
  } else if (d_week >= 1) {
    return d_week + ' 周前'
  } else if (d_day >= 1) {
    return d_day + ' 天前'
  } else if (d_hour >= 1) {
    return d_hour + ' 小时前'
  } else if (d_minute >= 1) {
    return d_minute + ' 分钟前'
  } else {
    return '刚刚'
  }
}

module.exports = { getDifference }
