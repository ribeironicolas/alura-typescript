import { DomInjector } from "../decorators/dom-injector.js";
import { LoggingRunTime } from "../decorators/logging-run-time.js";
import { DaysOfWeek } from "../enums/days-of-week.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { NegotiationService } from "../services/negotiation.service.js";
import { MessageView } from "../views/message.view.js";
import { NegotiationsView } from "../views/negotiations.view.js";

export class NegotiationController {
  @DomInjector("#data")
  private dateInput: HTMLInputElement;
  @DomInjector("#quantidade")
  private quantityInput: HTMLInputElement;
  @DomInjector("#valor")
  private valueInput: HTMLInputElement;
  private negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView("#negotiationsView");
  private messageView = new MessageView("#messageView");
  private negotiationService = new NegotiationService();

  constructor() {
    this.negotiationsView.update(this.negotiations);
  }

  @LoggingRunTime()
  add(): void {
    const negotiation = Negotiation.createBy(
      this.dateInput.value,
      this.quantityInput.value,
      this.valueInput.value
    );
    if (!this.isWorkedDay(negotiation.date)) {
      this.messageView.update("Negotiations are available just in worked days");
      return;
    }
    this.negotiations.add(negotiation);
    this.cleanForm();
    this.updateView();
  }

  importData(): void {
    this.negotiationService
      .getNegotiations()
      .then(newNegotiations => {
        return newNegotiations.filter(newNegotiation => {
          return !this.negotiations.list().some(negotiation => negotiation.compare(newNegotiation))
        })
    }).then((negotiations) => {
      for (let negotiation of negotiations) {
        this.negotiations.add(negotiation);
      }
      this.negotiationsView.update(this.negotiations);
    });
  }

  private isWorkedDay(date: Date) {
    return (
      date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY
    );
  }

  private cleanForm(): void {
    this.dateInput.value = "";
    this.quantityInput.value = "";
    this.valueInput.value = "";
    this.dateInput.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update("Negotiation added successfully");
  }
}
