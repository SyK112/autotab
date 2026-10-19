// AutoTab v2.0.0 - Akıllı Sekme Gruplayıcı, Sekme Kasası & Oto-Yenileme Engelleyici (Service Worker)

const SECOND_LEVEL_DOMAINS = new Set([
  'com.tr', 'net.tr', 'org.tr', 'gov.tr', 'edu.tr',
  'co.uk', 'gov.uk', 'org.uk', 'ac.uk',
  'com.au', 'net.au', 'org.au',
  'co.jp', 'ne.jp'
]);

const CHROME_GROUP_COLORS = ['blue', 'red', 'yellow', 'green', 'pink', 'purple', 'cyan', 'orange'];

const SPECIAL_SITE_CONFIG = {
  'youtube': { title: 'YouTube', color: 'red' },
  'github': { title: 'GitHub', color: 'purple' },
  'google': { title: 'Google', color: 'blue' },
  'whatsapp': { title: 'WhatsApp', color: 'green' },
  'reddit': { title: 'Reddit', color: 'orange' },
  'x': { title: 'X', color: 'grey' },
  'twitter': { title: 'X', color: 'grey' },
  'linkedin': { title: 'LinkedIn', color: 'blue' },
  'gitlab': { title: 'GitLab', color: 'orange' },
  'stackoverflow': { title: 'Stack Overflow', color: 'orange' },
  'spotify': { title: 'Spotify', color: 'green' },
  'netflix': { title: 'Netflix', color: 'red' }
};

function getRootDomain(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return null;
    }
    let hostname = parsed.hostname.toLowerCase();
    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname) || !hostname.includes('.')) {
      return hostname;
    }
    const parts = hostname.split('.');
    if (parts.length <= 2) {
      return hostname;
    }
    const lastTwo = parts.slice(-2).join('.');
    if (SECOND_LEVEL_DOMAINS.has(lastTwo) && parts.length >= 3) {
      return parts.slice(-3).join('.');
    }
    return parts.slice(-2).join('.');
  } catch (e) {
    return null;
  }
}

function formatGroupTitle(domain) {
  if (!domain) return '';
  const parts = domain.split('.');
  const primaryName = parts[0].toLowerCase();

  if (SPECIAL_SITE_CONFIG[primaryName]) {
    return SPECIAL_SITE_CONFIG[primaryName].title;
  }

  return primaryName.charAt(0).toUpperCase() + primaryName.slice(1);
}

function getDomainColor(domain) {
  if (!domain) return 'grey';
  const parts = domain.split('.');
  const primaryName = parts[0].toLowerCase();

  if (SPECIAL_SITE_CONFIG[primaryName]) {
    return SPECIAL_SITE_CONFIG[primaryName].color;
  }

  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % CHROME_GROUP_COLORS.length;
  return CHROME_GROUP_COLORS[index];
}

async function getSettings() {
  const defaults = { autoGroupEnabled: true };
  const stored = await chrome.storage.local.get(defaults);
  return { ...defaults, ...stored };
}

// ============================================================================
// FAZ 2: OTO-YENİLEME ENGELLEYİCİ & KAYDIRMA KONUMU KORUMA (ANTI-REFRESH)
// ============================================================================
let cachedAntiRefreshDomains = null;

async function loadAntiRefreshDomains() {
  if (cachedAntiRefreshDomains !== null) {
    return cachedAntiRefreshDomains;
  }
  try {
    const syncData = await chrome.storage.sync.get({ anti_refresh_domains: null });
    if (Array.isArray(syncData.anti_refresh_domains)) {
      cachedAntiRefreshDomains = syncData.anti_refresh_domains;
      await chrome.storage.local.set({ anti_refresh_domains: cachedAntiRefreshDomains });
      return cachedAntiRefreshDomains;
    }
  } catch (e) {}

  const localData = await chrome.storage.local.get({ anti_refresh_domains: [] });
  cachedAntiRefreshDomains = Array.isArray(localData.anti_refresh_domains) ? localData.anti_refresh_domains : [];
  return cachedAntiRefreshDomains;
}

async function saveAntiRefreshDomains(domains) {
  const clean = Array.from(new Set((domains || []).map(d => (d || '').trim().toLowerCase()).filter(Boolean)));
  cachedAntiRefreshDomains = clean;
  await chrome.storage.local.set({ anti_refresh_domains: clean });
  try {
    await chrome.storage.sync.set({ anti_refresh_domains: clean });
  } catch (e) {
    console.warn('Anti-refresh sync uyarısı:', e);
  }
  return clean;
}

