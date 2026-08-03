# Cioclovina Tribe - Blueprint du site

## 1. Objectif

Transformer le guide PDF destiné aux visiteurs déjà réservés en un site marketing qui :

- donne envie de découvrir le lieu ;
- permet de comparer les hébergements ;
- présente les expériences et la cuisine ;
- explique clairement l'accès particulier au site ;
- convertit principalement vers une demande de disponibilité sur WhatsApp ;
- reste simple à maintenir sans CMS ni base de données.

Le PDF reste la source éditoriale initiale. Les données incertaines sont considérées comme provisoires et sont listées dans `tasks.md`.

## 2. Décisions de cadrage

- Locales : roumain (`ro`), anglais (`en`) et français (`fr`).
- Langue par défaut provisoire : roumain.
- Framework : Next.js App Router.
- Internationalisation : `next-intl`.
- Styles : Tailwind CSS.
- Composants de base : shadcn/ui, personnalisés pour éviter un rendu générique.
- Contenu : fichiers statiques typés et fichiers de traduction ; aucun CMS et aucune base de données.
- Photos : toutes les photos finales seront stockées sous `public/images/`.
- Conversion principale : WhatsApp.
- Conversions secondaires : e-mail, Google Maps et Instagram.
- Aucun formulaire de contact n'est nécessaire : il créerait de la complexité sans améliorer le parcours actuel.

### Coordonnées de référence

- WhatsApp : `+40723635785` et `https://wa.me/40723635785`.
- Google Maps / Google Place : `https://maps.app.goo.gl/qw64mCHQsGQMbiPF8?g_st=iw`.
- Instagram : `https://www.instagram.com/cioclovinatribe`.
- E-mail provisoire issu du PDF : `cioclovinatribe@gmail.com`.

## 3. Positionnement éditorial

### Promesse principale

Un séjour simple, chaleureux et dépaysant au cœur de la nature, dans des cabanes et des tentes aménagées, avec des hôtes présents et des expériences locales.

### Piliers

1. Dormir dans la nature avec le confort essentiel.
2. Être accueilli personnellement par Roxana et Bogdan.
3. Explorer les environs à pied, à vélo, en 4x4 ou avec des activités accompagnées.
4. Découvrir une cuisine locale et faite maison.
5. Se déconnecter sans renoncer complètement au confort.

### Ton

- chaleureux et humain ;
- simple, concret et rassurant ;
- peu institutionnel ;
- évocateur sur les pages marketing ;
- très précis dans les informations pratiques.

## 4. Navigation et routes

Les noms internes des routes restent stables en anglais. `next-intl` fournit les chemins publics localisés.

| Page | Roumain | Anglais | Français |
|---|---|---|---|
| Accueil | `/ro` | `/en` | `/fr` |
| Hébergements | `/ro/cazare` | `/en/stays` | `/fr/hebergements` |
| Détail d'un hébergement | `/ro/cazare/[slug]` | `/en/stays/[slug]` | `/fr/hebergements/[slug]` |
| Expériences | `/ro/experiente` | `/en/experiences` | `/fr/experiences` |
| Gastronomie | `/ro/gastronomie` | `/en/food` | `/fr/gastronomie` |
| Préparer son séjour | `/ro/pregateste-sejurul` | `/en/plan-your-stay` | `/fr/preparer-le-sejour` |
| À propos | `/ro/despre` | `/en/about` | `/fr/a-propos` |
| Contact | `/ro/contact` | `/en/contact` | `/fr/contact` |

Pages secondaires à prévoir dans le footer : confidentialité et mentions légales.

### Navigation principale

- Hébergements
- Expériences
- Gastronomie
- Préparer son séjour
- À propos
- Bouton principal : « Vérifier les disponibilités »

Le contact n'a pas besoin d'occuper un lien supplémentaire dans la navigation desktop : le bouton principal conduit à la page Contact ou ouvre directement WhatsApp selon le contexte.

### Navigation mobile

- Header compact avec logo, sélecteur de langue et bouton menu.
- Menu plein écran ou panneau latéral basé sur `Sheet` de shadcn/ui.
- CTA WhatsApp visible dans le menu.
- Barre de contact fixe en bas sur les pages d'hébergement : prix indicatif + bouton WhatsApp.
- Aucun menu à plus de deux niveaux.

