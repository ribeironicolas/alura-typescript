import { Inspect } from "../decorators/inspect.js";
import { LoggingRunTime } from "../decorators/logging-run-time.js";

export abstract class View<T> {
  protected element: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    }
  }

  update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
