require('dotenv').config();

const webdriver = require('selenium-webdriver');

let capabilities = {
  "os" : "Windows",
  "os_version" : "7",
  "browserName" : "IE",
  "browser_version" : "8.0",
  "browserstack.local" : "false",
  "browserstack.selenium_version" : "3.5.2"
}

Object.assign(capabilities, {
  'browserstack.user' : process.env.BROWSERSTACK_USER,
  'browserstack.key' : process.env.BROWSERSTACK_KEY
});

async function run() {
  let driver;
  try {
    driver = new webdriver.Builder().
      usingServer('http://hub-cloud.browserstack.com/wd/hub').
      withCapabilities(capabilities).build();
    await driver.get('https://rickfrom1987.github.io/isUserClick/index.html');
    await (await driver.findElement(webdriver.By.id('trustedButton'))).click();
    const isUserClickValue = await (await driver.findElement(webdriver.By.id('isUserClick'))).getText();
    console.log('isUserClickValue', isUserClickValue);
    // Setting the status of test as 'passed' or 'failed' based on the condition; if title of the web page included 'BrowserStack'
    if(isUserClickValue.includes('true')) {
      await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "isUserClick - works as expected!"}}');
    } else {
      await driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "isUserClick - does not work as epexcted"}}');
    }
  } catch (e) {
    console.log(e);
  } finally {
    if(driver) {
      await driver.quit();
    }
  }
}

run(); 