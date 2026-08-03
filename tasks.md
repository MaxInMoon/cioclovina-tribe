# Cioclovina Tribe - Tasks

## In Progress

- Aucune tâche.

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

## Backlog

- [ ] Faire valider la source de vérité regroupée dans la section « À valider plus tard ».
- [ ] Extraire, sélectionner et optimiser les photos du PDF dans `public/images/`.
- [ ] Rédiger le contenu source roumain, puis adapter et vérifier les versions anglaise et française, métadonnées incluses.
- [ ] Implémenter le site Next.js multilingue (RO/EN/FR) avec next-intl, Tailwind et shadcn/ui.
- [ ] Ajouter les CTA de contact (WhatsApp, e-mail et Google Maps) avec les coordonnées validées.
- [ ] Ajouter les métadonnées SEO localisées et les données structurées pertinentes.
- [ ] Vérifier le responsive, l'accessibilité, les traductions et les parcours de navigation.

## Done

- [x] Auditer les 19 pages du PDF source par extraction de texte et revue visuelle : contenu, structure, 51 visuels uniques, incohérences, doublons et informations manquantes.
- [x] Consolider les coordonnées confirmées, l'autorisation des photos et les hypothèses de travail réversibles.
- [x] Définir et vérifier l'architecture, les parcours, le modèle de contenu multilingue, la stratégie SEO et l'organisation de fichiers dans `docs/site-blueprint.md`.
