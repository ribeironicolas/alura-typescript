export class View {
    constructor(selector) {
        const element = document.querySelector(selector);
        if (element) {
            this.element = element;
        }
    }
    update(model) {
        let template = this.template(model);
        this.element.innerHTML = template;
    }
}