## 5. Structure des pages

### Accueil

Objectif : créer le désir, expliquer rapidement l'offre et conduire vers les hébergements ou WhatsApp.

1. Hero immersif
   - proposition de valeur courte ;
   - CTA « Descoperă cazările / Explore stays / Voir les hébergements » ;
   - CTA WhatsApp secondaire ;
   - grande photo du lieu, sans carrousel automatique.
2. Repères essentiels
   - cabanes et tentes aménagées ;
   - expériences dans la nature ;
   - cuisine locale ;
   - accueil et transfert 4x4.
3. Hébergements à découvrir
   - grille de cartes vers la page Hébergements ;
   - prix affichés avec la mention « à partir de » ou « tarif indicatif ».
4. Une autre manière de séjourner
   - texte de positionnement ;
   - photos d'ambiance.
5. Expériences
   - randonnée, vélo électrique, excursions 4x4 ;
   - piscine présentée sans détail non confirmé ;
   - canyoning présenté comme activité à proximité et sur demande, sans prix ni promesse opérationnelle non confirmée.
6. Cuisine locale
   - repas maison ;
   - expérience privée ;
   - lien vers Gastronomie.
7. Roxana et Bogdan
   - portrait et message d'accueil ;
   - lien vers À propos.
8. Où nous trouver
   - résumé prudent de l'accès ;
   - CTA Google Maps ;
   - avertissement concernant les deux derniers kilomètres et l'organisation avec les hôtes.
9. CTA final
   - demande de disponibilité par WhatsApp ;
   - e-mail en alternative.

### Hébergements

Objectif : rendre l'offre comparable sans introduire un système de réservation complexe.

1. Introduction courte.
2. Hébergements aménagés, affichés sous forme de cartes cohérentes.
3. Camping avec tente personnelle, dans une section séparée.
4. Équipements communs et sanitaires.
5. Informations tarifaires générales : séjour minimum, enfants, animaux et tarifs indicatifs.
6. CTA WhatsApp.

Il n'est pas nécessaire d'ajouter des filtres : le nombre d'hébergements est faible. Une grille lisible sera plus efficace.

#### Entrées de contenu provisoires

Chaque entrée reçoit un identifiant technique stable, indépendant du nom public et de la langue :

| Identifiant | Nom actuel | Statut |
|---|---|---|
| `hammock-cabin` | Cabana cu hamac | Provisoire |
| `orchard-cabin` | Cabana din livadă | Provisoire |
| `meadow-glamping` | Cortul din poiană, tente blanche | Provisoire |
| `star-tent` | Cortul sub stele | Provisoire |
| `red-tent` | Tente rouge, nom à confirmer | À valider |
| `a-tent` | Cortul A | À valider |
| `own-tent-camping` | Campare cu cortul propriu | Provisoire |

#### Page d'un hébergement

1. Galerie de photos.
2. Nom, phrase courte, capacité et prix indicatif.
3. CTA WhatsApp avec le nom de l'hébergement prérempli.
4. Description.
5. Liste des couchages et équipements.
6. Salle de bain privée ou commune.
7. Ce qui est inclus et ce qui est partagé ou payant.
8. Informations pratiques importantes.
9. Deux hébergements alternatifs.
10. CTA final.

Les données non confirmées ne seront pas inventées. Un champ absent est omis plutôt que remplacé par une affirmation vague.

### Expériences

Objectif : montrer que le séjour ne se limite pas à l'hébergement.

1. Introduction visuelle.
2. Expériences sur place
   - piscine ;
   - feu de camp ;
   - détente, nature et observation du ciel.
3. Activités accompagnées
   - vélo électrique à Fundătura Ponorului ;
   - excursion en Jeep à Fundătura Ponorului ;
   - randonnée guidée ;
   - forteresses daces en Jeep.
4. À proximité
   - canyoning, présenté comme activité voisine à organiser sur demande tant que les détails ne sont pas confirmés.
5. Réservation 48 heures à l'avance.
6. Bloc de prudence : niveau, météo, disponibilité et conditions à confirmer avec les hôtes.
7. CTA WhatsApp avec un message lié à l'activité sélectionnée.

### Gastronomie

