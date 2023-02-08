sequenceDiagram
    participant Browser
    participant Server
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server-->Browser: HTML document

    Note left of Browser: Selain tekee GET-pyynnön ja palvelin vastaa HTML-dokumentilla.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server-->Browser: css file

    Note left of Browser: HTML-dokumentin latautumisen perusteella selain tekee GET-pyynnön css-tiedostolle. Palvelin vastaa lähettämällä tiedoston.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server-->Browser: JavaScript file

    Note left of Browser: Selain tekee GET-pyynnön JavaScript-tiedostolle. Palvelin vastaa lähettämällä tiedoston.

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server-->Browser: muistiinpanot (raakadata, data.json)

    Note left of Browser: Selain suorittaa JavaScript-koodia ja sen mukaisesti tekee GET-pyynnön palvelimelle raakadatan saamiseksi. Datan latauduttua, se renderöidään selaimeen.