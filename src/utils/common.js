export const escape = str => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

export const sortByMaxTemperature = (curr, next) =>
  curr.main.temp_max > next.main.temp_max ? -1 : 1;