1. Hero « Une expérience pour tous les sens ».
2. Philosophie : produits locaux, cuisine maison et recettes régionales.
3. Repas
   - petit-déjeuner ;
   - déjeuner ;
   - dîner ;
   - dessert.
4. Expérience privée et personnalisée.
5. Cuisine et salle à manger communes.
6. Bar et boissons, sans détailler les volumes non confirmés.
7. Allergies, intolérances et besoins alimentaires.
8. Réservation 48 heures à l'avance.
9. CTA WhatsApp.

Les prix restent centralisés dans les données factuelles et ne sont jamais recopiés directement dans plusieurs pages.

### Préparer son séjour

Cette page reprend la fonction pratique du PDF après la phase de découverte.

1. Comment venir
   - bouton Google Maps ;
   - arrivée à Boșorod ;
   - route non asphaltée ;
   - coordination avec les hôtes ;
   - derniers kilomètres en 4x4.
2. Ce qu'il faut apporter
   - chaussures ;
   - vêtement de pluie ;
   - lampe ;
   - eau potable.
3. Sur place
   - eau non potable ;
   - Wi-Fi ;
   - réseau mobile limité ;
   - sanitaires communs ;
   - cuisine et salle à manger.
4. Règles et tarifs additionnels
   - séjour minimum ;
   - enfants ;
   - animaux ;
   - repas et activités ;
   - transport ;
   - feu de camp.
5. FAQ sous forme d'accordéons accessibles.
6. CTA pour demander une précision à l'hôte.

Les horaires et politiques commerciales non confirmés n'apparaissent pas comme des faits.

### À propos

1. Portrait de Roxana et Bogdan.
2. Leur message d'accueil adapté du PDF.
3. Leur manière d'accueillir : cuisine, accompagnement 4x4 et conseils locaux.
4. Valeurs : simplicité, proximité, calme et respect du lieu.
5. Galerie d'ambiance.
6. Liens Instagram et WhatsApp.

### Contact

1. Titre orienté action : vérifier une disponibilité ou préparer un séjour.
2. WhatsApp, CTA principal.
3. E-mail, CTA secondaire.
4. Instagram.
5. Google Maps.
6. Rappel concernant l'accès et la nécessité de prévenir les hôtes.

Aucun formulaire n'est prévu. Il n'y aura donc ni stockage de données personnelles ni service d'envoi à maintenir.

## 6. Parcours de conversion

### Parcours principal

Accueil → Hébergements → Détail d'un hébergement → WhatsApp.

### Parcours activité

Accueil → Expériences → Activité → WhatsApp.

### Parcours visiteur déjà réservé

Lien direct → Préparer son séjour → Google Maps ou WhatsApp.

### Messages WhatsApp préremplis

Chaque langue dispose de son propre modèle. Le message inclut si possible :

- l'hébergement ou l'activité consultée ;
- les dates souhaitées à compléter ;
- le nombre d'adultes et d'enfants à compléter.

Le lien de base validé est `https://wa.me/40723635785`.

## 7. Stratégie multilingue

### Séparation des données

- Les faits non traduisibles sont stockés une seule fois : téléphone, URLs, prix, durées, capacités, identifiants et chemins d'images.
- Les textes sont traduits : titres, descriptions, équipements, navigation, CTA, alt text et métadonnées SEO.
- Les valeurs comme les prix ou les durées sont formatées selon la locale au moment de l'affichage.
- Chaque donnée sensible peut porter un statut interne `confirmed` ou `provisional` afin de suivre sa validation sans afficher ce vocabulaire technique aux visiteurs.

### Namespaces de traduction

- `common` : navigation, footer, CTA et libellés génériques.
- `home`
- `stays`
- `experiences`
- `food`
- `guide`
- `about`
- `contact`
- `legal`

Les métadonnées `title` et `description` d'une page restent dans le même namespace que le contenu de cette page pour éviter leur désynchronisation.

### Fallback

Le roumain sert de source éditoriale. Aucune traduction manquante ne doit être silencieusement affichée en roumain dans une page anglaise ou française lors de la production : les trois locales doivent passer une vérification de complétude.

## 8. Stratégie SEO

### Métadonnées par page

