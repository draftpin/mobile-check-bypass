// ==UserScript==
// @name         Mobile Check Bypass
// @version      1.3
// @namespace    Violentmonkey Scripts
// @description  Bypass mobile check in most crypto bots. Feel free to insert @match sections to add new bots. Updated: 09.10.2024
// @author       Ergamon
// @match        *://bluefarming.xyz/*
// @match        *://app.w-coin.io/*
// @match        *://thevertus.app/*
// @match        *://app.diamore.co/*
// @match        *://app.city-holder.com/*
// @match        *://game.xempire.io/*
// @run-at       document-start
// @grant        none
// @icon         https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRySWsVzj4bozodJat-FKZC1L0lEIq-Q_NoCQ&s
// @downloadURL  https://github.com/draftpin/mobile-check-bypass/raw/main/mobile-check-bypass.user.js
// @updateURL    https://github.com/draftpin/mobile-check-bypass/raw/main/mobile-check-bypass.user.js
// @homepage     https://github.com/draftpin/mobile-check-bypass
// ==/UserScript==

function getRandomiOSUserAgent() {
    const iOSVersions = [
                            '15_0', '15_1', '15_2', '15_3', '15_4', '15_5', '15_6', '15_7',
                            '16_0', '16_1', '16_2', '16_3', '16_4', '16_5', '16_6', '16_7',
                            '17_0', '17_1', '17_2', '17_3', '17_4', '17_5'];
    const iPhoneModels = [ 'iPhone11,8', 'iPhone12,1',
                            'iPhone12,3', 'iPhone12,5', 'iPhone13,1', 'iPhone13,2', 'iPhone13,3',
                            'iPhone13,4', 'iPhone14,2', 'iPhone14,3', 'iPhone14,4', 'iPhone14,5'];
    const randomVersion = iOSVersions[Math.floor(Math.random() * iOSVersions.length)];
    const randomModel = iPhoneModels[Math.floor(Math.random() * iPhoneModels.length)];
    return `Mozilla/5.0 (${randomModel}; CPU iPhone OS ${randomVersion} like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1`;
}

function emitIphone() {
    function updateIframeLink () {
        const url = location.href
        if (!url.startsWith('https://')) {
            return setTimeout(updateIframeLink, 500)
        }
        if (url.includes('tgWebAppPlatform')) {
            location.href = url.replace(/tgWebAppPlatform=[a-z]*\&/g, 'tgWebAppPlatform=ios&')
            console.dir('[GBOT] Updated HREF:', location.href)
        }
    }
    updateIframeLink()

    Object.defineProperty(navigator, 'userAgent', {
      get: function() { return getRandomiOSUserAgent() }
    })
    Object.defineProperty(navigator, 'platform', {
        get: function() { return 'iPhone' }
    })
    Object.defineProperty(navigator, 'vendor', {
        get: function() { return 'Apple Computer, Inc.' }
    });
    Object.defineProperty(navigator, 'deviceMemory', {
        get: function() { return undefined }
    });
    Object.defineProperty(navigator, 'maxTouchPoints', {
        get: function() { return 5 }
    })
}

function mobileCheck() {
    const text = document.body?.innerText
    return text && text.replaceAll('\n', ' ').match(/(Play|Use).*(mobile|smartphone)/gi)
}

function onStart() {
    if (mobileCheck()) return setTimeout(() => location.reload())
}
emitIphone()
setTimeout(onStart, 2000)


