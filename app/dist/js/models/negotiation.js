export class Negotiation {
    constructor(date, quantity, value) {
        this.date = date;
        this.quantity = quantity;
        this.value = value;
    }
    static createBy(dateStr, quantityStr, valueStr) {
        const exp = /-/g;
        const date = new Date(dateStr.replace(exp, ","));
        const quantity = parseInt(quantityStr);
        const value = parseFloat(valueStr);
        return new Negotiation(date, quantity, value);
    }
    compare(negotiation) {
        return this.date.getDate() === negotiation.date.getDate()
            && this.date.getMonth() === negotiation.date.getMonth()
            && this.date.getFullYear() === negotiation.date.getFullYear();
    }
}
