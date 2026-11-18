// Scene runs automatically on load: no buttons or user input are required.
(() => {
  const stage = document.querySelector('.date-stage');
  if (!stage) return;
  stage.classList.add('scene-started');
  // Keep the embedded Streamlit frame sized to the visible scene.
  const reportHeight = () => window.parent.postMessage({
    isStreamlitMessage: true,
    type: 'streamlit:setFrameHeight',
    height: Math.max(document.documentElement.scrollHeight, 560)
  }, '*');
  reportHeight();
  window.addEventListener('resize', reportHeight);
})();
