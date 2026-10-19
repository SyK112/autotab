// AutoTab v2.0.0 - Sekme Kasası & Oto-Yenileme Kalkanı (Dashboard) Mantığı

const i18n = {
  tr: {
    pageTitle: 'AutoTab Sekme Kasası',
    lblWhatsNewBtn: 'v2.0 Neler Yeni?',
    searchPlaceholder: 'Sekme veya site ara...',
    optNewest: 'Sırala: Yeniden Eskiye',
    optOldest: 'Sırala: Eskiden Yeniye',
    optAz: 'Sırala: Alfabetik (A ➔ Z)',
    optZa: 'Sırala: Alfabetik (Z ➔ A)',
    lblExport: 'Yedekle',
    lblImport: 'İçe Aktar',
    lblClearAll: 'Tümünü Sil',
    badgeLeft: 'Sol Tık',
    hintLeftText: 'Sekmeyi açar ve kasadan <strong>siler</strong>.',
    badgeMid: 'Orta Tık / Ctrl+Tık',
    hintMidText: 'Arka planda açar ve kasada <strong>tutar</strong>.',
    badgeMerge: 'Akıllı Koruma',
    hintMergeText: 'Metin veya medya içeren aktif sekmelerin <strong>kapanması önlenir</strong>.',
    arBadgeLabel: 'Oto-Yenileme Kalkanı',
    arPanelDesc: 'Kendi kendine sayfa yenileyip başa dönen siteler (haber siteleri vb.) engellenir ve kaydırma konumunuz kilitlenir:',
    arInputPlaceholder: 'Site ekle (örn: ensonhaber.com)',
    btnAddArDomain: '+ Ekle',
    arEmptyNote: 'Henüz oto-yenileme engeli eklenmiş bir site yok. Eklenti menüsünden (Popup) veya sağdaki kutudan ekleyebilirsiniz.',
    emptyTitle: 'Kasanızda henüz kayıtlı sekme yok',
    emptyDesc: 'Tarayıcı sağ üstündeki AutoTab simgesine tıklayıp "Sekmeleri Kasaya Kaydet & Kapat" butonunu kullanarak açık sekmelerinizi buraya güvenle aktarabilirsiniz.',
    btnOpenAll: 'Tümünü Aç',
    btnOpenAllTitle: 'Sol tık: Tümünü aç ve kasadan sil | Orta tık / Ctrl+Tık: Tümünü aç ve kasada tut',
    btnDeleteGroup: 'Grubu Sil',
    tabUnit: 'sekme',
    groupUnit: 'grup',
    syncQuotaFmt: (tabs, groups, pct) => `Bulut Eşitleme Aktif • ${groups} Grup, ${tabs} Sekme (%${pct} Kota)`,
    todayPrefix: 'Bugün',
    confirmClearAll: 'Kasadaki tüm kayıtlı sekmeleri silmek istediğinize emin misiniz?',
    confirmDeleteGroup: (title, count) => `"${title}" grubunu ve içindeki ${count} sekmeyi silmek istediğinize emin misiniz?`,
    toastProtectedFmt: (stashed, prot) => `🛡️ ${stashed} sekme yedeklendi • Aktif kullanılan ${prot} sekmenin kapanması önlendi`,
    toastKeptInVault: 'Arka planda açıldı (kasada tutuldu)',
    toastGroupKept: 'Grup arka planda açıldı (kasada tutuldu)',
    toastExported: 'Kasa yedeği indirildi',
    toastImported: 'Yedek başarıyla kasaya birleştirildi',
    toastArAdded: (d) => `🛡️ ${d} için oto-yenileme ve başa dönme engellendi`,
    toastArRemoved: (d) => `${d} oto-yenileme kalkanından çıkarıldı`,
    wnHeroBadge: 'BÜYÜK GÜNCELLEME • SÜRÜM 2.0',
    wnTitle: '🚀 AutoTab v2.0: Neler Yeni?',
    wnSubtitle: 'AutoTab artık yalnızca sekmeleri gruplayan bir araç değil; tarayıcı belleğinizi kurtaran, yarım kalan yazılarınızı koruyan ve kendi kendine yenilenen siteleri durduran eksiksiz bir komuta merkezi!',
    wnFeat1Title: 'Sekme Kasası & Bulut Eşitleme (OneTab+)',
    wnFeat1Desc: 'Açık sekmelerinizi tek tıkla kasaya kaldırıp RAM\'i boşaltın. Parçalı Bulut Motoru (chrome.storage.sync) ile verileriniz ek hesap açmadan tüm bilgisayarlarınız arasında otomatik eşitlenir.',
    wnFeat2Title: 'Akıllı Aktif Sekme Koruması',
    wnFeat2Desc: 'Sekmeleri kasaya kaydederken yarım bıraktığınız bir mesaj, doldurduğunuz bir form veya çalan bir video/müzik varsa sekmeyi kapatmadan atlar; yine de yedeğini kasaya alır!',
    wnFeat3Title: '4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı',
    wnFeat3Desc: 'Haber sitelerinin reklam göstermek için sayfayı kendi kendine yenileyip sizi en tepeye atmasını engeller. Kaydırma konumunuzu kilitler ve engellenen girişimleri canlı sayar.',
    wnFeat4Title: 'Akıllı Grup Birleştirme, Orta Tık & Sıralama',
    wnFeat4Desc: 'Aynı sitenin yeni sekmeleri mevcut kasa grubuna eklenir, mükerrer linklerin sadece tarihi güncellenir. Sol tık açıp siler; Orta Tık (veya Ctrl+Tık) kasada tutarak arka planda açar.',
    wnFooterNote: '⚡ Sıfır harici kütüphane • %100 Yerel & Gizlilik Odaklı • < 40 KB',
    wnBtnClose: 'Harika, Keşfetmeye Başla! 🚀',
    nextLang: 'EN'
  },
  en: {
    pageTitle: 'AutoTab Vault',
    lblWhatsNewBtn: "What's New in v2.0",
    searchPlaceholder: 'Search tab or domain...',
    optNewest: 'Sort: Newest First',
    optOldest: 'Sort: Oldest First',
    optAz: 'Sort: A ➔ Z',
    optZa: 'Sort: Z ➔ A',
    lblExport: 'Export',
    lblImport: 'Import',
    lblClearAll: 'Clear All',
    badgeLeft: 'Left Click',
    hintLeftText: 'Opens the tab and <strong>removes</strong> it from vault.',
    badgeMid: 'Middle / Ctrl+Click',
    hintMidText: 'Opens in background and <strong>keeps</strong> it in vault.',
    badgeMerge: 'Smart Guard',
    hintMergeText: 'Active tabs with text or playing media are <strong>prevented from closing</strong>.',
    arBadgeLabel: 'Anti-Refresh Shield',
    arPanelDesc: 'Websites that auto-reload and reset scroll position to top are blocked and scroll-locked:',
    arInputPlaceholder: 'Add domain (e.g. ensonhaber.com)',
    btnAddArDomain: '+ Add',
    arEmptyNote: 'No domains added to Anti-Refresh Shield yet. Toggle from the extension popup or add one on the right.',
    emptyTitle: 'Your vault is currently empty',
    emptyDesc: 'Click the AutoTab icon in your toolbar and select "Save & Close Tabs to Vault" to stash your open tabs here.',
    btnOpenAll: 'Open All',
    btnOpenAllTitle: 'Left click: Open all & remove | Middle click / Ctrl+Click: Open all & keep in vault',
    btnDeleteGroup: 'Delete Group',
    tabUnit: 'tabs',
    groupUnit: 'groups',
    syncQuotaFmt: (tabs, groups, pct) => `Cloud Sync Active • ${groups} Groups, ${tabs} Tabs (${pct}% Quota)`,
    todayPrefix: 'Today',
    confirmClearAll: 'Are you sure you want to delete all saved tabs in your vault?',
    confirmDeleteGroup: (title, count) => `Are you sure you want to delete the "${title}" group and its ${count} tabs?`,
    toastProtectedFmt: (stashed, prot) => `🛡️ ${stashed} tabs backed up • ${prot} active tab(s) prevented from closing`,
    toastKeptInVault: 'Opened in background (kept in vault)',
    toastGroupKept: 'Group opened in background (kept in vault)',
    toastExported: 'Vault backup downloaded',
    toastImported: 'Backup merged into vault successfully',
    toastArAdded: (d) => `🛡️ Auto-refresh & scroll reset blocked for ${d}`,
    toastArRemoved: (d) => `Removed ${d} from Anti-Refresh Shield`,
    wnHeroBadge: 'MAJOR RELEASE • VERSION 2.0',
    wnTitle: "🚀 AutoTab v2.0: What's New?",
    wnSubtitle: 'AutoTab has evolved from an automated tab grouper into an all-in-one browser command center — saving memory, protecting unsaved work, and stopping intrusive auto-refreshing websites!',
    wnFeat1Title: 'Tab Vault & Cloud Sync (OneTab+)',
    wnFeat1Desc: 'Stash open tabs into your vault with one click to free up RAM. Powered by a chunked chrome.storage.sync engine that syncs across your devices with zero external accounts.',
    wnFeat2Title: 'Smart Active Tab Guard',
    wnFeat2Desc: 'Automatically detects tabs with unsaved text, active forms, or playing video/audio in <120ms — backs them up to the vault while keeping them open so you never lose work!',
    wnFeat3Title: '4-Layer Anti-Refresh & Scroll Lock Shield',
    wnFeat3Desc: 'Stops news portals from auto-reloading pages to inflate ad impressions. Locks your exact scroll position and counts blocked reload attempts in real time.',
    wnFeat4Title: 'Smart Domain Merge, Middle-Click & Sorting',
    wnFeat4Desc: 'New tabs merge into existing domain groups and deduplicate URLs by updating timestamps. Left-click opens & removes; Middle-Click (or Ctrl+Click) opens in background & keeps in vault.',
    wnFooterNote: '⚡ Zero external dependencies • 100% Local & Privacy-First • < 40 KB',
    wnBtnClose: "Awesome, Let's Explore! 🚀",
    nextLang: 'TR'
  }
};

