// AutoTab v1.1.0 - Akıllı & Tam Otomatik Sekme Gruplayıcı (Service Worker)

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

// URL'den temiz kök alan adı (Root Domain) çıkarma
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
    // IP adresi veya yerel ağ kontrolü (örn. 192.168.112.4 veya cihaz.local)
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

// Alan adından anlaşılır grup başlığı üretme
function formatGroupTitle(domain) {
  if (!domain) return '';
  const parts = domain.split('.');
  const primaryName = parts[0].toLowerCase();
  
  if (SPECIAL_SITE_CONFIG[primaryName]) {
    return SPECIAL_SITE_CONFIG[primaryName].title;
  }
  
  return primaryName.charAt(0).toUpperCase() + primaryName.slice(1);
}

// Alan adına göre tutarlı renk belirleme
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

// Ayarları getir
async function getSettings() {
  const defaults = { autoGroupEnabled: true };
  const stored = await chrome.storage.local.get(defaults);
  return { ...defaults, ...stored };
}

// Debounce ve işlem kilit yönetimi
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
  }, 300); // 300ms akıcı gecikme
  
  debounceTimers.set(windowId, timer);
}

// Ana Gruplama ve Temizleme Fonksiyonu
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

    // ADIM 1: Alan adı değişen veya sabitlenen sekmeleri ait olmadıkları gruptan çıkar
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

        // Eğer sekme başka bir adrese yönlendiyse ve grup başlığıyla uyuşmuyorsa gruptan çıkar
        if (!currentDomain || (group.title && group.title.trim().toLowerCase() !== expectedTitle.trim().toLowerCase())) {
          try {
            await chrome.tabs.ungroup(tab.id);
            tab.groupId = -1;
          } catch (e) {}
        }
      }
    }

    // Güncel sekme durumunu al
    tabs = await chrome.tabs.query({ windowId });

    // ADIM 2: Sekmeleri alan adlarına göre haritalandır
    const domainTabsMap = new Map(); // domain -> tab[]
    for (const tab of tabs) {
      if (tab.pinned) continue;
      const domain = getRootDomain(tab.url || tab.pendingUrl);
      if (!domain) continue;

      if (!domainTabsMap.has(domain)) {
        domainTabsMap.set(domain, []);
      }
      domainTabsMap.get(domain).push(tab);
    }

    // Güncel grupları tekrar haritalandır
    const currentGroups = await chrome.tabGroups.query({ windowId });
    const groupByTitle = new Map();
    for (const g of currentGroups) {
      if (g.title) {
        groupByTitle.set(g.title.trim().toLowerCase(), g);
      }
    }

    // ADIM 3: Yalnızca 2 veya daha fazla sekmesi olan domainleri grupla
    for (const [domain, domainTabs] of domainTabsMap.entries()) {
      const title = formatGroupTitle(domain);
      const titleLower = title.toLowerCase();
      const color = getDomainColor(domain);

      if (domainTabs.length >= 2) {
        const existingGroup = groupByTitle.get(titleLower);

        if (existingGroup) {
          // Mevcut grupta olmayan sekmeleri gruba kat
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
          // Yeni grup oluştur
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

    // ADIM 4: Tek kalan sekmelerin grubunu anında çöz (Tekil sekme için grup başlığı olmasın)
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

// Tüm grupları çöz (Manuel Eylem)
async function ungroupAllTabs(windowId) {
  const tabs = await chrome.tabs.query({ windowId });
  const groupedTabIds = tabs.filter(t => t.groupId && t.groupId > 0).map(t => t.id);
  if (groupedTabIds.length > 0) {
    await chrome.tabs.ungroup(groupedTabIds);
  }
}

// Olay Dinleyicileri (Arka Plan Otomasyonu)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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

chrome.runtime.onInstalled.addListener(async () => {
  const settings = await getSettings();
  await chrome.storage.local.set(settings);
  
  const windows = await chrome.windows.getAll({ populate: false });
  for (const win of windows) {
    scheduleAutoGroup(win.id);
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
});
