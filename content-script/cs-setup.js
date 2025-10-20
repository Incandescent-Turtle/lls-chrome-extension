/*
    Sets up a mutation observer to find Youtube's subtitle container and initialize the subtitle processor.
*/
console.log("LSS content script loaded. Searching for subtitle container...")

// MutationObserver to watch for the subtitle container
const containerObserver = new MutationObserver((mutationsList, observer) => {
  const targetNode = document.querySelector('.ytp-caption-window-container');
  if (targetNode) {
    // Initialize the subtitle observer to watch for subtitle changes and process them!
    initializeSubtitleObserver(targetNode);
    // Stop observing for the container once found
    observer.disconnect();
  }
});

// Start observing the document body for added nodes, searching for subtitle container
containerObserver.observe(document.body, {
  childList: true,
  subtree: true
});
