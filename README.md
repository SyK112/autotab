<div align="center">

  <h1>🗂️ AutoTab v2.0</h1>
  <p><strong>Zero-click automated tab grouper, cloud-synced Tab Vault (OneTab+), Smart Active Tab Guard, and 4-Layer Anti-Refresh Shield for Chromium browsers.</strong></p>
  <p>No manual organizing. No lost form text. No forced page reloads. No paywalls.</p>

  <p>
    <a href="https://chromewebstore.google.com/detail/autotab-automated-tab-gro/bcojmikhhechoghnkjlmkobigabibfnp"><img src="https://img.shields.io/badge/Chrome_Web_Store-v2.0-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome Web Store"></a>
    <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/What's_New_in_v2.0-Neler_Yeni%3F-8b5cf6?style=for-the-badge" alt="What's New in v2.0"></a>
    <a href="https://github.com/SyK112/autotab/stargazers"><img src="https://img.shields.io/github/stars/SyK112/autotab?style=for-the-badge&logo=github&color=blue" alt="Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
    <a href="#"><img src="https://img.shields.io/badge/Dependencies-Zero%20(Pure%20JS)-yellow.svg?style=for-the-badge&logo=javascript" alt="Zero Dependencies"></a>
  </p>

  <sub>Supports <strong>Brave</strong>, <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, <strong>Vivaldi</strong>, <strong>Opera</strong>, and all Chromium browsers.</sub>

  <br/><br/>
  <p>
    <a href="CHANGELOG.md"><strong>✨ What's New in v2.0 (Neler Yeni?)</strong></a> •
    <a href="#english"><strong>🇬🇧 English Documentation</strong></a> •
    <a href="#turkce"><strong>🇹🇷 Türkçe Dokümantasyon</strong></a>
  </p>
</div>

---

<h2 id="english">🇬🇧 English Documentation</h2>

### 🚀 What Makes AutoTab v2.0 Different?

Most tab extensions force you to install three separate, bloated tools — one for grouping tabs, another for stashing tabs to free up memory (like OneTab), and another to stop websites from auto-reloading. Even worse, they lock core features behind monthly subscriptions, lose your unsaved text when closing tabs, or leave single-tab groups cluttering your tab bar.

**AutoTab v2.0 unites all three pillars in a single, dependency-free `< 40 KB` extension:**

1. **⚡ Zero-Click Auto Grouping (2+ Rule & Auto-Dissolve):** Silently groups tabs by root domain the moment 2+ tabs from the same site exist, and automatically ungroups when only 1 tab remains.
2. **🗄️ Cloud-Synced Tab Vault (OneTab+):** Stash open tabs into a clean, domain-grouped vault to reclaim RAM instantly. Powered by a chunked `chrome.storage.sync` engine that syncs across your computers via your browser profile — no external accounts required.
3. **🛡️ Smart Active Tab Guard (`< 120ms`):** Before closing tabs into the Vault, AutoTab scans pages in parallel for **unsaved text in inputs/textareas/editors** or **playing video/audio**. Active tabs are backed up to the Vault, **but prevented from closing** so you never lose a draft message or interrupt a stream.
4. **🚫 4-Layer Anti-Refresh & Scroll Lock Shield:** Stops news websites and portals from forcibly auto-reloading pages to inflate ad impressions. Blocks `<meta http-equiv="refresh">`, `visibilitychange`/`focus` reload traps, unattended `setTimeout`/`setInterval` reload timers, and `Navigation API` reloads — while locking and restoring your exact scroll position (`Scroll Lock`) and counting blocked attempts live.

#### 📊 Feature Comparison

| Feature | 🗂️ AutoTab v2.0 | 📦 Typical Tab Groupers / OneTab |
| :--- | :---: | :---: |
| **Zero-Click Auto Grouping** | **✅ 100% Background (Instant)** | ❌ Click "Group" manually every time |
| **Clean Tab Bar (2+ Rule & Auto-Ungroup)** | **✅ Groups at 2+, dissolves at 1** | ❌ Clutters with 1-tab groups |
| **Tab Vault & Cross-Device Sync** | **✅ Built-in Chunked `storage.sync`** | ⚠️ Local-only or paid cloud account |
| **Smart Domain Merge & Deduplication** | **✅ Merges groups & updates timestamps** | ❌ Creates duplicate messy lists |
| **Unsaved Text & Playing Media Guard** | **✅ Backs up & keeps active tabs open** | ❌ Closes tabs & destroys unsaved text |
| **Anti-Refresh & Scroll Position Lock** | **✅ 4-Layer Shield + Live Counter** | ❌ Not supported |
| **Footprint & Dependencies** | **✅ < 40 KB (Zero frameworks)** | ⚠️ 1 MB – 10 MB bundles |
| **Privacy & Pricing** | **✅ 100% Local/Browser Sync • MIT Free** | ❌ Telemetry & monthly paywalls |

