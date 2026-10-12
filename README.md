<div align="center">

  <h1>🗂️ AutoTab</h1>
  <p><strong>Zero-click, truly automated, lightweight tab grouper for Chromium browsers.</strong></p>
  <p>No buttons to press. No manual organizing. No paywalls.</p>

  <p>
    <a href="https://github.com/SyK112/autotab/stargazers"><img src="https://img.shields.io/github/stars/SyK112/autotab?style=for-the-badge&logo=github&color=blue" alt="Stars"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License: MIT"></a>
    <a href="#"><img src="https://img.shields.io/badge/Manifest-V3-brightgreen.svg?style=for-the-badge&logo=googlechrome" alt="Manifest V3"></a>
    <a href="#"><img src="https://img.shields.io/badge/Dependencies-Zero%20(Pure%20JS)-yellow.svg?style=for-the-badge&logo=javascript" alt="Zero Dependencies"></a>
    <a href="https://github.com/SyK112/autotab/pulls"><img src="https://img.shields.io/badge/PRs-Welcome-emerald.svg?style=for-the-badge" alt="PRs Welcome"></a>
  </p>

  <sub>Supports <strong>Brave</strong>, <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong>, <strong>Vivaldi</strong>, <strong>Arc</strong>, and all Chromium browsers.</sub>

  <br/><br/>
  <p>
    <a href="#english"><strong>🇬🇧 English Documentation</strong></a> •
    <a href="#turkce"><strong>🇹🇷 Türkçe Dokümantasyon</strong></a>
  </p>
</div>

---

<h2 id="english">🇬🇧 English Documentation</h2>

### 💡 The Problem & Why AutoTab?

Most tab manager extensions in the Chrome Web Store advertise **"Auto Grouping"**, yet in reality:
1. You have to open a sidebar or popup and **click an "Auto Group" button every single time** you want to organize tabs.
2. They clutter your tab bar by creating group headers even for **single, standalone tabs**.
3. When you close grouped tabs and leave just one, the group header stays stuck, wasting space.
4. Basic real-time automation and custom domain rules are often locked behind **paid "Pro" subscriptions**.

#### 📊 Feature Comparison

| Feature | 🗂️ AutoTab | 📦 Typical Extensions (Tabbiy, etc.) |
| :--- | :---: | :---: |
| **Zero-Click Automation** | **✅ 100% Background (Instant)** | ❌ Click "Auto Group" every time |
| **Clean Tab Bar (2+ Rule)** | **✅ Only groups when 2+ tabs exist** | ❌ Clutters with 1-tab groups |
| **Instant Auto-Ungroup** | **✅ Dissolves when 1 tab remains** | ❌ Leaves dangling group headers |
| **Pinned Tab Protection** | **✅ Never touches pinned tabs** | ⚠️ Often moves or breaks pinned tabs |
| **Domain Redirect Guard** | **✅ Auto-ungroups if tab changes site** | ❌ Stays in the wrong group |
| **Footprint & Memory** | **✅ < 20 KB (Zero frameworks)** | ⚠️ 500 KB - 5 MB (Webpack/React bundles) |
| **Privacy & Telemetry** | **✅ 100% Local (Zero tracking)** | ⚠️ Sends analytics & account syncs |
| **Pricing** | **✅ Free & Open Source (MIT)** | ❌ Monthly/yearly paywalls |

---

### ✨ Core Mechanics

- **⚡ True Event-Driven Background Engine:** Powered by a Manifest V3 Service Worker. Listens to `chrome.tabs.onUpdated` and `chrome.tabs.onCreated` silently.
- **🛡️ 300ms Debounce Queue:** Rapidly clicking links, opening bookmarks, or navigating redirects won't cause tab stutter or browser locking.
- **🎯 Intelligent Root Domain Extraction:** Correctly identifies root domains across complex multi-part TLDs (e.g., `mail.google.com` ➔ `Google`, `unsan.com.tr` ➔ `Unsan`, `bbc.co.uk` ➔ `BBC`).
- **📌 Pinned Tab Immunity:** Pinned tabs remain safely locked on the left. Pinning a grouped tab automatically removes it from the group.
- **🎨 Deterministic Color Hashing:** Mathematical string hashing guarantees that each domain always receives the exact same signature color (YouTube ➔ Red, GitHub ➔ Purple, Google ➔ Blue).

