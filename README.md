<div align="center">

  <h1>🗂️ AutoTab v2.1</h1>
  <p><strong>Zero-click automated tab grouper, Cloud & Google Drive-synced Tab Vault (OneTab+) with Date Agenda, Accordion Group Mode, Smart Active Tab Guard, and 4-Layer Anti-Refresh Shield for Chromium browsers.</strong></p>
  <p>No manual organizing. No lost form text. No forced page reloads. No 100 KB sync limits. No paywalls.</p>

  <p>
    <a href="https://chromewebstore.google.com/detail/autotab-automated-tab-gro/bcojmikhhechoghnkjlmkobigabibfnp"><img src="https://img.shields.io/badge/Chrome_Web_Store-v2.1-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome Web Store"></a>
    <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/What's_New_in_v2.1-Neler_Yeni%3F-8b5cf6?style=for-the-badge" alt="What's New in v2.1"></a>
    <a href="https://github.com/SyK112/autotab/stargazers"><img src="https://img.shields.io/github/stars/SyK112/autotab?style=for-the-badge&logo=github&color=blue" alt="Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
    <a href="#"><img src="https://img.shields.io/badge/Dependencies-Zero%20(Pure%20JS)-yellow.svg?style=for-the-badge&logo=javascript" alt="Zero Dependencies"></a>
  </p>

  <sub>Supports <strong>Brave</strong>, <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, <strong>Vivaldi</strong>, <strong>Opera</strong>, and all Chromium browsers.</sub>

  <br/><br/>
  <p>
    <a href="CHANGELOG.md"><strong>✨ What's New in v2.1 (Neler Yeni?)</strong></a> •
    <a href="#english"><strong>🇬🇧 English Documentation</strong></a> •
    <a href="#turkce"><strong>🇹🇷 Türkçe Dokümantasyon</strong></a>
  </p>
</div>

---

<h2 id="english">🇬🇧 English Documentation</h2>

### 🚀 What Makes AutoTab v2.1 Different?

Most tab extensions force you to install three separate, bloated tools — one for grouping tabs, another for stashing tabs to free up memory (like OneTab), and another to stop websites from auto-reloading. Even worse, they lock core features behind monthly subscriptions, lose your unsaved text when closing tabs, or leave single-tab groups cluttering your tab bar.

**AutoTab v2.1 unites all of these pillars in a single, dependency-free `< 45 KB` extension:**

1. **⚡ Zero-Click Auto Grouping (2+ Rule & Auto-Dissolve):** Silently groups tabs by root domain the moment 2+ tabs from the same site exist, and automatically ungroups when only 1 tab remains.
2. **🪗 Accordion Group Mode & Move Last Tab to Front on Leave (New in v2.1):**
   - **Auto-Collapse Other Groups (Accordion Mode):** Focusing a tab inside a group automatically keeps only that group expanded (`collapsed: false`) while collapsing all other tab groups in the window (`collapsed: true`) for maximum tab bar breathing room.
   - **Move Last Used Tab to Front on Leave:** When you finish working in a grouped tab and switch to another tab, AutoTab silently moves that tab to the **1st slot (far left)** of its group — never shifting tabs under your cursor when clicking, and ensuring your most recently used tab is always first when you return!
3. **🗄️ Tiered Tab Vault (OneTab+) with Hybrid Google Drive Sync (Expanded in v2.1):**
   - **Tier 1 (Zero-Setup Local & Profile Sync):** Works out-of-the-box using `chrome.storage.local` + a chunked `chrome.storage.sync` engine (`v_0..v_23`).
   - **Tier 2 (Optional Google Drive Cloud Sync):** Connect your Google Drive with one click via OAuth 2.0 (`chrome.identity.launchWebAuthFlow` + narrow `drive.file` scope) to bypass Chrome's 100 KB sync quota and sync your vault live across different Chromium browsers (e.g., Brave at home and Chrome at work).
