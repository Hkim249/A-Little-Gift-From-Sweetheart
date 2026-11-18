// Tự chạy: bước vào nhà hàng -> lời cảm ơn -> trao thư -> kết thúc không thêm thoại.
(() => {
  const stage = document.getElementById('dateStage');
  const entrance = document.getElementById('entranceScene');
  const inside = document.getElementById('insideScene');
  const textNode = document.getElementById('dialogueText');
  const panel = document.getElementById('dialoguePanel');
  const letter = document.getElementById('giftLetter');
  const finish = document.getElementById('sceneFinish');
  if (!stage || !entrance || !inside || !textNode || !panel || !letter || !finish) return;

  const reportHeight = () => window.parent.postMessage({
    isStreamlitMessage: true,
    type: 'streamlit:setFrameHeight',
    height: Math.max(document.documentElement.scrollHeight, 700)
  }, '*');

  let typingTimer = null;
  let typeToken = 0;
  function typeLine(line, done) {
    const token = ++typeToken;
    let i = 0;
    textNode.textContent = '';
    if (typingTimer) clearInterval(typingTimer);
    typingTimer = setInterval(() => {
      if (token !== typeToken) { clearInterval(typingTimer); return; }
      textNode.textContent += line.charAt(i++);
      if (i >= line.length) {
        clearInterval(typingTimer);
        typingTimer = null;
        if (done) done();
      }
    }, 42);
  }

  // Cảnh bước vào không có phụ đề hoặc dòng chữ phụ.
  window.setTimeout(() => {
    stage.classList.add('inside-active');
    entrance.setAttribute('aria-hidden', 'true');
    inside.setAttribute('aria-hidden', 'false');
    reportHeight();

    window.setTimeout(() => {
      panel.classList.add('show');
      typeLine('Cảm ơn anh đã đưa em đi chơi, hôm nay em vui lắm. ♡', () => {
        window.setTimeout(() => {
          panel.classList.add('gift-line');
          typeLine('Em có cái này tặng cho anh. ♡', () => {
            window.setTimeout(() => {
              stage.classList.add('gift-given');
              letter.classList.add('letter-move');
              window.setTimeout(() => {
                panel.classList.remove('show');
                finish.classList.add('show');
                finish.setAttribute('aria-hidden', 'false');
              }, 2100);
            }, 700);
          });
        }, 1700);
      });
    }, 700);
  }, 5900);

  reportHeight();
  window.addEventListener('resize', reportHeight);
})();
