# PAGES — Cartographe

> Statuts : à dessiner / en revue / validée. Style validé : **Plâtre** (2026-11-18), voir `STYLE.md`.
> Chaque planche montre le cadre desktop 1440 × 900 et le cadre mobile 390 × 844 côte à côte.

| # | Page | Rôle | Contenu clé | Planche | Statut |
|---|------|------|-------------|---------|--------|
| 1 | **Post** | Vue dans le feed (splash inline) : donner envie d'ouvrir la carte du jour | Titre « Today’s—fragment », phrase du splash, dalle vierge + 4 miniatures, action « Unroll » ; états « déjà signée » et chargement | `planches/v2/04-post.html` | **validée** |
| 2 | **Jeu** | Écran principal, une seule règle : « Pin 4 landmarks so every note holds » | Dalle 4×4 en plâtre, 4 repères, notes avec statut, repère actif, chrono, série, « Ink the map (n/4) » | `planches/v2/02-platre.html` (jouable) | **validée** |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | Carte postale signée, temps, série, prochaine carte (compte à rebours), commentaire prêt sans spoiler ; état « Territory lost » | `planches/v2/05-carte-de-fin.html` | **validée** |
| 4 | **Séries & classement** | Montrer la série et la communauté | Série en grand, 14 derniers jours, « Today’s chart room » (cartes signées, plus rapides, ligne du joueur) | `planches/v2/06-series-classement.html` | **validée** (données de démo) |

États couverts : chargement (page 1), déjà signée aujourd'hui (page 1), perdu (page 3). Reste : erreur réseau.

## Questions produit ouvertes (non tranchées)

1. **Indices : code ≠ IDEE.** `IDEE.md` parle de « west of / not adjacent to » ; le générateur (`src/shared/puzzle.ts`) produit *north of (même colonne)*, *same row*, *adjacent*, *not in column n*, *not in row n*. Les planches utilisent les textes **réels du code**. Faut-il ajouter « west of » / « not adjacent » ?
2. **Unicité de la solution.** `countSolutions` ne permute les repères que sur les 4 cases déjà connues de la solution : il ne vérifie pas l'unicité sur toute la grille de 16 cases. Exemple : le 2026-12-09 sort même 2 solutions avec ce test. Risque déjà noté dans `IDEE.md` → à corriger côté code avant le build final.
3. **Vérification en direct des notes** (holds / open / broken) : absente du code actuel. Les planches la montrent comme **proposition**, à confirmer ou retirer.
4. **Erreur = fin de partie ?** Le code actuel permet de redessiner après un échec. Les planches gardent ce comportement.
5. **Scores communautaires** : non stockés aujourd'hui (seule la série l'est). La page 4 a besoin d'un historique par joueur (14 jours) et d'un classement du jour trié par temps (Redis sorted set). Afficher les pseudos ou seulement le rang ?
6. **Splash** : la série et l'état « déjà signée » demandent un appel à `/api/init` depuis le splash (il n'en fait pas aujourd'hui).
7. **Commentaire en un geste** : poster le commentaire au nom du joueur demande la permission Devvit adéquate (à vérifier) ; sinon, copier le texte et ouvrir les commentaires.