4. **📅 Tab-Count Date Agenda & Filter-Safe Group Actions (New in v2.1):**
   - Filter your stashed tabs with one-click quick chips (*All*, *Today*, *Yesterday*, *Last 7 Days*) or pick any day from the **monthly calendar grid** displaying badge counts for how many tabs were saved on each date.
   - **Filter-Safe Group Operations:** When a date or search filter is active, clicking *"Open All"* or *"Delete Group"* on a domain card affects **only the filtered tabs** shown on screen — keeping tabs saved on other days untouched!
5. **🛡️ Smart Active Tab Guard (`< 120ms`):** Before closing tabs into the Vault, AutoTab scans pages in parallel for **unsaved text in inputs/textareas/editors** or **playing video/audio**. Active tabs are backed up to the Vault, **but prevented from closing** so you never lose a draft message or interrupt a stream.
6. **🚫 4-Layer Anti-Refresh Shield & Live Toolbar Badge (Enhanced in v2.1):** Stops news websites and portals from forcibly auto-reloading pages to inflate ad impressions. Blocks `<meta http-equiv="refresh">`, `visibilitychange`/`focus` reload traps, unattended `setTimeout`/`setInterval` reload timers, and `Navigation API` reloads — while locking and restoring your exact scroll position (`Scroll Lock`) and showing a **per-tab amber counter badge (`1, 2, 3...`) directly on the extension toolbar icon** (hidden when `0`).

#### 📊 Feature Comparison

| Feature | 🗂️ AutoTab v2.1 | 📦 Typical Tab Groupers / OneTab |
| :--- | :---: | :---: |
| **Zero-Click Auto Grouping** | **✅ 100% Background (Instant)** | ❌ Click "Group" manually every time |
| **Clean Tab Bar (2+ Rule & Auto-Ungroup)** | **✅ Groups at 2+, dissolves at 1** | ❌ Clutters with 1-tab groups |
| **Accordion Mode (Auto-Collapse Others)** | **✅ Keeps only active group open** | ❌ Tab bar overflows with open groups |
| **Move Last-Used Tab to Group Front** | **✅ Moves to 1st slot on leave (Zero misclicks)** | ❌ Not supported or shifts under mouse |
| **Tab Vault & Cross-Browser Cloud Sync** | **✅ Chunked `storage.sync` + Google Drive OAuth** | ⚠️ Local-only or paid cloud account |
| **Date Agenda Calendar & Safe Filtering** | **✅ Per-day tab counts + Filter-safe Open/Delete** | ❌ Flat chronological dump |
| **Smart Domain Merge & Deduplication** | **✅ Merges groups & updates timestamps** | ❌ Creates duplicate messy lists |
| **Unsaved Text & Playing Media Guard** | **✅ Backs up & keeps active tabs open** | ❌ Closes tabs & destroys unsaved text |
| **Anti-Refresh Shield + Toolbar Badge** | **✅ 4-Layer Shield + Live Per-Tab Icon Badge** | ❌ Not supported |
| **Footprint & Dependencies** | **✅ < 45 KB (Zero frameworks)** | ⚠️ 1 MB – 10 MB bundles |
| **Privacy & Pricing** | **✅ 100% Client-Side • MIT Free** | ❌ Telemetry & monthly paywalls |

---

### ✨ Key Capabilities in Detail

