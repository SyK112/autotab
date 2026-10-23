# 🚀 AutoTab — Neler Yeni? / What's New (Changelog)

<p align="center">
  <a href="#tr-v21"><strong>🇹🇷 Türkçe Sürüm Notları (v2.1.0)</strong></a> •
  <a href="#en-v21"><strong>🇬🇧 English Release Notes (v2.1.0)</strong></a> •
  <a href="#tr-v2"><strong>🇹🇷 v2.0.0 Notları</strong></a> •
  <a href="#en-v2"><strong>🇬🇧 v2.0.0 Notes</strong></a>
</p>

---

<h2 id="tr-v21">🇹🇷 Sürüm 2.1.0 — Sekme Sayaçlı Tarih Ajandası, Akordeon Modu, Ayrılırken Başa Taşıma, Canlı Araç Çubuğu Rozeti ve Hibrit Google Drive Eşitlemesi!</h2>

**Yayın Tarihi:** Ekim 2026

AutoTab **v2.1.0**, v2.0 ile gelen Sekme Kasası ve Oto-Yenileme Kalkanı mimarisini 6 büyük yenilikle bir üst seviyeye taşıyor:

### ✨ v2.1.0 İle Gelen 6 Büyük Yenilik

#### 1. ☁️ Kademeli (Tiered) Depolama ve Opsiyonel Google Drive Eşitlemesi
- **1. Katman (Giriş Yapmayanlar / Varsayılan):** Mevcut `chrome.storage.sync` + `chrome.storage.local` altyapısı sıfır kurulumla çalışmaya devam eder.
- **2. Katman (Google Drive Bulut Eşitlemesi):** Sekme Kasası (`dashboard.html`) üst barına **☁️ Google Drive Eşitlemesi** butonu eklendi. İlk kurulumda izin uyarısı çıkarmamak için `optional_permissions: ["identity"]` kullanılır ve yalnızca butona basan kullanıcıdan izin istenir.
- Tüm Chromium tarayıcılarda (**Brave**, **Google Chrome**, **Microsoft Edge**, **Vivaldi**) çalışabilen `chrome.identity.launchWebAuthFlow` ve dar kapsamlı `drive.file` (`autotab-vault-v2.json`) OAuth 2.0 akışı sayesinde 100 KB sınırı tamamen kalkar; farklı tarayıcılar arasında doğrudan kullanıcının kendi Google Drive'ı üzerinden canlı kasa eşitlemesi sağlanır.

#### 2. 💾 Gerçekçi Depolama ve Senkronizasyon Durum Göstergesi
- Google Drive bağlı değilken (varsayılan modda): Durum çubuğunda şeffaf biçimde **`💾 Yerel & Profil Hafızası Aktif • X Grup, Y Sekme (%Z Kota)`** yazar.
- Google Drive bağlanıp doğrulandığında: Durum çubuğunda yeşil ışıkla **`☁️ Google Drive Bulut Eşitleme Aktif (Son eşitleme: SS:DD) • X Grup, Y Sekme`** gösterilir.

#### 3. 📅 Sekme Sayaçlı Tarih Ajandası ve Filtreye Duyarlı Güvenli Grup İşlemleri
- **Üst Menü Ajanda Butonu (`📅 Tarih: Tümü ▾`):** Sekme Kasası üst barına açılır tarih ajandası eklendi.
- **Tek Tıkla Hızlı Seçim Hapları (Quick Chips):** Üzerinde sekme sayısı yazan hazır filtre butonları (*Tümü (X)*, *Bugün (Y)*, *Dün (Z)*, *Son 7 Gün (W)*) ile anında filtreleme yapar.
- **Sekme Sayaçlı Aylık Takvim Izgarası:** Hangi günlerde kayıt olduğunu tek bakışta görebilmeniz için aylık takvimde her gün kutucuğunun altında o gün kaydedilen toplam sekme sayısı rozet olarak gösterilir; kayıt olmayan günler soluk durur.
- **Filtreye Duyarlı Güvenli Grup İşlemleri:** Bir tarih veya arama filtresi aktifken grup kartındaki *"Tümünü Aç"* veya *"Grubu Sil"* butonlarına basıldığında, gruptaki tüm sekmeler değil **yalnızca o günkü/filtrelenen sekmeler** açılır veya silinir; diğer günlerdeki kayıtlarınız korunur!

