sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Server-->Browser: Status code 201 (uusi muistiinpano lisätty listaan ja lista piirretty näkymään uudelleen)

    Note left of Browser: Selain tekee palvelimelle osoitteeseen /new_note_spa POST-pyynnön, joka sisältää JSON-muotoisen muistiinpanon (jonka käyttäjä kirjoitti lomakkeen kenttään). Lomakkeen lähetys tapahtuu JavaScript-koodin perusteella, jossa on määritelty, missä tilanteessa lomake lähetetään (eli kun submit-painiketta painetaan). Koodiin on myös määritelty, että lomaketta ei lähetetä perinteiseen tyyliin, jossa sivu myös ladataan uudelleen, vaan uusi muistiinpano lisätään muistiinpanojen listaan ja lista piirretään sivulle uudelleen.