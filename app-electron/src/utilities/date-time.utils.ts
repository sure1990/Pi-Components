const DateTimeUtils = {
  ToTimeFormat: function (secondsToConvert: number) {
    const dateObj = new Date(secondsToConvert * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  },
};

export default DateTimeUtils;
