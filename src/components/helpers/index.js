import moment from "moment";

export const isCurrentday = (day) => moment().isSame(day, 'day'); //! "isSame" - сравнивает элементы на идентичность
export const isSelectedMonth = (day, today) => today.isSame(day, 'month');
export const isDayContainCurrentEvent = (event,dayItem) =>
  event.date >= dayItem.startOf('day').format('X')
  && event.date <= dayItem.clone().endOf('day').format('X');
