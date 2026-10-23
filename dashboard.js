// AutoTab v2.1.0 - Sekme Kasası, Tarih Ajandası, Hibrit Google Drive Eşitlemesi & Oto-Yenileme Kalkanı Mantığı

const i18n = {
  tr: {
    pageTitle: 'AutoTab Sekme Kasası',
    lblWhatsNewBtn: 'v2.1 Neler Yeni?',
    searchPlaceholder: 'Sekme veya site ara...',
    optNewest: 'Sırala: Yeniden Eskiye',
    optOldest: 'Sırala: Eskiden Yeniye',
    optAz: 'Sırala: Alfabetik (A ➔ Z)',
    optZa: 'Sırala: Alfabetik (Z ➔ A)',
    lblGDriveBtn: 'Google Drive Eşitlemesi',
    lblGDriveBtnConnected: 'Google Drive Aktif',
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
    emptyFilteredTitle: 'Seçili tarih veya arama kriterine uygun sekme bulunamadı',
    emptyFilteredDesc: 'Üstteki "Filtreyi Temizle" butonuna tıklayarak tüm kayıtlı kasa gruplarınızı yeniden görüntüleyebilirsiniz.',
    btnOpenAll: 'Tümünü Aç',
    btnOpenFiltered: (n) => `Filtrelenenleri Aç (${n})`,
    btnOpenAllTitle: 'Sol tık: Aç ve kasadan sil | Orta tık / Ctrl+Tık: Aç ve kasada tut',
    btnDeleteGroup: 'Grubu Sil',
    btnDeleteFiltered: (n) => `Seçiliyi Sil (${n})`,
    tabUnit: 'sekme',
    groupUnit: 'grup',
    // Modül B: Gerçekçi Depolama ve Senkronizasyon Durum Göstergesi
    localQuotaFmt: (tabs, groups, pct) => `💾 Yerel & Profil Hafızası Aktif • ${groups} Grup, ${tabs} Sekme (%${pct} Kota)`,
    driveQuotaFmt: (tabs, groups, timeStr) => `☁️ Google Drive Bulut Eşitleme Aktif (Son eşitleme: ${timeStr}) • ${groups} Grup, ${tabs} Sekme`,
    // Modül C: Tarih Ajandası
    agendaBtnAll: 'Tarih: Tümü',
    agendaBtnToday: (n) => `Tarih: Bugün (${n})`,
    agendaBtnYesterday: (n) => `Tarih: Dün (${n})`,
    agendaBtnLast7: (n) => `Tarih: Son 7 Gün (${n})`,
    agendaBtnDay: (label, n) => `Tarih: ${label} (${n})`,
    chipAllFmt: (n) => `Tümü (${n})`,
    chipTodayFmt: (n) => `Bugün (${n})`,
    chipYesterdayFmt: (n) => `Dün (${n})`,
    chipLast7Fmt: (n) => `Son 7 Gün (${n})`,
    weekdays: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'],
    filterStripFmt: (tabs, groups, label) => `📅 Aktif Filtre (${label}): ${groups} grupta toplam ${tabs} sekme listeleniyor • Grup işlemleri yalnızca bu sekmelere uygulanır.`,
    btnResetFilters: 'Filtreyi Temizle ×',
    todayPrefix: 'Bugün',
    confirmClearAll: 'Kasadaki tüm kayıtlı sekmeleri silmek istediğinize emin misiniz?',
    confirmDeleteGroup: (title, count) => `"${title}" grubunu ve içindeki ${count} sekmeyi silmek istediğinize emin misiniz?`,
    confirmDeleteGroupFiltered: (title, count, total) => `"${title}" grubundaki toplam ${total} sekmeden yalnızca mevcut filtreye uyan ${count} sekmeyi silmek istediğinize emin misiniz? (Diğer günlerdeki sekmeler korunacaktır)`,
    toastProtectedFmt: (stashed, prot) => `🛡️ ${stashed} sekme yedeklendi • Aktif kullanılan ${prot} sekmenin kapanması önlendi`,
    toastKeptInVault: 'Arka planda açıldı (kasada tutuldu)',
    toastGroupKept: 'Grup arka planda açıldı (kasada tutuldu)',
    toastExported: 'Kasa yedeği indirildi',
    toastImported: 'Yedek başarıyla kasaya birleştirildi',
    toastArAdded: (d) => `🛡️ ${d} için oto-yenileme ve başa dönme engellendi`,
    toastArRemoved: (d) => `${d} oto-yenileme kalkanından çıkarıldı`,
    // Modül A: Google Drive Modalı
    gdHeroBadge: 'KADEMELİ DEPOLAMA • GOOGLE DRIVE',
    gdTitle: '☁️ Google Drive Bulut Eşitlemesi',
    gdSubtitle: 'Brave, Chrome, Edge ve Vivaldi gibi farklı Chromium tarayıcılar arasında 100 KB sınırına takılmadan kendi Google Drive alanınız üzerinden kasa verilerinizi canlı eşitleyin.',
    gdStatusLocalTitle: 'Varsayılan Katman: Yerel & Profil Hafızası Aktif',
    gdStatusLocalDesc: 'Google Drive henüz bağlanmadı. Verileriniz yerel diskte ve tarayıcı profilinde sıfır kurulumla saklanıyor.',
    gdStatusDriveTitle: '☁️ Google Drive Bulut Eşitleme Aktif',
    gdStatusDriveDesc: (timeStr) => `Kasanız kendi Google Drive hesabınızdaki autotab-vault-v2.json dosyasıyla canlı eşitleniyor (Son eşitleme: ${timeStr}).`,
    btnGDriveDisconnect: 'Bağlantıyı Kes',
    btnGDriveSyncNow: '🔄 Şimdi Eşitle',
    btnGDriveConnect: '☁️ Google Drive ile Bağlan & Eşitle',
    toastDriveConnected: '☁️ Google Drive eşitlemesi başarıyla bağlandı!',
    toastDriveSynced: '☁️ Google Drive ile kasa başarıyla eşitlendi',
    toastDriveDisconnected: 'Google Drive bağlantısı kesildi (Yerel & Profil hafızası aktif)',
    toastDriveError: (msg) => `Google Drive eşitleme uyarısı: ${msg}`,
    // Neler Yeni v2.1
    wnHeroBadge: 'YENİ GÜNCELLEME • SÜRÜM 2.1',
    wnTitle: '🚀 AutoTab v2.1: Neler Yeni?',
    wnSubtitle: 'AutoTab v2.1; Sekme Sayaçlı Tarih Ajandası, Akordeon Grup Modu, Ayrılırken Başa Taşıma, Canlı Araç Çubuğu Rozeti ve Hibrit Google Drive Eşitlemesi ile çok daha akıllı!',
    wnFeat1Title: 'Sekme Sayaçlı Tarih Ajandası & Güvenli Filtre',
    wnFeat1Desc: 'Bugün, Dün, Son 7 Gün hapları veya üzerinde sekme sayısı yazan aylık takvimden gün seçin. Filtre aktifken "Tümünü Aç" ve "Grubu Sil" yalnızca seçili gündeki sekmelere etki eder!',
    wnFeat2Title: 'Akordeon Modu & Ayrılırken Başa Taşıma',
    wnFeat2Desc: 'Bir gruba tıkladığınızda diğer gruplar otomatik daralır. Sekmeden ayrıldığınız anda o sekme sessizce grubun 1. sırasına taşınır; geri döndüğünüzde son kullandığınız sekme hep en baştadır!',
    wnFeat3Title: 'Araç Çubuğunda Canlı Engelleme Rozeti',
    wnFeat3Desc: '4 katmanlı Oto-Yenileme Kalkanı bir yenileme girişimini durdurduğu salisede sağ üstteki AutoTab simgesinde sekmeye özel kehribar sayaç (1, 2, 3...) belirir; 0 iken gizli kalır.',
    wnFeat4Title: 'Hibrit Google Drive Eşitlemesi & Gerçek Durum',
    wnFeat4Desc: 'Varsayılan Yerel & Profil hafızasına ek olarak isteğe bağlı OAuth 2.0 Google Drive eşitlemesiyle 100 KB sınırını aşın ve Brave, Chrome, Edge arasında canlı kasa eşitleyin.',
    wnFooterNote: '⚡ Sıfır harici kütüphane • %100 Yerel & Gizlilik Odaklı • < 45 KB',
    wnBtnClose: 'Harika, Keşfetmeye Başla! 🚀',
    nextLang: 'EN'
  },
  en: {
    pageTitle: 'AutoTab Vault',
    lblWhatsNewBtn: "What's New in v2.1",
    searchPlaceholder: 'Search tab or domain...',
    optNewest: 'Sort: Newest First',
    optOldest: 'Sort: Oldest First',
    optAz: 'Sort: A ➔ Z',
    optZa: 'Sort: Z ➔ A',
    lblGDriveBtn: 'Google Drive Sync',
    lblGDriveBtnConnected: 'Google Drive Active',
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
    emptyFilteredTitle: 'No tabs match the selected date or search filter',
    emptyFilteredDesc: 'Click "Clear Filter" above to view all saved groups in your vault.',
    btnOpenAll: 'Open All',
    btnOpenFiltered: (n) => `Open Filtered (${n})`,
    btnOpenAllTitle: 'Left click: Open & remove | Middle click / Ctrl+Click: Open & keep in vault',
    btnDeleteGroup: 'Delete Group',
    btnDeleteFiltered: (n) => `Delete Filtered (${n})`,
    tabUnit: 'tabs',
    groupUnit: 'groups',
    // Modül B: Realistic Storage & Sync Status
    localQuotaFmt: (tabs, groups, pct) => `💾 Local & Profile Storage Active • ${groups} Groups, ${tabs} Tabs (${pct}% Quota)`,
    driveQuotaFmt: (tabs, groups, timeStr) => `☁️ Google Drive Cloud Sync Active (Last sync: ${timeStr}) • ${groups} Groups, ${tabs} Tabs`,
    // Modül C: Date Agenda
    agendaBtnAll: 'Date: All',
    agendaBtnToday: (n) => `Date: Today (${n})`,
    agendaBtnYesterday: (n) => `Date: Yesterday (${n})`,
    agendaBtnLast7: (n) => `Date: Last 7 Days (${n})`,
    agendaBtnDay: (label, n) => `Date: ${label} (${n})`,
    chipAllFmt: (n) => `All (${n})`,
    chipTodayFmt: (n) => `Today (${n})`,
    chipYesterdayFmt: (n) => `Yesterday (${n})`,
    chipLast7Fmt: (n) => `Last 7 Days (${n})`,
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    filterStripFmt: (tabs, groups, label) => `📅 Active Filter (${label}): Showing ${tabs} tabs across ${groups} groups • Group actions only affect these filtered tabs.`,
    btnResetFilters: 'Clear Filter ×',
    todayPrefix: 'Today',
    confirmClearAll: 'Are you sure you want to delete all saved tabs in your vault?',
    confirmDeleteGroup: (title, count) => `Are you sure you want to delete the "${title}" group and its ${count} tabs?`,
    confirmDeleteGroupFiltered: (title, count, total) => `Are you sure you want to delete only the ${count} filtered tab(s) out of ${total} total in "${title}"? (Tabs from other dates will be kept safe)`,
    toastProtectedFmt: (stashed, prot) => `🛡️ ${stashed} tabs backed up • ${prot} active tab(s) prevented from closing`,
    toastKeptInVault: 'Opened in background (kept in vault)',
    toastGroupKept: 'Group opened in background (kept in vault)',
    toastExported: 'Vault backup downloaded',
    toastImported: 'Backup merged into vault successfully',
    toastArAdded: (d) => `🛡️ Auto-refresh & scroll reset blocked for ${d}`,
    toastArRemoved: (d) => `Removed ${d} from Anti-Refresh Shield`,
    // Modül A: Google Drive Modal
    gdHeroBadge: 'TIERED STORAGE • GOOGLE DRIVE',
    gdTitle: '☁️ Google Drive Cloud Sync',
    gdSubtitle: 'Sync your Tab Vault across Brave, Chrome, Edge, and Vivaldi without the 100 KB limit using your personal Google Drive.',
    gdStatusLocalTitle: 'Default Tier: Local & Profile Storage Active',
    gdStatusLocalDesc: 'Google Drive is not connected yet. Your tabs are safely stored in local & browser profile storage with zero setup.',
    gdStatusDriveTitle: '☁️ Google Drive Cloud Sync Active',
    gdStatusDriveDesc: (timeStr) => `Your vault is syncing live with autotab-vault-v2.json on your Google Drive (Last sync: ${timeStr}).`,
    btnGDriveDisconnect: 'Disconnect',
    btnGDriveSyncNow: '🔄 Sync Now',
    btnGDriveConnect: '☁️ Connect & Sync with Google Drive',
    toastDriveConnected: '☁️ Google Drive sync connected successfully!',
    toastDriveSynced: '☁️ Vault synced with Google Drive',
    toastDriveDisconnected: 'Google Drive disconnected (Local & Profile storage active)',
    toastDriveError: (msg) => `Google Drive sync notice: ${msg}`,
    // What's New v2.1
    wnHeroBadge: 'NEW UPDATE • VERSION 2.1',
    wnTitle: "🚀 AutoTab v2.1: What's New?",
    wnSubtitle: 'AutoTab v2.1 brings the Tab-Count Date Agenda, Accordion Group Mode, Move-to-Front on Leave, Live Toolbar Counter Badge, and Hybrid Google Drive Sync!',
    wnFeat1Title: 'Date Agenda Calendar & Filter-Safe Actions',
    wnFeat1Desc: 'Filter by Today, Yesterday, Last 7 Days, or pick any date on the monthly calendar with per-day tab counts. "Open All" and "Delete Group" safely respect active filters!',
    wnFeat2Title: 'Accordion Mode & Move Last Tab to Front',
    wnFeat2Desc: 'Focusing a group automatically collapses other groups. Leaving a tab silently moves it to the 1st slot of its group so your last-used tab is always first!',
    wnFeat3Title: 'Live Toolbar Anti-Refresh Badge',
    wnFeat3Desc: 'The moment the 4-Layer Shield blocks a forced reload, a per-tab amber badge (1, 2, 3...) appears on the toolbar icon — staying clean and hidden at 0.',
    wnFeat4Title: 'Hybrid Google Drive Sync & Honest Status',
    wnFeat4Desc: 'In addition to zero-setup Local & Profile storage, optionally connect Google Drive via OAuth 2.0 to bypass the 100 KB limit across Brave, Chrome, and Edge.',
    wnFooterNote: '⚡ Zero external dependencies • 100% Local & Privacy-First • < 45 KB',
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
let gdriveStatus = {
  enabled: false,
  lastSync: 0
};

// Modül C: Tarih Filtresi Durumu ('all' | 'today' | 'yesterday' | 'last7' | 'day:YYYY-MM-DD')
let selectedDateFilter = 'all';
let calendarViewYear = new Date().getFullYear();
let calendarViewMonth = new Date().getMonth();

document.addEventListener('DOMContentLoaded', async () => {
  const pageTitle = document.getElementById('pageTitle');
  const btnWhatsNew = document.getElementById('btnWhatsNew');
  const lblWhatsNewBtn = document.getElementById('lblWhatsNewBtn');
  const syncStatusDot = document.getElementById('syncStatusDot');
  const quotaSummary = document.getElementById('quotaSummary');
  const searchInput = document.getElementById('searchInput');

  // Modül C: Tarih Ajandası Elemanları
  const dateAgendaWrap = document.getElementById('dateAgendaWrap');
  const btnDateAgenda = document.getElementById('btnDateAgenda');
  const lblDateAgenda = document.getElementById('lblDateAgenda');
  const dateAgendaPopover = document.getElementById('dateAgendaPopover');
  const chipAll = document.getElementById('chipAll');
  const chipToday = document.getElementById('chipToday');
  const chipYesterday = document.getElementById('chipYesterday');
  const chipLast7 = document.getElementById('chipLast7');
  const btnPrevMonth = document.getElementById('btnPrevMonth');
  const btnNextMonth = document.getElementById('btnNextMonth');
  const agendaMonthLabel = document.getElementById('agendaMonthLabel');
  const agendaWeekdays = document.getElementById('agendaWeekdays');
  const agendaCalendarGrid = document.getElementById('agendaCalendarGrid');
  const activeFilterStrip = document.getElementById('activeFilterStrip');
  const activeFilterText = document.getElementById('activeFilterText');
  const btnResetFilters = document.getElementById('btnResetFilters');

  const sortSelect = document.getElementById('sortSelect');
  const optNewest = document.getElementById('optNewest');
  const optOldest = document.getElementById('optOldest');
  const optAz = document.getElementById('optAz');
  const optZa = document.getElementById('optZa');
  const btnGDriveSync = document.getElementById('btnGDriveSync');
  const lblGDriveBtn = document.getElementById('lblGDriveBtn');
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

  // Modül A: Google Drive Modalı Elemanları
  const gdriveModal = document.getElementById('gdriveModal');
  const btnCloseGDriveX = document.getElementById('btnCloseGDriveX');
  const gdHeroBadge = document.getElementById('gdHeroBadge');
  const gdTitle = document.getElementById('gdTitle');
  const gdSubtitle = document.getElementById('gdSubtitle');
  const gdStatusDot = document.getElementById('gdStatusDot');
  const gdStatusTitle = document.getElementById('gdStatusTitle');
  const gdStatusDesc = document.getElementById('gdStatusDesc');
  const btnGDriveDisconnect = document.getElementById('btnGDriveDisconnect');
  const btnGDriveSyncNow = document.getElementById('btnGDriveSyncNow');
  const btnGDriveConnect = document.getElementById('btnGDriveConnect');

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

  function showToast(msg, duration = 2600) {
    toastBanner.textContent = msg;
    toastBanner.classList.add('show');
    setTimeout(() => {
      toastBanner.classList.remove('show');
    }, duration);
  }

  // ============================================================================
  // MODÜL C: TARİH AJANDASI YARDIMCI FONKSİYONLARI (Sıfır Kütüphane, Saf Date API)
  // ============================================================================
  function toDateKey(ts) {
    const d = new Date(ts || Date.now());
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getTodayYesterdayKeys() {
    const now = new Date();
    const todayKey = toDateKey(now.getTime());
    const yest = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const yesterdayKey = toDateKey(yest.getTime());
    const sevenDaysAgoStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0).getTime();
    return { todayKey, yesterdayKey, sevenDaysAgoStart };
  }

  function itemMatchesDateFilter(item, filterMode = selectedDateFilter) {
    if (!filterMode || filterMode === 'all') return true;
    const ts = item && item.d ? item.d : 0;
    if (!ts) return false;

    const { todayKey, yesterdayKey, sevenDaysAgoStart } = getTodayYesterdayKeys();
    const itemKey = toDateKey(ts);

    if (filterMode === 'today') {
      return itemKey === todayKey;
    }
    if (filterMode === 'yesterday') {
      return itemKey === yesterdayKey;
    }
    if (filterMode === 'last7') {
      return ts >= sevenDaysAgoStart;
    }
    if (filterMode.startsWith('day:')) {
      const targetKey = filterMode.slice(4);
      return itemKey === targetKey;
    }
    return true;
  }

  function computeDateCounts() {
    const countsByDay = new Map();
    let total = 0;
    let todayCount = 0;
    let yesterdayCount = 0;
    let last7Count = 0;
    const { todayKey, yesterdayKey, sevenDaysAgoStart } = getTodayYesterdayKeys();

    for (const g of vaultGroups) {
      if (!g || !Array.isArray(g.items)) continue;
      for (const it of g.items) {
        total++;
        const ts = it.d || 0;
        if (!ts) continue;
        const key = toDateKey(ts);
        countsByDay.set(key, (countsByDay.get(key) || 0) + 1);
        if (key === todayKey) todayCount++;
        if (key === yesterdayKey) yesterdayCount++;
        if (ts >= sevenDaysAgoStart) last7Count++;
      }
    }

    return { countsByDay, total, todayCount, yesterdayCount, last7Count };
  }

  function formatShortDateKey(dateKey) {
    try {
      const [y, m, d] = dateKey.split('-').map(Number);
      const dt = new Date(y, m - 1, d);
      return dt.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
        day: 'numeric',
        month: 'short'
      });
    } catch (e) {
      return dateKey;
    }
  }

  function updateAgendaUI() {
    const t = i18n[currentLang] || i18n.en;
    const { countsByDay, total, todayCount, yesterdayCount, last7Count } = computeDateCounts();

    chipAll.textContent = t.chipAllFmt(total);
    chipToday.textContent = t.chipTodayFmt(todayCount);
    chipYesterday.textContent = t.chipYesterdayFmt(yesterdayCount);
    chipLast7.textContent = t.chipLast7Fmt(last7Count);

    [chipAll, chipToday, chipYesterday, chipLast7].forEach(ch => {
      ch.classList.toggle('active', ch.dataset.filter === selectedDateFilter);
    });

    if (selectedDateFilter === 'all') {
      lblDateAgenda.textContent = t.agendaBtnAll;
      btnDateAgenda.classList.remove('filter-active');
    } else if (selectedDateFilter === 'today') {
      lblDateAgenda.textContent = t.agendaBtnToday(todayCount);
      btnDateAgenda.classList.add('filter-active');
    } else if (selectedDateFilter === 'yesterday') {
      lblDateAgenda.textContent = t.agendaBtnYesterday(yesterdayCount);
      btnDateAgenda.classList.add('filter-active');
    } else if (selectedDateFilter === 'last7') {
      lblDateAgenda.textContent = t.agendaBtnLast7(last7Count);
      btnDateAgenda.classList.add('filter-active');
    } else if (selectedDateFilter.startsWith('day:')) {
      const dayKey = selectedDateFilter.slice(4);
      const cnt = countsByDay.get(dayKey) || 0;
      lblDateAgenda.textContent = t.agendaBtnDay(formatShortDateKey(dayKey), cnt);
      btnDateAgenda.classList.add('filter-active');
    }

    // Haftanın gün başlıkları
    agendaWeekdays.innerHTML = '';
    for (const wd of t.weekdays) {
      const sp = document.createElement('span');
      sp.textContent = wd;
      agendaWeekdays.appendChild(sp);
    }

    // Ay etiketi
    const monthDate = new Date(calendarViewYear, calendarViewMonth, 1);
    const monthLabelStr = monthDate.toLocaleDateString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
      month: 'long',
      year: 'numeric'
    });
    agendaMonthLabel.textContent = monthLabelStr.charAt(0).toUpperCase() + monthLabelStr.slice(1);

    // Aylık takvim ızgarası (Pazartesi başlangıçlı: 0 = Pzt .. 6 = Paz)
    agendaCalendarGrid.innerHTML = '';
    const firstDayJs = new Date(calendarViewYear, calendarViewMonth, 1).getDay();
    const startOffset = (firstDayJs + 6) % 7;
    const daysInMonth = new Date(calendarViewYear, calendarViewMonth + 1, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'agenda-day-cell empty-slot';
      agendaCalendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const mStr = String(calendarViewMonth + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const dateKey = `${calendarViewYear}-${mStr}-${dStr}`;
      const count = countsByDay.get(dateKey) || 0;

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'agenda-day-cell';

      const numSpan = document.createElement('span');
      numSpan.className = 'agenda-day-num';
      numSpan.textContent = String(day);
      cell.appendChild(numSpan);

      if (count > 0) {
        cell.classList.add('has-records');
        const badge = document.createElement('span');
        badge.className = 'agenda-day-count';
        badge.textContent = String(count);
        cell.appendChild(badge);

        cell.addEventListener('click', () => {
          selectedDateFilter = `day:${dateKey}`;
          dateAgendaPopover.style.display = 'none';
          updateAgendaUI();
          renderGroups();
        });
      } else {
        cell.classList.add('no-records');
      }

      if (selectedDateFilter === `day:${dateKey}`) {
        cell.classList.add('selected-day');
      }

      agendaCalendarGrid.appendChild(cell);
    }
  }

  btnDateAgenda.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dateAgendaPopover.style.display === 'none';
    if (isHidden) {
      updateAgendaUI();
      dateAgendaPopover.style.display = 'block';
    } else {
      dateAgendaPopover.style.display = 'none';
    }
  });

  [chipAll, chipToday, chipYesterday, chipLast7].forEach(chip => {
    chip.addEventListener('click', () => {
      selectedDateFilter = chip.dataset.filter || 'all';
      dateAgendaPopover.style.display = 'none';
      updateAgendaUI();
      renderGroups();
    });
  });

  btnPrevMonth.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarViewMonth -= 1;
    if (calendarViewMonth < 0) {
      calendarViewMonth = 11;
      calendarViewYear -= 1;
    }
    updateAgendaUI();
  });

  btnNextMonth.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarViewMonth += 1;
    if (calendarViewMonth > 11) {
      calendarViewMonth = 0;
      calendarViewYear += 1;
    }
    updateAgendaUI();
  });

  document.addEventListener('click', (e) => {
    if (dateAgendaPopover.style.display !== 'none' && !dateAgendaWrap.contains(e.target)) {
      dateAgendaPopover.style.display = 'none';
    }
  });

  btnResetFilters.addEventListener('click', () => {
    selectedDateFilter = 'all';
    searchInput.value = '';
    updateAgendaUI();
    renderGroups();
  });

  // ============================================================================
  // MODÜL A: HİBRİT GOOGLE DRIVE BULUT EŞİTLEME MODALI
  // ============================================================================
  function updateGDriveModalUI() {
    const t = i18n[currentLang] || i18n.en;
    gdHeroBadge.textContent = t.gdHeroBadge;
    gdTitle.textContent = t.gdTitle;
    gdSubtitle.textContent = t.gdSubtitle;
    btnGDriveDisconnect.textContent = t.btnGDriveDisconnect;
    btnGDriveSyncNow.textContent = t.btnGDriveSyncNow;
    btnGDriveConnect.textContent = t.btnGDriveConnect;

    if (gdriveStatus.enabled) {
      gdStatusDot.classList.add('connected');
      gdStatusTitle.textContent = t.gdStatusDriveTitle;
      const syncTimeStr = formatSyncTimeOnly(gdriveStatus.lastSync);
      gdStatusDesc.textContent = t.gdStatusDriveDesc(syncTimeStr);
      btnGDriveDisconnect.style.display = 'inline-flex';
      btnGDriveSyncNow.style.display = 'inline-flex';
      btnGDriveConnect.style.display = 'none';
    } else {
      gdStatusDot.classList.remove('connected');
      gdStatusTitle.textContent = t.gdStatusLocalTitle;
      gdStatusDesc.textContent = t.gdStatusLocalDesc;
      btnGDriveDisconnect.style.display = 'none';
      btnGDriveSyncNow.style.display = 'none';
      btnGDriveConnect.style.display = 'inline-flex';
    }
  }

  function openGDriveModal() {
    updateGDriveModalUI();
    gdriveModal.style.display = 'flex';
  }

  function closeGDriveModal() {
    gdriveModal.style.display = 'none';
  }

  btnGDriveSync.addEventListener('click', openGDriveModal);
  btnCloseGDriveX.addEventListener('click', closeGDriveModal);
  gdriveModal.addEventListener('click', (e) => {
    if (e.target === gdriveModal) closeGDriveModal();
  });

  async function ensureIdentityPermission() {
    if (!chrome.permissions || typeof chrome.permissions.request !== 'function') {
      return true;
    }
    try {
      const alreadyHas = await chrome.permissions.contains({ permissions: ['identity'] });
      if (alreadyHas) return true;
      return await chrome.permissions.request({ permissions: ['identity'] });
    } catch (e) {
      return false;
    }
  }

  btnGDriveConnect.addEventListener('click', async () => {
    const t = i18n[currentLang] || i18n.en;
    const granted = await ensureIdentityPermission();
    if (!granted) {
      showToast(t.toastDriveError('identity permission denied'), 3200);
      return;
    }

    btnGDriveConnect.disabled = true;
    btnGDriveConnect.style.opacity = '0.7';

    chrome.runtime.sendMessage({
      action: 'connectGoogleDrive'
    }, (res) => {
      btnGDriveConnect.disabled = false;
      btnGDriveConnect.style.opacity = '1';

      if (res && res.success) {
        vaultGroups = res.groups || vaultGroups;
        antiRefreshDomains = res.antiRefreshDomains || antiRefreshDomains;
        gdriveStatus = res.gdriveStatus || gdriveStatus;
        updateQuotaHeader();
        updateGDriveModalUI();
        updateAgendaUI();
        renderAntiRefreshDomains();
        renderGroups();
        showToast(t.toastDriveConnected);
      } else {
        const errText = (res && (res.errorMessage || res.errorCode)) || 'OAuth Error';
        showToast(t.toastDriveError(errText), 3800);
      }
    });
  });

  btnGDriveSyncNow.addEventListener('click', async () => {
    const t = i18n[currentLang] || i18n.en;
    btnGDriveSyncNow.disabled = true;

    chrome.runtime.sendMessage({
      action: 'syncGoogleDriveNow',
      interactive: true
    }, (res) => {
      btnGDriveSyncNow.disabled = false;
      if (res && res.success) {
        vaultGroups = res.groups || vaultGroups;
        antiRefreshDomains = res.antiRefreshDomains || antiRefreshDomains;
        gdriveStatus = res.gdriveStatus || gdriveStatus;
        updateQuotaHeader();
        updateGDriveModalUI();
        updateAgendaUI();
        renderAntiRefreshDomains();
        renderGroups();
        showToast(t.toastDriveSynced);
      } else {
        const errText = (res && (res.errorMessage || res.errorCode)) || 'Sync failed';
        showToast(t.toastDriveError(errText), 3600);
      }
    });
  });

  btnGDriveDisconnect.addEventListener('click', () => {
    const t = i18n[currentLang] || i18n.en;
    chrome.runtime.sendMessage({ action: 'disconnectGoogleDrive' }, (res) => {
      if (res && res.success) {
        gdriveStatus = res.gdriveStatus || { enabled: false, lastSync: 0 };
        updateQuotaHeader();
        updateGDriveModalUI();
        showToast(t.toastDriveDisconnected);
      }
    });
  });

  // ============================================================================
  // NELER YENİ? (WHAT'S NEW v2.1) MODALI
  // ============================================================================
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
    if (e.key === 'Escape') {
      if (whatsNewModal.style.display !== 'none') closeWhatsNewModal();
      if (gdriveModal.style.display !== 'none') closeGDriveModal();
      if (dateAgendaPopover.style.display !== 'none') dateAgendaPopover.style.display = 'none';
    }
  });

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

  function formatSyncTimeOnly(ts) {
    const d = ts ? new Date(ts) : new Date();
    return d.toLocaleTimeString(currentLang === 'tr' ? 'tr-TR' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
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
    btnResetFilters.textContent = t.btnResetFilters;
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
    updateAgendaUI();
    updateGDriveModalUI();
    renderAntiRefreshDomains();
  }

  // Modül B: Gerçekçi Depolama ve Senkronizasyon Durum Göstergesi
  function updateQuotaHeader() {
    const t = i18n[currentLang] || i18n.en;
    const totalTabs = vaultGroups.reduce((acc, g) => acc + (g.items ? g.items.length : 0), 0);
    const totalGroups = vaultGroups.length;
    const pct = Math.min(100, ((bytesInUse / (quotaBytes || 102400)) * 100)).toFixed(1);

    if (gdriveStatus && gdriveStatus.enabled) {
      syncStatusDot.classList.add('drive-active');
      btnGDriveSync.classList.add('connected');
      lblGDriveBtn.textContent = t.lblGDriveBtnConnected;
      const syncTimeStr = formatSyncTimeOnly(gdriveStatus.lastSync);
      quotaSummary.textContent = t.driveQuotaFmt(totalTabs, totalGroups, syncTimeStr);
    } else {
      syncStatusDot.classList.remove('drive-active');
      btnGDriveSync.classList.remove('connected');
      lblGDriveBtn.textContent = t.lblGDriveBtn;
      quotaSummary.textContent = t.localQuotaFmt(totalTabs, totalGroups, pct);
    }
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
          if (res.gdriveStatus) {
            gdriveStatus = res.gdriveStatus;
          }
        } else {
          vaultGroups = newGroups;
        }
        updateQuotaHeader();
        updateAgendaUI();
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

  // Modül C: Filtreye Duyarlı Güvenli Grup Açma (Yalnızca o an filtrelenen/görünen sekmeleri açar ve siler)
  async function handleOpenGroup(domainKey, visibleItems, removeAfterOpen) {
    const t = i18n[currentLang] || i18n.en;
    if (!visibleItems || visibleItems.length === 0) return;

    const sortedItems = sortItemsList(visibleItems);
    const urlsToOpen = sortedItems.map(it => it.u);
    const urlsSet = new Set(urlsToOpen);

    if (removeAfterOpen) {
      const updated = vaultGroups.map(g => {
        if (g.domain.toLowerCase() !== domainKey.toLowerCase()) return g;
        return {
          ...g,
          items: (g.items || []).filter(it => !urlsSet.has(it.u))
        };
      }).filter(g => g.items && g.items.length > 0);

      await saveAndRender(updated);
    } else {
      showToast(t.toastGroupKept);
    }

    for (const u of urlsToOpen) {
      chrome.tabs.create({ url: u, active: false });
    }
  }

  function renderGroups() {
    const t = i18n[currentLang] || i18n.en;
    const query = (searchInput.value || '').trim().toLowerCase();
    const isFilterActive = Boolean(query) || (selectedDateFilter !== 'all');

    groupsContainer.innerHTML = '';

    const filteredGroups = [];
    let filteredTabTotal = 0;

    for (const g of vaultGroups) {
      if (!g.items || g.items.length === 0) continue;
      const domainMatches = query ? (g.domain.toLowerCase().includes(query) || (g.title || '').toLowerCase().includes(query)) : true;

      const matchingItems = g.items.filter(it => {
        if (!itemMatchesDateFilter(it, selectedDateFilter)) return false;
        if (!query) return true;
        return domainMatches ||
               (it.t || '').toLowerCase().includes(query) ||
               (it.u || '').toLowerCase().includes(query);
      });

      if (matchingItems.length > 0) {
        filteredTabTotal += matchingItems.length;
        filteredGroups.push({
          ...g,
          totalUnfilteredCount: g.items.length,
          items: sortItemsList(matchingItems)
        });
      }
    }

    if (isFilterActive) {
      activeFilterStrip.style.display = 'flex';
      const filterDesc = query
        ? `${lblDateAgenda.textContent} + "${searchInput.value.trim()}"`
        : lblDateAgenda.textContent;
      activeFilterText.textContent = t.filterStripFmt(filteredTabTotal, filteredGroups.length, filterDesc);
    } else {
      activeFilterStrip.style.display = 'none';
    }

    if (filteredGroups.length === 0) {
      emptyState.style.display = 'block';
      if (isFilterActive && vaultGroups.length > 0) {
        emptyTitle.textContent = t.emptyFilteredTitle;
        emptyDesc.textContent = t.emptyFilteredDesc;
      } else {
        emptyTitle.textContent = t.emptyTitle;
        emptyDesc.textContent = t.emptyDesc;
      }
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
      if (isFilterActive && group.items.length !== group.totalUnfilteredCount) {
        countBadge.textContent = `${group.items.length} / ${group.totalUnfilteredCount} ${t.tabUnit}`;
      } else {
        countBadge.textContent = `${group.items.length} ${t.tabUnit}`;
      }

      titleArea.appendChild(pill);
      titleArea.appendChild(domainSub);
      titleArea.appendChild(countBadge);

      const actions = document.createElement('div');
      actions.className = 'group-actions';

      const isPartialGroup = isFilterActive && group.items.length < group.totalUnfilteredCount;

      const btnOpenAll = document.createElement('button');
      btnOpenAll.className = 'btn-group-action btn-open-all';
      btnOpenAll.textContent = isPartialGroup ? t.btnOpenFiltered(group.items.length) : t.btnOpenAll;
      btnOpenAll.title = t.btnOpenAllTitle;

      btnOpenAll.addEventListener('click', (e) => {
        e.preventDefault();
        const keepInVault = e.ctrlKey || e.metaKey || e.shiftKey;
        handleOpenGroup(group.domain, group.items, !keepInVault);
      });

      btnOpenAll.addEventListener('auxclick', (e) => {
        if (e.button === 1) {
          e.preventDefault();
          handleOpenGroup(group.domain, group.items, false);
        }
      });

      const btnDelGroup = document.createElement('button');
      btnDelGroup.className = 'btn-group-action btn-delete-group';
      btnDelGroup.textContent = isPartialGroup ? t.btnDeleteFiltered(group.items.length) : t.btnDeleteGroup;
      btnDelGroup.addEventListener('click', async () => {
        const groupLabel = group.title || group.domain;
        const visibleCount = group.items.length;
        const totalInGroup = group.totalUnfilteredCount || visibleCount;

        const confirmMsg = (isFilterActive && visibleCount < totalInGroup)
          ? t.confirmDeleteGroupFiltered(groupLabel, visibleCount, totalInGroup)
          : t.confirmDeleteGroup(groupLabel, visibleCount);

        if (confirm(confirmMsg)) {
          const urlsToDelete = new Set(group.items.map(it => it.u));
          const updated = vaultGroups.map(g => {
            if (g.domain.toLowerCase() !== group.domain.toLowerCase()) return g;
            return {
              ...g,
              items: (g.items || []).filter(it => !urlsToDelete.has(it.u))
            };
          }).filter(g => g.items && g.items.length > 0);

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
        if (res.gdriveStatus) {
          gdriveStatus = res.gdriveStatus;
        }
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
    if (areaName === 'sync' || (areaName === 'local' && (changes.vault_backup || changes.anti_refresh_domains || changes.gdrive_last_sync || changes.gdrive_enabled))) {
      loadInitialVault();
    }
  });

  loadInitialVault();
});
