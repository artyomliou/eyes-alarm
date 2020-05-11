# Eyes Alarm
## what's this?

Web extension used to notice it's time to rest your eyes.  

### cycle

every 50 min passed, rest for 10 mins  
custom of time and sound is available  

counter will be reset if you dont make any input for 20 mins  
or your computer is locked up  

## browsers' support
*higher version is better*
- Chrome (`56` :ok_hand:) 
- Vivaldi (`latest` :ok_hand:)
- Cent (`latest` :ok_hand:)
- Firefox (`52` :ok_hand:)
  * Idle API locked status
- Firefox for Android :cold_sweat:
  * BrowserAction API
- Edge :cold_sweat:
  * Alarms API
  * Idle API
  * Notification API
  * extension.getViews

## translation

- Chinese `Artyom Liou`
- English `Artyom Liou`
- French `Anciaux Yoann`
- German `Julius Rummel`
- Japanese `Jie Ting Wu`
- Korean `Winnie Wu`
- Russian `VladimirCreative`

### new localization

If you want to add a localization, please check [*HERE*](https://github.com/artyomliou/eyes-alarm/tree/master/addon/_locales)  
By this english localization you may be able to make your own localization  
  
If you find something text did not fit your culture well,
you may change that without losing functional meaning.
  
After finished, please email the file to me (artyomliou@gmail.com)  
I will try checking the content,  
If everything seems to be OK, i will make update ASAP and add your name here  

## compile
### os & node & npm
- Ubuntu 18.04
- nodejs v10.19.0
- npm 6.13.4
### steps
- npm install
- npm run build
- npm run zipf && npm run zipc

## ref.
### resources
- [WebExtension Polyfill](https://github.com/mozilla/webextension-polyfill)
- [FlatIcon](http://www.flaticon.com/)
- [Online SVG editor](https://github.com/SVG-Edit/svgedit)
- [ColorHunt] (http://colorhunt.co/c/40128)
- [FreeSound] (http://www.freesound.org/)
- [Unicode Table](https://unicode-table.com/en/)
- [Github Emoji](https://gist.github.com/rxaviers/7360908)

### concept
- [衛福部](http://tinyurl.com/jxhgxt6)
- [MPL 2.0](https://www.openfoundry.org/tw/legal-column-list/8681-the-brief-comparison-of-mpl-11-and-mpl-20)

### dev.

- [Mozilla Developer Network](https://developer.mozilla.org/zh-TW/)
- [Chrome Ext. APIs](https://developer.chrome.com/extensions/api_index)
- [Browser support for Web.Ext. APIs](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs)

## license related

- [Google Fonts](https://fonts.google.com/specimen/Anonymous+Pro)
- icon[`set-timer-button`, `notification`](http://www.flaticon.com/free-icon/set-timer-button_61017) Icon made by Google from www.flaticon.com 
- icon[`Refresh`](http://www.flaticon.com/free-icon/refresh_118799) Icon made by Lucy G from www.flaticon.com 
- icon[`Settings`](http://www.flaticon.com/free-icon/settings_126472) Icon made by Gregor Cresnar from www.flaticon.com
- [sound](http://www.freesound.org/people/Zabuhailo/sounds/178646/) by Zabuhailo under [CC](https://creativecommons.org/licenses/by/3.0/deed.zh_TW), not modified