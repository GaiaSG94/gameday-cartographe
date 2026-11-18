# STYLE — Cartographe · « Plâtre »

> Style validé par Gaia le 2026-11-18 (planche `planches/v2/02-platre.html`). Refs : Flow Computing (relief blanc éclairé à gauche, action unique verticale) + Dominic Burt (crème granuleux, linéale serrée, long tiret). Voir `REFS.md`.

## Idée

Une seule matière : du **plâtre** éclairé par la gauche. Ce qui est à jouer est **creusé** (alvéoles), ce qui est posé est **en relief** (miniatures, jetons). Aucune couleur : le **noir** est l'accent, et il marque seulement deux choses : le repère actif et l'action unique de l'écran.

## Palette

| Rôle | Nom | Hex | Usage |
|------|-----|-----|-------|
| Fond | ground | `#ecebe6` | fond d'écran, sous un halo `#f8f7f3` en haut à gauche (source de lumière) |
| Matière haute | plaster | `#fbfaf7` | dalle, jetons, cartes en relief |
| Matière creuse | hollow | `#e9e6df` → `#f6f4ef` | alvéoles (dégradé 135°) |
| Ombre matière | shade | `#bdb8ad` | faces ombrées des miniatures, désactivé |
| Face sombre | shade-2 | `#9d978a` | face droite des miniatures |
| Texte secondaire | grey | `#77746d` | méta, notes ouvertes, numéros |
| Accent unique | ink | `#141414` | texte, repère actif, action unique, notes tenues |

Pas d'autre teinte. Pas de dégradé coloré. Le grain (bruit fractal, 13 %, `multiply`) couvre tout l'écran.

## Lumière et relief

- Lumière **en haut à gauche**, toujours. Ombre portée vers la droite et vers le bas.
- **Relief** (posé, cliquable) : `box-shadow: -5px -5px 12px rgba(255,255,255,.9), 7px 8px 16px rgba(70,62,50,.14)`.
- **Creux** (à remplir, déjà fait) : `box-shadow: inset 5px 6px 10px rgba(70,62,50,.16), inset -5px -6px 10px #fff`.
- **Dalle** : rayon 26 px, ombre longue `22px 30px 50px -10px rgba(70,62,50,.2)`, inclinée `rotateX(34deg)` en perspective 900 px.
- Miniatures SVG : face gauche `#ffffff`, face droite `#9d978a`, détails `#cfcabf`, fenêtres/lanterne `#141414`. Ombre de contact elliptique décalée à droite.

## Typographie

Familles système uniquement (à embarquer dans l'app, CSP) : linéale `"Helvetica Neue", "Nimbus Sans", Arial` · mono `"DejaVu Sans Mono", Menlo`.

| Niveau | Desktop | Mobile | Réglages |
|--------|---------|--------|----------|
| Display (titre d'écran, résultat) | 64 px | 40 px | 500, approche −0.055em, interligne 0.9 |
| Chiffre héros (série) | 120 px | 84 px | 500, −0.06em |
| Corps (notes, phrases) | 15–16 px | 13–14 px | 400, interligne 1.35 ; noms de repères en 700 |
| Méta (date, chrono, série) | 11 px | 10 px | mono 500, +0.04em |
| Libellé / statut | 9–11 px | 9–10 px | mono 600, capitales, +0.12em |

Le **long tiret « — »** est le signe de la marque : il coupe les titres (« Today’s—fragment », « Map—signed ») et suit les numéros de notes (« 1— »).

## Grille et espacements

- Écran de jeu desktop : 756 × 592 dans le post ; marge 28–34 px ; colonne gauche 270 px (texte, réserve, notes), scène à droite.
- Mobile 390 × 616 : marge 18 px, une colonne, l'action en barre pleine largeur en bas (52 px).
- Pas de 4 : 8 · 12 · 14 · 18 · 24 · 34. Rayons : dalle 26 · alvéole 14 · jeton 16 (13 mobile) · pilule 999.

## Composants

| Composant | Description | États |
|-----------|-------------|-------|
| **Dalle + alvéoles** | grille 4×4 en plâtre, coordonnées mono `#b9b4aa` dans les coins | vide (creux) · survol/fantôme (creux + liseré noir 1.5 px + miniature à 42 %) · occupé (relief) |
| **Miniature** | lighthouse, mill, well, tower ; SVG ombré, debout sur la case | posée (chute 420 ms) · fantôme |
| **Jeton de réserve** | miniature + nom + coordonnée mono | défaut (relief) · actif (plein noir, texte blanc) · posé (creux, miniature à 55 %) |
| **Note** | `n—` + phrase + statut mono à droite | `open` gris · `holds` noir avec point · `broken` barrée |
| **Action unique** | desktop : bande noire verticale collée au bord droit (64 px), texte vertical ; mobile : barre noire pleine largeur en bas | désactivée `#bdb9b0` · active noire |
| **Méta** | ligne mono : date · chrono · série · compteur | — |
| **Carte en relief** | panneau plâtre (rayon 18, ombre relief) pour carte postale, stats, classement | — |

Une seule action pleine par écran. Le reste est en texte ou en relief neutre.

## Mouvement

- Intro : les cases tombent dans la dalle en diagonale (700 ms, `cubic-bezier(.2,.9,.3,1)`, 70 ms de décalage par diagonale), puis les notes montent (500 ms, 90 ms de décalage).
- Pose : la miniature tombe de 48 px et rebondit (420 ms, `cubic-bezier(.3,1.5,.5,1)`).
- Résultat : le titre apparaît après la dernière miniature posée (fondu 300 ms).
- **Interdit** : animer `opacity` sur un ancêtre de la scène 3D (Chrome aplatit la 3D).
- `prefers-reduced-motion` coupe toutes les animations.

## Accessibilité

- Contraste du texte ≥ AA (noir sur crème). Le gris `#77746d` réservé au secondaire ≥ 11 px.
- Un statut n'est jamais porté par la seule teinte : mot (`holds` / `open` / `broken`) + glyphe (point, barré).
- Chaque case est un bouton (`role=button`, Tab, Entrée), avec un libellé « row r, column c ».

## Copie

UI en anglais. Textes du code conservés : « Ink the map », « Map signed », « Territory lost », « Back to the map », « Unroll ». Aucun emoji.