// Sayfa içine (MAIN World) enjekte edilen 4 Katmanlı Anti-Refresh & Scroll Lock Kalkanı + Canlı Gözlem Sayacı
function antiRefreshMainWorldShield() {
  if (window.__autotabAntiRefreshInstalled) return;
  window.__autotabAntiRefreshInstalled = true;

  const SCROLL_STORAGE_KEY = '__autotab_scroll_lock_v2';
  const BLOCKED_COUNT_KEY = '__autotab_blocked_count_v2';
  let lastUserActionTime = Date.now();
  let lastToastShownAt = 0;
  const origSetTimeout = window.setTimeout;
  const origSetInterval = window.setInterval;

  // Engellenen yenileme sayacını artır ve sol altta kendi kendine silinen CSS animasyonlu bildirim göster
  const recordBlockedAttempt = (reason, customMsg) => {
    try {
      let count = parseInt(sessionStorage.getItem(BLOCKED_COUNT_KEY) || '0', 10);
      if (isNaN(count)) count = 0;
      count += 1;
      sessionStorage.setItem(BLOCKED_COUNT_KEY, String(count));

      console.info(
        `%c🛡️ [AutoTab Kalkanı]%c Otomatik yenileme girişimi engellendi (#${count}) • Yöntem: ${reason}`,
        'background:#f59e0b;color:#0f172a;font-weight:700;padding:2px 6px;border-radius:4px;',
        'color:#fcd34d;font-weight:600;'
      );

      const now = Date.now();
      if (now - lastToastShownAt < 8000 && !customMsg) {
        return;
      }
      lastToastShownAt = now;

      const showMiniPill = () => {
        if (!document.body) return;

        if (!document.getElementById('__autotab_ar_style')) {
          const styleEl = document.createElement('style');
          styleEl.id = '__autotab_ar_style';
          styleEl.textContent = `
            @keyframes __autotab_pill_fade {
              0% { opacity: 0; transform: translateY(10px); }
              12% { opacity: 1; transform: translateY(0); }
              82% { opacity: 1; transform: translateY(0); }
              100% { opacity: 0; transform: translateY(8px); visibility: hidden; }
            }
          `;
          (document.head || document.documentElement).appendChild(styleEl);
        }

        const existing = document.getElementById('__autotab_ar_pill');
        if (existing) {
          existing.remove();
        }

        const pill = document.createElement('div');
        pill.id = '__autotab_ar_pill';
        pill.textContent = customMsg || `🛡️ AutoTab: Oto-yenileme engellendi (${count})`;
        pill.style.cssText = [
          'position:fixed',
          'bottom:18px',
          'left:18px',
          'z-index:2147483647',
          'background:rgba(15, 23, 42, 0.94)',
          'color:#f8fafc',
          'border:1px solid rgba(245, 158, 11, 0.55)',
          'border-left:4px solid #f59e0b',
          'padding:8px 13px',
          'border-radius:8px',
          'font:600 12px/1.35 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
          'box-shadow:0 6px 20px rgba(0,0,0,0.35)',
          'pointer-events:none',
          'animation:__autotab_pill_fade 2.6s ease forwards'
        ].join(';');

        pill.addEventListener('animationend', () => {
          pill.remove();
        });

        document.body.appendChild(pill);

        origSetTimeout.call(window, () => {
          if (pill && pill.parentNode) {
            pill.remove();
          }
        }, 2800);
      };

      if (document.body) {
        showMiniPill();
      } else {
        document.addEventListener('DOMContentLoaded', showMiniPill, { once: true });
      }
    } catch (e) {}
  };

  const markUserInteraction = () => {
    lastUserActionTime = Date.now();
  };
  window.addEventListener('mousedown', markUserInteraction, { capture: true, passive: true });
  window.addEventListener('pointerdown', markUserInteraction, { capture: true, passive: true });
  window.addEventListener('keydown', markUserInteraction, { capture: true, passive: true });
  window.addEventListener('touchstart', markUserInteraction, { capture: true, passive: true });

  const isUnattendedAction = () => {
    return (Date.now() - lastUserActionTime) > 1600;
  };

  // KATMAN 1: <meta http-equiv="refresh"> Etiketlerini Anında Sil
  const stripMetaRefresh = () => {
    try {
      const metas = document.querySelectorAll('meta[http-equiv]');
      for (const m of metas) {
        const eq = (m.getAttribute('http-equiv') || '').toLowerCase().trim();
        if (eq === 'refresh') {
          m.removeAttribute('content');
          m.remove();
          recordBlockedAttempt('meta[http-equiv="refresh"]');
        }
      }
    } catch (e) {}
  };

  stripMetaRefresh();
  const observer = new MutationObserver(() => stripMetaRefresh());
  if (document.documentElement) {
    observer.observe(document.documentElement, { childList: true, subtree: true });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      stripMetaRefresh();
      if (document.documentElement) {
        observer.observe(document.documentElement, { childList: true, subtree: true });
      }
    });
  }

  // KATMAN 2: Sekme Odak / Görünürlük Tuzaklarını (visibilitychange / focus) Sustur
  const reloadPattern = /location\.reload|location\.href\s*=|location\.replace|history\.go\s*\(\s*0\s*\)/i;
  const origAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === 'visibilitychange' || type === 'webkitvisibilitychange' || type === 'focus' || type === 'pageshow') {
      try {
        const fnStr = typeof listener === 'function' ? listener.toString() : '';
        if (reloadPattern.test(fnStr)) {
          recordBlockedAttempt(`${type} reload listener`);
          return;
        }
      } catch (e) {}
    }
    return origAddEventListener.call(this, type, listener, options);
  };

  // KATMAN 3: Otomatik Reload Sayaçlarını (setTimeout / setInterval), Navigation API ve history.go(0) Çağrılarını Bloke Et
  window.setTimeout = function (handler, timeout, ...args) {
    try {
      const codeStr = typeof handler === 'function' ? handler.toString() : String(handler);
      if (reloadPattern.test(codeStr)) {
        recordBlockedAttempt(`setTimeout(${timeout}ms)`);
        return 0;
      }
    } catch (e) {}
    return origSetTimeout.call(window, handler, timeout, ...args);
  };

  window.setInterval = function (handler, timeout, ...args) {
    try {
      const codeStr = typeof handler === 'function' ? handler.toString() : String(handler);
      if (reloadPattern.test(codeStr)) {
        recordBlockedAttempt(`setInterval(${timeout}ms)`);
        return 0;
      }
    } catch (e) {}
    return origSetInterval.call(window, handler, timeout, ...args);
  };

  const origHistoryGo = History.prototype.go;
  History.prototype.go = function (delta) {
    if ((delta === 0 || delta === undefined) && isUnattendedAction()) {
      recordBlockedAttempt('history.go(0)');
      return;
    }
    return origHistoryGo.apply(this, arguments);
  };

  try {
    const origAssign = Location.prototype.assign;
    Location.prototype.assign = function (url) {
      if (isUnattendedAction() && (url === location.href || url === location.pathname)) {
        recordBlockedAttempt('location.assign(sameUrl)');
        return;
      }
      return origAssign.apply(this, arguments);
    };
  } catch (e) {}

  try {
    const origReplace = Location.prototype.replace;
    Location.prototype.replace = function (url) {
      if (isUnattendedAction() && (url === location.href || url === location.pathname)) {
        recordBlockedAttempt('location.replace(sameUrl)');
        return;
      }
      return origReplace.apply(this, arguments);
    };
  } catch (e) {}

  try {
    if (window.navigation && typeof window.navigation.addEventListener === 'function') {
      window.navigation.addEventListener('navigate', (event) => {
        try {
          if (event.userInitiated) return;
          const destUrl = event.destination && event.destination.url ? event.destination.url : '';
          const isSamePage = destUrl === location.href;
          if ((event.navigationType === 'reload' || isSamePage) && isUnattendedAction()) {
            if (event.cancelable) {
              event.preventDefault();
              recordBlockedAttempt(`navigation.${event.navigationType}`);
              return;
            }
            if (window.scrollY > 100) {
              sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify({
                url: location.href,
                y: window.scrollY,
                ts: Date.now(),
                forcedReload: true
              }));
            }
          }
        } catch (err) {}
      });
    }
  } catch (e) {}

  // KATMAN 4: Kaydırma Konumu Kurtarıcı (Scroll Lock & Restore)
  try {
    const savedRaw = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedRaw) {
      const saved = JSON.parse(savedRaw);
      if (saved && saved.url === location.href && saved.y > 100 && (Date.now() - saved.ts) < 300000) {
        const restoreScroll = () => {
          window.scrollTo({ top: saved.y, behavior: 'instant' });
        };
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            restoreScroll();
            origSetTimeout.call(window, restoreScroll, 60);
            origSetTimeout.call(window, restoreScroll, 220);
          });
        } else {
          restoreScroll();
          origSetTimeout.call(window, restoreScroll, 60);
        }
        if (saved.forcedReload) {
          saved.forcedReload = false;
          sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(saved));
          recordBlockedAttempt('ScrollLock Restore', '🛡️ AutoTab: Zorla yenileme yakalandı, okuma konumunuz korundu');
        }
      }
    }
  } catch (e) {}

  let scrollTimer = null;
  window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = origSetTimeout.call(window, () => {
      scrollTimer = null;
      try {
        if (window.scrollY > 100) {
          sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify({
            url: location.href,
            y: window.scrollY,
            ts: Date.now()
          }));
        }
      } catch (e) {}
    }, 200);
  }, { passive: true });
}

