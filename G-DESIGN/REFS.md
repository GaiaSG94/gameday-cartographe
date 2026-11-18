# REFS — Cartographe

> On prend des **principes**, jamais un layout, un texte, un asset ou une marque.

## V2 (2026-11-18) — base fixe de l'usine (`hackatons-pipeline/REFERENCES-DESIGN.md`)

Demande de Gaia : repartir de zéro en s'appuyant sur les refs « narratif / jeu » et « 3D / matière » de la base. Fiches webdesign-inspiration ouvertes le 2026-11-18 (capture du premier écran ; cookies non essentiels refusés).

| Ref | Observé | Retenu pour Cartographe | Planche |
|-----|---------|-------------------------|---------|
| **Gapsy Studio** | Salle blanche, verrières qui projettent des puits de lumière ; accroche en lettres corail **en relief** fixées au mur, ombre portée douce ; griffonnages noirs à main levée (bulle, flèche) par-dessus la scène 3D ; parquet clair | Le mot-titre en relief au mur ; les annotations du cartographe griffonnées *sur* la maquette (cercle sur la case visée, coche sur la note tenue, flèche vers la réserve) | 01 Atelier |
| **Raben Rifaie** | Pièce couleur sable, grande ouverture profonde sur un **paysage miniature** (arbre, pierres, eau) baigné de lumière douce ; titre en serif italique mêlée à une linéale | La carte du jour comme **paysage miniature** posé dans une pièce : on regarde un petit monde, pas une grille | 01 Atelier |
| **Flow Computing** | Un seul relief blanc et doux, **éclairé par la gauche, ombré à droite**, un filet vertical fin ; l'unique action est un onglet noir **vertical** collé au bord droit | La grille comme **bas-relief de plâtre** éclairé à gauche ; une seule action, noire, verticale au bord | 02 Plâtre |
| **Dominic Burt** | Fond crème, forme granuleuse floue derrière le titre ; très grande linéale serrée sur 3 lignes ; le **long tiret** comme signe (D—B) | Grain, titre « Today’s—fragment » très grand et serré, le tiret qui revient sur les numéros des notes | 02 Plâtre |
| **Noon** | Fond noir, titre fin centré, **horizon de lignes fines** orange/jaune qui ondule en bas de page ; accent orange unique | L'horizon de lignes fines qui **monte avec la progression** (aube = carte signée) ; ambre unique | 03 Veilleuse |
| **Igloo** | Paysage rocheux gris-bleu réaliste, un **objet unique lumineux** de l'intérieur au centre, UI réduite à de petits textes dans les coins | Terrain de pierre sombre, chaque repère posé **s'allume** et éclaire sa case | 03 Veilleuse |
| **Teko** (fiche) | Courbe d'accent qui monte du bas comme un horizon, **un seul mot** repris dans l'accent | « Chart *today’s* fragment » : un seul mot en ambre | 03 Veilleuse |

Principes transversaux appliqués aux trois planches : une seule couleur d'accent ; le premier écran raconte sans menu (la scène porte la règle) ; matière et lumière avant l'ornement ; narration par le mouvement (intro : les tuiles montent en diagonale, puis les notes ; chaque repère tombe en place), coupée par `prefers-reduced-motion`.

Non emprunté : les textes, les polices propriétaires, les photos et scènes 3D elles-mêmes, la composition de leurs premiers écrans.

---

## V1 (2026-11-18, rejetée) — refs du brief

## PART Architects — part.archi

Observé :
- Fond blanc pur, **une seule couleur de trait** (rouge vermillon) pour la navigation, les filets, les cadres et le dessin. Le noir est réservé au texte courant.
- Navigation posée **verticalement dans les marges** gauche et droite (texte tourné à 90°, minuscules), le centre reste libre.
- Les projets sont présentés dans un **cadre fin au trait** ; le titre est *dessiné* en lignes obliques comme un relevé, avec un bloc de texte court (lieu, date) en haut à gauche.
- Pas de photo à l'accueil : le trait suffit à faire image.

À retenir pour Cartographe :
1. **Le trait comme langage unique** : grille, repères, rose des vents, cadres et tampons dans une seule couleur d'encre. C'est la logique d'un relevé topographique.
2. **Les marges travaillent** : coordonnées, date, n° de feuille et échelle posées dans les marges, à la manière d'un cartouche de plan. Le centre est réservé à la grille.
3. **Le cartouche** : bloc de texte court, aligné à gauche dans un cadre fin (lieu · date · auteur), au lieu d'un en-tête décoratif.

## Cosmos — cosmos.so

Observé :
- Fond blanc cassé chaud, encre quasi noire, gris seulement pour le secondaire. Pas de couleur d'accent dans l'interface : la couleur vient du contenu.
- Une seule famille sans-serif travaillée par la graisse : très gros titre gras, interlignage serré ; corps 14–16 px.
- Beaucoup d'air autour du titre, puis des **rangées de tuiles régulières** (coins arrondis ≈ 16 px), intitulé gras court + deux lignes grises.
- **Une seule action pleine** par écran (pilule noire), tout le reste en texte.

À retenir pour Cartographe :
1. **Grille franche, marges larges** : la grille 4×4 est la composition, pas un widget posé dedans. Gouttières régulières, rien qui déborde.
2. **Une seule action pleine** (« Ink the map »), tout le reste en secondaire.
3. **Hiérarchie par la graisse et la taille**, pas par les ornements : on doit lire la règle en 5 secondes.

## Ce qu'on n'emprunte pas

- Les polices propriétaires des deux sites, le lettrage oblique dessiné de PART, les tuiles produit et les textes de Cosmos.
- Aucune police réseau : familles système uniquement dans les planches (et à embarquer dans l'app, critère CSP).
