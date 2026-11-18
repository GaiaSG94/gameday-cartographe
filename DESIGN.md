# DESIGN — Cartographe

> Journal de design. Versions datées, jamais écrasées. Livrables dans `G-DESIGN/`.

## LOCK — 2026-11-18

**Style verrouillé : Plâtre (V2.1).** Fin des explorations. Référence pour le build : `G-DESIGN/STYLE.md` + planches `G-DESIGN/planches/v2/02-platre.html` (Jeu), `04-post.html`, `05-carte-de-fin.html`, `06-series-classement.html`. Les autres planches (`v1/*`, `v2/01-atelier.html`, `v2/03-veilleuse.html`) restent archivées pour l'historique, hors référence.

Reste hors lock : l'état « erreur réseau » (à dessiner dans le même système) et les questions produit de `G-DESIGN/PAGES.md`.

## V2.1 — 2026-11-18 — style Plâtre validé, déclinaison

Statut : **style validé par Gaia** (« celui-ci » sur `02-platre.html`) ; **pages 1, 3, 4 validées par Gaia le 2026-11-18**. Toutes les pages ont leur planche validée : `/lock` possible.

Livré :
- `G-DESIGN/STYLE.md` — système Plâtre : palette (5 valeurs, noir = accent unique), lumière et relief (creux = à jouer, relief = posé), échelle typo, grille, composants et états, mouvement, accessibilité, copie.
- `planches/v2/04-post.html` — Post dans le feed (inline) : dalle vierge + 4 miniatures, « Unroll » ; états « déjà signée » et chargement.
- `planches/v2/05-carte-de-fin.html` — carte postale en plâtre signée, temps / série / prochaine carte (compte à rebours réel), commentaire prêt sans spoiler ; état perdu (notes barrées, case fautive cerclée).
- `planches/v2/06-series-classement.html` — série en très grand, 14 derniers jours en tuiles, « Today’s chart room ».

Décisions :
- L'action unique reste la bande noire verticale au bord (desktop) / la barre noire en bas (mobile) sur toutes les pages.
- Page 4 en **données de démo** (historique, compte, classement) : rien de cela n'est stocké aujourd'hui (PAGES.md, question 5).
- Aucune donnée inventée affichée comme réelle ailleurs : « % de réussite » volontairement absent.

Changelog :
- 2026-11-18 · V2.1 : STYLE.md, 3 planches de déclinaison, PAGES.md (statuts + questions 6 et 7).
- 2026-11-18 · V2.1 : Post, Carte de fin, Séries & classement validées ; les 4 pages sont validées.

## V2 — 2026-11-18 — repartir de zéro : 3D, matière, narration

Statut : **direction 02 Plâtre retenue** (01 Atelier et 03 Veilleuse écartées).

Retour de Gaia sur V1 : « aucune », repartir de zéro en s'appuyant sur les références design de l'usine (`hackatons-pipeline/REFERENCES-DESIGN.md`), côté narratif / jeu et 3D / matière. Le parchemin du brief est abandonné.

Livré (`G-DESIGN/planches/v2/`, V1 archivée intacte) :
- `01-atelier.html` — la carte devient une maquette de plâtre dans un atelier blanc à verrières ; miniatures corail ; titre en relief au mur ; griffonnages du cartographe sur la scène (Gapsy + Raben Rifaie). Accent : corail `#e4513b`.
- `02-platre.html` — un bas-relief de plâtre éclairé par la gauche, alvéoles creusées, miniatures blanches ; titre « Today’s—fragment » géant et serré, grain ; action unique noire verticale au bord droit (Flow Computing + Dominic Burt). Accent : noir.
- `03-veilleuse.html` — terrain de pierre de nuit ; chaque repère posé s'allume ; un horizon de lignes fines monte avec la progression jusqu'à l'aube de la carte signée (Noon + Igloo + Teko). Accent : ambre `#ff8a1f`.

Décisions :
- **Planches jouables** : même moteur pour les 3 (poser, remplacer, survol fantôme, clavier, statut des notes en direct, Ink the map, gagné / perdu / retour). Solution réelle du générateur pour le 2026-12-12.
- 3D en CSS pur (`preserve-3d`) + miniatures SVG ombrées (lumière à gauche) : zéro dépendance, zéro réseau. Piège noté : une animation d'`opacity` sur un ancêtre aplatit la 3D dans Chrome → l'intro n'anime que la position.
- Les textes de résultat reprennent ceux du code (« Map signed », « Territory lost », « Back to the map »), emoji retirés.

Changelog :
- 2026-11-18 · V2 : 3 nouvelles directions jouables ; REFS.md complété (section V2) ; PAGES.md mis à jour.

## V1 — 2026-11-18 — exploration de la page principale

Statut : **rejetée par Gaia le 2026-11-18** (aucune des 3 directions retenue).

Livré :
- `G-DESIGN/REFS.md` — PART Architects et Cosmos décodés (principes retenus / non retenus).
- `G-DESIGN/PAGES.md` — 4 pages proposées + 5 questions produit ouvertes.
- `G-DESIGN/planches/v1/01-cabinet.html` — direction du brief : parchemin, sépia, tampon rouge, serif ancienne + mono, rose des vents.
- `G-DESIGN/planches/v1/02-releve.html` — s'écarte du brief : feuille de relevé blanche, un seul trait vermillon, cartouche et coordonnées en marge (PART + Cosmos).
- `G-DESIGN/planches/v1/03-cyanotype.html` — s'écarte franchement : tirage cyanotype bleu de Prusse, trait blanc, accent ambre unique.

Données de démo : carte réelle du générateur pour le **2026-12-12** (4 indices, solution well r3c1 · mill r3c3 · tower r3c4 · lighthouse r4c4). État montré : 3 repères posés, le phare actif, chrono 01:42, série 6.

Décisions :
- Repères dessinés en pictogrammes SVG au trait (pas d'emoji, interdit §10 ; le code actuel en utilise et devra les remplacer).
- Les textes des indices sont ceux du code, pas ceux d'`IDEE.md` (voir question 1 de `PAGES.md`).

Changelog :
- 2026-11-18 · création du journal, V1 (3 directions).
