# Privacy Policy for AutoTab (v2.0)

**Last Updated:** October 20, 2026

AutoTab is an open-source, client-side browser extension designed to automatically organize browser tabs by domain, stash tabs into a personal Tab Vault, and block intrusive page auto-refreshes. Your privacy is paramount: **AutoTab does not collect, transmit to external servers, or monetize any personal data.**

---

## 1. Permissions and How They Are Used

AutoTab operates strictly within your browser using the following permissions:

* **`tabs` and `tabGroups` Permissions:**
  * **What is accessed:** Reads the URLs, titles, pinned status, and audible status of open tabs in your browser window solely to parse root domain names (e.g., `github.com`, `google.com`) and manage tab groups or stashed vault items.
  * **How it is used:** Groups matching tabs together (when 2+ tabs share a domain), dissolves single-tab groups, and saves open tabs into your Tab Vault when you click "Save & Close Tabs to Vault".

* **`storage` Permission (`chrome.storage.local` & `chrome.storage.sync`):**
  * **What is accessed:** Extension settings, your saved Tab Vault links, and your list of Anti-Refresh protected domains.
  * **How it is used:** Stores your preferences locally (`chrome.storage.local`) and synchronizes your Tab Vault and protected domain list across your own devices via your browser's built-in encrypted profile sync (`chrome.storage.sync`).
  * **Storage:** Data never touches any third-party or developer-owned server; it remains strictly inside your local browser and your own Chrome Sync account.

* **`scripting` and Host Permissions (`http://*/*`, `https://*/*`):**
  * **What is accessed:** Executed strictly locally on active tabs for two user-protective features:
    1. **Smart Active Tab Guard:** When you click "Save & Close Tabs to Vault", AutoTab checks whether a tab contains unsaved text in form fields (`<textarea>`, `<input>`, `[contenteditable]`) or active media playback (`<video>`, `<audio>`) so it can skip closing that tab and prevent data loss. It never reads, copies, or stores the content of what you typed.
    2. **Anti-Refresh & Scroll Lock Shield:** Only on domains where you explicitly enable the "Block Auto-Refresh" toggle, AutoTab injects a local guard to block unattended page reload timers and preserve your scroll position (`sessionStorage`).

---

## 2. No Data Collection, Tracking, or Analytics

* **No Telemetry / Analytics:** AutoTab does not include Google Analytics, Sentry, Mixpanel, or any tracking scripts.
* **No External Servers:** The extension has no backend servers, databases, or external APIs. It makes zero outbound network requests.
* **No Third-Party Sharing:** Since no data is collected by the developer, no data is ever sold, leased, or shared with third parties or advertisers.

---

## 3. Open Source Verification & Contact

AutoTab is 100% open source under the MIT License:
* **GitHub Repository:** [https://github.com/SyK112/autotab](https://github.com/SyK112/autotab)
* **GitHub Issues:** [https://github.com/SyK112/autotab/issues](https://github.com/SyK112/autotab/issues)
* **Author:** Süleyman YK

---

<br/>

# 🇹🇷 Gizlilik Politikası (AutoTab v2.0)

**Son Güncelleme:** 20 Ekim 2026

AutoTab; sekmeleri alan adına göre otomatik gruplamak, açık sekmeleri Sekme Kasasında (Tab Vault) yedeklemek ve kendi kendine yenilenen sayfaları engellemek için geliştirilmiş açık kaynaklı ve tamamen istemci taraflı (client-side) bir tarayıcı eklentisidir. Gizliliğiniz bizim için esastır: **AutoTab hiçbir kişisel veriyi geliştirici sunucularına toplamaz, dışarıya iletmez veya ticarileştirmez.**

---

## 1. İzinler ve Kullanım Amaçları

AutoTab yalnızca tarayıcınızın kendi yerel ortamında aşağıdaki izinlerle çalışır:

* **`tabs` ve `tabGroups` İzinleri:**
  * **Neye erişilir:** Açık sekmelerin kök alan adlarını (`github.com`, `google.com` vb.), başlıklarını, sabitlenme (pin) ve ses çalma (`audible`) durumlarını okur.
  * **Nasıl kullanılır:** Aynı alan adına sahip sekmeleri gruplamak, tek sekme kaldığında grubu çözmek ve "Sekmeleri Kasaya Kaydet & Kapat" butonuna bastığınızda sekmelerinizi kasaya aktarmak için kullanılır.

* **`storage` İzni (`chrome.storage.local` ve `chrome.storage.sync`):**
  * **Neye erişilir:** Eklenti tercihleri, Sekme Kasasına kaydettiğiniz linkler ve Oto-Yenileme Kalkanına eklediğiniz alan adları.
  * **Nasıl kullanılır:** Ayarlarınızı ve kasa verilerinizi yerel cihazınızda (`chrome.storage.local`) ve tarayıcınızın kendi şifreli profil eşitleme altyapısında (`chrome.storage.sync`) saklar. Hiçbir harici sunucuya gönderilmez.

* **`scripting` ve Site İzinleri (`http://*/*`, `https://*/*`):**
  * **Nasıl kullanılır:** Tamamen yerel olarak yalnızca şu iki koruma işlevi için kullanılır:
    1. **Akıllı Aktif Sekme Koruması:** Sekmeleri kasaya kaldırırken sayfada yarım kalan bir metin/form girişi (`textarea`, `input`, `contenteditable`) veya oynatılan bir video/ses olup olmadığını kontrol eder; böylece üzerinde çalıştığınız sekmeyi kapatmadan açık bırakır. Yazdığınız metinlerin içeriği kesinlikle okunmaz, kaydedilmez veya bir yere aktarılmaz.
    2. **Oto-Yenileme & Başa Dönme Kalkanı:** Yalnızca sizin açıkça koruma şalterini açtığınız sitelerde otomatik sayfa yenileme sayaçlarını durdurur ve kaydırma konumunuzu (`sessionStorage`) korur.

---

## 2. Veri Toplama, İzleme ve Analitik Yoktur

* **Analitik / İzleyici Kod İçermez:** AutoTab içinde Google Analytics, telemetri veya herhangi bir kullanıcı takip kodu yer almaz.
* **Harici Sunucu Yoktur:** Eklentinin bir arka plan sunucusu, veritabanı veya API bağlantısı yoktur; internete hiçbir veri transferi yapmaz.

---

## 3. Açık Kaynak Güvencesi ve İletişim

AutoTab, MIT Lisansı ile tamamen açık kaynaklı olarak sunulmaktadır:
* **GitHub Deposu:** [https://github.com/SyK112/autotab](https://github.com/SyK112/autotab)
* **Geliştirici:** Süleyman YK
