function createPopup(wordSpan, word) {
    removePopup();

    const popupDiv = document.createElement('div');
    popupDiv.className = 'translate-popup';
    popupDiv.textContent = 'Translation for: ' + word;

    const rect = wordSpan.getBoundingClientRect();
    popupDiv.style.left = `${rect.left}px`;
    popupDiv.style.top = `${rect.top - 60}px`;
    
    document.body.appendChild(popupDiv);
}

function removePopup() {
    const existingPopup = document.querySelector('.translate-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
}