async function applyAntiRefreshIfNeeded(tabId, url) {
  if (!tabId || !url) return;
  const domain = getRootDomain(url);
  if (!domain) return;

  const list = await loadAntiRefreshDomains();
  if (!list.includes(domain.toLowerCase())) return;

  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      injectImmediately: true,
      func: antiRefreshMainWorldShield
    });
  } catch (e) {
    // Dahili veya kısıtlı sayfalarda sessizce geç
  }
}

async function getBlockedCountInTab(tabId) {
  if (!tabId) return 0;
  try {
    const readPromise = chrome.scripting.executeScript({
      target: { tabId },
      world: 'MAIN',
      func: () => {
        try {
          return parseInt(sessionStorage.getItem('__autotab_blocked_count_v2') || '0', 10) || 0;
        } catch (e) {
          return 0;
        }
      }
    }).then(res => (Array.isArray(res) && res[0] && typeof res[0].result === 'number') ? res[0].result : 0).catch(() => 0);

    const timeoutPromise = new Promise(r => setTimeout(() => r(0), 80));
    return await Promise.race([readPromise, timeoutPromise]);
  } catch (e) {
    return 0;
  }
}

// ============================================================================
// SEKME KASASI VE BULUT EŞİTLEME MOTORU (chrome.storage.sync + Chunking)
// ============================================================================
const SYNC_CHUNK_SIZE = 3500;
const MAX_SYNC_CHUNKS = 24;

