# 🚀 AutoTab — Neler Yeni? / What's New (Changelog)

<p align="center">
  <a href="#tr-v2"><strong>🇹🇷 Türkçe Sürüm Notları (v2.0.0)</strong></a> •
  <a href="#en-v2"><strong>🇬🇧 English Release Notes (v2.0.0)</strong></a>
</p>

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
- Sürüm geçişlerinde ve üst bardaki **✨ v2.0 Neler Yeni?** butonuyla açılan çift dilli (TR/EN) tanıtım penceresi eklendi.

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
   - Streamlined 2-column Popup layout, dedicated full-width Anti-Refresh counter bar, single-line symmetrical Vault header, and an interactive **✨ What's New in v2.0** celebration modal.

---

## 📦 Previous Releases / Önceki Sürümler

### v1.2.0 (October 2026)
- Added full bilingual interface (`TR` / `EN`) with automatic browser language detection and instant toggle switch in the popup.
- Added Chrome Web Store `_locales` internationalization (`tr` and `en`).

### v1.0.0 (October 2026)
- Initial public release of AutoTab (Manifest V3 Service Worker, 2+ tabs auto-grouping rule, instant single-tab auto-ungroup, pinned tab immunity, deterministic domain color hashing).
