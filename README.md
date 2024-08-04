# Contexte
Un gîte en Nouvelle-Calédonie souhaite gérer la réservation de ses trois chambres via une application web moderne. Le gîte est fermé le lundi et peut accueillir deux personnes et un enfant par chambre. Le gîte a pour tarif 5000 XPF la nuit en semaine et 7000 XPF le week-end. L’option lit parapluie sera disponible avec un supplément de 1000 XPF tout au long du séjour.

# Analyse
* Tarif week-end de 7000 XPF (vendredi -> samedi et samedi -> dimanche)
* Tarif semaine de 5000 XPF pour les autres nuits
* Option lit parapluie
* Fermé le lundi : arrivée possible tous les jours sauf le lundi (la nuit du lundi est fermée). Départ possible tous les jours sauf le mardi (car fermé le lundi).
* Gérer les réservations pour ne pas accepter plusieurs réservations pour une chambre sur une même période.
* Une réservation peut être réalisée sur plusieurs chambres.
* On peut réserver une grande période ; le calcul des nuits et des tarifs doit déduire le jour fermé (lundi).
* Ajout d'un onglet (Admin) pour visualiser les réservations réalisées.

# Schéma Base de données 
![uml](https://github.com/user-attachments/assets/af15a694-6484-452c-9f29-5bf6cb3ac080)

# Technologies
* BDD : MySQL
* Front : React
* Back : NestJS

# Lancer l'application
* Cloner le dépôt : `git clone https://github.com/Mat-gif/test_technique.git`
* À la racine, lancer l'application via la commande : `docker-compose up --build`
* La page est accessible à l'URL : [http://localhost:3000/](http://localhost:3000/)
* Des réservations sont initialisées en BDD.

# Quelques tests unitaires ont été mis en place pour le backend
Principalement concernant le calcul des nuits et du tarif total
* Si besoin `npm install`
* Se rendre dans le répertoire `./backend`
* Exécuter les tests : `npm run test`

# Temps passé
* 3h pour s'initier à Docker Compose
* 3h pour s'initier à NestJS
* 10h de développement
* 3h pour les tests
