/*
    The subtitle processor module for our content scripts.
    Uses a mutation observer to monitor subtitle changes and makes each word clickable.
*/

function initializeSubtitleObserver(subtitleContainer) {
    const observer = new MutationObserver(observerCallback);
    const config = { childList: true, subtree: true };
    observer.observe(subtitleContainer, config);
    // Processes any existing subtitles on initialization
    document.querySelectorAll('.ytp-caption-segment').forEach(makeWordsClickable);
    console.log("LSS subtitle observer is active.");
};

function observerCallback(mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            const segments = document.querySelectorAll('.ytp-caption-segment');
            segments.forEach(makeWordsClickable);
        }
    }
}

// Transforms the text content of a subtitle segment into clickable words
function makeWordsClickable(segmentNode) {

    // If segment already processed, skip
    if (segmentNode.dataset.processed) {
        return;
    }

    const text = segmentNode.textContent;
    // Gives us an array of words (things seperated by white spaces)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);

    // Clear existing content, making room for custom spans
    segmentNode.innerHTML = '';

    // Create a span for each word and adds it
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.className = 'clickable-subtitle-word';

        // This is where we will write our custom behavior for clicks -- pulling up a translation popup, etc.
        wordSpan.addEventListener('mouseover', () => {
            console.log(`Clicked word: "${word}"`);
            createPopup(wordSpan, word);
            // selectText(document.querySelector("#title > h1 > yt-formatted-string"));
            selectText(wordSpan);

            // Fix to trigger Google Translate popup
            const mouseUpEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            wordSpan.dispatchEvent(mouseUpEvent);

            // Band-aid fix for the delayed appearance of the translate button
            setTimeout(() =>{
                document.querySelector("#gtx-trans").click()
            }, 500);
        });

        wordSpan.addEventListener('mouseout', () => {
            removePopup();
            document.querySelector(".jfk-bubble-closebtn")?.click();
        });

        segmentNode.appendChild(wordSpan);

        if (index < words.length - 1) {
            segmentNode.appendChild(document.createTextNode(' '));
        }
    });

    segmentNode.dataset.processed = 'true';
};

function selectText(node) {

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}