| Page | Intention du titre | Intention de la description |
|---|---|---|
| Accueil | Marque + hébergements nature + expériences | Résumer cabanes, glamping, cuisine et activités avec CTA WhatsApp |
| Hébergements | Cabanes, tentes glamping et camping | Comparer les types de séjour et leurs principaux équipements |
| Détail | Nom de l'hébergement + Cioclovina Tribe | Capacité, confort, salle de bain et tarif indicatif |
| Expériences | Activités nature autour de Cioclovina | Randonnée, vélo, Jeep, canyoning et expériences sur place |
| Gastronomie | Cuisine locale et repas maison | Menus, expérience privée et cuisine commune |
| Préparer son séjour | Accès et informations pratiques | 4x4, équipement à apporter, eau, Wi-Fi et règles utiles |
| À propos | Roxana et Bogdan | Présenter les hôtes et l'esprit du lieu |
| Contact | Contact et disponibilité | WhatsApp, e-mail, Instagram et Google Maps |

Exemple pour l'accueil :

- RO : `Cioclovina Tribe | Cazare în natură și experiențe locale`
- EN : `Cioclovina Tribe | Nature stays and local experiences`
- FR : `Cioclovina Tribe | Hébergements nature et expériences locales`

Description roumaine de travail : `Descoperă cabane, corturi glamping, mâncare locală și activități în natură la Cioclovina Tribe. Solicită disponibilitatea direct pe WhatsApp.`

Les descriptions anglaise et française seront adaptées, et non traduites littéralement, lors de la rédaction finale.

### SEO technique prévu

- URL canonique pour chaque locale.
- Liens `hreflang` RO, EN et FR.
- Sitemap localisé.
- `robots.txt`.
- Open Graph et image sociale sous `public/images/seo/`.
- Données structurées `LodgingBusiness` pour l'établissement.
- `BreadcrumbList` sur les pages internes.
- `Offer` uniquement lorsque les prix et conditions sont confirmés.
- `FAQPage` uniquement pour les questions réellement visibles sur la page.
- Aucun faux avis, faux score ou nombre de chambres déduit du PDF.

## 9. Stratégie d'images

### Répartition des sources du PDF

| Pages PDF | Usage envisagé |
|---|---|
| 1 et 19 | Ambiance forêt, accès et conclusion |
| 2 | Hôtes et page À propos |
| 3 et 4 | Accès et préparation |
| 5 | Ambiance de groupe ou événement, à utiliser sans annoncer une offre événementielle non confirmée |
| 6 à 12 | Hébergements et camping |
| 13 | Sanitaires communs |
| 14 | Activités |
| 15 | Cuisine commune |
| 16 et 17 | Repas et expérience culinaire |
| 18 | Bar et boissons |

### Arborescence cible

Toutes les photographies doivent rester sous `public/images/` :

- `public/images/hero/`
- `public/images/hosts/`
- `public/images/accommodations/hammock-cabin/`
- `public/images/accommodations/orchard-cabin/`
- `public/images/accommodations/meadow-glamping/`
- `public/images/accommodations/star-tent/`
- `public/images/accommodations/red-tent/`
- `public/images/accommodations/a-tent/`
- `public/images/accommodations/own-tent-camping/`
- `public/images/experiences/`
- `public/images/food/`
- `public/images/facilities/`
- `public/images/location/`
- `public/images/seo/`

### Règles

- Noms descriptifs en minuscules et kebab-case ; aucun nom générique comme `R10.jpg`.
- Conserver une version source de qualité, puis produire les variantes web nécessaires.
- Utiliser `next/image`, des dimensions explicites et des attributs `sizes` adaptés.
- Une seule image prioritaire au-dessus de la ligne de flottaison.
- Alt text localisé et descriptif ; alt vide pour les images purement décoratives.
- Éviter les petites photos du PDF comme hero plein écran.
- Pas de carrousel automatique.

## 10. Direction visuelle

Le site doit reprendre l'atmosphère du PDF sans reproduire sa mise en page verticale.

### Palette de travail

- vert forêt profond ;
- crème chaud ;
- charbon ;
- tons bois et terre ;
- accent discret inspiré de la tente rouge.

### Principes

