const NumericUtils = {
  toFixedDigits(time: number): number {
    return +time.toFixed(5);
  },
  getFraction() {
    return 0.00001;
  },
};

export default NumericUtils;