async function loadVaultGroups() {
  try {
    const syncData = await chrome.storage.sync.get(null);
    if (syncData && syncData.vault_meta && typeof syncData.vault_meta.chunks === 'number') {
      const count = syncData.vault_meta.chunks;
      let rawJson = '';
      for (let i = 0; i < count; i++) {
        rawJson += (syncData[`v_${i}`] || '');
      }
      if (rawJson) {
        const parsed = JSON.parse(rawJson);
        if (Array.isArray(parsed)) {
          await chrome.storage.local.set({ vault_backup: parsed });
          return parsed;
        }
      } else if (count === 0) {
        return [];
      }
    }
  } catch (e) {
    console.warn('Sync okuma uyarısı, yerel yedek kullanılıyor:', e);
  }

  const localData = await chrome.storage.local.get({ vault_backup: [] });
  return Array.isArray(localData.vault_backup) ? localData.vault_backup : [];
}

async function saveVaultGroups(groups) {
  const cleanGroups = (groups || []).filter(g => g && Array.isArray(g.items) && g.items.length > 0);
  await chrome.storage.local.set({ vault_backup: cleanGroups });

  try {
    const jsonStr = JSON.stringify(cleanGroups);
    const chunks = [];
    for (let i = 0; i < jsonStr.length; i += SYNC_CHUNK_SIZE) {
      chunks.push(jsonStr.slice(i, i + SYNC_CHUNK_SIZE));
    }

    if (chunks.length <= MAX_SYNC_CHUNKS) {
      const existingSync = await chrome.storage.sync.get(null);
      const payload = {
        vault_meta: {
          chunks: chunks.length,
          updatedAt: Date.now()
        }
      };

      for (let i = 0; i < chunks.length; i++) {
        payload[`v_${i}`] = chunks[i];
      }

      const keysToRemove = [];
      for (const key of Object.keys(existingSync)) {
        if (key.startsWith('v_')) {
          const idx = parseInt(key.slice(2), 10);
          if (!isNaN(idx) && idx >= chunks.length) {
            keysToRemove.push(key);
          }
        }
      }

      await chrome.storage.sync.set(payload);
      if (keysToRemove.length > 0) {
        await chrome.storage.sync.remove(keysToRemove);
      }
    }
  } catch (e) {
    console.warn('Bulut eşitleme yazma uyarısı (yerel yedek korundu):', e);
  }

  return cleanGroups;
}