#### 4. 🪗 Diğer Grupları Otomatik Daraltma (Akordeon Modu / Auto-Collapse)
- Bir grup içindeki sekmeye odaklandığınızda (`chrome.tabs.onActivated`), yalnızca aktif sekmenin bulunduğu grup açık (`collapsed: false`) kalır; aynı penceredeki diğer tüm sekme grupları otomatik olarak daraltılır (`collapsed: true`).
- Eklenti Popup menüsündeki **"Diğer Grupları Otomatik Daralt"** anahtarıyla (toggle) dilediğiniz zaman açıp kapatabilirsiniz.

#### 5. ⏮️ Son Kullanılan Sekmeyi Sekmeden Ayrılırken Grubun Başına Taşıma
- **Sorunsuz UX Prensibi (Tıklama Anında Değil, Ayrılırken Taşıma):** Sekmeye tıklandığı salisede sekmenin yer değiştirmesi fare altından hedef kaymasına yol açacağından, taşıma işlemi tıklama anında yapılmaz.
- Bir gruptaki sekmeyle işinizi bitirip başka bir sekmeye geçtiğiniz anda (`onActivated` geçişinde 180ms yerleşme gecikmesiyle), ayrıldığınız sekme sessizce kendi grubunun **en başına (1. sırasına)** (`chrome.tabs.move`) taşınır. Gruba tekrar döndüğünüzde son kullandığınız sekmeyi her zaman en solda bulursunuz!

#### 6. 🛡️ Araç Çubuğu Simgesi Üzerinde Canlı Engelleme Rozeti (Toolbar Action Badge)
- Popup menüsündeki istatistik çubuğuna ek olarak, tarayıcının sağ üst araç çubuğundaki AutoTab simgesi üzerine (`chrome.action.setBadgeText`) sekmeye özel (`tabId` bazlı) canlı sayaç rozeti eklendi.
- **Sıfır (`0`) Gösterim Yasağı:** Henüz yenileme girişimi engellenmemişse veya koruma kapalı bir sitede geziniliyorsa simge üzerinde `0` gösterilmez; rozet yalnızca **1 ve sonrasında** (`1, 2, 3...`) kehribar (`#f59e0b`) rengiyle belirir.

---

<h2 id="en-v21">🇬🇧 Version 2.1.0 — Date Agenda Calendar, Accordion Mode, Move-to-Front on Leave, Live Toolbar Badge & Hybrid Google Drive Sync!</h2>

**Release Date:** October 2026

1. **☁️ Tiered Storage & Optional Google Drive Cloud Sync:** Retains zero-setup `chrome.storage.sync` + `chrome.storage.local` as the default tier, and adds optional OAuth 2.0 Google Drive sync (`optional_permissions: ["identity"]`, `chrome.identity.launchWebAuthFlow`, narrow `drive.file` scope) to bypass the 100 KB limit across Brave, Chrome, Edge, and Vivaldi.
2. **💾 Realistic Storage & Sync Status Indicator:** Clearly distinguishes between `💾 Local & Profile Storage Active • X Groups, Y Tabs (Z% Quota)` and green-lit `☁️ Google Drive Cloud Sync Active (Last sync: HH:MM)`.
3. **📅 Tab-Count Date Agenda & Filter-Safe Group Actions:** Quick filter chips (*All*, *Today*, *Yesterday*, *Last 7 Days*) and a monthly calendar grid showing saved tab counts per day. Clicking *"Open All"* or *"Delete Group"* while a filter is active only affects the filtered tabs, keeping other dates safe.
4. **🪗 Auto-Collapse Other Groups (Accordion Mode):** Keeps only the active tab's group expanded (`collapsed: false`) while collapsing other groups in the window (`collapsed: true`).
5. **⏮️ Move Last Used Tab to Group Front on Leave:** Moves the previously active tab to the 1st slot of its group when you switch away from it (with a 180ms settle guard) — zero click-target shifting and instant recall when you return.
6. **🛡️ Live Toolbar Action Badge:** Per-tab (`tabId`) amber (`#f59e0b`) counter badge on the extension toolbar icon showing blocked auto-refresh attempts (`1+`), hidden when `0`.

---

<h2 id="tr-v2">🇹🇷 Sürüm 2.0.0 — Büyük Güncelleme: Sekme Kasası, Akıllı Sekme Koruması ve Oto-Yenileme Kalkanı!</h2>

**Yayın Tarihi:** Ekim 2026

AutoTab **v2.0.0**, eklentiyi yalnızca sekmeleri gruplayan bir arka plan aracından; tarayıcı belleğinizi (RAM) kurtaran, yarım kalan yazılarınızı koruyan ve kendi kendine sayfa yenileyen siteleri durduran **3'ü 1 arada eksiksiz bir tarayıcı komuta merkezine** dönüştürüyor! Üstelik tüm bu devasa yeniliklere rağmen sıfır harici kütüphane (`Pure JS`) geleneğimizi koruduk ve tüm paketi **< 40 KB** altında tuttuk.

