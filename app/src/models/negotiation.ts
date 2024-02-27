export class Negotiation {
  constructor(
    public readonly date: Date,
    public readonly quantity: number,
    public readonly value: number
  ) {}

  public static createBy(
    dateStr: string,
    quantityStr: string,
    valueStr: string
  ): Negotiation {
    const exp = /-/g;
    const date = new Date(dateStr.replace(exp, ","));
    const quantity = parseInt(quantityStr);
    const value = parseFloat(valueStr);
    return new Negotiation(date, quantity, value);
  }

  public compare(negotiation: Negotiation): boolean{
    return this.date.getDate() === negotiation.date.getDate() 
      && this.date.getMonth() === negotiation.date.getMonth()
      && this.date.getFullYear() === negotiation.date.getFullYear()
  }
}
