export function monthDayYearDate(date) {
    const months = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'Aug',
      '09': 'Sept',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    }
    const dateArr = date.split('-');
    return `${months[dateArr[1]]} ${parseInt(dateArr[2], 10)}, ${dateArr[0]}`;
}