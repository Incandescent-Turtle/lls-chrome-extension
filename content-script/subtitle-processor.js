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
    for(const mutation of mutationsList) {
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
        });

        wordSpan.addEventListener('mouseout', () => {
            removePopup();
        });

        segmentNode.appendChild(wordSpan);

        if (index < words.length - 1) {
            segmentNode.appendChild(document.createTextNode(' '));
        }
    });

    segmentNode.dataset.processed = 'true';
};