---

### 🚀 Quick Start (Installation in 30 Seconds)

Works out of the box with any Chromium-based browser (**Brave, Chrome, Edge, Vivaldi, Arc**):

1. **Clone this repository** (or download the ZIP):
   ```bash
   git clone https://github.com/SyK112/autotab.git
   ```

2. **Open Extensions Manager** in your browser:
   * **Brave:** `brave://extensions`
   * **Chrome:** `chrome://extensions`
   * **Edge:** `edge://extensions`

3. **Enable Developer Mode** (toggle switch in the top-right corner).

4. Click **Load unpacked** (Paketlenmemiş öğe yükle) in the top-left corner.

5. Select the `autotab` directory containing `manifest.json`.

*Done! AutoTab is immediately active and organizing your tabs in real time.*

---

### 📁 Repository Structure

```text
autotab/
├── manifest.json       # Manifest V3 configuration & permissions
├── background.js       # Core event-driven service worker & grouping engine
├── popup.html          # Clean, modern toggle & quick action interface
├── popup.css           # Adaptive dark/light theme stylesheet
├── popup.js            # Settings handler & message bridge
├── icons/              # Extension icons (16px, 48px, 128px)
├── .gitignore          # Git exclusion rules
├── LICENSE             # MIT License
└── README.md           # Documentation
```

---

### 🗺️ Roadmap & Contributing

We welcome community feedback, feature requests, and pull requests!

- [ ] **Domain Whitelist / Blacklist:** Configurable list of sites that should never be grouped.
- [ ] **Custom Group Names:** Ability to assign custom alias labels to specific domains or local IP addresses.
- [ ] **Auto-Collapse Option:** Toggle to automatically collapse inactive groups to maximize tab strip space.
- [ ] **Keyboard Shortcuts:** Configurable hotkeys for instant grouping or ungrouping.

To contribute:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

<br/><br/>

<h2 id="turkce">🇹🇷 Türkçe Dokümantasyon</h2>

### 💡 Neden AutoTab?

Chrome Web Store'daki birçok sekme düzenleyici eklenti **"Otomatik Gruplama"** vaat etse de, pratikte:
1. Her seferinde manuel bir **"Otomatik Grupla" butonuna basmanızı** şart koşarlar.
2. Tek başına duran sekmelere dahi grup başlığı açarak sekme çubuğunu doldururlar.
3. Çoklu sekmeler kapatılıp geriye tek sekme kaldığında, grup başlığı sekme çubuğunda kalmaya devam eder ve yeri işgal eder.
4. Temel arka plan otomasyonunu ve kuralları ücretli **"Pro" aboneliklerin** arkasına saklarlar.

**AutoTab bu sorunları tamamen çözer:** Hiçbir butona basmanıza gerek kalmadan, tamamen arka planda çalışır. Aynı siteden ikinci sekme açıldığı an ikisini birleştirir. Sekmeler kapatılıp tek sekme kaldığında ise grup başlığını kendiliğinden dağıtır.

#### 📊 Karşılaştırma Tablosu

| Özellik | 🗂️ AutoTab | 📦 Tipik Eklentiler (Tabbiy vb.) |
| :--- | :---: | :---: |
| **Sıfır Buton Etkileşimi** | **✅ %100 Arka Planda (Anında)** | ❌ Her defasında butona basma zorunluluğu |
| **Temiz Sekme Çubuğu (2+ Kuralı)** | **✅ Sadece 2+ sekme olunca gruplar** | ❌ Tek sekmelere dahi grup başlığı açar |
| **Anında Kendiliğinden Çözülme** | **✅ 1 sekme kalınca grubu dağıtır** | ❌ Boş / tekil grup başlıkları asılı kalır |
| **Sabitlenmiş (Pin) Sekme Koruması** | **✅ Pinli sekmelere asla dokunmaz** | ⚠️ Sabit sekmeleri bozabilir veya kaydırabilir |
| **Site Yönlendirme Koruması** | **✅ Sekme site değiştirirse gruptan çıkar** | ❌ Yanlış grubun içinde kalmaya devam eder |
| **Boyut ve Bellek Tüketimi** | **✅ < 20 KB (Sıfır kütüphane/framework)** | ⚠️ 500 KB - 5 MB (Ağır paketler) |
| **Gizlilik ve Telemetri** | **✅ %100 Yerel (Sıfır veri takibi)** | ⚠️ Analitik ve sunucu senkronizasyonu |
| **Fiyatlandırma** | **✅ Ücretsiz & Açık Kaynak (MIT)** | ❌ Ücretli aylık/yıllık Pro üyelikler |

