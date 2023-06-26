// reporter.js
import { AllureRuntime } from 'allure-js-commons'
import { CucumberJSAllureFormatter } from 'allure-cucumberjs'

export default class extends CucumberJSAllureFormatter {
  constructor(options) {
    super(options, new AllureRuntime({ resultsDir: './allure-results' }), {
      labels: [],
      links: [],
    })
  }
}
