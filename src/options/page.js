const { toTitleCase, getLocalString } = require("../utility")
const defaultValues = require('../configs/defaults')
var nodes = require('./nodes')

// used to map a DOM's key to the locallized string
// to render the options page
const reflect = {
    // [dom key]: [locale string key]
    readingTime_label: 'optionsWorkTimeLabel',
    breakTime_label: 'optionsBreakTimeLabel',
    title_label: 'optionsNotificationTitleLabel',
    message_label: 'optionsNotificationMessageLabel',
    soundEnabled_label: 'optionsSoundEnabledLabel',
    soundVolume_label: 'optionsSoundVolumeLabel',
    soundPath_label: 'optionsSoundPathLabel',
    apply: 'optionsApplyButton',
    reset: 'optionsResetButton'
}

// used to retrieve data from specified nodes
const storageKeys = [
    'breakTimeAmount',
    'readingTimeAmount',
    'title',
    'message',
    'soundEnabled',
    'soundPath',
    'soundVolume'
]

var page = {
    render() {
        page.labels.set()
        page.inputs.set()
    },
    labels: {
        sound: {
            volume: {
                /**
                 * render volume's label
                 * @param {Event} e 
                 */
                set(e = null) {
                    let value = e === null
                    ? nodes.getDOM('soundVolume').value
                    : e.target.value

                    nodes.getDOM('soundVolumeValue').innerText = `${value*100}%`
                }
            }
        },
        /**
         * render all labels
         */
        set() {
            for (var key in reflect) {
                nodes.getDOM(key).innerText = getLocalString(reflect[key])
            }
        }
    },
    inputs: {
        sound: {
            /**
             * switch status whether sound-related columns is disabled
             * @param {Event} e 
             */
            toggleEditable(e = null) {
                let disabled = false
                let switchList = ['soundPath', 'soundVolume']

                if (e === null) {
                    disabled = !nodes.getDOM('soundEnabled').checked
                } else {
                    disabled = !e.target.checked
                }

                switchList.forEach(key => {
                    nodes.getDOM(key).disabled = disabled
                })
            }
        },
        /**
         * Retrieve all data from local storage,
         * and render them into columns with special process depending on its type.
         * When there's no such value by specified key in storage,
         * use default values instead.
         */
        set() {
            browser.storage.local.get(storageKeys)
                .then(result => {
                    storageKeys.forEach(key => {
                        let node = nodes.getDOM(key)
                        let value = result[key]  || defaultValues[key]
                        switch (node.type) {
                            case 'checkbox':
                                nodes.getDOM(key).checked = value
                                break;
                            default:
                                nodes.getDOM(key).value = value
                                break;
                        }
                    })

                    // display current sound volume
                    page.labels.sound.volume.set()

                    // toggle columns related to custom-sound editable or not
                    page.inputs.sound.toggleEditable()
                })
                .catch(err => {
                    console.error(err)
                })
        },
        /**
         * get all data specified by storageKeys,
         * append a timestamp(last_modified) for always updating value against browser's mechanism
         */
        get() {
            let set = {
                last_modified: (new Date).toLocaleTimeString()
            }
            storageKeys.forEach(key => {
                let node = nodes.getDOM(key)
                let attrs = node.attributes

                if (attrs.type) {
                    switch (attrs.type.value) {
                        case 'number':
                        case 'range':
                            set[key] = node.valueAsNumber
                            break;
                        case 'checkbox':
                            set[key] = node.checked
                            break;
                        default:
                            set[key] = node.value
                            break;
                    }
                } else {
                    set[key] = node.value
                }
            })
            return set
        },
        /**
         * return a list filled with nodes specified by storageKeys
         */
        dom() {
            return Array.from(storageKeys.map(key => nodes.getDOM(key)))
        }
    },
    button: {
        loading: {
            /**
             * toggle loading animation for Apply button
             * @param {Boolean} isLoading 
             */
            toggle (isLoading = false) {
                nodes.getDOM('apply').classList.toggle('is-loading', isLoading)
            },
            /**
             * generate callback to turn on/off loading animation
             * @param {Boolean} isLoading 
             */
            toggleFactory (isLoading) {
                return () => {
                    nodes.getDOM('apply').classList.toggle('is-loading', isLoading)
                }
            }
        }
    }
}

module.exports = page