---

### ✨ Çalışma Prensipleri

- **⚡ Olay Tabanlı Arka Plan Motoru:** Manifest V3 Service Worker altyapısı ile çalışır. `chrome.tabs.onUpdated` ve `chrome.tabs.onCreated` olaylarını arka planda sessizce dinler.
- **🛡️ 300ms Akıllı Kuyruk (Debounce):** Arka arkaya sekmeler açarken veya yönlendirmelerde sekme çubuğunda zıplama ve donma yaşanmasını engeller.
- **🎯 Akıllı Kök Alan Adı (Root Domain) Tespiti:** Çok parçalı alan adlarını dahi hatasız tanır (`mail.google.com` ➔ `Google`, `unsan.com.tr` ➔ `Unsan`, `bbc.co.uk` ➔ `BBC`).
- **📌 Sabit Sekme Dokunulmazlığı:** Pinlenmiş sekmeler en solda güvende kalır. Gruptaki bir sekme sonradan sabitlenirse derhal gruptan çıkarılır.
- **🎨 Deterministik Renk Eşleme:** Matematiksel dize özetleme (hash) algoritması sayesinde her alan adı daima aynı sabit rengi alır (YouTube daima Kırmızı, GitHub Mor, Google Mavi vb.).

---

### 🚀 Hızlı Kurulum (30 Saniyede)

Tüm Chromium tabanlı tarayıcılarda (**Brave, Google Chrome, Microsoft Edge, Vivaldi, Arc**) doğrudan çalışır:

1. **Bu depoyu indirin veya klonlayın:**
   ```bash
   git clone https://github.com/SyK112/autotab.git
   ```

2. **Eklenti Yöneticisini Açın:**
   * **Brave:** `brave://extensions`
   * **Chrome:** `chrome://extensions`
   * **Edge:** `edge://extensions`

3. Sağ üst köşedeki **Geliştirici modu**nu (Developer mode) açın.

4. Sol üstte beliren **Paketlenmemiş öğe yükle** butonuna tıklayın.

5. İçinde `manifest.json` dosyasının bulunduğu `autotab` klasörünü seçin.

*Tebrikler! AutoTab hemen çalışmaya başlayacak ve sekmelerinizi otomatik olarak düzenleyecektir.*

---

### 🗺️ Yol Haritası ve Katkıda Bulunma

Topluluk önerilerine ve geliştirmelere açığız:

- [ ] **Beyaz Liste / Kara Liste (Whitelist/Blacklist):** Asla gruplanmasını istemediğiniz sitelerin listesi.
- [ ] **Özel Grup İsimleri:** Belirli alan adları veya yerel IP'ler için özel grup etiketleri tanımlama.
- [ ] **Otomatik Daraltma (Auto-Collapse):** Sekme çubuğunda yer kazanmak için aktif olmayan grupları otomatik daraltma.
- [ ] **Klavye Kısayolları:** Anında gruplama veya çözme için kısayol tuşları.

---

## 📄 License / Lisans

Bu proje **MIT Lisansı** altında sunulmaktadır. Ayrıntılar için [`LICENSE`](LICENSE) belgesine göz atabilirsiniz.

<div align="center">
  <sub>Crafted with precision by <a href="https://github.com/SyK112">Süleyman Yasin Kazancı</a> and the open-source community.</sub>
</div>
