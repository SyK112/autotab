// AutoTab v1.2.0 - Popup Mantığı ve Çift Dil Desteği (i18n)

const translations = {
  tr: {
    badgeActive: 'Aktif',
    badgeInactive: 'Pasif',
    lblAutoGroup: 'Otomatik Gruplama',
    statusDescActive: 'Arka planda anında çalışır',
    statusDescInactive: 'Devre dışı bırakıldı',
    infoRule1: 'Aynı siteden <strong>en az 2 sekme</strong> olduğunda otomatik gruplanır.',
    infoRule2: 'Tek sekme kaldığında grup kalabalık yapmadan <strong>kendiliğinden çözülür</strong>.',
    btnGroupNow: 'Şimdi Grupla',
    btnUngroupNow: 'Tüm Grupları Dağıt',
    toastActive: 'Otomasyon açıldı',
    toastInactive: 'Otomasyon durduruldu',
    toastGrouped: 'Tüm sekmeler gruplandı',
    toastUngrouped: 'Gruplar dağıtıldı',
    nextLangBtn: 'EN',
    langTitle: 'Switch to English'
  },
  en: {
    badgeActive: 'Active',
    badgeInactive: 'Inactive',
    lblAutoGroup: 'Auto Grouping',
    statusDescActive: 'Runs silently in background',
    statusDescInactive: 'Disabled',
    infoRule1: 'Automatically groups when <strong>2+ tabs</strong> share the same site.',
    infoRule2: 'Disbands group automatically when only <strong>1 tab remains</strong>.',
    btnGroupNow: 'Group Now',
    btnUngroupNow: 'Ungroup All',
    toastActive: 'Automation enabled',
    toastInactive: 'Automation disabled',
    toastGrouped: 'All tabs grouped',
    toastUngrouped: 'Groups disbanded',
    nextLangBtn: 'TR',
    langTitle: 'Türkçe diline geç'
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const autoGroupEnabled = document.getElementById('autoGroupEnabled');
  const statusDesc = document.getElementById('statusDesc');
  const headerBadge = document.getElementById('headerBadge');
  const lblAutoGroup = document.getElementById('lblAutoGroup');
  const infoRule1 = document.getElementById('infoRule1');
  const infoRule2 = document.getElementById('infoRule2');
  const btnGroupNow = document.getElementById('btnGroupNow');
  const btnGroupNowText = document.getElementById('btnGroupNowText');
  const btnUngroupNow = document.getElementById('btnUngroupNow');
  const btnUngroupNowText = document.getElementById('btnUngroupNowText');
  const langToggle = document.getElementById('langToggle');
  const toastMsg = document.getElementById('toastMsg');

  // 1. Dil Belirleme (Kayıtlı tercih -> Tarayıcı dili -> Varsayılan İngilizce)
  const stored = await chrome.storage.local.get({
    autoGroupEnabled: true,
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
    }, 1500);
  }

  function applyLanguage(lang) {
    const t = translations[lang] || translations.en;
    lblAutoGroup.textContent = t.lblAutoGroup;
    infoRule1.innerHTML = t.infoRule1;
    infoRule2.innerHTML = t.infoRule2;
    btnGroupNowText.textContent = t.btnGroupNow;
    btnUngroupNowText.textContent = t.btnUngroupNow;
    langToggle.textContent = t.nextLangBtn;
    langToggle.title = t.langTitle;

    updateStatusUI(autoGroupEnabled.checked);
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

  // İlk yükleme
  autoGroupEnabled.checked = stored.autoGroupEnabled;
  applyLanguage(currentLang);

  // Dil Değiştirme Butonu (TR <-> EN)
  langToggle.addEventListener('click', async () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    await chrome.storage.local.set({ userLang: currentLang });
    applyLanguage(currentLang);
    showToast(currentLang === 'tr' ? 'Dil: Türkçe' : 'Language: English');
  });

  // Otomatik Gruplama Aç / Kapa
  autoGroupEnabled.addEventListener('change', async () => {
    const isEnabled = autoGroupEnabled.checked;
    updateStatusUI(isEnabled);
    await chrome.storage.local.set({ autoGroupEnabled: isEnabled });

    const t = translations[currentLang] || translations.en;
    showToast(isEnabled ? t.toastActive : t.toastInactive);

    chrome.runtime.sendMessage({ action: 'settingsChanged' });
  });

  // Şimdi Grupla
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

  // Tüm Grupları Dağıt
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
});