- **🗄️ Smart Tab Vault (`dashboard.html`):**
  - **Tiered Cloud Sync:** Uses zero-setup `Local & Profile Storage` by default and upgrades to `☁️ Google Drive Cloud Sync` (`autotab-vault-v2.json`) with one click whenever you want unlimited cross-browser sync.
  - **Honest Storage Status Indicator:** Clearly shows whether you are running on `💾 Local & Profile Storage Active • X Groups, Y Tabs (Z% Quota)` or green-lit `☁️ Google Drive Cloud Sync Active (Last sync: HH:MM)`.
  - **Tab-Count Date Agenda Popover (`📅 Date: All ▾`):** Browse a monthly calendar where every date displays a badge count of stashed tabs, or use quick filter chips (*Today*, *Yesterday*, *Last 7 Days*).
  - **Smart Domain Merge & Upsert Deduplication:** Saving tabs from `youtube.com` automatically merges them into your existing `YouTube` vault group, updating timestamps on existing URLs instead of creating duplicates.
  - **Left-Click vs. Middle-Click (`Ctrl+Click`):** Left-clicking a link opens the tab and removes it from the vault. Middle-clicking (mouse wheel) or `Ctrl+Click` opens the tab in the background while **keeping it in the vault**.
  - **4-Way In-Group Sorting & Instant Search:** Sort links inside groups by *Newest First*, *Oldest First*, *A ➔ Z*, or *Z ➔ A*, and export/import full JSON backups anytime.
- **🪗 Smart Tab Bar Ergonomics (`background.js` & `popup.html`):**
  - **Accordion Mode:** Automatically collapses background tab groups when you switch to a tab in another group.
  - **Move Last Used Tab to Front on Leave:** Waits until you leave a tab (`onActivated` transition with a 180ms settle guard) before moving it to index `0` of its group, eliminating click-target jumps.
- **🚫 4-Layer Anti-Refresh & Scroll Lock Engine:**
  - Toggle protection for any website with one click from the Popup or manage protected domains from the Vault Dashboard.
  - Displays a self-fading on-page notification pill (`🛡️ AutoTab`), a live counter in the popup, and a per-tab amber badge (`#f59e0b`) directly on the browser toolbar icon.

---

### 🚀 Quick Start (Installation)

