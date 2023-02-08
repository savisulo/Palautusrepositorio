sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server-->Browser: Status code 302 (uudelleenohjauspyyntö osoitteeseen /notes)

    Note left of Browser: Lomakkeen lähettämisessä (eli napin painamisella) selain lähettää palvelimelle POST-pyyntönä (lomakkeen method="POST" mukaisesti) lomakkeelle syötetyn datan (Form data) osoitteeseen /new_note (lomakkeen action="/new_note" mukaisesti).
    Note right of Server: Palvelin vastaa uudelleenohjauspyynnöllä: palvelin ohjaa selainta tekemään uuden GET-pyynnön palvelimelle (palvelin käsittelee lomakkeelta saadun datan ja lisää sen taulukkoon).

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server-->Browser: HTML document

    Note left of Browser: Selain tekee uuden GET-pyynnön.
    Note right of Server: Palvelin vastaa HTML-dokumentilla.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->Browser: css file

    Note left of Browser: HTML-dokumentin lukeminen saa aikaan sen, että selain tekee jälleen GET-pyynnön, tällä kertaa css-tiedostolle.
    Note right of Server: Palvelin vastaa lähettämällä tiedoston.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server-->Browser: JavaScript file

    Note left of Browser: Sama homma JavaScript-tiedoston kanssa.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->Browser: muistiinpanot (raakadata, data.json)

    Note left of Browser: Selain suorittaa JavaScript-koodia ja sen mukaisesti tekee GET-pyynnön palvelimelle raakadatan saamiseksi. Datan latauduttua, se renderöidään tapahtumankäsittelijän avulla selaimeen.