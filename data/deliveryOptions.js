import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},
{
    id:'2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id:'3',
    deliveryDays: 1,
    priceCents: 999
}];


export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option) =>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });

    return deliveryOption || deliveryOption[0];
}

export function displayDate(deliveryOption){
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  const daysFormatted = deliveryDate.format('dddd, MMMM D');
  return daysFormatted;
}

export function humanReadableDate(date){
  const readableDate = dayjs(date).format('MMMM D, YYYY h:mm A');
  return readableDate;
}

export function arrivalDate(date){
  const readableDate = dayjs(date).format('MMMM D, YYYY');
  return readableDate;
}