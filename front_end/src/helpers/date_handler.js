
export function dateToString (dateObject) {
    
    const [month, day, year] = [dateObject.getMonth()+1, dateObject.getDate(), dateObject.getFullYear()];
    return `${month}/${day}/${year}`;
} 