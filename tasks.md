# Cioclovina Tribe - Tasks

## In Progress

- [ ] Vérifier le responsive, l'accessibilité, les traductions et les parcours de navigation.

## Données validées

- WhatsApp : `+40723635785` - lien direct `https://wa.me/40723635785`.
- Google Maps / Google Place : `https://maps.app.goo.gl/qw64mCHQsGQMbiPF8?g_st=iw`.
- Instagram : `https://www.instagram.com/cioclovinatribe`.
- Toutes les photos intégrées au PDF peuvent être utilisées sur le site.

## Décisions provisoires

- Prévoir les trois langues RO/EN/FR avec le roumain comme langue par défaut.
- Utiliser WhatsApp comme CTA principal de demande de disponibilité.
- Utiliser temporairement l'e-mail du PDF (`cioclovinatribe@gmail.com`) comme CTA secondaire.
- Afficher les tarifs du PDF comme tarifs indicatifs tant qu'ils ne sont pas confirmés.
- Ne pas inventer les détails absents : employer des formulations prudentes et omettre les données sensibles non confirmées.

## À valider plus tard

- Les noms définitifs, capacités, couchages, équipements et tarifs de chaque hébergement, notamment la tente rouge et « Cortul A ».
- Les caractéristiques, photos, règles, saison et éventuel tarif de la piscine.
- L'offre de canyoning : parcours, prix, durée, niveau, âge minimum, équipement, encadrement et conditions météo.
- Les horaires de check-in/check-out et les détails du stationnement et du transfert 4x4.
- Les règles de réservation, acompte, paiement, annulation, remboursement, taxes et durée de validité des tarifs.
- Les tranches d'âge exactes et les règles applicables aux enfants et aux animaux.
- Le périmètre et le tarif des équipements communs, du feu de camp et du transport supplémentaire.
- Les détails des repas, boissons et activités : horaires, volumes, restrictions, sécurité et disponibilité.
- La confirmation de l'e-mail de contact et l'URL dédiée au dépôt d'un avis.
- La validation finale des traductions et de la langue par défaut.
- Le domaine public définitif à renseigner dans `NEXT_PUBLIC_SITE_URL`.
- L'identité juridique de l'exploitant, ses informations d'enregistrement, l'hébergeur, les destinataires des données et les durées de conservation nécessaires aux pages légales.

## Backlog

- [ ] Faire valider la source de vérité regroupée dans la section « À valider plus tard ».

## Done

- [x] Auditer les 19 pages du PDF source par extraction de texte et revue visuelle : contenu, structure, 51 visuels uniques, incohérences, doublons et informations manquantes.
- [x] Consolider les coordonnées confirmées, l'autorisation des photos et les hypothèses de travail réversibles.
- [x] Définir et vérifier l'architecture, les parcours, le modèle de contenu multilingue, la stratégie SEO et l'organisation de fichiers dans `docs/site-blueprint.md`.
- [x] Extraire, dédupliquer, nommer, classer et vérifier 49 photographies WebP optimisées dans `public/images/`, avec inventaire dans `docs/image-inventory.md`.
- [x] Rédiger le contenu source roumain, puis adapter et vérifier les versions anglaise et française, métadonnées incluses.
- [x] Implémenter les routes Next.js localisées RO/EN/FR, la navigation, le footer, l'accueil et les pages Hébergements, Expériences, Gastronomie, Préparer son séjour, À propos et Contact avec next-intl et Tailwind.
- [x] Ajouter les CTA WhatsApp, e-mail, Google Maps et Instagram avec les coordonnées validées.
- [x] Ajouter les métadonnées SEO localisées sur toutes les pages implémentées.
- [x] Ajouter les données structurées `LodgingBusiness` et `BreadcrumbList`, le sitemap avec alternates RO/EN/FR et `robots.txt`.
- [x] Ajouter les pages Confidentialité et Mentions légales dans les trois langues, avec les informations non confirmées explicitement signalées avant publication.
