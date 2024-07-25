import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let today = dayjs();
today = today.add(2,'days')
today = today.format('dddd');

// console.log(today);

// const deliveryDate = today.add(30,'days');
// const daysFormatted = deliveryDate.format('dddd, MMMM D');


// const monthAndDay = deliveryDate.format('MMMM D');
// console.log(monthAndDay);


// console.log();

export default function isWeekend(date){
    console.log (date === 'Saturday' || date === 'Sunday' ? 'Weekend':'Weekdays');
}

isWeekend(today);