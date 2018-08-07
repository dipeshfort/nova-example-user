

export function dateFormat(date) {
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const day = date.getDate();

    const month = monthIndex + 1;

    function padZeroStr(value) {
        let pad = '';
        if (value < 10) {
            pad = '0';
        }
        return pad + value;
    }

    return `${year}-${padZeroStr(month)}-${padZeroStr(day)}`;
}