# isUserClick

[https://rickfrom1987.github.io/isUserClick/index.html](https://rickfrom1987.github.io/isUserClick/index.html)

Check is browsers support e.isTrusted and e.pointerType.

## BrowserStack test

Idea is to:

1. Open up our test page [https://rickfrom1987.github.io/isUserClick/index.html](https://rickfrom1987.github.io/isUserClick/index.html) in different browsers
2. Trigger the click on the buttons via selenium/BrowserStack
3. Check that the output of our function is as we expect.

We can automate and create a waterfall of browser tests in different OS/Browsers in the future.
[https://www.browserstack.com/automate/capabilities](https://www.browserstack.com/automate/capabilities)

### How to run

Install NVM in your favorite way.

Install node LTS in your favorite way.

Create .env file with BrowserStack credentials:
```
BROWSERSTACK_USER=yourusername
BROWSERSTACK_KEY=yourkey
```

```yarn```

```node windows-10-chrome.js```