let currentLang = 'tr';
let currentSort = 'newest';
let vaultGroups = [];
let antiRefreshDomains = [];
let bytesInUse = 0;
let quotaBytes = 102400;

document.addEventListener('DOMContentLoaded', async () => {
  const pageTitle = document.getElementById('pageTitle');
  const btnWhatsNew = document.getElementById('btnWhatsNew');
  const lblWhatsNewBtn = document.getElementById('lblWhatsNewBtn');
  const quotaSummary = document.getElementById('quotaSummary');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const optNewest = document.getElementById('optNewest');
  const optOldest = document.getElementById('optOldest');
  const optAz = document.getElementById('optAz');
  const optZa = document.getElementById('optZa');
  const btnExport = document.getElementById('btnExport');
  const lblExport = document.getElementById('lblExport');
  const btnImport = document.getElementById('btnImport');
  const lblImport = document.getElementById('lblImport');
  const importFileInput = document.getElementById('importFileInput');
  const btnClearAll = document.getElementById('btnClearAll');
  const lblClearAll = document.getElementById('lblClearAll');
  const langToggle = document.getElementById('langToggle');
  const hintLeftText = document.getElementById('hintLeftText');
  const hintMidText = document.getElementById('hintMidText');
  const hintMergeText = document.getElementById('hintMergeText');
  const badgeLeft = document.querySelector('.badge-left');
  const badgeMid = document.querySelector('.badge-mid');
  const badgeMerge = document.querySelector('.badge-merge');
  const arBadgeLabel = document.getElementById('arBadgeLabel');
  const arPanelDesc = document.getElementById('arPanelDesc');
  const arDomainInput = document.getElementById('arDomainInput');
  const btnAddArDomain = document.getElementById('btnAddArDomain');
  const arDomainsList = document.getElementById('arDomainsList');
  const emptyTitle = document.getElementById('emptyTitle');
  const emptyDesc = document.getElementById('emptyDesc');
  const groupsContainer = document.getElementById('groupsContainer');
  const emptyState = document.getElementById('emptyState');
  const toastBanner = document.getElementById('toastBanner');

  // What's New Modal Elements
  const whatsNewModal = document.getElementById('whatsNewModal');
  const btnCloseWhatsNew = document.getElementById('btnCloseWhatsNew');
  const btnCloseWhatsNewX = document.getElementById('btnCloseWhatsNewX');
  const wnHeroBadge = document.getElementById('wnHeroBadge');
  const wnTitle = document.getElementById('wnTitle');
  const wnSubtitle = document.getElementById('wnSubtitle');
  const wnFeat1Title = document.getElementById('wnFeat1Title');
  const wnFeat1Desc = document.getElementById('wnFeat1Desc');
  const wnFeat2Title = document.getElementById('wnFeat2Title');
  const wnFeat2Desc = document.getElementById('wnFeat2Desc');
  const wnFeat3Title = document.getElementById('wnFeat3Title');
  const wnFeat3Desc = document.getElementById('wnFeat3Desc');
  const wnFeat4Title = document.getElementById('wnFeat4Title');
  const wnFeat4Desc = document.getElementById('wnFeat4Desc');
  const wnFooterNote = document.getElementById('wnFooterNote');

  const stored = await chrome.storage.local.get({
    userLang: 'auto',
    vaultSortOrder: 'newest',
    whatsNewSeenVersion: '',
    showWhatsNewPending: false
  });

  if (stored.userLang === 'auto') {
    currentLang = (navigator.language || '').toLowerCase().startsWith('tr') ? 'tr' : 'en';
  } else {
    currentLang = stored.userLang;
  }

  currentSort = stored.vaultSortOrder || 'newest';
  sortSelect.value = currentSort;

  function showToast(msg, duration = 2400) {
    toastBanner.textContent = msg;
    toastBanner.classList.add('show');
    setTimeout(() => {
      toastBanner.classList.remove('show');
    }, duration);
  }

  async function openWhatsNewModal() {
    whatsNewModal.style.display = 'flex';
    const currentVersion = chrome.runtime.getManifest().version;
    await chrome.storage.local.set({
      whatsNewSeenVersion: currentVersion,
      showWhatsNewPending: false
    });
    if (window.location.search.includes('whatsnew=1')) {
      history.replaceState(null, '', window.location.pathname);
    }
  }

  function closeWhatsNewModal() {
    whatsNewModal.style.display = 'none';
  }

  btnWhatsNew.addEventListener('click', openWhatsNewModal);
  btnCloseWhatsNew.addEventListener('click', closeWhatsNewModal);
  btnCloseWhatsNewX.addEventListener('click', closeWhatsNewModal);
  whatsNewModal.addEventListener('click', (e) => {
    if (e.target === whatsNewModal) closeWhatsNewModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsNewModal.style.display !== 'none') {
      closeWhatsNewModal();
    }
  });

  // İlk v2.0.0 açılışında veya ?whatsnew=1 parametresiyle gelindiğinde "Neler Yeni" ekranını otomatik aç
  const currentVersion = chrome.runtime.getManifest().version;
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('whatsnew') === '1' || stored.showWhatsNewPending || stored.whatsNewSeenVersion !== currentVersion) {
    openWhatsNewModal();
  }

  async function checkLastStashReport() {
    const data = await chrome.storage.local.get({ lastStashReport: null });
    const rep = data.lastStashReport;
    if (rep && rep.protectedCount > 0 && (Date.now() - rep.timestamp) < 8000) {
      const t = i18n[currentLang] || i18n.en;
      showToast(t.toastProtectedFmt(rep.stashedCount, rep.protectedCount), 4200);
      await chrome.storage.local.remove('lastStashReport');
    }
  }

  function formatTimestamp(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const isToday = d.getDate() === now.getDate() &&
                    d.getMonth() === now.getMonth() &&
                    d.getFullYear() === now.getFullYear();

    const timeStr = d.toLocaleTimeString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    if (isToday) {
      const t = i18n[currentLang] || i18n.en;
      return `${t.todayPrefix} ${timeStr}`;
    }

    const dateStr = d.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
      day: 'numeric',
      month: 'short'
    });
    return `${dateStr} ${timeStr}`;
  }

  function sortItemsList(items) {
    const copy = [...items];
    const locale = currentLang === 'tr' ? 'tr' : 'en';

    if (currentSort === 'newest') {
      copy.sort((a, b) => (b.d || 0) - (a.d || 0));
    } else if (currentSort === 'oldest') {
      copy.sort((a, b) => (a.d || 0) - (b.d || 0));
    } else if (currentSort === 'az') {
      copy.sort((a, b) => (a.t || a.u || '').localeCompare(b.t || b.u || '', locale, { sensitivity: 'base' }));
    } else if (currentSort === 'za') {
      copy.sort((a, b) => (b.t || b.u || '').localeCompare(a.t || a.u || '', locale, { sensitivity: 'base' }));
    }
    return copy;
  }

  function updateStaticLabels() {
    const t = i18n[currentLang] || i18n.en;
    document.title = t.pageTitle;
    pageTitle.textContent = t.pageTitle;
    lblWhatsNewBtn.textContent = t.lblWhatsNewBtn;
    searchInput.placeholder = t.searchPlaceholder;
    optNewest.textContent = t.optNewest;
    optOldest.textContent = t.optOldest;
    optAz.textContent = t.optAz;
    optZa.textContent = t.optZa;
    lblExport.textContent = t.lblExport;
    lblImport.textContent = t.lblImport;
    lblClearAll.textContent = t.lblClearAll;
    badgeLeft.textContent = t.badgeLeft;
    hintLeftText.innerHTML = t.hintLeftText;
    badgeMid.textContent = t.badgeMid;
    hintMidText.innerHTML = t.hintMidText;
    badgeMerge.textContent = t.badgeMerge;
    hintMergeText.innerHTML = t.hintMergeText;
    arBadgeLabel.textContent = t.arBadgeLabel;
    arPanelDesc.textContent = t.arPanelDesc;
    arDomainInput.placeholder = t.arInputPlaceholder;
    btnAddArDomain.textContent = t.btnAddArDomain;
    emptyTitle.textContent = t.emptyTitle;
    emptyDesc.textContent = t.emptyDesc;
    langToggle.textContent = t.nextLang;

    wnHeroBadge.textContent = t.wnHeroBadge;
    wnTitle.textContent = t.wnTitle;
    wnSubtitle.textContent = t.wnSubtitle;
    wnFeat1Title.textContent = t.wnFeat1Title;
    wnFeat1Desc.textContent = t.wnFeat1Desc;
    wnFeat2Title.textContent = t.wnFeat2Title;
    wnFeat2Desc.textContent = t.wnFeat2Desc;
    wnFeat3Title.textContent = t.wnFeat3Title;
    wnFeat3Desc.textContent = t.wnFeat3Desc;
    wnFeat4Title.textContent = t.wnFeat4Title;
    wnFeat4Desc.textContent = t.wnFeat4Desc;
    wnFooterNote.textContent = t.wnFooterNote;
    btnCloseWhatsNew.textContent = t.wnBtnClose;

    updateQuotaHeader();
    renderAntiRefreshDomains();
  }

  function updateQuotaHeader() {
    const t = i18n[currentLang] || i18n.en;
    const totalTabs = vaultGroups.reduce((acc, g) => acc + (g.items ? g.items.length : 0), 0);
    const totalGroups = vaultGroups.length;
    const pct = Math.min(100, ((bytesInUse / (quotaBytes || 102400)) * 100)).toFixed(1);
    quotaSummary.textContent = t.syncQuotaFmt(totalTabs, totalGroups, pct);
  }

  function normalizeDomainInput(raw) {
    let s = (raw || '').trim().toLowerCase();
    if (!s) return '';
    try {
      if (s.includes('://')) {
        s = new URL(s).hostname.toLowerCase();
      } else {
        s = s.split('/')[0].split('?')[0];
      }
    } catch {}
    const cleaned = s.replace(/^www\./, '');
    return getRootDomain('https://' + cleaned) || cleaned;
  }

  function getRootDomain(url) {
    try {
      const parsed = new URL(url);
      let hostname = parsed.hostname.toLowerCase().replace(/^www\./, '');
      const parts = hostname.split('.');
      if (parts.length <= 2) return hostname;
      const slds = new Set(['com.tr', 'net.tr', 'org.tr', 'gov.tr', 'edu.tr', 'co.uk', 'gov.uk', 'org.uk', 'ac.uk']);
      const lastTwo = parts.slice(-2).join('.');
      if (slds.has(lastTwo) && parts.length >= 3) {
        return parts.slice(-3).join('.');
      }
      return parts.slice(-2).join('.');
    } catch {
      return null;
    }
  }

  function renderAntiRefreshDomains() {
    const t = i18n[currentLang] || i18n.en;
    arDomainsList.innerHTML = '';

    if (!antiRefreshDomains || antiRefreshDomains.length === 0) {
      const note = document.createElement('span');
      note.className = 'ar-empty-note';
      note.textContent = t.arEmptyNote;
      arDomainsList.appendChild(note);
      return;
    }

    for (const dom of antiRefreshDomains) {
      const chip = document.createElement('div');
      chip.className = 'ar-chip';

      const lbl = document.createElement('span');
      lbl.textContent = dom;

      const btnRem = document.createElement('button');
      btnRem.className = 'ar-chip-remove';
      btnRem.innerHTML = '&times;';
      btnRem.title = 'Kaldır / Remove';
      btnRem.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          action: 'toggleAntiRefreshDomain',
          domain: dom,
          enabled: false
        }, (res) => {
          if (res && res.success) {
            antiRefreshDomains = res.allDomains || [];
            renderAntiRefreshDomains();
            showToast(t.toastArRemoved(dom));
          }
        });
      });

      chip.appendChild(lbl);
      chip.appendChild(btnRem);
      arDomainsList.appendChild(chip);
    }
  }

  function handleAddArDomain() {
    const t = i18n[currentLang] || i18n.en;
    const dom = normalizeDomainInput(arDomainInput.value);
    if (!dom || !dom.includes('.')) return;

    chrome.runtime.sendMessage({
      action: 'toggleAntiRefreshDomain',
      domain: dom,
      enabled: true
    }, (res) => {
      if (res && res.success) {
        antiRefreshDomains = res.allDomains || [];
        arDomainInput.value = '';
        renderAntiRefreshDomains();
        showToast(t.toastArAdded(dom));
      }
    });
  }

  btnAddArDomain.addEventListener('click', handleAddArDomain);
  arDomainInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddArDomain();
    }
  });

  async function saveAndRender(newGroups) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: 'saveVaultData', groups: newGroups }, (res) => {
        if (res && res.success) {
          vaultGroups = res.groups || [];
          bytesInUse = res.bytesInUse || 0;
          quotaBytes = res.quotaBytes || 102400;
        } else {
          vaultGroups = newGroups;
        }
        updateQuotaHeader();
        renderGroups();
        resolve();
      });
    });
  }

  async function handleItemClick(domainKey, itemUrl, removeAfterOpen) {
    const t = i18n[currentLang] || i18n.en;

    if (removeAfterOpen) {
      const updated = vaultGroups.map(g => {
        if (g.domain.toLowerCase() !== domainKey.toLowerCase()) return g;
        return {
          ...g,
          items: g.items.filter(it => it.u !== itemUrl)
        };
      }).filter(g => g.items && g.items.length > 0);

      await saveAndRender(updated);
      chrome.tabs.create({ url: itemUrl, active: true });
    } else {
      chrome.tabs.create({ url: itemUrl, active: false });
      showToast(t.toastKeptInVault);
    }
  }

  async function handleOpenGroup(domainKey, removeAfterOpen) {
    const t = i18n[currentLang] || i18n.en;
    const targetGroup = vaultGroups.find(g => g.domain.toLowerCase() === domainKey.toLowerCase());
    if (!targetGroup || !targetGroup.items || targetGroup.items.length === 0) return;

    const sortedItems = sortItemsList(targetGroup.items);
    const urls = sortedItems.map(it => it.u);

    if (removeAfterOpen) {
      const updated = vaultGroups.filter(g => g.domain.toLowerCase() !== domainKey.toLowerCase());
      await saveAndRender(updated);
    } else {
      showToast(t.toastGroupKept);
    }

    for (const u of urls) {
      chrome.tabs.create({ url: u, active: false });
    }
  }

  function renderGroups() {
    const t = i18n[currentLang] || i18n.en;
    const query = (searchInput.value || '').trim().toLowerCase();

    groupsContainer.innerHTML = '';

    const filteredGroups = [];
    for (const g of vaultGroups) {
      if (!g.items || g.items.length === 0) continue;
      if (!query) {
        filteredGroups.push({ ...g, items: sortItemsList(g.items) });
      } else {
        const domainMatches = g.domain.toLowerCase().includes(query) || (g.title || '').toLowerCase().includes(query);
        const matchingItems = g.items.filter(it =>
          domainMatches ||
          (it.t || '').toLowerCase().includes(query) ||
          (it.u || '').toLowerCase().includes(query)
        );
        if (matchingItems.length > 0) {
          filteredGroups.push({ ...g, items: sortItemsList(matchingItems) });
        }
      }
    }

    if (filteredGroups.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    for (const group of filteredGroups) {
      const card = document.createElement('div');
      card.className = 'group-card';

      const colorClass = `color-${group.color || 'blue'}`;
      const header = document.createElement('div');
      header.className = 'group-header';

      const titleArea = document.createElement('div');
      titleArea.className = 'group-title-area';

      const pill = document.createElement('span');
      pill.className = `group-color-pill ${colorClass}`;
      pill.textContent = group.title || group.domain;

      const domainSub = document.createElement('span');
      domainSub.className = 'group-domain-sub';
      domainSub.textContent = group.domain;

      const countBadge = document.createElement('span');
      countBadge.className = 'group-count-badge';
      countBadge.textContent = `${group.items.length} ${t.tabUnit}`;

      titleArea.appendChild(pill);
      titleArea.appendChild(domainSub);
      titleArea.appendChild(countBadge);

      const actions = document.createElement('div');
      actions.className = 'group-actions';

      const btnOpenAll = document.createElement('button');
      btnOpenAll.className = 'btn-group-action btn-open-all';
      btnOpenAll.textContent = t.btnOpenAll;
      btnOpenAll.title = t.btnOpenAllTitle;

      btnOpenAll.addEventListener('click', (e) => {
        e.preventDefault();
        const keepInVault = e.ctrlKey || e.metaKey || e.shiftKey;
        handleOpenGroup(group.domain, !keepInVault);
      });

      btnOpenAll.addEventListener('auxclick', (e) => {
        if (e.button === 1) {
          e.preventDefault();
          handleOpenGroup(group.domain, false);
        }
      });

      const btnDelGroup = document.createElement('button');
      btnDelGroup.className = 'btn-group-action btn-delete-group';
      btnDelGroup.textContent = t.btnDeleteGroup;
      btnDelGroup.addEventListener('click', async () => {
        const groupLabel = group.title || group.domain;
        const fullGroup = vaultGroups.find(x => x.domain.toLowerCase() === group.domain.toLowerCase());
        const totalInGroup = fullGroup && fullGroup.items ? fullGroup.items.length : group.items.length;

        if (confirm(t.confirmDeleteGroup(groupLabel, totalInGroup))) {
          const updated = vaultGroups.filter(item => item.domain.toLowerCase() !== group.domain.toLowerCase());
          await saveAndRender(updated);
        }
      });

      actions.appendChild(btnOpenAll);
      actions.appendChild(btnDelGroup);

      header.appendChild(titleArea);
      header.appendChild(actions);
      card.appendChild(header);

      const list = document.createElement('div');
      list.className = 'tab-list';

      for (const item of group.items) {
        const row = document.createElement('div');
        row.className = 'tab-row';

        const link = document.createElement('a');
        link.className = 'tab-link';
        link.href = item.u;

        link.addEventListener('click', (e) => {
          e.preventDefault();
          const keep = e.ctrlKey || e.metaKey || e.shiftKey;
          handleItemClick(group.domain, item.u, !keep);
        });

        link.addEventListener('auxclick', (e) => {
          if (e.button === 1) {
            e.preventDefault();
            handleItemClick(group.domain, item.u, false);
          }
        });

        const favBox = document.createElement('div');
        favBox.className = `tab-favicon-box ${colorClass}`;
        favBox.textContent = (group.title || group.domain || '?').charAt(0).toUpperCase();

        const textWrap = document.createElement('div');
        textWrap.className = 'tab-text-wrap';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'tab-title';
        titleSpan.textContent = item.t || item.u;

        const urlPreview = document.createElement('span');
        urlPreview.className = 'tab-url-preview';
        urlPreview.textContent = item.u;

        textWrap.appendChild(titleSpan);
        textWrap.appendChild(urlPreview);

        link.appendChild(favBox);
        link.appendChild(textWrap);

        const metaRight = document.createElement('div');
        metaRight.className = 'tab-meta-right';

        const dateSpan = document.createElement('span');
        dateSpan.className = 'tab-date';
        dateSpan.textContent = formatTimestamp(item.d);

        const btnRem = document.createElement('button');
        btnRem.className = 'btn-remove-tab';
        btnRem.innerHTML = '&times;';
        btnRem.title = 'Sil / Remove';
        btnRem.addEventListener('click', async (e) => {
          e.stopPropagation();
          const updated = vaultGroups.map(g => {
            if (g.domain.toLowerCase() !== group.domain.toLowerCase()) return g;
            return { ...g, items: g.items.filter(it => it.u !== item.u) };
          }).filter(g => g.items && g.items.length > 0);
          await saveAndRender(updated);
        });

        metaRight.appendChild(dateSpan);
        metaRight.appendChild(btnRem);

        row.appendChild(link);
        row.appendChild(metaRight);
        list.appendChild(row);
      }

      card.appendChild(list);
      groupsContainer.appendChild(card);
    }
  }

  function loadInitialVault() {
    chrome.runtime.sendMessage({ action: 'getVaultData' }, (res) => {
      if (res && res.success) {
        vaultGroups = res.groups || [];
        antiRefreshDomains = res.antiRefreshDomains || [];
        bytesInUse = res.bytesInUse || 0;
        quotaBytes = res.quotaBytes || 102400;
      }
      updateStaticLabels();
      renderGroups();
      checkLastStashReport();
    });
  }

  searchInput.addEventListener('input', () => renderGroups());

  sortSelect.addEventListener('change', async () => {
    currentSort = sortSelect.value;
    await chrome.storage.local.set({ vaultSortOrder: currentSort });
    renderGroups();
  });

  langToggle.addEventListener('click', async () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    await chrome.storage.local.set({ userLang: currentLang });
    updateStaticLabels();
    renderGroups();
  });

  btnExport.addEventListener('click', () => {
    const t = i18n[currentLang] || i18n.en;
    const dataStr = JSON.stringify(vaultGroups, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateTag = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `autotab-vault-${dateTag}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(t.toastExported);
  });

  btnImport.addEventListener('click', () => {
    importFileInput.click();
  });

  importFileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!Array.isArray(imported)) return;
        const map = new Map();
        for (const g of vaultGroups) {
          map.set(g.domain.toLowerCase(), g);
        }
        for (const impGroup of imported) {
          if (!impGroup || !impGroup.domain || !Array.isArray(impGroup.items)) continue;
          const key = impGroup.domain.toLowerCase();
          let target = map.get(key);
          if (!target) {
            target = {
              domain: key,
              title: impGroup.title || key,
              color: impGroup.color || 'blue',
              updatedAt: Date.now(),
              items: []
            };
            map.set(key, target);
            vaultGroups.push(target);
          }
          for (const it of impGroup.items) {
            if (!it || !it.u) continue;
            const existingIdx = target.items.findIndex(x => x.u === it.u);
            if (existingIdx !== -1) {
              if ((it.d || 0) > (target.items[existingIdx].d || 0)) {
                target.items[existingIdx].d = it.d;
                target.items[existingIdx].t = it.t || target.items[existingIdx].t;
              }
            } else {
              target.items.push({ u: it.u, t: it.t || it.u, d: it.d || Date.now() });
            }
          }
        }
        await saveAndRender(vaultGroups);
        const t = i18n[currentLang] || i18n.en;
        showToast(t.toastImported);
      } catch (err) {
        console.error('Import error:', err);
      }
      importFileInput.value = '';
    };
    reader.readAsText(file);
  });

  btnClearAll.addEventListener('click', async () => {
    const t = i18n[currentLang] || i18n.en;
    if (vaultGroups.length === 0) return;
    if (confirm(t.confirmClearAll)) {
      await saveAndRender([]);
    }
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' || (areaName === 'local' && (changes.vault_backup || changes.anti_refresh_domains))) {
      loadInitialVault();
    }
  });

  loadInitialVault();
});