1. **Chrome Web Store:** [Install AutoTab directly from the Chrome Web Store](https://chromewebstore.google.com/detail/autotab-automated-tab-gro/bcojmikhhechoghnkjlmkobigabibfnp).
2. **Manual / Developer Installation (30 Seconds):**
   * **[Download the Repository ZIP](https://github.com/SyK112/autotab/archive/refs/heads/main.zip)** and extract it to a folder.
   * Open `chrome://extensions` (or `brave://extensions` / `edge://extensions`).
   * Enable **Developer mode** in the top-right corner.
   * Click **Load unpacked** and select the extracted folder.

---

### 📁 Repository Structure

```text
autotab/
├── manifest.json       # Manifest V3 configuration (v2.1.0, optional identity permission)
├── background.js       # Auto-grouping, Accordion Mode, Move-to-Front, Tiered Vault & Anti-Refresh Shield
├── popup.html          # Bilingual quick-control popup, Accordion/Move toggles & Anti-Refresh counter
├── popup.css           # Adaptive dark/light popup stylesheet
├── popup.js            # Popup controller & i18n engine (TR / EN)
├── dashboard.html      # Tab Vault dashboard, Date Agenda Popover, Google Drive Sync & What's New v2.1 modal
├── dashboard.css       # Symmetrical container-aligned dark/light dashboard & calendar stylesheet
├── dashboard.js        # Vault management, Date Agenda, Google Drive OAuth, sorting & JSON backup logic
├── _locales/           # Chrome Web Store localization (tr, en)
├── icons/              # Extension icons (16px, 48px, 128px)
├── CHANGELOG.md        # Detailed v2.1.0 & v2.0.0 release notes ("What's New / Neler Yeni?")
├── PRIVACY.md          # Transparent privacy policy & Google API Limited Use disclosure
├── LICENSE             # MIT License
└── README.md           # Documentation
```

---

<br/>

<h2 id="turkce">🇹🇷 Türkçe Dokümantasyon</h2>

### 🚀 AutoTab v2.1 Neden Çok Büyük Bir Boşluğu Dolduruyor?

Tarayıcıda sekme karmaşasını çözmek isteyen kullanıcılar bugüne kadar üç ayrı eklenti kurmak zorunda kalıyordu: sekmeleri gruplamak için bir eklenti, açık sekmeleri kaydedip RAM boşaltmak için ikinci bir eklenti (OneTab vb.) ve haber sitelerinin reklam göstermek için sayfayı kendi kendine yenilemesini durdurmak için üçüncü bir eklenti. Üstelik bu eklentilerin çoğu temel özellikleri ücretli "Pro" abonelik arkasına gizliyor, sekmeleri kapatırken **yazmakta olduğunuz mesajları siliyor** veya her kaydetmede dağınık listeler oluşturuyordu.

**AutoTab v2.1, tüm bu ihtiyaçları sıfır harici kütüphaneyle `< 45 KB` boyutunda tek bir çatı altında birleştirir:**

1. **⚡ Sıfır Tıklamayla Otomatik Gruplama (2+ Kuralı & Otomatik Çözülme):** Aynı siteden 2. sekme açıldığı salisede arka planda otomatik gruplar; sekmeler kapanıp 1 sekme kaldığında grup başlığını kendiliğinden çözer.
2. **🪗 Akordeon Modu & Sekmeden Ayrılırken Başa Taşıma (v2.1 ile Yeni):**
   - **Diğer Grupları Otomatik Daralt (Akordeon Modu):** Bir sekme grubuna odaklandığınızda yalnızca o grup açık (`collapsed: false`) kalır; penceredeki diğer tüm sekme grupları otomatik olarak daraltılır (`collapsed: true`). Sekme çubuğunuz her zaman ferah kalır.
   - **Son Kullanılan Sekmeyi Ayrılırken Grubun Başına Taşıma:** Tıklama anında sekmenin yer değiştirip yanlış sekme kapatma kazalarına yol açmaması için taşıma işlemi tıklama anında değil, **sekmeden ayrıldığınız anda** (180ms yerleşme gecikmesiyle) yapılır. Gruba tekrar döndüğünüzde son kullandığınız sekme daima **1. sırada (en solda)** sizi bekler!
3. **🗄️ Kademeli Sekme Kasası (OneTab+) & Hibrit Google Drive Eşitlemesi (v2.1 ile Geliştirildi):**
   - **1. Katman (Sıfır Kurulum Yerel & Profil Hafızası):** Varsayılan olarak `chrome.storage.local` ve parçalı `chrome.storage.sync` (`v_0..v_23`) motoruyla hiçbir hesap açmadan çalışır.
   - **2. Katman (Opsiyonel Google Drive Bulut Eşitlemesi):** Üst bardaki **☁️ Google Drive Eşitlemesi** butonuyla yalnızca istediğinizde (`optional_permissions: ["identity"]`) bağlanır. `chrome.identity.launchWebAuthFlow` ve dar kapsamlı `drive.file` (`autotab-vault-v2.json`) izni sayesinde 100 KB sınırını tamamen kaldırır; evdeki Brave ile iş yerindeki Chrome/Edge arasında canlı kasa eşitlemesi sağlar.
4. **📅 Sekme Sayaçlı Tarih Ajandası & Filtreye Duyarlı Güvenli Grup İşlemleri (v2.1 ile Yeni):**
   - Üst bardaki **📅 Tarih: Tümü ▾** açılır ajandasından *Tümü*, *Bugün*, *Dün*, *Son 7 Gün* hızlı seçim haplarını kullanabilir veya her günün altında o gün kaydedilen sekme sayısını rozet olarak gösteren **aylık takvim ızgarasından** istediğiniz günü seçebilirsiniz.
   - **Filtreye Duyarlı Güvenli Grup İşlemleri:** Bir tarih veya arama filtresi aktifken grup kartındaki *"Tümünü Aç"* veya *"Grubu Sil"* butonlarına bastığınızda, gruptaki tüm sekmeler değil **yalnızca o günkü/filtrelenen sekmeler** açılır veya silinir; diğer günlerdeki kayıtlarınız güvenle korunur!
5. **🛡️ Akıllı Aktif Sekme Koruması (`< 120ms` Veri Kaybı Önleyici):** Sekmeleri kasaya kaldırırken açık sayfaları paralel olarak analiz eder; **içinde yarım kalan bir mesaj/form yazısı olan** veya **video/müzik oynatan** sekmeleri tespit eder. Bu sekmelerin yedeğini yine kasaya alır ancak **tarayıcıda kapatmadan açık bırakır**!
6. **🚫 4 Katmanlı Oto-Yenileme Kalkanı & Araç Çubuğu Canlı Rozeti (v2.1 ile Geliştirildi):** Özellikle haber sitelerinin reklam gösterimini artırmak için sayfayı kendi kendine yenileyip okuduğunuz haber başlığından sizi en tepeye fırlatmasını engeller. `<meta http-equiv="refresh">`, sekme odak tuzakları (`visibilitychange`), zamanlayıcılar (`setTimeout`/`setInterval`) ve `Navigation API` yenilemelerini durdurur; kaydırma konumunuzu (`Scroll Lock`) kilitler ve **sağ üstteki AutoTab araç çubuğu simgesinde sekmeye özel kehribar (`#f59e0b`) engelleme sayacı (`1, 2, 3...`)** gösterir (`0` iken gizli kalır).

#### 📊 Karşılaştırma Tablosu

| Özellik | 🗂️ AutoTab v2.1 | 📦 Tipik Eklentiler (OneTab / Tabbiy vb.) |
| :--- | :---: | :---: |
| **Sıfır Butonla Otomatik Gruplama** | **✅ %100 Arka Planda (Anında)** | ❌ Her seferinde butona basma zorunluluğu |
| **Temiz Sekme Çubuğu (2+ Kuralı)** | **✅ 2+ sekmede gruplar, 1 sekmede çözer** | ❌ Tek sekmelere bile grup başlığı açar |
| **Akordeon Modu (Diğer Grupları Daraltma)** | **✅ Sadece aktif grubu açık tutar** | ❌ Sekme çubuğu açık gruplarla sıkışır |
| **Son Kullanılan Sekmeyi Başa Taşıma** | **✅ Ayrılırken 1. sıraya taşır (Hedef kaymaz)** | ❌ Bulunmuyor veya tıklarken kaydırıyor |
| **Sekme Kasası & Tarayıcılar Arası Eşitleme** | **✅ Parçalı `storage.sync` + Google Drive OAuth** | ⚠️ Sadece yerel veya ücretli abonelik şartı |
| **Sekme Sayaçlı Tarih Ajandası & Güvenli Filtre** | **✅ Günlük sekme rozetli takvim + Korumalı silme** | ❌ Düz ve karmaşık tarih yığını |
| **Akıllı Grup Birleştirme & Tekilleştirme** | **✅ Mevcut gruba ekler, sadece tarihi günceller** | ❌ Her kayıtta mükerrer liste yığını oluşturur |
| **Yarım Kalan Yazı & Medya Koruması** | **✅ Yedekler ve sekmeyi kapatmadan korur** | ❌ Sekmeyi kapatıp yazılan metni yok eder |
| **Oto-Yenileme Kalkanı + Araç Çubuğu Rozeti** | **✅ 4 Katmanlı Kalkan + Simge Üzeri Canlı Rozet** | ❌ Bulunmuyor |
| **Boyut ve Kütüphane Yükü** | **✅ < 45 KB (Saf JavaScript)** | ⚠️ 1 MB – 10 MB ağır paketler |
| **Gizlilik ve Fiyatlandırma** | **✅ %100 İstemci Taraflı • MIT Ücretsiz** | ❌ Telemetri takibi ve aylık abonelikler |

---

### ✨ Öne Çıkan Özellikler

- **🗄️ Akıllı Sekme Kasası (`dashboard.html`):**
  - **Gerçekçi Depolama ve Eşitleme Göstergesi:** Varsayılan modda `💾 Yerel & Profil Hafızası Aktif • X Grup, Y Sekme (%Z Kota)`, Google Drive bağlandığında ise yeşil ışıkla `☁️ Google Drive Bulut Eşitleme Aktif (Son eşitleme: SS:DD)` bilgisini şeffaf biçimde sunar.
  - **Sekme Sayaçlı Ajanda (`📅 Tarih: Tümü ▾`):** Hızlı seçim hapları (*Tümü*, *Bugün*, *Dün*, *Son 7 Gün*) ve aylık takvim ızgarası ile aradığınız gündeki sekmeleri tek tıkla süzün.
  - **Akıllı Alan Adı Birleştirme (Smart Merge) & Tekilleştirme (Upsert):** Kasada `YouTube` grubunuz varken yeni sekmeleri kaydettiğinizde doğrudan mevcut `YouTube` grubunuzun içine ekler; aynı link tekrar kaydedilirse kopya oluşturmaz, tarihini güncelleyip en üste taşır.
  - **Sol Tık ve Orta Tık (`Ctrl+Tık`) Ayrımı:** Kasadaki bir linke **Sol Tık** yaptığınızda sekmeyi açıp kasadan siler; **Orta Tık (Farenin Tekerleği)** veya `Ctrl+Tık` yaptığınızda ise sekmeyi arka planda açar ve **kasada tutmaya devam eder**.
  - **Grup İçi 4'lü Sıralama & JSON Yedekleme:** Grup içindeki linkleri *Yeniden Eskiye*, *Eskiden Yeniye*, *A ➔ Z* veya *Z ➔ A* sıralayabilir, tek tıkla JSON yedeği alabilirsiniz.
- **🚫 4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı:**
  - Eklenti menüsünden (Popup) bulunduğunuz site için şalteri açabilir veya Sekme Kasası ekranındaki yönetim çubuğundan (`ensonhaber.com` vb.) siteleri kolayca ekleyip çıkarabilirsiniz.
  - Sayfa arka planda yenilenmeye çalıştığında sol altta kendi kendine kaybolan şık bir bildirim rozeti gösterir, Popup menüsünde ve doğrudan **sağ üstteki araç çubuğu simgesi üzerinde** kaç yenileme girişiminin engellendiğini canlı olarak yazar.
- **🎉 Sürüm İçi "Neler Yeni?" (What's New v2.1) Ekranı:**
  - Güncelleme sonrasında ve üst bardaki **✨ v2.1 Neler Yeni?** butonuyla yeni özellikleri özetleyen çift dilli kutlama penceresi sunar.

---

### 🚀 Hızlı Kurulum

1. **Chrome Web Store:** [AutoTab'ı Chrome Web Store'dan Tek Tıkla Kurun](https://chromewebstore.google.com/detail/autotab-automated-tab-gro/bcojmikhhechoghnkjlmkobigabibfnp).
2. **Geliştirici Modu ile Kurulum (30 Saniye):**
   * **[ZIP Dosyasını İndirin](https://github.com/SyK112/autotab/archive/refs/heads/main.zip)** ve bir klasöre çıkartın.
   * Tarayıcınızda `chrome://extensions` (veya `brave://extensions` / `edge://extensions`) adresini açın.
   * Sağ üstten **Geliştirici modu** anahtarını açın.
   * Sol üstteki **Paketlenmemiş öğe yükle** butonuna tıklayıp ZIP'ten çıkarttığınız klasörü seçin.

---

## 📄 License / Lisans

Bu proje **MIT Lisansı** altında tamamen ücretsiz ve açık kaynaklı olarak sunulmaktadır. Ayrıntılar için [`LICENSE`](LICENSE) ve [`PRIVACY.md`](PRIVACY.md) belgelerine göz atabilirsiniz.

<div align="center">
  <sub>Crafted with precision by <a href="https://github.com/SyK112">Süleyman YK</a> and the open-source community.</sub>
</div>
