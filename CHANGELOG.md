# 0.3.0

- [internal] replace webpack with vite
- [internal] replace pug with html
- [internal] replace sass with css
- [internal] rewrite with modern syntax
- [internal] remove persistent variable due to manifest v3
- remove bulma framework usage so options_page may look different
- replace _All Your Data on the Websites You Visit_ permission with [declarative net request](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/declarative_net_request) to provide same functionaility with better security
- bump minimum firefox version to 113.0

# 0.2.9

- update italian localization

# 0.2.8

- update dev tool chain

# 0.2.75

- update dev tool chain

# 0.2.74

- update german localization

# 0.2.73

- update russian localization

# 0.2.71

- update franch localization

# 0.2.7

- _add_ french localization by Anciaux Yoann
- _add_ default sound of notification by Zabuhailo
- _add_ custom sound of notification by URL
- _update_ options page
- _fix_ korean localization
- _fix_ reset time counting after computer is locked up (wont work in firefox)
- using bulma framework and sass now

# 0.2.6

- _changed_ localization key "notificationContent" to "notificationMessage"
- _changed_ setting-updating strategy
- _changed_ move to babili instead of original babel-env-preset
- _add_ custom notification title and message
- _removed_ icon-changing feature

# 0.2.5

- _change_ reverse counter
- _add_ options' value validation
- minor syntax changes

# 0.2.4

- _changed_ icon
- _disabled_ icon changing feature

# 0.2.31

- add uuid for firefox version

# 0.2.3

- _added_ `bestzip` package for packing
- _added_ stop time counter after 20 idle mins
- _fixed_ notification appears after break-time finished
- _fixed_ setting missing after restart
- _fixed_ applying new setting with values as same as old setting wont reset counter
- _changed_ bg_script returns a resolved promise as response instead of making another `sendMessage` call
- _changed_ alter utility function `log` from `arguments` to spread syntax
- _changed_ alter from `window.onload` to `window.addEventListener` in popup
- _removed_ unnecessary polyfill file in src folder

# 0.2.2

- fixed bug that state wont be changed after break time finished
- fixed minor bugs
- rewrite setting-saving workflow in options page
- add cent browser support to readme.md
- font _anonymous pro_ is now bundled with extension

# 0.2.1

- using non-minified codes

# 0.2.0

- adjust structure
- unify uses of alarms API
- simplify time accumulation
- expand range of reading time & break time to 120 mins

# 0.1.5

- add korean, simplified chinese localization
- fixed bug that clock wont update after applying or resetting

# 0.1.4

- minor bug fixed
- minified code for production
- remove unnecessary images

# 0.1.3

- keep refining code
- when click reset button in popup, the cycle will be restart instead just reset time
- add success message in options page

# 0.1.2

- refine code(API changes, logic refined)
- adjust options page layout
- adjust notification's icon
- adjust readme.md
- add local string for apply button
- add japanese localization
- add license file
- add system lock detection
- change popup's communition way to background due to sendResponse is undefined in Chrome

# 0.1.1

- remove license.pdf

# 0.1.0

- initial version