- photos généreuses et recadrages immersifs ;
- grands titres sobres ;
- textes courts sur les pages marketing ;
- informations pratiques dans des cartes, listes ou accordéons ;
- coins légèrement arrondis, sans excès ;
- contraste élevé et tailles de texte confortables ;
- animations légères, désactivées avec `prefers-reduced-motion`.

### shadcn/ui envisagé

- `Button`
- `Sheet`
- `Accordion`
- `Card`
- `Badge`
- `Separator`
- `Dialog` uniquement si une galerie agrandie le justifie

## 11. Organisation de fichiers prévue

Cette arborescence est une cible d'implémentation, pas du code déjà créé :

```text
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      stays/
        page.tsx
        [slug]/page.tsx
      experiences/page.tsx
      food/page.tsx
      plan-your-stay/page.tsx
      about/page.tsx
      contact/page.tsx
      privacy/page.tsx
      legal/page.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
    sections/
    stays/
    experiences/
    contact/
    ui/
  content/
    accommodations.ts
    experiences.ts
    food.ts
    practical.ts
    site-config.ts
    types.ts
  i18n/
    routing.ts
    request.ts
    navigation.ts
  lib/
    contact-links.ts
    seo.ts
    formatters.ts
messages/
  ro.json
  en.json
  fr.json
public/
  images/
```

Les composants sont organisés par usage réel. Un composant n'est partagé que lorsqu'il possède une responsabilité claire et sert plusieurs pages.

### Fonctions à factoriser

- génération des liens WhatsApp localisés ;
- génération des liens `mailto:` ;
- formatage des prix et durées ;
- récupération d'un hébergement par identifiant ou slug ;
- génération des métadonnées localisées ;
- construction des données structurées ;
- mapping des équipements vers leurs libellés et icônes.

### État actuel du dépôt

- Next.js 16 et React 19 sont déjà installés.
- Le starter utilise encore un CSS Module de démonstration.
- Tailwind, shadcn/ui et `next-intl` ne sont pas encore installés.
- `react-router` est présent mais inutile avec le routeur Next.js ; sa suppression sera proposée pendant l'implémentation.

## 12. Accessibilité et responsive

- Conception mobile-first à partir d'environ 320 px.
- Cibles tactiles d'au moins 44 px.
- Navigation et galeries utilisables au clavier.
- Focus visible.
- Hiérarchie de titres régulière.
- Contrastes vérifiés, notamment sur les photos.
- Pas d'information transmise uniquement par la couleur.
- Respect de la réduction des animations.
- Aucun texte important intégré dans une image.
- CTA WhatsApp accessible sans masquer le contenu en bas de page.

## 13. Performance

- Pages principalement rendues statiquement.
- JavaScript client limité au menu mobile, sélecteur de langue et éventuelle galerie.
- Images responsives et correctement dimensionnées.
- Polices locales ou sous-ensemble minimal.
- Aucun widget Instagram ou Google Maps chargé automatiquement sur l'accueil.
- Google Maps reste un lien externe, ce qui évite un iframe lourd et des enjeux supplémentaires de consentement.

## 14. Ordre d'implémentation recommandé

1. Extraire et classer les images dans `public/images/`.
2. Installer et configurer Tailwind, shadcn/ui et `next-intl`.
3. Créer la couche de contenu statique et les trois catalogues de traduction.
4. Mettre en place les routes localisées, le layout, la navigation et le footer.
5. Construire l'accueil et le système de CTA.
6. Construire les pages Hébergements et les détails.
7. Construire Expériences, Gastronomie, Préparer son séjour, À propos et Contact.
8. Ajouter SEO, données structurées, sitemap et pages légales.
9. Vérifier responsive, accessibilité, contenus, liens et traductions.

## 15. Critères d'acceptation du blueprint

- Tous les contenus du PDF ont une destination dans l'arborescence.
- Les visiteurs peuvent atteindre WhatsApp depuis chaque page importante.
- L'accès particulier en 4x4 est visible avant la réservation.
- Les trois langues possèdent les mêmes pages et la même hiérarchie.
- Les données factuelles partagées ne sont définies qu'une seule fois.
- Les informations non confirmées ne sont pas présentées comme des faits certains.
- Toutes les photos finales sont prévues sous `public/images/`.
- L'architecture fonctionne sans CMS, base de données ou formulaire serveur.
