# Cioclovina Tribe - Inventaire des images

## Résultat

- Source : `docs/cioclovina-tribe-pdf-guide/cioclovina-tribe.pdf`.
- 51 flux d'images uniques ont été extraits du PDF après déduplication exacte.
- Ces flux correspondent à 50 fichiers photographiques et un QR code.
- 49 photographies ont été publiées sous `public/images/`.
- Format final : WebP, qualité 80, dimensions natives, sans métadonnées superflues.
- Poids total : environ 7,54 MiB.
- Les droits d'utilisation web de toutes les photographies ont été confirmés par le propriétaire du projet.

## Éléments non publiés

- Le QR code de la page 19 n'est pas une photographie et son URL de destination reste à confirmer.
- La petite image de dessert de la page 17 est une copie redimensionnée de la photo haute résolution de la page 16. Seule la version haute résolution est conservée dans `food/private-dining/dessert.webp`.

## Répartition

| Dossier | Nombre | Contenu |
|---|---:|---|
| `public/images/accommodations/` | 20 | Cabanes, tentes aménagées et camping |
| `public/images/experiences/` | 3 | Canyoning et vélo électrique |
| `public/images/facilities/` | 6 | Sanitaires, cuisine et salle à manger communes |
| `public/images/food/` | 15 | Repas, ingrédients, boissons et réception extérieure |
| `public/images/hero/` | 2 | Route forestière et intérieur avec vue |
| `public/images/hosts/` | 1 | Roxana et Bogdan |
| `public/images/location/` | 2 | Vue aérienne et paysage pastoral |
| **Total** | **49** | |

## Correspondance avec le PDF

| Pages PDF | Dossier final |
|---|---|
| 1 | `public/images/hero/forest-arrival-road.webp` |
| 2 | `public/images/hosts/roxana-bogdan-family.webp` |
| 3 | `public/images/location/pasture-near-cioclovina.webp` |
| 4 | `public/images/hero/cabin-interior-mountain-view.webp` |
| 5 | `public/images/food/outdoor-event-mountain-view.webp` |
| 6 | `public/images/accommodations/hammock-cabin/` |
| 7 | `public/images/accommodations/orchard-cabin/` |
| 8 | `public/images/accommodations/meadow-glamping/` |
| 9 | `public/images/accommodations/star-tent/` |
| 10 | `public/images/accommodations/red-tent/` |
| 11 | `public/images/accommodations/a-tent/` |
| 12 | `public/images/location/aerial-property-view.webp` et `public/images/accommodations/own-tent-camping/` |
| 13 | `public/images/facilities/shared-bathroom/` |
| 14 | `public/images/experiences/` |
| 15 | `public/images/facilities/shared-kitchen/` |
| 16 | `public/images/food/private-dining/` |
| 17 | `public/images/food/local-ingredients/` |
| 18 | `public/images/food/bar/` |

## Sélection recommandée pour le site

### Accueil

- Hero desktop : `location/aerial-property-view.webp`.
- Hero mobile ou bloc éditorial : `hero/cabin-interior-mountain-view.webp`.
- Ambiance secondaire : `hero/forest-arrival-road.webp`.

### Cartes d'hébergement

- Utiliser en priorité l'image `exterior.webp` ou `exterior-mountain-view.webp` de chaque dossier.
- Pour `hammock-cabin`, utiliser `bedroom-panoramic-view.webp`, aucune vue extérieure dédiée n'étant présente dans le PDF.
- Pour `orchard-cabin`, utiliser `veranda-seating.webp` ou `bedroom.webp`.
- Pour le camping, utiliser `tent-in-orchard.webp`.

### Expériences

- `e-bike-trail.webp` illustre l'activité vélo décrite dans le PDF.
- `canyoning-group.webp` et `canyoning-waterfall.webp` ne doivent pas être accompagnées de prix ou de conditions non confirmés.

### Gastronomie

- `private-dining/mountain-table.webp` est l'image principale recommandée.
- `outdoor-event-mountain-view.webp` peut illustrer l'ambiance ou les repas de groupe, mais ne doit pas annoncer une offre événementielle non confirmée.
- Les images de moins de 500 px de large doivent rester dans de petites cartes ou mosaïques et ne jamais servir de hero.

## Règles d'utilisation

- Référencer les fichiers avec un chemin commençant par `/images/`.
- Utiliser `next/image` avec dimensions ou ratio explicites.
- Définir un `sizes` adapté au contexte responsive.
- Localiser les textes alternatifs en RO, EN et FR.
- Utiliser un alt vide pour une image purement décorative.
- Ne pas agrandir une image au-delà de sa définition utile.
- Ne pas créer de nouvelle copie hors de `public/images/`.
