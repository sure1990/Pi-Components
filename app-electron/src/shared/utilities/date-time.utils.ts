const DateTimeUtils = {
  ToTimeFormat: function (secondsToConvert: number): string {
    const dateObj = new Date(secondsToConvert * 1000);
    const hours = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();
    const seconds = dateObj.getSeconds();

    let result = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (hours !== 0) {
      result = `${minutes.toString().padStart(2, "0")}:${result}`;
    }
    return result;
  },
};

export default DateTimeUtils;