### ✨ v2.0.0 İle Gelen 4 Büyük Yenilik

#### 1. 🗄️ Bulut Eşitlemeli Sekme Kasası (OneTab+ Deneyimi)
- **Tek Tıkla Bellek Boşaltma:** Açık sekmelerinizi (sabitlenmiş/pinli sekmelere dokunmadan) tek tıkla Sekme Kasasına kaydedip kapatarak tarayıcı RAM tüketimini anında düşürün.
- **Parçalı Bulut Eşitleme Motoru (`chrome.storage.sync`):** Chrome'un tek anahtar başına koyduğu 8 KB sınırını aşmak için özel bir *Chunking (Parçalama)* algoritması (`v_0..v_N`) geliştirildi. Harici bir üyelik veya sunucu olmadan, doğrudan tarayıcı profiliniz üzerinden yüzlerce sekmeyi tüm bilgisayarlarınız arasında otomatik eşitler (`chrome.storage.local` tam yedek korumasıyla birlikte).
- **Akıllı Grup Birleştirme (Smart Merge) & Tekilleştirme (Upsert):** Kasada örneğin `YouTube` grubunuz varken yeni sekmeleri kaydettiğinizde ayrı bir grup açmaz, mevcut grubunuza ekler. Aynı URL tekrar kaydedilirse kopya oluşturmaz; yalnızca kaydedilme tarihini güncelleyip listenin en üstüne taşır.
- **Sol Tık vs. Orta Tık (`Ctrl+Tık`) Özgürlüğü:** Kasadaki bir linke **Sol Tık** yaptığınızda sekmeyi açar ve kasadan siler. **Orta Tık (Tekerlek)** veya `Ctrl+Tık` yaptığınızda ise sekmeyi arka planda açar ve **kasada tutmaya devam eder**.
- **Grup İçi 4'lü Sıralama, Canlı Arama & JSON Yedekleme:** Grup içi linkleri *Yeniden Eskiye*, *Eskiden Yeniye*, *Alfabetik (A ➔ Z)* ve *Alfabetik (Z ➔ A)* olarak sıralayın; yanlışlıkla silmeleri önleyen grup silme onayı ve tek tıkla JSON dışa/içe aktarma ile verilerinizi güvenle yönetin.

#### 2. 🛡️ Akıllı Aktif Sekme Koruması (`< 120ms` Veri Kaybı Önleyici)
- Bir forumda, yapay zeka sohbetinde veya formda yazı yazarken unutup *"Sekmeleri Kasaya Kaydet & Kapat"* tuşuna bassanız bile **veri kaybetmezsiniz**!
- AutoTab v2.0, sekmeleri kapatmadan önce tüm sekmeleri paralel olarak (`< 120ms` zaman aşımı garantisiyle, hızı hiç düşürmeden) tarar:
  - İçinde kullanıcı tarafından yazılmış metin (`textarea`, `input`, `contenteditable`) bulunan sekmeleri,
  - Arka planda ses, müzik veya video oynatan (`audible` / aktif medya) sekmeleri anında tespit eder.
- **Yedekle ama Kapatma:** Bu aktif sekmelerin linkini yine de ne olur ne olmaz diye kasaya yedekler ancak **tarayıcıdaki sekmeyi kapatmadan açık bırakır** ve kasa ekranında *"🛡️ X sekme yedeklendi • Aktif kullanılan Y sekmenin kapanması önlendi"* bildirimiyle sizi bilgilendirir.

#### 3. 🚫 4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı (Anti-Refresh & Scroll Lock)
- Özellikle haber sitelerinde (örn. `ensonhaber.com` vb.) haber başlıklarını aşağı doğru okurken reklam gösterimini artırmak için sayfanın kendi kendine yenilenmesi ve en tepeye sıçraması sorununa köklü çözüm!
- Sayfanın ana çalışma katmanına (`MAIN` world) enjekte edilen 4 aşamalı kalkan:
  1. **Katman 1 (`Meta Refresh` İmhası):** `<meta http-equiv="refresh">` etiketlerini sayfa yüklenirken ve `MutationObserver` ile anında siler.
  2. **Katman 2 (`Visibility / Focus` Kalkanı):** Sekmeye geri döndüğünüzde sayfayı yenileyen `visibilitychange`, `focus` ve `pageshow` tuzaklarını filtreler.
  3. **Katman 3 (`Timer & Navigation API` Freni):** Son 1.6 saniye içinde kullanıcı tıklaması yokken çalışan `setTimeout`/`setInterval` tabanlı `location.reload`, `history.go(0)` ve Chromium `Navigation API` aynı sayfa yönlendirmelerini havada iptal eder.
  4. **Katman 4 (`Scroll Lock` Konum Kilidi):** Sayfadaki kaydırma konumunuzu (`window.scrollY`) anlık takip eder; sayfa çok agresif bir yöntemle yenilenmeye zorlansa bile açıldığı salisede sizi tam kaldığınız başlığa geri döndürür.
