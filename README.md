# NaBi — Film Planner

Template de plan scénario avec synchronisation Google Docs.

---

## Structure du projet

```
screenplay-planner/
├── index.html        ← L'application principale
├── api/
│   └── auth.js       ← Proxy Vercel pour l'auth Google
├── vercel.json       ← Config Vercel
└── README.md
```

---

## Étape 1 — Créer le repo GitHub

1. Va sur https://github.com/new
2. Nom du repo : `screenplay-planner` (ou ce que tu veux)
3. Visibilité : **Public** (requis pour GitHub Pages)
4. Clique **Create repository**

Puis dans ton terminal :

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/screenplay-planner.git
git push -u origin main
```

---

## Étape 2 — Activer GitHub Pages

1. Dans ton repo GitHub → **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : `main` / `/ (root)`
4. Clique **Save**
5. Ton app sera disponible à : `https://TON_USERNAME.github.io/screenplay-planner/`

---

## Étape 3 — Créer un projet Google Cloud (pour la synchro Docs)

1. Va sur https://console.cloud.google.com/
2. Crée un nouveau projet : **New Project** → nom `screenplay-planner`
3. Dans le menu latéral → **APIs & Services** → **Library**
4. Cherche et active :
   - **Google Docs API**
   - **Google Drive API**
5. Va dans **APIs & Services** → **Credentials**
6. Clique **Create Credentials** → **OAuth 2.0 Client IDs**
7. Application type : **Web application**
8. Authorized JavaScript origins : `https://TON_USERNAME.github.io`
9. Authorized redirect URIs : `https://TON_APP.vercel.app/api/callback`
10. Copie le **Client ID** — tu en auras besoin à l'étape suivante

---

## Étape 4 — Déployer le backend sur Vercel

1. Va sur https://vercel.com → connecte-toi avec GitHub
2. **Add New Project** → importe `screenplay-planner`
3. Dans **Environment Variables**, ajoute :
   - `GOOGLE_CLIENT_ID` = ton Client ID Google (étape 3)
   - `REDIRECT_URI` = `https://TON_APP.vercel.app/api/callback`
4. Clique **Deploy**
5. Copie l'URL Vercel (ex. `https://screenplay-planner-xyz.vercel.app`)

---

## Étape 5 — Connecter le front au backend Vercel

Dans `index.html`, repère cette ligne dans le script :

```javascript
const base = window.VERCEL_URL || '/api';
```

Remplace par ton URL Vercel :

```javascript
const base = 'https://screenplay-planner-xyz.vercel.app/api';
```

Puis commit et push :

```bash
git add index.html
git commit -m "connect to vercel backend"
git push
```

---

## Utilisation

- L'app tourne sur GitHub Pages : `https://TON_USERNAME.github.io/screenplay-planner/`
- Clique **Connecter Google** pour autoriser l'accès à tes Docs
- **↕ Sync Docs** → exporter vers un nouveau Doc ou importer depuis une URL
- Les données sont sauvegardées automatiquement en local (localStorage)

---

## Notes

- Le token Google est stocké en mémoire uniquement (pas de localStorage pour les tokens)
- L'export crée un nouveau Google Doc à chaque fois
- L'import lit le texte du Doc et remplit les champs correspondants
- Le `.txt` local est toujours disponible sans connexion Google
