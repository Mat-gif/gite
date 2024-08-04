# Contexte
Un gîte en Nouvelle-Calédonie souhaite gérer la réservation de ses trois chambres via une application
web moderne.
Le gîte est fermé le lundi et peut accueillir deux personnes et un enfant par chambre.
Le gîte a pour tarif 5000 XPF la nuit en semaine, et 7000 XPF le week-end.
L’option lit parapluie sera disponible avec un supplément de 1000 XPF tout au long du séjour

# Analyse
* tarif weekend de 7000 XPF (vendredi-> samedi et samedi -> vendredi)
* tarif semaine de 5000 XPF pour les autres nuits
* fermé le lundi : arrivé possible tout les jours sauf le lundi (la nuit du lundi est fermé) dépar possible tout les jours sauf le mardi (car ermé le lundi)
* gerer les reservation pour ne pas accepter plusieurs reservation pour une chambre sur une meme période
* une reservation peut etre réalisé sur plusieurs chambre
* on peut reserver une grande periode, le calcul des nuis et tarifs doivent déduire  le jour fermé (lundi)

# Schema Base de donnée 
![uml](https://github.com/user-attachments/assets/af15a694-6484-452c-9f29-5bf6cb3ac080)