function normalizeUrlForComparison(url) {
  if (!url) return '';
  try {
    const u = new URL(url.trim());
    return u.origin + u.pathname.replace(/\/+$/, '') + u.search + u.hash;
  } catch (e) {
    return url.trim();
  }
}

function detectActiveStateInPage() {
  try {
    const isVisible = (el) => {
      if (!el) return false;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const mediaElements = document.querySelectorAll('video, audio');
    for (const m of mediaElements) {
      if (!m.paused && !m.ended && m.readyState > 2) {
        return true;
      }
    }

    const textareas = document.querySelectorAll('textarea');
    for (const ta of textareas) {
      if (ta.disabled || ta.readOnly || !isVisible(ta)) continue;
      const val = (ta.value || '').trim();
      const defVal = (ta.defaultValue || '').trim();
      if (val.length > 0 && (val !== defVal || document.activeElement === ta)) {
        return true;
      }
    }

    const editables = document.querySelectorAll('[contenteditable="true"], [contenteditable=""], [role="textbox"]');
    for (const ed of editables) {
      if (!isVisible(ed)) continue;
      const text = (ed.innerText || ed.textContent || '').trim();
      if (text.length > 0) {
        return true;
      }
    }

    const textTypes = new Set(['text', 'search', 'email', 'url', 'tel', 'number']);
    const inputs = document.querySelectorAll('input');
    for (const inp of inputs) {
      if (inp.disabled || inp.readOnly || !isVisible(inp)) continue;
      const type = (inp.type || 'text').toLowerCase();
      if (!textTypes.has(type)) continue;
      const val = (inp.value || '').trim();
      const defVal = (inp.defaultValue || '').trim();
      if (val.length > 0 && val !== defVal) {
        if (document.activeElement === inp || val.length >= 3) {
          return true;
        }
      }
    }

    return false;
  } catch (e) {
    return false;
  }
}

async function checkTabShouldStayOpen(tab) {
  if (!tab || !tab.id) return false;
  if (tab.audible) return true;
  if (tab.discarded || tab.status !== 'complete') {
    return false;
  }

  const checkPromise = chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: detectActiveStateInPage
  }).then(results => {
    return Array.isArray(results) && results[0] && results[0].result === true;
  }).catch(() => false);

  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(false), 120));
  return Promise.race([checkPromise, timeoutPromise]);
}

async function openOrFocusDashboard(windowId, showWhatsNew = false) {
  const baseDashboardUrl = chrome.runtime.getURL('dashboard.html');
  const targetUrl = showWhatsNew ? `${baseDashboardUrl}?whatsnew=1` : baseDashboardUrl;
  const queryInfo = windowId ? { windowId } : {};
  const allTabs = await chrome.tabs.query(queryInfo);
  const existingTab = allTabs.find(t => (t.url || t.pendingUrl || '').startsWith(baseDashboardUrl));

  if (existingTab) {
    const updateProps = { active: true };
    if (showWhatsNew) {
      updateProps.url = targetUrl;
    }
    await chrome.tabs.update(existingTab.id, updateProps);
    if (existingTab.windowId) {
      await chrome.windows.update(existingTab.windowId, { focused: true });
    }
    return existingTab;
  } else {
    const createProps = { url: targetUrl, active: true };
    if (windowId) createProps.windowId = windowId;
    return await chrome.tabs.create(createProps);
  }
}

