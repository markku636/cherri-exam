import {
  dateTimeFormat,  
} from '@/utils/index'

export default {
  dateTimeFormat: (date, isShowWeek = false, isShowPrefix = false, isShortYear = false) => {
    const format = isShowWeek ? 'YYYY/MM/DD {0} HH:mm dddd' : 'YYYY/MM/DD {0} HH:mm'
    return dateTimeFormat(date, format, isShowPrefix, isShortYear)
  },

  dateFormat: (date, isShowWeek = false, isShowPrefix = false, isShortYear = false) => {
    const format = isShowWeek ? 'YYYY/MM/DD {0} dddd' : 'YYYY/MM/DD {0} '

    return dateTimeFormat(date, format, isShowPrefix, isShortYear)
  },

  timeFormat: (date, format = '{0} HH:mm') => {
    return dateTimeFormat(date, format, false)
  },

  weekFormat(date) {
    return dateTimeFormat(date, 'dddd', true)
  },
}
