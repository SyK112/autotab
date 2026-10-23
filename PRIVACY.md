---
layout: default
title: Gizlilik Politikası
permalink: /privacy
---
# Privacy Policy for AutoTab (v2.1)

**Last Updated:** October 23, 2026

AutoTab is an open-source, client-side browser extension designed to automatically organize browser tabs by domain, stash tabs into a personal Tab Vault, and block intrusive page auto-refreshes. Your privacy is paramount: **AutoTab does not collect, transmit to developer-owned servers, or monetize any personal data.**

---

## 1. Permissions and How They Are Used

AutoTab operates strictly within your browser using the following permissions:

* **`tabs` and `tabGroups` Permissions:**
  * **What is accessed:** Reads the URLs, titles, pinned status, and audible status of open tabs in your browser window solely to parse root domain names (e.g., `github.com`, `google.com`) and manage tab groups or stashed vault items.
  * **How it is used:** Groups matching tabs together (when 2+ tabs share a domain), dissolves single-tab groups, auto-collapses inactive groups (Accordion Mode), moves the last-used tab to the front of its group on leave, and saves open tabs into your Tab Vault when you click "Save & Close Tabs to Vault".

* **`storage` Permission (`chrome.storage.local` & `chrome.storage.sync`):**
  * **What is accessed:** Extension settings, your saved Tab Vault links, and your list of Anti-Refresh protected domains.
  * **How it is used:** Stores your preferences locally (`chrome.storage.local`) and synchronizes your Tab Vault and protected domain list across your own devices via your browser's built-in encrypted profile sync (`chrome.storage.sync`).
  * **Storage:** Data never touches any third-party or developer-owned server; it remains strictly inside your local browser and your own browser sync account.

* **Optional `identity` Permission (`optional_permissions: ["identity"]`) & Google Drive API (`drive.file`):**
  * **When it is requested:** Requested **only** if you explicitly click "Connect & Sync with Google Drive" inside the Tab Vault dashboard.
  * **What is accessed:** Uses `chrome.identity.launchWebAuthFlow` with the narrow, non-sensitive `https://www.googleapis.com/auth/drive.file` scope. AutoTab can **only** access the single `autotab-vault-v2.json` backup file that it creates inside your Google Drive. It cannot view, list, read, or modify any of your other Google Drive files or folders.
  * **Google API Services User Data Policy (Limited Use Compliance):** AutoTab's use and transfer of information received from Google APIs adheres to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy), including the Limited Use requirements. Your Google Drive backup file is transmitted directly between your browser and Google's official Drive API (`googleapis.com`) over HTTPS and is never routed through or stored on any external server.

* **`scripting` and Host Permissions (`http://*/*`, `https://*/*`):**
  * **What is accessed:** Executed strictly locally on active tabs for two user-protective features:
    1. **Smart Active Tab Guard:** When you click "Save & Close Tabs to Vault", AutoTab checks whether a tab contains unsaved text in form fields (`<textarea>`, `<input>`, `[contenteditable]`) or active media playback (`<video>`, `<audio>`) so it can skip closing that tab and prevent data loss. It never reads, copies, or stores the content of what you typed.
    2. **Anti-Refresh & Scroll Lock Shield:** Only on domains where you explicitly enable the "Block Auto-Refresh" toggle, AutoTab injects a local guard to block unattended page reload timers and preserve your scroll position (`sessionStorage`).

---

## 2. No Data Collection, Tracking, or Analytics

* **No Telemetry / Analytics:** AutoTab does not include Google Analytics, Sentry, Mixpanel, or any tracking scripts.
* **No Developer Servers:** The extension has no developer-owned backend servers or databases.
* **No Third-Party Sharing:** No user data is ever sold, leased, or shared with third parties, advertisers, or AI training pipelines.

---

## 3. Open Source Verification & Contact

AutoTab is 100% open source under the MIT License:
* **GitHub Repository:** [https://github.com/SyK112/autotab](https://github.com/SyK112/autotab)
* **GitHub Issues:** [https://github.com/SyK112/autotab/issues](https://github.com/SyK112/autotab/issues)
* **Author:** Süleyman YK (`syk112@gmail.com`)

---

<br/>

# 🇹🇷 Gizlilik Politikası (AutoTab v2.1)

**Son Güncelleme:** 23 Ekim 2026

AutoTab; sekmeleri alan adına göre otomatik gruplamak, açık sekmeleri Sekme Kasasında (Tab Vault) yedeklemek ve kendi kendine yenilenen sayfaları engellemek için geliştirilmiş açık kaynaklı ve tamamen istemci taraflı (client-side) bir tarayıcı eklentisidir. Gizliliğiniz bizim için esastır: **AutoTab hiçbir kişisel veriyi geliştirici sunucularına toplamaz, dışarıya iletmez veya ticarileştirmez.**

---

## 1. İzinler ve Kullanım Amaçları

* **`tabs` ve `tabGroups` İzinleri:**
  * Açık sekmelerin kök alan adlarını (`github.com`, `google.com` vb.), başlıklarını, sabitlenme (pin) ve ses çalma (`audible`) durumlarını yalnızca sekmeleri gruplamak, Akordeon Modu ile pasif grupları daraltmak, ayrılırken son kullanılan sekmeyi grubun başına taşımak ve Sekme Kasasına aktarmak için okur.

* **`storage` İzni (`chrome.storage.local` ve `chrome.storage.sync`):**
  * Ayarlarınızı ve kasa verilerinizi yerel cihazınızda (`chrome.storage.local`) ve tarayıcınızın kendi şifreli profil eşitleme altyapısında (`chrome.storage.sync`) saklar.

* **Opsiyonel `identity` İzni ve Google Drive Eşitlemesi (`drive.file`):**
  * Yalnızca Sekme Kasası ekranında "Google Drive ile Bağlan & Eşitle" butonuna tıkladığınızda istenir.
  * Dar kapsamlı `https://www.googleapis.com/auth/drive.file` izniyle yalnızca eklentinin kendi oluşturduğu `autotab-vault-v2.json` yedek dosyasına erişir; Google Drive'ınızdaki diğer hiçbir dosyayı göremez veya okuyamaz.
  * Veri aktarımı doğrudan tarayıcınız ile Google'ın resmi sunucuları (`googleapis.com`) arasında gerçekleşir; geliştiriciye ait hiçbir sunucudan geçmez.

* **`scripting` ve Site İzinleri (`http://*/*`, `https://*/*`):**
  * Tamamen yerel olarak yalnızca **Akıllı Aktif Sekme Koruması** (yarım kalan form yazısı ve medya kontrolü) ile **4 Katmanlı Oto-Yenileme & Başa Dönme Kalkanı** için kullanılır.

---

## 2. Açık Kaynak Güvencesi ve İletişim

AutoTab, MIT Lisansı ile tamamen açık kaynaklı olarak sunulmaktadır:
* **GitHub Deposu:** [https://github.com/SyK112/autotab](https://github.com/SyK112/autotab)
* **Geliştirici:** Süleyman YK (`syk112@gmail.com`)