async function stashWindowTabs(windowId) {
  const tabs = await chrome.tabs.query({ windowId });
  const now = Date.now();

  const candidateTabs = [];
  for (const tab of tabs) {
    if (tab.pinned) continue;
    const rawUrl = tab.url || tab.pendingUrl;
    const domain = getRootDomain(rawUrl);
    if (!domain) continue;

    candidateTabs.push({
      tabObj: tab,
      id: tab.id,
      url: rawUrl,
      title: tab.title || domain,
      domain: domain
    });
  }

  if (candidateTabs.length === 0) {
    await openOrFocusDashboard(windowId);
    return { stashedCount: 0, protectedCount: 0 };
  }

  const protectedFlags = await Promise.all(candidateTabs.map(c => checkTabShouldStayOpen(c.tabObj)));

  const vaultGroups = await loadVaultGroups();
  const groupMap = new Map();
  for (const g of vaultGroups) {
    groupMap.set(g.domain.toLowerCase(), g);
  }

  const touchedDomains = new Set();
  const tabIdsToClose = [];
  let protectedCount = 0;

  for (let i = candidateTabs.length - 1; i >= 0; i--) {
    const t = candidateTabs[i];
    const isProtected = protectedFlags[i];

    if (isProtected) {
      protectedCount++;
    } else {
      tabIdsToClose.push(t.id);
    }

    const domainKey = t.domain.toLowerCase();
    let group = groupMap.get(domainKey);

    if (!group) {
      group = {
        domain: domainKey,
        title: formatGroupTitle(domainKey),
        color: getDomainColor(domainKey),
        updatedAt: now,
        items: []
      };
      groupMap.set(domainKey, group);
      vaultGroups.unshift(group);
    }

    group.updatedAt = now;
    touchedDomains.add(domainKey);

    const normTarget = normalizeUrlForComparison(t.url);
    const existingIndex = group.items.findIndex(item => normalizeUrlForComparison(item.u) === normTarget);

    if (existingIndex !== -1) {
      const existingItem = group.items.splice(existingIndex, 1)[0];
      existingItem.t = t.title || existingItem.t;
      existingItem.d = now;
      group.items.unshift(existingItem);
    } else {
      group.items.unshift({
        u: t.url,
        t: t.title,
        d: now
      });
    }
  }

  vaultGroups.sort((a, b) => {
    const aTouched = touchedDomains.has(a.domain.toLowerCase()) ? 1 : 0;
    const bTouched = touchedDomains.has(b.domain.toLowerCase()) ? 1 : 0;
    if (aTouched !== bTouched) return bTouched - aTouched;
    return (b.updatedAt || 0) - (a.updatedAt || 0);
  });

  await chrome.storage.local.set({
    lastStashReport: {
      timestamp: now,
      stashedCount: candidateTabs.length,
      closedCount: tabIdsToClose.length,
      protectedCount: protectedCount
    }
  });

  await saveVaultGroups(vaultGroups);

  await openOrFocusDashboard(windowId);
  if (tabIdsToClose.length > 0) {
    try {
      await chrome.tabs.remove(tabIdsToClose);
    } catch (e) {
      console.warn('Sekmeler kapatılırken uyarı:', e);
    }
  }

  return {
    stashedCount: candidateTabs.length,
    closedCount: tabIdsToClose.length,
    protectedCount: protectedCount
  };
}

// ============================================================================
// OTOMATİK SEKME GRUPLAMA MOTORU (2+ Sekme Kuralı & Tekil Çözme)
// ============================================================================
const debounceTimers = new Map();
const isProcessingWindow = new Set();

function scheduleAutoGroup(windowId) {
  if (!windowId || windowId < 0) return;

  if (debounceTimers.has(windowId)) {
    clearTimeout(debounceTimers.get(windowId));
  }

  const timer = setTimeout(async () => {
    debounceTimers.delete(windowId);
    await runAutoGroup(windowId);
  }, 300);

  debounceTimers.set(windowId, timer);
}