---

### ✨ Key Capabilities in Detail

- **🗄️ Smart Tab Vault (`dashboard.html`):**
  - **Smart Domain Merge:** Saving tabs from `youtube.com` automatically merges them into your existing `YouTube` vault group instead of creating separate date-stamped clutter.
  - **Upsert Deduplication:** Saving an already-stashed URL never creates a duplicate; it simply updates its timestamp and moves it to the top of its group.
  - **Left-Click vs. Middle-Click (`Ctrl+Click`):** Left-clicking a link opens the tab and removes it from the vault. Middle-clicking (mouse wheel) or `Ctrl+Click` opens the tab in the background while **keeping it in the vault**.
  - **4-Way In-Group Sorting & Instant Search:** Sort links inside groups by *Newest First*, *Oldest First*, *A ➔ Z*, or *Z ➔ A*, and export/import full JSON backups anytime.
- **🚫 4-Layer Anti-Refresh & Scroll Lock Engine:**
  - Toggle protection for any website with one click from the Popup or manage protected domains from the Vault Dashboard.
  - Displays a self-fading on-page notification badge (`🛡️ AutoTab`) and a live per-tab blocked refresh counter inside the extension popup.

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
├── manifest.json       # Manifest V3 configuration (v2.0.0)
├── background.js       # Auto-grouping engine, Chunked Sync Vault, Active Tab Guard & Anti-Refresh Shield
├── popup.html          # Bilingual quick-control popup & live Anti-Refresh counter
├── popup.css           # Adaptive dark/light popup stylesheet
├── popup.js            # Popup controller & i18n engine (TR / EN)
├── dashboard.html      # Tab Vault dashboard, Anti-Refresh domain manager & What's New v2.0 modal
├── dashboard.css       # Responsive dark/light dashboard & modal stylesheet
├── dashboard.js        # Vault management, sorting, search, JSON backup & What's New logic
├── _locales/           # Chrome Web Store localization (tr, en)
├── icons/              # Extension icons (16px, 48px, 128px)
├── CHANGELOG.md        # Detailed v2.0.0 release notes ("What's New / Neler Yeni?")
├── PRIVACY.md          # Transparent privacy policy
├── LICENSE             # MIT License
└── README.md           # Documentation
```

---

<br/>

<h2 id="turkce">🇹🇷 Türkçe Dokümantasyon</h2>

### 🚀 AutoTab v2.0 Neden Çok Büyük Bir Boşluğu Dolduruyor?

Tarayıcıda sekme karmaşasını çözmek isteyen kullanıcılar bugüne kadar üç ayrı eklenti kurmak zorunda kalıyordu: sekmeleri gruplamak için bir eklenti, açık sekmeleri kaydedip RAM boşaltmak için ikinci bir eklenti (OneTab vb.) ve haber sitelerinin reklam göstermek için sayfayı kendi kendine yenilemesini durdurmak için üçüncü bir eklenti. Üstelik bu eklentilerin çoğu temel özellikleri ücretli "Pro" abonelik arkasına gizliyor, sekmeleri kapatırken **yazmakta olduğunuz mesajları siliyor** veya her kaydetmede dağınık listeler oluşturuyordu.

**AutoTab v2.0, bu üç temel ihtiyacı sıfır harici kütüphaneyle `< 40 KB` boyutunda tek bir çatı altında birleştirir:**

1. **⚡ Sıfır Tıklamayla Otomatik Gruplama (2+ Kuralı & Otomatik Çözülme):** Aynı siteden 2. sekme açıldığı salisede arka planda otomatik gruplar; sekmeler kapanıp 1 sekme kaldığında grup başlığını kendiliğinden çözer.
2. **🗄️ Bulut Eşitlemeli Sekme Kasası (OneTab+):** Açık sekmelerinizi tek tıkla kasaya kaldırıp tarayıcı belleğini (RAM) anında ferahlatın. Parçalı Bulut Motoru (`chrome.storage.sync`) sayesinde ek bir hesap açmadan, doğrudan tarayıcı profiliniz üzerinden tüm bilgisayarlarınız arasında otomatik eşitlenir.
3. **🛡️ Akıllı Aktif Sekme Koruması (`< 120ms` Veri Kaybı Önleyici):** Sekmeleri kasaya kaldırırken açık sayfaları paralel olarak analiz eder; **içinde yarım kalan bir mesaj/form yazısı olan** veya **video/müzik oynatan** sekmeleri tespit eder. Bu sekmelerin yedeğini yine kasaya alır ancak **tarayıcıda kapatmadan açık bırakır**!
4. **🚫 4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı (Anti-Refresh & Scroll Lock):** Özellikle haber sitelerinin reklam gösterimini artırmak için sayfayı kendi kendine yenileyip okuduğunuz haber başlığından sizi en tepeye fırlatmasını engeller. `<meta http-equiv="refresh">`, sekme odak tuzakları (`visibilitychange`), zamanlayıcılar (`setTimeout`/`setInterval`) ve `Navigation API` yenilemelerini durdurur; kaydırma konumunuzu (`Scroll Lock`) kilitler ve engellenen girişimleri canlı olarak sayar.

#### 📊 Karşılaştırma Tablosu

| Özellik | 🗂️ AutoTab v2.0 | 📦 Tipik Eklentiler (OneTab / Tabbiy vb.) |
| :--- | :---: | :---: |
| **Sıfır Butonla Otomatik Gruplama** | **✅ %100 Arka Planda (Anında)** | ❌ Her seferinde butona basma zorunluluğu |
| **Temiz Sekme Çubuğu (2+ Kuralı)** | **✅ 2+ sekmede gruplar, 1 sekmede çözer** | ❌ Tek sekmelere bile grup başlığı açar |
| **Sekme Kasası & Cihazlar Arası Eşitleme** | **✅ Dahili Parçalı `storage.sync` Motoru** | ⚠️ Sadece yerel veya ücretli hesap şartı |
| **Akıllı Grup Birleştirme & Tekilleştirme** | **✅ Mevcut gruba ekler, sadece tarihi günceller** | ❌ Her kayıtta mükerrer liste yığını oluşturur |
| **Yarım Kalan Yazı & Medya Koruması** | **✅ Yedekler ve sekmeyi kapatmadan korur** | ❌ Sekmeyi kapatıp yazılan metni yok eder |
| **Oto-Yenileme & Başa Dönme Kalkanı** | **✅ 4 Katmanlı Kalkan + Canlı Sayaç** | ❌ Bulunmuyor |
| **Boyut ve Kütüphane Yükü** | **✅ < 40 KB (Saf JavaScript)** | ⚠️ 1 MB – 10 MB ağır paketler |
| **Gizlilik ve Fiyatlandırma** | **✅ %100 Yerel/Profil Eşitleme • MIT Ücretsiz** | ❌ Telemetri takibi ve aylık abonelikler |

---

### ✨ Öne Çıkan Özellikler

- **🗄️ Akıllı Sekme Kasası (`dashboard.html`):**
  - **Akıllı Alan Adı Birleştirme (Smart Merge):** Örneğin kasada `YouTube` grubunuz varken yeni sekmeleri kaydettiğinizde, yeni bir yığın açmak yerine doğrudan mevcut `YouTube` grubunuzun içine ekler.
  - **Mükerrer Link Engelleme (Upsert):** Aynı link tekrar kaydedilirse kopya oluşturmaz; mevcut kaydın tarihini güncelleyip grubun en üstüne taşır.
  - **Sol Tık ve Orta Tık (`Ctrl+Tık`) Ayrımı:** Kasadaki bir linke **Sol Tık** yaptığınızda sekmeyi açıp kasadan siler; **Orta Tık (Farenin Tekerleği)** veya `Ctrl+Tık` yaptığınızda ise sekmeyi arka planda açar ve **kasada tutmaya devam eder**.
  - **Grup İçi 4'lü Sıralama & Onaylı Silme:** Grup içindeki linkleri *Yeniden Eskiye*, *Eskiden Yeniye*, *A ➔ Z* veya *Z ➔ A* sıralayabilir, tek tıkla JSON yedeği alabilirsiniz.
- **🚫 4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı:**
  - Eklenti menüsünden (Popup) bulunduğunuz site için şalteri açabilir veya Sekme Kasası ekranındaki yönetim çubuğundan (`ensonhaber.com` vb.) siteleri kolayca ekleyip çıkarabilirsiniz.
  - Sayfa arka planda yenilenmeye çalıştığında sol altta kendi kendine kaybolan şık bir bildirim rozeti gösterir ve Popup menüsünde kaç yenileme girişiminin engellendiğini canlı olarak yazar.
- **🎉 Sürüm İçi "Neler Yeni?" (What's New) Ekranı:**
  - Güncelleme sonrasında ve üst bardaki **✨ v2.0 Neler Yeni?** butonuyla yeni özellikleri özetleyen kutlama penceresi sunar.

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