- **Canlı Gözlem Sayacı:** Bir yenileme girişimi engellendiğinde sol altta 2.5 saniyeliğine kendi kendine kaybolan şık bir bilgi rozeti gösterir ve eklenti menüsünde (**Popup**) o sekmede kaç yenileme girişiminin engellendiğini canlı olarak yazar.

#### 4. 🎉 Yenilenen Simetrik Arayüz ve "Neler Yeni?" Kutlama Penceresi
- Eklenti Popup menüsü ve Sekme Kasası üst barı tam simetrik ve ortalı mimariyle yeniden tasarlandı.
- Sürüm geçişlerinde ve üst bardaki **✨ Neler Yeni?** butonuyla açılan çift dilli (TR/EN) tanıtım penceresi eklendi.

---

<h2 id="en-v2">🇬🇧 Version 2.0.0 — Major Release: Tab Vault, Smart Active Tab Guard & Anti-Refresh Shield!</h2>

**Release Date:** October 2026

AutoTab **v2.0.0** transforms the extension from a zero-click background tab grouper into an **all-in-one browser command center** that reclaims RAM, protects unsaved text, and stops auto-refreshing websites from resetting your scroll position — all while staying under **40 KB** with zero external dependencies.

### ✨ 4 Major Additions in v2.0.0

1. **🗄️ Cloud-Synced Tab Vault (OneTab+ Experience):**
   - Stash open tabs into domain-organized groups with one click to free up browser memory while keeping pinned tabs untouched.
   - **Chunked Cloud Sync Engine (`chrome.storage.sync`):** Splits compressed vault data across `v_0..v_N` keys to bypass Chrome's 8 KB per-item limit, syncing hundreds of tabs across your computers automatically with a local `chrome.storage.local` fallback.
   - **Smart Domain Merge & Upsert Deduplication:** Merges newly stashed tabs into existing domain groups and updates timestamps on duplicate URLs instead of creating duplicate entries.
   - **Left-Click vs. Middle-Click (`Ctrl+Click`):** Left-click opens a tab and removes it from the vault; Middle-click (or `Ctrl+Click`) opens it in the background and keeps it in the vault.
   - **4-Mode Group Sorting, Confirmation Guard & JSON Backup:** Sort links inside groups (*Newest*, *Oldest*, *A ➔ Z*, *Z ➔ A*), filter instantly via live search, and export/import JSON backups.
2. **🛡️ Smart Active Tab Guard (`< 120ms` Unsaved Work Protection):**
   - Scans candidate tabs in parallel (`< 120ms` timeout) before closing them.
   - Automatically detects tabs containing unsaved user text in `<textarea>`, `<input>`, or `[contenteditable]` editors, as well as tabs playing audio/video.
   - Backs up their URLs to the Vault for safety, **but keeps those active tabs open** in your browser!
3. **🚫 4-Layer Anti-Refresh & Scroll Lock Shield:**
   - Prevents news portals from auto-reloading pages to inflate ad impressions and resetting your scroll position to the top.
   - Neutralizes `<meta http-equiv="refresh">`, `visibilitychange`/`focus` reload listeners, unattended `setTimeout`/`setInterval` reload timers, and non-user-initiated `Navigation API` reloads — plus locks and restores your exact `window.scrollY` position (`Scroll Lock`) and displays a live blocked counter in the popup.
4. **🎉 Redesigned Symmetrical UI & In-App "What's New" Modal:**
   - Streamlined 2-column Popup layout, dedicated full-width Anti-Refresh counter bar, single-line symmetrical Vault header, and an interactive **✨ What's New** celebration modal.

---

## 📦 Previous Releases / Önceki Sürümler

### v1.2.0 (October 2026)
- Added full bilingual interface (`TR` / `EN`) with automatic browser language detection and instant toggle switch in the popup.
- Added Chrome Web Store `_locales` internationalization (`tr` and `en`).

### v1.0.0 (October 2026)
- Initial public release of AutoTab (Manifest V3 Service Worker, 2+ tabs auto-grouping rule, instant single-tab auto-ungroup, pinned tab immunity, deterministic domain color hashing).