async function runAutoGroup(windowId) {
  if (isProcessingWindow.has(windowId)) {
    scheduleAutoGroup(windowId);
    return;
  }

  isProcessingWindow.add(windowId);
  try {
    const settings = await getSettings();
    if (!settings.autoGroupEnabled) return;

    let tabs = await chrome.tabs.query({ windowId });
    if (!tabs || tabs.length === 0) return;

    const existingGroups = await chrome.tabGroups.query({ windowId });
    const groupById = new Map();
    for (const g of existingGroups) {
      groupById.set(g.id, g);
    }

    for (const tab of tabs) {
      if (tab.groupId && tab.groupId > 0) {
        const group = groupById.get(tab.groupId);
        if (!group) continue;

        if (tab.pinned) {
          try {
            await chrome.tabs.ungroup(tab.id);
            tab.groupId = -1;
          } catch (e) {}
          continue;
        }

        const currentDomain = getRootDomain(tab.url || tab.pendingUrl);
        const expectedTitle = formatGroupTitle(currentDomain);

        if (!currentDomain || (group.title && group.title.trim().toLowerCase() !== expectedTitle.trim().toLowerCase())) {
          try {
            await chrome.tabs.ungroup(tab.id);
            tab.groupId = -1;
          } catch (e) {}
        }
      }
    }

    tabs = await chrome.tabs.query({ windowId });

    const domainTabsMap = new Map();
    for (const tab of tabs) {
      if (tab.pinned) continue;
      const domain = getRootDomain(tab.url || tab.pendingUrl);
      if (!domain) continue;

      if (!domainTabsMap.has(domain)) {
        domainTabsMap.set(domain, []);
      }
      domainTabsMap.get(domain).push(tab);
    }

    const currentGroups = await chrome.tabGroups.query({ windowId });
    const groupByTitle = new Map();
    for (const g of currentGroups) {
      if (g.title) {
        groupByTitle.set(g.title.trim().toLowerCase(), g);
      }
    }

    for (const [domain, domainTabs] of domainTabsMap.entries()) {
      const title = formatGroupTitle(domain);
      const titleLower = title.toLowerCase();
      const color = getDomainColor(domain);

      if (domainTabs.length >= 2) {
        const existingGroup = groupByTitle.get(titleLower);

        if (existingGroup) {
          const tabsToJoin = domainTabs.filter(t => t.groupId !== existingGroup.id).map(t => t.id);
          if (tabsToJoin.length > 0) {
            try {
              await chrome.tabs.group({
                tabIds: tabsToJoin,
                groupId: existingGroup.id
              });
            } catch (err) {
              console.warn(`Sekmeler gruba eklenemedi (${title}):`, err);
            }
          }
        } else {
          const tabIds = domainTabs.map(t => t.id);
          try {
            const newGroupId = await chrome.tabs.group({ tabIds });
            await chrome.tabGroups.update(newGroupId, {
              title: title,
              color: color,
              collapsed: false
            });
            groupByTitle.set(titleLower, { id: newGroupId, title });
          } catch (err) {
            console.warn(`Yeni grup oluşturulamadı (${title}):`, err);
          }
        }
      }
    }

    const finalTabs = await chrome.tabs.query({ windowId });
    const groupMemberCounts = new Map();
    for (const t of finalTabs) {
      if (t.groupId && t.groupId > 0) {
        groupMemberCounts.set(t.groupId, (groupMemberCounts.get(t.groupId) || 0) + 1);
      }
    }

    for (const [groupId, count] of groupMemberCounts.entries()) {
      if (count < 2) {
        const soloTabs = finalTabs.filter(t => t.groupId === groupId).map(t => t.id);
        if (soloTabs.length > 0) {
          try {
            await chrome.tabs.ungroup(soloTabs);
          } catch (e) {}
        }
      }
    }

  } catch (error) {
    console.error('runAutoGroup hatası:', error);
  } finally {
    isProcessingWindow.delete(windowId);
  }
}

