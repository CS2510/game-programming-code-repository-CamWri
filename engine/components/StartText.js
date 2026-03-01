class StartText extends Component {
    label
    value
    textLabel

    start() {
        this.label = this.label || ""
        this.value = this.value || ""
        this.textLabel = this.gameObject.getComponent(TextLabel)
    }

    setLabel(label) {
        this.label = label
    }

    setValue(value) {
        this.value = value
    }

    update() {
        this.textLabel.text = `${this.label}: ${this.value}`
    }
}