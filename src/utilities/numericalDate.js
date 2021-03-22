export function numericalDate(date) {
    const dateArr = date.split('-');
    return `${parseInt(dateArr[1], 10)}/${parseInt(dateArr[2], 10)}/${dateArr[0]}`;
}