# Overlevering til permanent domene

Dette redesignet driftes foreløpig på en demo-URL
(`adriandie.github.io/restaurantsalt-redesign/`). Denne filen samler ting
som må sjekkes/endres den dagen siden legges ut på et permanent domene —
skrevet ned nå fordi originalsiden (restaurantsalt.no) ikke nødvendigvis
finnes lenger på det tidspunktet.

## Cookie-samtykke (CookieYes)

Originalen bruker CookieYes, domenelåst til `restaurantsalt.no`. Redesignet
har derfor en egenbygd, funksjonelt likeverdig samtykke-banner (se
`app.js` — 5 kategorier: Nødvendig/Funksjonell/Analytics/Ytelse/Annonse,
ordrett tekst hentet fra originalens eget samtykke-panel, pluss en
"gjenåpne innstillinger"-knapp).

Ekte embed-linje fra originalen (funker KUN på restaurantsalt.no som den
står — CookieYes nekter å rendre på et annet domene):

```html
<script id="cookieyes" type="text/javascript" src="https://cdn-cookieyes.com/client_data/be42a8939d464c9b37041d88/script.js"></script>
```

**Regel ved flytting til permanent domene:**

- **Samme domene som originalen (`restaurantsalt.no` gjenbrukes):** kundens
  eksisterende CookieYes-oppsett begynner å fungere automatisk igjen så
  snart redesignet ligger der — ingen endring nødvendig, linjen over
  trenger ikke legges inn manuelt.
- **Nytt/annet domene:** enten registrer CookieYes på nytt for det
  domenet (kunden må gjøre dette i sin egen CookieYes-konto, vi har ikke
  tilgang), eller behold den egenbygde banneren i `app.js` — den fungerer
  uendret på ethvert domene, uten konto eller kostnad.

Sjekk hvilket domene som faktisk blir brukt før du bestemmer hvilken vei —
det avgjør om noe i det hele tatt må gjøres.

## Bordbestilling (Gastroplanner)

Ikke domenelåst — `bordbestilling.html` embedder den ekte, live
bookingwidgeten (`https://booking.gastroplanner.no/restaurantsalt/t`)
direkte via iframe, og den fungerer identisk uansett hvilket domene
redesignet driftes på. Ingen handling nødvendig ved flytting.
