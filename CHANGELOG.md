# 0.2.6
- *changed* localization key "notificationContent" to "notificationMessage"
- *changed* setting-updating strategy
- *changed* move to babili instead of original babel-env-preset
- *add* custom notification title and message
- *removed* icon-changing feature

# 0.2.5
- *change* reverse counter
- *add* options' value validation
- minor syntax changes

# 0.2.4
- *changed* icon
- *disabled* icon changing feature

# 0.2.31
- add uuid for firefox version

# 0.2.3
- *added* `bestzip` package for packing
- *added* stop time counter after 20 idle mins
- *fixed* notification appears after break-time finished
- *fixed* setting missing after restart
- *fixed* applying new setting with values as same as old setting wont reset counter
- *changed* bg_script returns a resolved promise as response instead of making another `sendMessage` call
- *changed* alter utility function `log` from `arguments` to spread syntax
- *changed* alter from `window.onload` to `window.addEventListener` in popup
- *removed* unnecessary polyfill file in src folder

# 0.2.2
- fixed bug that state wont be changed after break time finished
- fixed minor bugs
- rewrite setting-saving workflow in options page
- add cent browser support to readme.md
- font *anonymous pro* is now bundled with extension

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