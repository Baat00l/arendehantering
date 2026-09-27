# Testning

Jag har testat applikationen manuellt i webbläsaren och med API‑anrop.

## Testfall

### 1. Skapa ärende
**Givet:** formuläret är ifyllt  
**När:** jag klickar på "Spara ärende"  
**Då:** ett nytt ärende ska visas i listan

### 2. Visa alla ärenden
**Givet:** backend körs  
**När:** sidan laddas  
**Då:** alla ärenden ska hämtas och visas

### 3. Uppdatera ärende
**Givet:** ett ärende finns  
**När:** jag klickar på "Redigera", ändrar text och sparar  
**Då:** ärendet ska uppdateras i databasen och i listan

### 4. Ta bort ärende
**Givet:** ett ärende finns  
**När:** jag klickar på "Ta bort" och bekräftar  
**Då:** ärendet ska försvinna från listan och databasen

## Testning av API med Postman
Jag har även testat API:t med Postman:

- `GET /tickets` – fungerar  
- `POST /tickets` – skapar nytt ärende  
- `PUT /tickets/:id` – uppdaterar ärende  
- `DELETE /tickets/:id` – tar bort ärende  

Alla endpoints fungerar som förväntat.