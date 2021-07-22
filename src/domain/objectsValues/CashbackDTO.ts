
class CashbackDTO {
  percent: number;
  value: number;

  constructor(percent: number, value: number) {
    this.percent = percent;
    this.value = value;
  }
}

export default CashbackDTO;