<div align="center">

## 📬 Kontaktformular jetzt öffnen

[![Jetzt Nachricht senden](https://img.shields.io/badge/✉%20Jetzt%20Nachricht%20senden-1a56db?style=for-the-badge&logoColor=white)](https://gambler12345.github.io/contact)

**[➜ Direkt zum Formular](https://gambler12345.github.io/contact)**

_Kein Account · Keine Hürden · DSGVO-konform_

<br/>

[🔒 Datenschutzerklärung](https://gambler12345.github.io/contact/privacy) &nbsp;·&nbsp; [🍪 Cookie-Richtlinie](https://gambler12345.github.io/contact/cookies)

</div>

---

<div align="center">

# ✉ Contact UI

**DSGVO-konformes Kontaktformular — vollständig interaktiv, barrierefrei und EU-compliant**

[![Live-Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://gambler12345.github.io/contact)
[![DSGVO](https://img.shields.io/badge/DSGVO-konform-green?style=for-the-badge)](https://gambler12345.github.io/contact/privacy)
[![AI Act](https://img.shields.io/badge/EU%20AI%20Act%202024%2F1689-konform-green?style=for-the-badge)](https://gambler12345.github.io/contact)
[![Lizenz: MIT](https://img.shields.io/badge/Lizenz-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## 🚀 Kontakt aufnehmen

> **Direkter Weg:** Besuche die Live-Seite und fülle das Formular aus — kein Account, keine Hürden.

<div align="center">

| Kanal | Link |
|---|---|
| 📝 **Kontaktformular** | [gambler12345.github.io/contact](https://gambler12345.github.io/contact) |
| 📧 **E-Mail** | [example@example.com](mailto:example@example.com) |
| 🐛 **GitHub Issue erstellen** | [Neue Anfrage öffnen](https://github.com/gambler12345/contact/issues/new/choose) |
| 🔒 **Datenschutzerklärung** | [gambler12345.github.io/contact/privacy](https://gambler12345.github.io/contact/privacy) |
| 🍪 **Cookie-Richtlinie** | [gambler12345.github.io/contact/cookies](https://gambler12345.github.io/contact/cookies) |

</div>

---

## 📋 Formular-Übersicht — Schritt für Schritt

Das Kontaktformular führt durch **3 Abschnitte** mit Echtzeit-Validierung:

### Schritt 1 — Kontaktdaten

| Feld | Typ | Pflicht | Hinweis |
|---|---|:---:|---|
| Vorname | Text | ✅ | max. 100 Zeichen, Autocomplete |
| Nachname | Text | ✅ | max. 100 Zeichen, Autocomplete |
| E-Mail-Adresse | E-Mail | ✅ | RFC-5321-Validierung, max. 254 Zeichen — wird nur zur Beantwortung genutzt |
| Telefon | Tel | ❌ | Optional — nur wenn telefonischer Rückruf gewünscht |

### Schritt 2 — Ihre Anfrage

| Feld | Typ | Pflicht | Optionen |
|---|---|:---:|---|
| Betreff | Auswahl | ✅ | Allgemeine Anfrage · Technischer Support · Datenschutzanfrage (DSGVO) · Löschantrag (Art. 17) · Auskunftsanfrage (Art. 15) · Sonstiges |
| Nachricht | Textarea | ✅ | max. 2000 Zeichen — Live-Zeichenzähler |

### Schritt 3 — Einwilligungen

| Feld | Typ | Pflicht | Beschreibung |
|---|---|:---:|---|
| DSGVO-Einwilligung | Checkbox | ✅ | Einwilligung gem. Art. 6 Abs. 1 lit. a DSGVO, jederzeit widerrufbar |
| KI-Verordnungs-Hinweis | Checkbox | ❌ | Kenntnisnahme der automatisierten Spam-Erkennung (EU AI Act Art. 13) |

---

## ⚡ Interaktive Features

### Formular-Interaktion

- **Echtzeit-Validierung** — Felder werden beim Verlassen (`blur`) sofort geprüft; Fehler werden unterhalb des Feldes angezeigt und beim erneuten Tippen automatisch ausgeblendet
- **Fortschrittsanzeige** — 3-stufiger visueller Fortschrittsbalken zeigt den Ausfüllstatus
- **Zeichenzähler** — Live-Counter im Nachrichtenfeld (`0 / 2000`), wechselt die Farbe bei Annäherung an das Limit
- **Sende-Button mit Spinner** — Ladezustand während der Übertragung, verhindert Doppels-Absenden
- **Erfolgs-/Fehlermeldung** — ARIA-Live-Regionen benachrichtigen Screenreader sofort; Seite scrollt automatisch zur Meldung
- **Fokus-Management** — Bei Validierungsfehler springt der Fokus zum ersten fehlerhaften Feld

### Cookie-Consent-Banner (DSGVO Art. 7 / ePrivacy)

Das Banner erscheint beim ersten Besuch als modaler Dialog und bietet granulare Kontrolle:

| Kategorie | Standard | Beschreibung |
|---|:---:|---|
| 🔒 Notwendig | immer aktiv | Session-Verwaltung, Sicherheit |
| ⚙️ Funktional | aus | Spracheinstellungen, gespeicherte Formulardaten |
| 📊 Analyse | aus | Anonyme Nutzungsstatistiken |
| 📣 Marketing | aus | Personalisierte Inhalte (derzeit nicht aktiv) |

**Buttons:**
- **Alle akzeptieren** — aktiviert alle Kategorien und schließt das Banner
- **Auswahl speichern** — speichert die individuell getroffenen Checkbox-Einstellungen
- **Nur notwendige** — lehnt alle nicht-essenziellen Cookies ab

Einstellungen werden in `localStorage` gespeichert und können jederzeit über den Footer-Link **„Cookie-Einstellungen"** geändert werden.

### Barrierefreiheit (WCAG 2.1 AA)

- Skip-Link „Zum Hauptinhalt springen" für Tastatur-Navigation
- Alle Formularfelder mit `aria-required`, `aria-describedby`, `aria-live` / `role="alert"` ausgezeichnet
- Cookie-Banner als `role="dialog"`, `aria-modal="true"`, Fokus-Trap beim Öffnen
- ARIA-Live-Region meldet Statusänderungen (Absenden, Cookie-Auswahl) an Screenreader
- Vollständig per Tastatur bedienbar

---

## 🛡 Compliance

| Standard | Status | Details |
|---|:---:|---|
| DSGVO (EU 2016/679) | ✅ | Einwilligung Art. 6 I lit. a, Aufbewahrung max. 90 Tage, nur EU/EWR-Übermittlung |
| EU AI Act (2024/1689) | ✅ | Transparenzhinweis Art. 13, Minimal-Risiko-KI, kein vollautomatisierter Entscheid |
| ePrivacy-Richtlinie | ✅ | Granulares Cookie-Consent, Opt-in vor Setzen nicht-notwendiger Cookies |
| TLS-Verschlüsselung | ✅ | Alle Übertragungen HTTPS-verschlüsselt |
| WCAG 2.1 AA | ✅ | Tastatur-Navigation, Screenreader-Support, Farbkontraste |

### DSGVO-Betroffenenrechte (Art. 15–21)

Über das Formular können folgende Rechte direkt geltend gemacht werden (Betreff: *„Datenschutzanfrage"*):

| Recht | Artikel |
|---|---|
| 📋 Auskunftsrecht | Art. 15 |
| ✏️ Recht auf Berichtigung | Art. 16 |
| 🗑️ Recht auf Löschung | Art. 17 |
| ⏸️ Recht auf Einschränkung | Art. 18 |
| 📦 Datenübertragbarkeit | Art. 20 |
| 🚫 Widerspruchsrecht | Art. 21 |

---

## 🏗 Dateistruktur

```
contact/
├── index.html          # Kontaktformular (Hauptseite)
├── README.md
├── LICENSE             # MIT
├── assets/
│   ├── style.css       # Design-System (CSS-Variablen)
│   └── script.js       # Cookie-Consent-Manager + Formular-Handler
├── pages/
│   ├── privacy.html    # Datenschutzerklärung
│   └── cookies.html    # Cookie-Richtlinie
└── .github/
	├── CODE_OF_CONDUCT.md / CODE_OF_CONDUCT.de.md
	├── CONTRIBUTING.md / CONTRIBUTING.de.md
	├── SECURITY.md / SECURITY.de.md
	├── SUPPORT.md / SUPPORT.de.md
	└── ISSUE_TEMPLATE/
```

---

## 🔧 Lokal ausführen

```bash
git clone https://github.com/gambler12345/contact.git
cd contact
# Beliebigen HTTP-Server starten, z. B.:
npx serve .
# oder:
python -m http.server 8080
```

Dann im Browser öffnen: `http://localhost:8080`

> **Formular-Endpunkt konfigurieren:** Trage im `data-endpoint`-Attribut des `<form>`-Elements in `index.html` die URL deines Backend-Endpunkts ein (z. B. einen [Formspree](https://formspree.io)-Endpunkt oder eine eigene API). Das Formular sendet die Daten dann als echten `fetch`-Request an diesen Endpunkt.

---

## 📜 Lizenz

[MIT License](LICENSE) — © 2025 Muster GmbH

---

<div align="center">

**Fragen, Fehler oder Verbesserungsvorschläge?**

[![Issue erstellen](https://img.shields.io/badge/Issue%20erstellen-GitHub-black?style=for-the-badge&logo=github)](https://github.com/gambler12345/contact/issues/new/choose)
[![Live-Demo öffnen](https://img.shields.io/badge/Live%20Demo%20öffnen-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://gambler12345.github.io/contact)

</div>