async function ungroupAllTabs(windowId) {
  const tabs = await chrome.tabs.query({ windowId });
  const groupedTabIds = tabs.filter(t => t.groupId && t.groupId > 0).map(t => t.id);
  if (groupedTabIds.length > 0) {
    await chrome.tabs.ungroup(groupedTabIds);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const currentUrl = tab ? (tab.url || tab.pendingUrl) : changeInfo.url;
  if (changeInfo.status === 'loading' || changeInfo.status === 'complete' || changeInfo.url) {
    if (currentUrl) {
      applyAntiRefreshIfNeeded(tabId, currentUrl);
    }
  }
  if (changeInfo.status === 'complete' || changeInfo.url) {
    if (tab && tab.windowId) {
      scheduleAutoGroup(tab.windowId);
    }
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if (tab && tab.windowId) {
    scheduleAutoGroup(tab.windowId);
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (removeInfo && removeInfo.windowId) {
    scheduleAutoGroup(removeInfo.windowId);
  }
});

chrome.tabs.onAttached.addListener((tabId, attachInfo) => {
  if (attachInfo && attachInfo.newWindowId) {
    scheduleAutoGroup(attachInfo.newWindowId);
  }
});

chrome.tabs.onDetached.addListener((tabId, detachInfo) => {
  if (detachInfo && detachInfo.oldWindowId) {
    scheduleAutoGroup(detachInfo.oldWindowId);
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if ((areaName === 'sync' || areaName === 'local') && changes.anti_refresh_domains) {
    cachedAntiRefreshDomains = changes.anti_refresh_domains.newValue || [];
  }
});

chrome.runtime.onInstalled.addListener(async (details) => {
  const settings = await getSettings();
  await chrome.storage.local.set(settings);
  await loadAntiRefreshDomains();

  const windows = await chrome.windows.getAll({ populate: false });
  for (const win of windows) {
    scheduleAutoGroup(win.id);
  }

  // v2.0.0 Güncellemesi veya ilk kurulum sonrası "Neler Yeni?" ekranını hazırla
  const currentVersion = chrome.runtime.getManifest().version;
  const seenData = await chrome.storage.local.get({ whatsNewSeenVersion: '' });

  if (details && (details.reason === 'update' || details.reason === 'install')) {
    if (seenData.whatsNewSeenVersion !== currentVersion) {
      await chrome.storage.local.set({ showWhatsNewPending: true });
      if (details.reason === 'update' && details.previousVersion !== currentVersion) {
        await openOrFocusDashboard(undefined, true);
      }
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'groupAllNow') {
    chrome.windows.getCurrent((win) => {
      runAutoGroup(win.id).then(() => sendResponse({ success: true }));
    });
    return true;
  }

  if (message.action === 'ungroupAllNow') {
    chrome.windows.getCurrent((win) => {
      ungroupAllTabs(win.id).then(() => sendResponse({ success: true }));
    });
    return true;
  }

  if (message.action === 'settingsChanged') {
    chrome.windows.getCurrent((win) => {
      runAutoGroup(win.id).then(() => sendResponse({ success: true }));
    });
    return true;
  }

  if (message.action === 'stashTabsNow') {
    chrome.windows.getCurrent((win) => {
      stashWindowTabs(win.id).then((res) => sendResponse({ success: true, ...res }));
    });
    return true;
  }

  if (message.action === 'openDashboard') {
    chrome.windows.getCurrent((win) => {
      openOrFocusDashboard(win ? win.id : undefined, Boolean(message.showWhatsNew)).then(() => sendResponse({ success: true }));
    });
    return true;
  }

  if (message.action === 'getVaultData') {
    Promise.all([loadVaultGroups(), loadAntiRefreshDomains()]).then(async ([groups, antiRefreshDomains]) => {
      let bytesInUse = 0;
      try {
        bytesInUse = await chrome.storage.sync.getBytesInUse(null);
      } catch (e) {}
      sendResponse({
        success: true,
        groups,
        antiRefreshDomains,
        bytesInUse,
        quotaBytes: chrome.storage.sync.QUOTA_BYTES || 102400
      });
    });
    return true;
  }

  if (message.action === 'saveVaultData') {
    saveVaultGroups(message.groups || []).then(async (savedGroups) => {
      let bytesInUse = 0;
      try {
        bytesInUse = await chrome.storage.sync.getBytesInUse(null);
      } catch (e) {}
      sendResponse({
        success: true,
        groups: savedGroups,
        bytesInUse,
        quotaBytes: chrome.storage.sync.QUOTA_BYTES || 102400
      });
    });
    return true;
  }

  if (message.action === 'getAntiRefreshStatus') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const activeTab = tabs && tabs[0];
      const domain = activeTab ? getRootDomain(activeTab.url || activeTab.pendingUrl) : null;
      const list = await loadAntiRefreshDomains();
      const enabled = domain ? list.includes(domain.toLowerCase()) : false;
      const blockedCount = (enabled && activeTab) ? await getBlockedCountInTab(activeTab.id) : 0;
      sendResponse({
        success: true,
        domain,
        enabled,
        blockedCount,
        allDomains: list
      });
    });
    return true;
  }

  if (message.action === 'toggleAntiRefreshDomain') {
    (async () => {
      const domain = (message.domain || '').trim().toLowerCase();
      if (!domain) {
        sendResponse({ success: false });
        return;
      }
      const list = await loadAntiRefreshDomains();
      let updated;
      if (message.enabled) {
        updated = Array.from(new Set([...list, domain]));
      } else {
        updated = list.filter(d => d !== domain);
      }
      await saveAntiRefreshDomains(updated);

      if (message.enabled) {
        const allTabs = await chrome.tabs.query({});
        for (const t of allTabs) {
          const td = getRootDomain(t.url || t.pendingUrl);
          if (td && td.toLowerCase() === domain) {
            await applyAntiRefreshIfNeeded(t.id, t.url || t.pendingUrl);
          }
        }
      }

      sendResponse({ success: true, domain, enabled: message.enabled, allDomains: updated });
    })();
    return true;
  }
});
