var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SkipJs } from "../decorators/skip-js.js";
import { View } from "./view.js";
export class NegotiationsView extends View {
    template(model) {
        return `
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>DATE</th>
            <th>QUANTITY</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
          ${model
            .list()
            .map((negotiation) => {
            return `
              <tr>
                <td>${new Intl.DateTimeFormat().format(negotiation.date)}</td>
                <td>${negotiation.quantity}</td>
                <td>${negotiation.value}</td>
              </tr>
            `;
        })
            .join("")}
        </tbody>
      </table>
    `;
    }
}
__decorate([
    SkipJs
], NegotiationsView.prototype, "template", null);
