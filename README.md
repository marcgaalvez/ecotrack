# EcoTrack – Guia d'instal·lació i ús

## ✅ QUÈ JA TENS FET (el codi)

Tots els fitxers de l'aplicació Angular estan creats:
- `src/app/models/residu.model.ts`
- `src/app/services/residus.service.ts`
- `src/app/app.component.ts / .html / .css`
- `src/app/components/residu-list/` (tots els fitxers)
- `src/app/components/residu-form/` (tots els fitxers)
- `src/manifest.webmanifest`
- `src/styles.css`

---

## 🛠️ QUÈ HAS DE FER TU (passos per ordre)

### PAS 1 – Crear el projecte Angular (si no el tens)
```bash
ng new ecotrack --standalone --routing=false --style=css
cd ecotrack
```

### PAS 2 – Copiar els fitxers
Copia tots els fitxers d'aquesta carpeta al teu projecte Angular, respectant la mateixa estructura de carpetes.

**IMPORTANT:** Al fitxer `src/app/app.component.html`, la línia amb `| number` i `| date` requereix que `DecimalPipe` i `DatePipe` estiguin importats al component (ja ho estan al codi que t'he donat).

### PAS 3 – Instal·lar la PWA
```bash
ng add @angular/pwa
```
Quan pregunti, confirma. Això crearà `ngsw-config.json` i modificarà el `manifest.webmanifest`.
**Substitueix** el `manifest.webmanifest` generat pel que t'he donat (té els colors i el nom correctes).

### PAS 4 – Provar en local
```bash
ng serve
```
Obre http://localhost:4200

### PAS 5 – Compilar per a producció (per a la PWA i l'APK)
```bash
ng build
```
Genera la carpeta `dist/ecotrack/browser/`

### PAS 6 – Provar la PWA offline
```bash
npx http-server -p 8080 dist/ecotrack/browser
```
Obre Chrome a http://localhost:8080
Ves a F12 > Application > Service Workers → ha d'aparèixer actiu.

### PAS 7 – Publicar la PWA (tria una opció)

**Opció A – Vercel (recomanat, és el més ràpid):**
```bash
npm i -g vercel
vercel dist/ecotrack/browser
```

**Opció B – GitHub Pages:**
```bash
ng build --base-href "https://TU_USUARI.github.io/ecotrack/"
# Puja la carpeta dist/ecotrack/browser/ a la branca gh-pages
```

**Opció C – Firebase:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### PAS 8 – Generar l'APK (Capacitor)
```bash
# Instal·lar Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Inicialitzar (canvia 'elteunomapk' pel teu nom sense espais)
npx cap init EcoTrack com.elteunomapk.ecotrack --web-dir dist/ecotrack/browser

# Afegir Android
npx cap add android

# Sincronitzar
npx cap copy

# Obrir Android Studio
npx cap open android
```

### PAS 9 – Construir l'APK a Android Studio
1. Espera que Gradle sincronitzi (barra de progrés a baix)
2. Menú superior: **Build > Build Bundle(s) / APK(s) > Build APK(s)**
3. Quan finalitzi, clica "locate" al globus de text → trobaràs el fitxer `app-debug.apk`

---

## 📦 LLIURAMENT FINAL

- **PWA:** Enllaç públic (Vercel / GitHub Pages / Firebase)
- **APK:** Fitxer `app-debug.apk` generat per Android Studio

---

## ❓ ERRORS FREQÜENTS

**"Cannot find module..."** → Comprova que has copiat tots els fitxers a les carpetes correctes.

**"ng add @angular/pwa fails"** → Assegura't d'estar dins la carpeta del projecte Angular.

**El Service Worker no apareix** → Cal accedir amb `http-server`, NO amb `ng serve`.

**Android Studio no obre** → Has de tenir Android Studio instal·lat: https://developer.android.com/studio
