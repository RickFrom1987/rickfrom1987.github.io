require('dotenv').config();

const webdriver = require('selenium-webdriver');
// Input capabilities
const capabilities = {
 'os_version' : '10',
 'resolution' : '1920x1080',
 'browserName' : 'Chrome',
 'browser_version' : 'latest',
 'os' : 'Windows',
 'name': 'is_user_click', // test name
 'build': 'BStack Build Number 1', // CI/CD job or build name
 'browserstack.user' : process.env.BROWSERSTACK_USER,
 'browserstack.key' : process.env.BROWSERSTACK_KEY,
}
async function runSampleTest () {
  let driver;
  try {
    driver = new webdriver.Builder().
      usingServer('http://hub-cloud.browserstack.com/wd/hub').
      withCapabilities(capabilities).build();
    await driver.get('https://rickfrom1987.github.io/humanClick/index.html');
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
runSampleTest(); 