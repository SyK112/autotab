// AutoTab v2.1.0 - Popup Mantığı, Akordeon Modu, Son Sekmeyi Başa Taşıma, Sekme Kasası & Oto-Yenileme Kalkanı

const translations = {
  tr: {
    badgeActive: 'Aktif',
    badgeInactive: 'Pasif',
    lblAutoGroup: 'Otomatik Gruplama',
    statusDescActive: 'Arka planda anında çalışır',
    statusDescInactive: 'Devre dışı bırakıldı',
    lblAutoCollapse: 'Diğer Grupları Otomatik Daralt',
    descAutoCollapse: 'Akordeon Modu: Sadece aktif grubu açık tutar',
    lblMoveToFront: 'Son Kullanılan Sekmeyi Başa Taşı',
    descMoveToFront: 'Sekmeden ayrılırken grubun 1. sırasına alır',
    infoRule1: 'Aynı siteden <strong>en az 2 sekme</strong> olduğunda otomatik gruplanır.',
    infoRule2: 'Tek sekme kaldığında grup kalabalık yapmadan <strong>kendiliğinden çözülür</strong>.',
    btnGroupNow: 'Şimdi Grupla',
    btnUngroupNow: 'Grupları Dağıt',
    lblVaultSection: 'SEKME KASASI & BULUT EŞİTLEME',
    btnStashNow: 'Sekmeleri Kasaya Kaydet & Kapat',
    btnOpenVault: 'Sekme Kasasını Aç',
    lblAntiRefreshSection: 'OTO-YENİLEME & BAŞA DÖNME KALKANI',
    lblAntiRefresh: 'Bu Sitede Yenilemeyi Engelle',
    antiRefreshDomainFmt: (d, on) => on ? `${d} • Koruma Aktif` : `${d} • Koruma Kapalı`,
    arStatsLabel: '🛡️ Bu sekmede engellenen yenileme',
    antiRefreshUnsupported: 'Bu sekmede kullanılamaz',
    whatsNewTitle: 'v2.1 Neler Yeni? (Tıkla & Gör)',
    toastActive: 'Otomasyon açıldı',
    toastInactive: 'Otomasyon durduruldu',
    toastAutoCollapseOn: 'Akordeon modu açıldı',
    toastAutoCollapseOff: 'Akordeon modu kapatıldı',
    toastMoveToFrontOn: 'Ayrılırken başa taşıma açıldı',
    toastMoveToFrontOff: 'Ayrılırken başa taşıma kapatıldı',
    toastGrouped: 'Tüm sekmeler gruplandı',
    toastUngrouped: 'Gruplar dağıtıldı',
    toastAntiRefreshOn: (d) => `${d} için yenileme engellendi`,
    toastAntiRefreshOff: (d) => `${d} için koruma kapatıldı`,
    nextLangBtn: 'EN',
    langTitle: 'Switch to English'
  },
  en: {
    badgeActive: 'Active',
    badgeInactive: 'Inactive',
    lblAutoGroup: 'Auto Grouping',
    statusDescActive: 'Runs silently in background',
    statusDescInactive: 'Disabled',
    lblAutoCollapse: 'Auto-Collapse Other Groups',
    descAutoCollapse: 'Accordion mode: keeps only active group open',
    lblMoveToFront: 'Move Last Used Tab to Front',
    descMoveToFront: 'Moves tab to 1st slot in group on leave',
    infoRule1: 'Automatically groups when <strong>2+ tabs</strong> share the same site.',
    infoRule2: 'Disbands group automatically when only <strong>1 tab remains</strong>.',
    btnGroupNow: 'Group Now',
    btnUngroupNow: 'Ungroup All',
    lblVaultSection: 'TAB VAULT & CLOUD SYNC',
    btnStashNow: 'Save & Close Tabs to Vault',
    btnOpenVault: 'Open Tab Vault',
    lblAntiRefreshSection: 'ANTI-REFRESH & SCROLL GUARD',
    lblAntiRefresh: 'Block Auto-Refresh on Site',
    antiRefreshDomainFmt: (d, on) => on ? `${d} • Guard Active` : `${d} • Guard Off`,
    arStatsLabel: '🛡️ Blocked refreshes on this tab',
    antiRefreshUnsupported: 'Not available on this tab',
    whatsNewTitle: "What's New in v2.1 (Click to View)",
    toastActive: 'Automation enabled',
    toastInactive: 'Automation disabled',
    toastAutoCollapseOn: 'Accordion mode enabled',
    toastAutoCollapseOff: 'Accordion mode disabled',
    toastMoveToFrontOn: 'Move last tab to front enabled',
    toastMoveToFrontOff: 'Move last tab to front disabled',
    toastGrouped: 'All tabs grouped',
    toastUngrouped: 'Groups disbanded',
    toastAntiRefreshOn: (d) => `Auto-refresh blocked for ${d}`,
    toastAntiRefreshOff: (d) => `Guard disabled for ${d}`,
    nextLangBtn: 'TR',
    langTitle: 'Türkçe diline geç'
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const autoGroupEnabled = document.getElementById('autoGroupEnabled');
  const autoCollapseGroups = document.getElementById('autoCollapseGroups');
  const moveLastActiveToFront = document.getElementById('moveLastActiveToFront');
  const statusDesc = document.getElementById('statusDesc');
  const headerBadge = document.getElementById('headerBadge');
  const lblAutoGroup = document.getElementById('lblAutoGroup');
  const lblAutoCollapse = document.getElementById('lblAutoCollapse');
  const descAutoCollapse = document.getElementById('descAutoCollapse');
  const lblMoveToFront = document.getElementById('lblMoveToFront');
  const descMoveToFront = document.getElementById('descMoveToFront');
  const infoRule1 = document.getElementById('infoRule1');
  const infoRule2 = document.getElementById('infoRule2');
  const btnGroupNow = document.getElementById('btnGroupNow');
  const btnGroupNowText = document.getElementById('btnGroupNowText');
  const btnUngroupNow = document.getElementById('btnUngroupNow');
  const btnUngroupNowText = document.getElementById('btnUngroupNowText');
  const lblVaultSection = document.getElementById('lblVaultSection');
  const btnStashNow = document.getElementById('btnStashNow');
  const btnStashNowText = document.getElementById('btnStashNowText');
  const btnOpenVault = document.getElementById('btnOpenVault');
  const btnOpenVaultText = document.getElementById('btnOpenVaultText');
  const vaultCountBadge = document.getElementById('vaultCountBadge');
  const lblAntiRefreshSection = document.getElementById('lblAntiRefreshSection');
  const lblAntiRefresh = document.getElementById('lblAntiRefresh');
  const antiRefreshDesc = document.getElementById('antiRefreshDesc');
  const antiRefreshEnabled = document.getElementById('antiRefreshEnabled');
  const arStatsBar = document.getElementById('arStatsBar');
  const arStatsText = document.getElementById('arStatsText');
  const arStatsCount = document.getElementById('arStatsCount');
  const btnWhatsNewPopup = document.getElementById('btnWhatsNewPopup');
  const langToggle = document.getElementById('langToggle');
  const toastMsg = document.getElementById('toastMsg');

  let activeDomain = null;
  let activeBlockedCount = 0;

  const stored = await chrome.storage.local.get({
    autoGroupEnabled: true,
    autoCollapseGroups: true,
    moveLastActiveToFront: true,
    userLang: 'auto'
  });

  let currentLang = stored.userLang;
  if (currentLang === 'auto') {
    const browserLang = (navigator.language || '').toLowerCase();
    currentLang = browserLang.startsWith('tr') ? 'tr' : 'en';
  }

  function showToast(text) {
    toastMsg.textContent = text;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 1600);
  }

  function updateAntiRefreshUI() {
    const t = translations[currentLang] || translations.en;
    arStatsText.textContent = t.arStatsLabel;

    if (!activeDomain) {
      antiRefreshEnabled.disabled = true;
      antiRefreshEnabled.checked = false;
      antiRefreshDesc.textContent = t.antiRefreshUnsupported;
      arStatsBar.style.display = 'none';
    } else {
      antiRefreshEnabled.disabled = false;
      const isOn = antiRefreshEnabled.checked;
      antiRefreshDesc.textContent = t.antiRefreshDomainFmt(activeDomain, isOn);
      if (isOn) {
        arStatsBar.style.display = 'flex';
        arStatsCount.textContent = String(activeBlockedCount);
      } else {
        arStatsBar.style.display = 'none';
      }
    }
  }

  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    lblAutoGroup.textContent = t.lblAutoGroup;
    lblAutoCollapse.textContent = t.lblAutoCollapse;
    descAutoCollapse.textContent = t.descAutoCollapse;
    lblMoveToFront.textContent = t.lblMoveToFront;
    descMoveToFront.textContent = t.descMoveToFront;
    infoRule1.innerHTML = t.infoRule1;
    infoRule2.innerHTML = t.infoRule2;
    btnGroupNowText.textContent = t.btnGroupNow;
    btnUngroupNowText.textContent = t.btnUngroupNow;
    lblVaultSection.textContent = t.lblVaultSection;
    btnStashNowText.textContent = t.btnStashNow;
    btnOpenVaultText.textContent = t.btnOpenVault;
    lblAntiRefreshSection.textContent = t.lblAntiRefreshSection;
    lblAntiRefresh.textContent = t.lblAntiRefresh;
    btnWhatsNewPopup.title = t.whatsNewTitle;
    langToggle.textContent = t.nextLangBtn;
    langToggle.title = t.langTitle;

    updateStatusUI(autoGroupEnabled.checked);
    updateAntiRefreshUI();
  }

  function updateStatusUI(isActive) {
    const t = translations[currentLang] || translations.en;
    if (isActive) {
      statusDesc.textContent = t.statusDescActive;
      headerBadge.textContent = t.badgeActive;
      headerBadge.classList.remove('inactive');
    } else {
      statusDesc.textContent = t.statusDescInactive;
      headerBadge.textContent = t.badgeInactive;
      headerBadge.classList.add('inactive');
    }
  }

  function refreshVaultAndAntiRefresh() {
    chrome.runtime.sendMessage({ action: 'getVaultData' }, (res) => {
      if (res && Array.isArray(res.groups)) {
        const totalTabs = res.groups.reduce((acc, g) => acc + (g.items ? g.items.length : 0), 0);
        vaultCountBadge.textContent = totalTabs;
      }
    });

    chrome.runtime.sendMessage({ action: 'getAntiRefreshStatus' }, (res) => {
      if (res && res.success) {
        activeDomain = res.domain || null;
        antiRefreshEnabled.checked = Boolean(res.enabled);
        activeBlockedCount = res.blockedCount || 0;
      } else {
        activeDomain = null;
        activeBlockedCount = 0;
      }
      updateAntiRefreshUI();
    });
  }

  autoGroupEnabled.checked = Boolean(stored.autoGroupEnabled);
  autoCollapseGroups.checked = Boolean(stored.autoCollapseGroups);
  moveLastActiveToFront.checked = Boolean(stored.moveLastActiveToFront);
  applyLanguage(currentLang);
  refreshVaultAndAntiRefresh();

  btnWhatsNewPopup.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openDashboard', showWhatsNew: true }, () => {
      window.close();
    });
  });

  langToggle.addEventListener('click', async () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    await chrome.storage.local.set({ userLang: currentLang });
    applyLanguage(currentLang);
    showToast(currentLang === 'tr' ? 'Dil: Türkçe' : 'Language: English');
  });

  autoGroupEnabled.addEventListener('change', async () => {
    const isEnabled = autoGroupEnabled.checked;
    updateStatusUI(isEnabled);
    await chrome.storage.local.set({ autoGroupEnabled: isEnabled });

    const t = translations[currentLang] || translations.en;
    showToast(isEnabled ? t.toastActive : t.toastInactive);

    chrome.runtime.sendMessage({ action: 'settingsChanged' });
  });

  autoCollapseGroups.addEventListener('change', async () => {
    const isEnabled = autoCollapseGroups.checked;
    await chrome.storage.local.set({ autoCollapseGroups: isEnabled });

    const t = translations[currentLang] || translations.en;
    showToast(isEnabled ? t.toastAutoCollapseOn : t.toastAutoCollapseOff);

    chrome.runtime.sendMessage({ action: 'settingsChanged' });
  });

  moveLastActiveToFront.addEventListener('change', async () => {
    const isEnabled = moveLastActiveToFront.checked;
    await chrome.storage.local.set({ moveLastActiveToFront: isEnabled });

    const t = translations[currentLang] || translations.en;
    showToast(isEnabled ? t.toastMoveToFrontOn : t.toastMoveToFrontOff);

    chrome.runtime.sendMessage({ action: 'settingsChanged' });
  });

  antiRefreshEnabled.addEventListener('change', () => {
    if (!activeDomain) return;
    const isEnabled = antiRefreshEnabled.checked;
    chrome.runtime.sendMessage({
      action: 'toggleAntiRefreshDomain',
      domain: activeDomain,
      enabled: isEnabled
    }, () => {
      updateAntiRefreshUI();
      const t = translations[currentLang] || translations.en;
      showToast(isEnabled ? t.toastAntiRefreshOn(activeDomain) : t.toastAntiRefreshOff(activeDomain));
    });
  });

  btnGroupNow.addEventListener('click', async () => {
    btnGroupNow.disabled = true;
    btnGroupNow.style.opacity = '0.7';
    chrome.runtime.sendMessage({ action: 'groupAllNow' }, () => {
      const t = translations[currentLang] || translations.en;
      showToast(t.toastGrouped);
      btnGroupNow.disabled = false;
      btnGroupNow.style.opacity = '1';
    });
  });

  btnUngroupNow.addEventListener('click', async () => {
    btnUngroupNow.disabled = true;
    btnUngroupNow.style.opacity = '0.7';
    chrome.runtime.sendMessage({ action: 'ungroupAllNow' }, () => {
      const t = translations[currentLang] || translations.en;
      showToast(t.toastUngrouped);
      btnUngroupNow.disabled = false;
      btnUngroupNow.style.opacity = '1';
    });
  });

  btnStashNow.addEventListener('click', () => {
    btnStashNow.disabled = true;
    btnStashNow.style.opacity = '0.7';
    chrome.runtime.sendMessage({ action: 'stashTabsNow' }, () => {
      window.close();
    });
  });

  btnOpenVault.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openDashboard' }, () => {
      window.close();
    });
  });
});
