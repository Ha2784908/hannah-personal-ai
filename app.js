document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements - Navigation
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  const cpuStat = document.getElementById('cpuStat');
  const ramStat = document.getElementById('ramStat');

  // Translator Elements
  const transSourceLang = document.getElementById('transSourceLang');
  const transTargetLang = document.getElementById('transTargetLang');
  const transTone = document.getElementById('transTone');
  const btnSwapLangs = document.getElementById('btnSwapLangs');
  const transInput = document.getElementById('transInput');
  const btnTranslate = document.getElementById('btnTranslate');
  const btnClearTrans = document.getElementById('btnClearTrans');
  const transBadge = document.getElementById('transBadge');
  const transTextResult = document.getElementById('transTextResult');
  const pinyinBox = document.getElementById('pinyinBox');
  const pinyinText = document.getElementById('pinyinText');
  const notesBox = document.getElementById('notesBox');
  const notesText = document.getElementById('notesText');
  const altPhrasingBox = document.getElementById('altPhrasingBox');
  const altList = document.getElementById('altList');
  const btnCopyTrans = document.getElementById('btnCopyTrans');
  const btnSpeakTrans = document.getElementById('btnSpeakTrans');

  // Chinese Verification & Custom App Elements
  const chineseVerifyBox = document.getElementById('chineseVerifyBox');
  const chineseBackTrans = document.getElementById('chineseBackTrans');
  const chineseVerifyExplain = document.getElementById('chineseVerifyExplain');
  const customAppButtons = document.getElementById('customAppButtons');
  const btnOpenAppManager = document.getElementById('btnOpenAppManager');
  const appModalOverlay = document.getElementById('appModalOverlay');
  const btnCloseAppModal = document.getElementById('btnCloseAppModal');
  const btnSaveAppPrefs = document.getElementById('btnSaveAppPrefs');

  const chkDeepL = document.getElementById('chkDeepL');
  const chkPleco = document.getElementById('chkPleco');
  const chkBaidu = document.getElementById('chkBaidu');
  const chkYoudao = document.getElementById('chkYoudao');
  const chkGoogle = document.getElementById('chkGoogle');

  // Translator File Elements
  const transDropzone = document.getElementById('transDropzone');
  const transFileInput = document.getElementById('transFileInput');
  const btnRemoveTransFile = document.getElementById('btnRemoveTransFile');

  // Grammar Auditor Elements
  const grammarLang = document.getElementById('grammarLang');
  const grammarInput = document.getElementById('grammarInput');
  const btnAuditGrammar = document.getElementById('btnAuditGrammar');
  const btnClearGrammar = document.getElementById('btnClearGrammar');
  const grammarBadge = document.getElementById('grammarBadge');
  const grammarOutput = document.getElementById('grammarOutput');
  const btnCopyGrammar = document.getElementById('btnCopyGrammar');

  // Grammar File Elements
  const grammarDropzone = document.getElementById('grammarDropzone');
  const grammarFileInput = document.getElementById('grammarFileInput');
  const btnRemoveGrammarFile = document.getElementById('btnRemoveGrammarFile');

  // Assistant Chat Elements
  const chatLogs = document.getElementById('chatLogs');
  const chatInput = document.getElementById('chatInput');
  const btnSendChat = document.getElementById('btnSendChat');
  const btnVoiceInput = document.getElementById('btnVoiceInput');
  const ttsCheckbox = document.getElementById('ttsCheckbox');

  // Mobile Connect Modal Elements
  const btnMobileConnect = document.getElementById('btnMobileConnect');
  const mobileModalOverlay = document.getElementById('mobileModalOverlay');
  const btnCloseMobileModal = document.getElementById('btnCloseMobileModal');
  const btnModeWifi = document.getElementById('btnModeWifi');
  const btnModeTunnel = document.getElementById('btnModeTunnel');
  const wifiSection = document.getElementById('wifiSection');
  const tunnelSection = document.getElementById('tunnelSection');

  const wifiQrContainer = document.getElementById('wifiQrContainer');
  const wifiUrlInput = document.getElementById('wifiUrlInput');
  const btnCopyWifiUrl = document.getElementById('btnCopyWifiUrl');

  const tunnelDot = document.getElementById('tunnelDot');
  const tunnelStatusText = document.getElementById('tunnelStatusText');
  const btnToggleTunnel = document.getElementById('btnToggleTunnel');
  const tunnelActiveDetails = document.getElementById('tunnelActiveDetails');
  const tunnelQrContainer = document.getElementById('tunnelQrContainer');
  const tunnelUrlInput = document.getElementById('tunnelUrlInput');
  const btnCopyTunnelUrl = document.getElementById('btnCopyTunnelUrl');

  let currentTunnelActive = false;
  let transAttachedFile = null;
  let grammarAttachedFile = null;

  // --- External Verification App Preferences & Host Profile ---
  const DEFAULT_APP_PREFS = { deepL: true, pleco: true, baidu: true, youdao: true, google: true };
  const hostNameInput = document.getElementById('hostNameInput');

  function getHostName() {
    return localStorage.getItem('hannah_host_name') || 'Hannah';
  }

  function setHostName(name) {
    const cleanName = name && name.trim() ? name.trim() : 'Hannah';
    localStorage.setItem('hannah_host_name', cleanName);
    return cleanName;
  }

  function getAppPrefs() {
    const saved = localStorage.getItem('hannah_app_prefs');
    return saved ? JSON.parse(saved) : DEFAULT_APP_PREFS;
  }

  function saveAppPrefs(prefs) {
    localStorage.setItem('hannah_app_prefs', JSON.stringify(prefs));
  }

  function generateAppLinks(textToVerify) {
    const prefs = getAppPrefs();
    const encodedText = encodeURIComponent(textToVerify || '');
    if (!customAppButtons) return;

    customAppButtons.innerHTML = '';

    if (prefs.deepL) {
      customAppButtons.innerHTML += `<a href="https://www.deepl.com/translator#zh/en/${encodedText}" target="_blank" class="btn-app-link">🌐 DeepL</a>`;
    }
    if (prefs.pleco) {
      customAppButtons.innerHTML += `<a href="https://www.pleco.com/" target="_blank" class="btn-app-link">📖 Pleco Dict</a>`;
    }
    if (prefs.baidu) {
      customAppButtons.innerHTML += `<a href="https://fanyi.baidu.com/#zh/en/${encodedText}" target="_blank" class="btn-app-link">🇨🇳 Baidu Fanyi</a>`;
    }
    if (prefs.youdao) {
      customAppButtons.innerHTML += `<a href="https://dict.youdao.com/w/${encodedText}" target="_blank" class="btn-app-link">📚 Youdao Dict</a>`;
    }
    if (prefs.google) {
      customAppButtons.innerHTML += `<a href="https://translate.google.com/?sl=zh-CN&tl=en&text=${encodedText}&op=translate" target="_blank" class="btn-app-link">🌍 Google Translate</a>`;
    }
  }

  const btnHeaderAppManager = document.getElementById('btnHeaderAppManager');

  function openAppModal() {
    const prefs = getAppPrefs();
    if (hostNameInput) hostNameInput.value = getHostName();
    if (chkDeepL) chkDeepL.checked = prefs.deepL;
    if (chkPleco) chkPleco.checked = prefs.pleco;
    if (chkBaidu) chkBaidu.checked = prefs.baidu;
    if (chkYoudao) chkYoudao.checked = prefs.youdao;
    if (chkGoogle) chkGoogle.checked = prefs.google;
    if (appModalOverlay) appModalOverlay.style.display = 'flex';
  }

  if (btnOpenAppManager) btnOpenAppManager.addEventListener('click', openAppModal);
  if (btnHeaderAppManager) btnHeaderAppManager.addEventListener('click', openAppModal);

  if (btnCloseAppModal && appModalOverlay) {
    btnCloseAppModal.addEventListener('click', () => {
      appModalOverlay.style.display = 'none';
    });
  }

  if (btnSaveAppPrefs && appModalOverlay) {
    btnSaveAppPrefs.addEventListener('click', () => {
      if (hostNameInput) setHostName(hostNameInput.value);
      const newPrefs = {
        deepL: chkDeepL ? chkDeepL.checked : true,
        pleco: chkPleco ? chkPleco.checked : true,
        baidu: chkBaidu ? chkBaidu.checked : true,
        youdao: chkYoudao ? chkYoudao.checked : true,
        google: chkGoogle ? chkGoogle.checked : true
      };
      saveAppPrefs(newPrefs);
      appModalOverlay.style.display = 'none';
      if (transTextResult && transTextResult.innerText) {
        generateAppLinks(transTextResult.innerText);
      }
      alert(`Preferences & Host Profile saved successfully! Host set to '${getHostName()}'.`);
    });
  }

  // --- 1. Tab Navigation ---
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(tabId);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // --- 2. System Stats Polling ---
  async function updateDiagnostics() {
    try {
      const res = await fetch('/api/system/stats');
      if (res.ok) {
        const stats = await res.json();
        if (cpuStat) cpuStat.textContent = `CPU: ${stats.cpu_percent}%`;
        if (ramStat) ramStat.textContent = `RAM: ${stats.ram_used_gb}/${stats.ram_total_gb} GB (${stats.ram_percent}%)`;
      }
    } catch (e) {}
  }

  setInterval(updateDiagnostics, 10000);
  updateDiagnostics();

  // --- File Drop & Attachment Management ---
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function getFileIcon(filename, mimeType) {
    const ext = filename.split('.').pop().toLowerCase();
    if (ext === 'pdf' || mimeType === 'application/pdf') return '📕';
    if (ext === 'pptx' || ext === 'ppt') return '📊';
    if (['png', 'jpg', 'jpeg', 'webp'].includes(ext) || mimeType.startsWith('image/')) return '📷';
    return '📄';
  }

  function setAttachedFile(tabType, file) {
    if (tabType === 'trans') {
      transAttachedFile = file;
      const preview = document.getElementById('transFilePreview');
      const nameEl = document.getElementById('transFileName');
      const sizeEl = document.getElementById('transFileSize');
      const iconEl = document.getElementById('transFileIcon');
      const thumbBox = document.getElementById('transImageThumb');
      const thumbImg = document.getElementById('transThumbImg');

      if (file) {
        nameEl.textContent = file.name;
        sizeEl.textContent = formatFileSize(file.size);
        iconEl.textContent = getFileIcon(file.name, file.type || '');
        preview.style.display = 'flex';

        if (file.type && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            thumbImg.src = e.target.result;
            thumbBox.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          thumbBox.style.display = 'none';
        }
      } else {
        preview.style.display = 'none';
        if (transFileInput) transFileInput.value = '';
      }
    } else if (tabType === 'grammar') {
      grammarAttachedFile = file;
      const preview = document.getElementById('grammarFilePreview');
      const nameEl = document.getElementById('grammarFileName');
      const sizeEl = document.getElementById('grammarFileSize');
      const iconEl = document.getElementById('grammarFileIcon');
      const thumbBox = document.getElementById('grammarImageThumb');
      const thumbImg = document.getElementById('grammarThumbImg');

      if (file) {
        nameEl.textContent = file.name;
        sizeEl.textContent = formatFileSize(file.size);
        iconEl.textContent = getFileIcon(file.name, file.type || '');
        preview.style.display = 'flex';

        if (file.type && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            thumbImg.src = e.target.result;
            thumbBox.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          thumbBox.style.display = 'none';
        }
      } else {
        preview.style.display = 'none';
        if (grammarFileInput) grammarFileInput.value = '';
      }
    }
  }

  // Setup Dropzone Events
  function setupDropzone(dropzoneEl, fileInputEl, tabType) {
    if (!dropzoneEl || !fileInputEl) return;
    
    dropzoneEl.addEventListener('click', () => fileInputEl.click());
    
    fileInputEl.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        setAttachedFile(tabType, e.target.files[0]);
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneEl.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzoneEl.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzoneEl.classList.remove('dragover');
      }, false);
    });

    dropzoneEl.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files[0]) {
        setAttachedFile(tabType, files[0]);
      }
    });
  }

  setupDropzone(transDropzone, transFileInput, 'trans');
  setupDropzone(grammarDropzone, grammarFileInput, 'grammar');

  if (btnRemoveTransFile) btnRemoveTransFile.addEventListener('click', () => setAttachedFile('trans', null));
  if (btnRemoveGrammarFile) btnRemoveGrammarFile.addEventListener('click', () => setAttachedFile('grammar', null));

  // Global Clipboard Paste (Ctrl + V Screenshot)
  window.addEventListener('paste', (e) => {
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.kind === 'file' && item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const renamedFile = new File([file], `screenshot_${Date.now()}.png`, { type: file.type });
        
        const activeTabBtn = document.querySelector('.tab-btn.active');
        const activeTabId = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : '';
        if (activeTabId === 'tab-grammar') {
          setAttachedFile('grammar', renamedFile);
        } else {
          setAttachedFile('trans', renamedFile);
        }
        e.preventDefault();
        break;
      }
    }
  });

  // --- 3. Translator Functionality ---
  if (btnSwapLangs && transSourceLang && transTargetLang) {
    btnSwapLangs.addEventListener('click', () => {
      const srcVal = transSourceLang.value;
      const targetVal = transTargetLang.value;
      if (srcVal !== 'Auto') {
        transSourceLang.value = targetVal;
        transTargetLang.value = srcVal;
      }
    });
  }

  if (btnTranslate) {
    btnTranslate.addEventListener('click', async () => {
      const text = transInput.value.trim();
      if (!text && !transAttachedFile) {
        alert("Please enter text, or drop a PDF / PowerPoint / Screenshot file to translate.");
        return;
      }

      btnTranslate.disabled = true;
      btnTranslate.innerHTML = `<span>⏳ Translating & Verifying...</span>`;
      if (transBadge) {
        transBadge.textContent = "Translating...";
        transBadge.className = "badge";
      }

      try {
        let data;

        if (transAttachedFile) {
          const formData = new FormData();
          formData.append('file', transAttachedFile);
          formData.append('instruction', text);
          formData.append('source_lang', transSourceLang.value);
          formData.append('target_lang', transTargetLang.value);
          formData.append('tone', transTone.value);
          formData.append('host_name', getHostName());

          const res = await fetch('/api/translate/file', {
            method: 'POST',
            body: formData
          });
          data = await res.json();
        } else {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: text,
              source_lang: transSourceLang.value,
              target_lang: transTargetLang.value,
              tone: transTone.value,
              host_name: getHostName()
            })
          });
          data = await res.json();
        }

        if (data.status === 'success' && data.result) {
          const result = data.result;
          const translatedText = result.translation || '';
          
          if (transTextResult) {
            transTextResult.textContent = translatedText;
            if (transTargetLang.value.includes('Arabic')) {
              transTextResult.classList.add('rtl');
            } else {
              transTextResult.classList.remove('rtl');
            }
          }

          if (result.pinyin && pinyinBox && pinyinText) {
            pinyinText.textContent = result.pinyin;
            pinyinBox.style.display = 'block';
          } else if (pinyinBox) {
            pinyinBox.style.display = 'none';
          }

          // Chinese Double-Check Audit & App Links
          if (result.chinese_verification && result.chinese_verification.is_chinese_involved) {
            if (chineseVerifyBox) chineseVerifyBox.style.display = 'flex';
            if (chineseBackTrans) chineseBackTrans.textContent = `🔄 Back-Translation Verification: "${result.chinese_verification.back_translation || ''}"`;
            if (chineseVerifyExplain) chineseVerifyExplain.textContent = result.chinese_verification.explanation || '';
            generateAppLinks(translatedText);
          } else if (chineseVerifyBox) {
            chineseVerifyBox.style.display = 'none';
          }

          if (result.notes && notesBox && notesText) {
            notesText.textContent = result.notes;
            notesBox.style.display = 'block';
          } else if (notesBox) {
            notesBox.style.display = 'none';
          }

          if (result.alternatives && result.alternatives.length > 0 && altPhrasingBox && altList) {
            altList.innerHTML = result.alternatives.map(alt => `<li>${alt}</li>`).join('');
            altPhrasingBox.style.display = 'block';
          } else if (altPhrasingBox) {
            altPhrasingBox.style.display = 'none';
          }

          if (transBadge) {
            transBadge.textContent = "Translation Verified";
            transBadge.className = "badge correct";
          }
        } else {
          alert(data.message || "Translation failed.");
          if (transBadge) {
            transBadge.textContent = "Translation Error";
            transBadge.className = "badge incorrect";
          }
        }
      } catch (e) {
        alert("Error connecting to translation service.");
      } finally {
        btnTranslate.disabled = false;
        btnTranslate.innerHTML = `<span>🌐</span> Translate Text or Attached File`;
      }
    });
  }

  if (btnClearTrans) {
    btnClearTrans.addEventListener('click', () => {
      if (transInput) transInput.value = '';
      setAttachedFile('trans', null);
      if (transTextResult) transTextResult.innerHTML = `<p class="muted">Translation result will appear here with full contextual nuance and phrasing insights.</p>`;
      if (pinyinBox) pinyinBox.style.display = 'none';
      if (chineseVerifyBox) chineseVerifyBox.style.display = 'none';
      if (notesBox) notesBox.style.display = 'none';
      if (altPhrasingBox) altPhrasingBox.style.display = 'none';
      if (transBadge) {
        transBadge.textContent = "Awaiting Input";
        transBadge.className = "badge";
      }
    });
  }

  if (btnCopyTrans && transTextResult) {
    btnCopyTrans.addEventListener('click', () => {
      const textToCopy = transTextResult.innerText;
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
        btnCopyTrans.textContent = '✓ Copied!';
        setTimeout(() => { btnCopyTrans.textContent = '📋 Copy'; }, 2000);
      }
    });
  }

  if (btnSpeakTrans && transTextResult) {
    btnSpeakTrans.addEventListener('click', () => {
      const textToSpeak = transTextResult.innerText;
      if (textToSpeak) speakText(textToSpeak.substring(0, 1000));
    });
  }

  // --- 4. Grammar & Fact Auditor ---
  function applyMathRendering(container) {
    if (window.renderMathInElement && container) {
      try {
        renderMathInElement(container, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          throwOnError: false
        });
      } catch(e) {}
    }
  }

  if (btnAuditGrammar) {
    btnAuditGrammar.addEventListener('click', async () => {
      const text = grammarInput.value.trim();
      if (!text && !grammarAttachedFile) {
        alert("Please enter text, or drop a PDF / PowerPoint / Screenshot file to audit.");
        return;
      }

      btnAuditGrammar.disabled = true;
      btnAuditGrammar.innerHTML = `<span>⏳ Auditing Grammar & Facts...</span>`;
      if (grammarBadge) {
        grammarBadge.textContent = "Auditing...";
        grammarBadge.className = "badge";
      }

      try {
        let data;

        if (grammarAttachedFile) {
          const formData = new FormData();
          formData.append('file', grammarAttachedFile);
          formData.append('instruction', text);
          formData.append('language', grammarLang.value);
          formData.append('host_name', getHostName());

          const res = await fetch('/api/grammar_check/file', {
            method: 'POST',
            body: formData
          });
          data = await res.json();
        } else {
          const res = await fetch('/api/grammar_check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: text,
              language: grammarLang.value,
              host_name: getHostName()
            })
          });
          data = await res.json();
        }

        if (data.status === 'success' && data.analysis) {
          const rawMarkdown = data.analysis;
          let parsedHtml = window.marked ? marked.parse(rawMarkdown) : rawMarkdown;
          
          parsedHtml = parsedHtml.replace(/\[VERIFIED ACCURATE\]/gi, '<div class="verdict-banner verified"><span>✅ VERIFIED ACCURATE</span> <span>No Grammar or Factual Errors Found</span></div>');
          parsedHtml = parsedHtml.replace(/\[CORRECTIONS REQUIRED\]|\[REVISIONS SUGGESTED\]/gi, '<div class="verdict-banner correction"><span>⚠️ CORRECTIONS & POLISHING REQUIRED</span> <span>Grammar / Fact Revisions Suggested</span></div>');

          if (grammarOutput) {
            grammarOutput.innerHTML = parsedHtml;
            applyMathRendering(grammarOutput);
          }

          if (grammarBadge) {
            if (data.verdict === 'CORRECTIONS REQUIRED') {
              grammarBadge.textContent = "Corrections Needed";
              grammarBadge.className = "badge incorrect";
            } else {
              grammarBadge.textContent = "Verified Accurate";
              grammarBadge.className = "badge correct";
            }
          }
        } else {
          alert(data.message || "Grammar audit failed.");
        }
      } catch (e) {
        alert("Error connecting to grammar audit service.");
      } finally {
        btnAuditGrammar.disabled = false;
        btnAuditGrammar.innerHTML = `<span>✍️</span> Audit Grammar & Facts`;
      }
    });
  }

  if (btnClearGrammar) {
    btnClearGrammar.addEventListener('click', () => {
      if (grammarInput) grammarInput.value = '';
      setAttachedFile('grammar', null);
      if (grammarOutput) {
        grammarOutput.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">✍️</div>
            <p>Ready to audit your text or file. Submit writing or files on the left to receive grammar corrections, factual verification, and polite rule explanations.</p>
          </div>`;
      }
      if (grammarBadge) {
        grammarBadge.textContent = "Awaiting Input";
        grammarBadge.className = "badge";
      }
    });
  }

  if (btnCopyGrammar && grammarOutput) {
    btnCopyGrammar.addEventListener('click', () => {
      const textToCopy = grammarOutput.innerText;
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy);
        btnCopyGrammar.textContent = '✓ Copied!';
        setTimeout(() => { btnCopyGrammar.textContent = '📋 Copy'; }, 2000);
      }
    });
  }

  // --- 5. Host Helper Chat Companion ---
  function appendMessage(sender, text) {
    if (!chatLogs) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender === 'user' ? 'user-msg' : 'hannah-msg'}`;
    const avatar = sender === 'user' ? '👤' : '🤖';
    const parsedText = window.marked ? marked.parse(text) : text;
    
    msgDiv.innerHTML = `
      <div class="avatar">${avatar}</div>
      <div class="msg-bubble">${parsedText}</div>
    `;
    chatLogs.appendChild(msgDiv);
    chatLogs.scrollTop = chatLogs.scrollHeight;
    applyMathRendering(msgDiv);

    if (sender === 'hannah' && ttsCheckbox && ttsCheckbox.checked && 'speechSynthesis' in window) {
      speakText(text);
    }
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    let cleanText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[*#`_~>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    if (!cleanText) return;

    const sentences = cleanText.match(/[^.!?]+[.!?]+/g) || [cleanText];
    sentences.forEach((sentence) => {
      const utterance = new SpeechSynthesisUtterance(sentence.trim());
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    });
  }

  async function sendChatMessage() {
    if (!chatInput) return;
    const msg = chatInput.value.trim();
    if (!msg) return;

    appendMessage('user', msg);
    chatInput.value = '';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, host_name: getHostName() })
      });
      const data = await res.json();
      appendMessage('hannah', data.text || "Processed.");
    } catch (e) {
      appendMessage('hannah', "Error connecting to local server.");
    }
  }

  if (btnSendChat) btnSendChat.addEventListener('click', sendChatMessage);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  window.sendQuickPrompt = function(promptText) {
    if (chatInput) {
      chatInput.value = promptText;
      sendChatMessage();
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition && btnVoiceInput) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    btnVoiceInput.addEventListener('click', () => {
      btnVoiceInput.classList.add('recording');
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (chatInput) chatInput.value = transcript;
      btnVoiceInput.classList.remove('recording');
      sendChatMessage();
    };

    recognition.onerror = () => btnVoiceInput.classList.remove('recording');
    recognition.onend = () => btnVoiceInput.classList.remove('recording');
  } else if (btnVoiceInput) {
    btnVoiceInput.style.display = 'none';
  }

  // --- 6. Mobile Connect Gateway & Cloudflare Tunnel ---
  function renderQrCode(container, url) {
    if (!container || !window.QRCode) return;
    container.innerHTML = '';
    new QRCode(container, {
      text: url,
      width: 150,
      height: 150,
      colorDark: '#040914',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  async function fetchNetworkInfo() {
    try {
      const res = await fetch('/api/system/network_info');
      if (res.ok) {
        const info = await res.json();
        if (wifiUrlInput) wifiUrlInput.value = info.local_url;
        renderQrCode(wifiQrContainer, info.local_url);

        currentTunnelActive = info.tunnel_active;
        updateTunnelUI(info);
      }
    } catch (e) {}
  }

  function updateTunnelUI(info) {
    if (info.tunnel_active && info.public_url) {
      if (tunnelDot) { tunnelDot.className = 'dot active'; }
      if (tunnelStatusText) tunnelStatusText.textContent = 'Public Tunnel: Online (Cloudflare)';
      if (btnToggleTunnel) {
        btnToggleTunnel.textContent = '🛑 Stop Public Tunnel';
        btnToggleTunnel.className = 'btn btn-secondary btn-icon-danger';
        btnToggleTunnel.disabled = false;
      }
      if (tunnelActiveDetails) tunnelActiveDetails.style.display = 'block';
      if (tunnelUrlInput) tunnelUrlInput.value = info.public_url;
      renderQrCode(tunnelQrContainer, info.public_url);
    } else {
      if (tunnelDot) { tunnelDot.className = 'dot'; }
      if (tunnelStatusText) tunnelStatusText.textContent = 'Public Tunnel: Offline';
      if (btnToggleTunnel) {
        btnToggleTunnel.textContent = '⚡ Enable Public Tunnel';
        btnToggleTunnel.className = 'btn btn-primary';
        btnToggleTunnel.disabled = false;
      }
      if (tunnelActiveDetails) tunnelActiveDetails.style.display = 'none';
    }
  }

  if (btnMobileConnect && mobileModalOverlay) {
    btnMobileConnect.addEventListener('click', () => {
      mobileModalOverlay.style.display = 'flex';
      fetchNetworkInfo();
    });
  }

  if (btnCloseMobileModal && mobileModalOverlay) {
    btnCloseMobileModal.addEventListener('click', () => {
      mobileModalOverlay.style.display = 'none';
    });
  }

  if (btnModeWifi && btnModeTunnel && wifiSection && tunnelSection) {
    btnModeWifi.addEventListener('click', () => {
      btnModeWifi.classList.add('active');
      btnModeTunnel.classList.remove('active');
      wifiSection.style.display = 'flex';
      tunnelSection.style.display = 'none';
    });

    btnModeTunnel.addEventListener('click', () => {
      btnModeTunnel.classList.add('active');
      btnModeWifi.classList.remove('active');
      tunnelSection.style.display = 'flex';
      wifiSection.style.display = 'none';
    });
  }

  if (btnCopyWifiUrl && wifiUrlInput) {
    btnCopyWifiUrl.addEventListener('click', () => {
      navigator.clipboard.writeText(wifiUrlInput.value);
      btnCopyWifiUrl.textContent = '✓ Copied!';
      setTimeout(() => { btnCopyWifiUrl.textContent = '📋 Copy'; }, 2000);
    });
  }

  if (btnCopyTunnelUrl && tunnelUrlInput) {
    btnCopyTunnelUrl.addEventListener('click', () => {
      navigator.clipboard.writeText(tunnelUrlInput.value);
      btnCopyTunnelUrl.textContent = '✓ Copied!';
      setTimeout(() => { btnCopyTunnelUrl.textContent = '📋 Copy Link'; }, 2000);
    });
  }

  if (btnToggleTunnel) {
    btnToggleTunnel.addEventListener('click', async () => {
      btnToggleTunnel.disabled = true;
      if (!currentTunnelActive) {
        btnToggleTunnel.textContent = '⏳ Starting Secure Tunnel...';
        try {
          const res = await fetch('/api/system/tunnel/start', { method: 'POST' });
          const data = await res.json();
          if (data.success && data.public_url) {
            currentTunnelActive = true;
            updateTunnelUI({ tunnel_active: true, public_url: data.public_url });
          } else {
            alert(data.error || "Could not start public tunnel.");
            fetchNetworkInfo();
          }
        } catch (e) {
          alert("Error starting tunnel.");
          fetchNetworkInfo();
        }
      } else {
        btnToggleTunnel.textContent = '⏳ Stopping Tunnel...';
        try {
          await fetch('/api/system/tunnel/stop', { method: 'POST' });
          currentTunnelActive = false;
          updateTunnelUI({ tunnel_active: false, public_url: null });
        } catch (e) {
          fetchNetworkInfo();
        }
      }
    });
  }

  // Initialize external verification app links on load
  generateAppLinks('');
});
