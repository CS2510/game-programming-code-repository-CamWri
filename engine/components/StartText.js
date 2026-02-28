class StartText extends Component {
    label
    getValue
    textLabel

    start() {
        this.label = this.label || ""
        this.getValue = this.getValue || ""
        this.textLabel = this.gameObject.getComponent(TextLabel)
    }

    setLabel(label) {
        this.label = label
    }

    setValue(getValue) {
        this.getValue = getValue
    }

    update() {
        this.textLabel.text = `${this.label}: ${this.getValue}`
    }
}