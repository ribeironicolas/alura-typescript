var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DomInjector } from "../decorators/dom-injector.js";
import { LoggingRunTime } from "../decorators/logging-run-time.js";
import { DaysOfWeek } from "../enums/days-of-week.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { NegotiationService } from "../services/negotiation.service.js";
import { MessageView } from "../views/message.view.js";
import { NegotiationsView } from "../views/negotiations.view.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new MessageView("#messageView");
        this.negotiationService = new NegotiationService();
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createBy(this.dateInput.value, this.quantityInput.value, this.valueInput.value);
        if (!this.isWorkedDay(negotiation.date)) {
            this.messageView.update("Negotiations are available just in worked days");
            return;
        }
        this.negotiations.add(negotiation);
        this.cleanForm();
        this.updateView();
    }
    importData() {
        this.negotiationService
            .getNegotiations()
            .then(newNegotiations => {
            return newNegotiations.filter(newNegotiation => {
                return !this.negotiations.list().some(negotiation => negotiation.compare(newNegotiation));
            });
        }).then((negotiations) => {
            for (let negotiation of negotiations) {
                this.negotiations.add(negotiation);
            }
            this.negotiationsView.update(this.negotiations);
        });
    }
    isWorkedDay(date) {
        return (date.getDay() > DaysOfWeek.SUNDAY && date.getDay() < DaysOfWeek.SATURDAY);
    }
    cleanForm() {
        this.dateInput.value = "";
        this.quantityInput.value = "";
        this.valueInput.value = "";
        this.dateInput.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update("Negotiation added successfully");
    }
}
__decorate([
    DomInjector("#data")
], NegotiationController.prototype, "dateInput", void 0);
__decorate([
    DomInjector("#quantidade")
], NegotiationController.prototype, "quantityInput", void 0);
__decorate([
    DomInjector("#valor")
], NegotiationController.prototype, "valueInput", void 0);
__decorate([
    LoggingRunTime()
], NegotiationController.prototype, "add", null);
