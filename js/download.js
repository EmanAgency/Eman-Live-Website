'use strict';
(() => {
  const dialog = document.getElementById('downloadDialog');
  const link = document.getElementById('apkDownload');
  const status = document.getElementById('downloadStatus');
  const metadata = document.getElementById('downloadMetadata');
  if (!dialog || !link || !status || !metadata) return;
  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    document.body.classList.add('download-open');
    dialog.querySelector('[data-close-download]')?.focus();
  };
  const close = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    document.body.classList.remove('download-open');
    lastFocus?.focus?.();
  };
  document.querySelectorAll('[data-download]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault(); event.stopImmediatePropagation(); open();
    }, {capture: true});
  });
  document.querySelectorAll('[data-close-download]').forEach(button => button.addEventListener('click', close));
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect=dialog.getBoundingClientRect(); if(event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('download-open'); lastFocus?.focus?.(); });
  document.addEventListener('keydown', event => {if(event.key==='Escape' && dialog.hasAttribute('open')) close();});
  link.addEventListener('click', event => {
    if (link.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
    status.textContent = 'Your browser will handle the download. Open the APK from Downloads when it finishes.';
  });
  status.textContent = 'Checking the Android download…';
  async function configure() {
    try {
      const response = await fetch(new URL('download-config.json', document.baseURI), {cache:'no-cache'});
      if (!response.ok) throw new Error('Unavailable');
      const config = await response.json();
      if (typeof config.apkUrl !== 'string' || !config.apkUrl.trim()) {
        status.textContent = 'The Android download is not available yet.'; return;
      }
      const url = new URL(config.apkUrl, document.baseURI);
      if ((url.protocol !== 'https:' && url.origin !== location.origin) || url.username || url.password || !url.pathname.toLowerCase().endsWith('.apk')) throw new Error('Invalid download');
      // Private source releases do not provide anonymous public downloads.
      if (url.hostname === 'github.com' && /^\/EmanAgency\/(Comet-Live-App|Eman-Live-App)\//i.test(url.pathname)) throw new Error('Private download');
      if (url.origin === location.origin) {
        const file = await fetch(url, {method:'HEAD',cache:'no-cache'});
        if (!file.ok || /text\/html|application\/json/i.test(file.headers.get('content-type') || '')) throw new Error('Missing installer');
      }
      link.href = url.href;
      link.setAttribute('download', url.pathname.split('/').pop());
      link.removeAttribute('aria-disabled'); link.removeAttribute('tabindex');
      const info = ['Android ' + (config.minAndroid || '8.0') + ' and above'];
      if (config.version) info.push('Version ' + String(config.version).slice(0,30));
      if (config.fileSize) info.push(String(config.fileSize).slice(0,30));
      metadata.textContent = info.join(' · ');
      status.textContent = 'Tap the button to save the Android app. The download starts only when you choose it.';
      const key = 'android-download-window:' + location.pathname;
      let shown = false;
      try { shown = sessionStorage.getItem(key) === 'shown'; } catch (_) {}
      if ((/Android/i.test(navigator.userAgent) || new URL(location.href).searchParams.get('download') === '1') && !shown) {
        try { sessionStorage.setItem(key,'shown'); } catch (_) {}
        setTimeout(open, 900);
      }
    } catch (_) {
      status.textContent = 'The Android download is unavailable right now. Please try again later.';
    }
  }
  configure();
})();
