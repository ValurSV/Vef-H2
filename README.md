# Vefforritun 1, 2024, hópverkefni 2

## Keyrsla á síðu
Þegar búið að sækja skránna og setja hanna í IDE þarf fyrst að keyra 'npm install' til að hlaða inn NPM packages sem forritið notað.

Hægt er að vinna í síðu án þess að keyra 'npm run dev' en það er æskilegt þar sem það getur einfaldað vinnu ferill.

Einning er hægt að keyra 'npm run lint' til að fara yfir javascript villur.

## Uppsetning á verkefni

Verkefni er skipt niður í þrjár aðal möppur

- lib
    - components.
        - navigation.js
    - pages
        Inniheldur .js skrár sem lesa og render viðeigandi .json skrár
    - elements.js
    - fetcher.js
- public
    - data
        - css
            .json skrár með css námsefni 
        - html
            .json skrár með html námsefni 
        - javascript
            .json skrár með javascript námsefni 
        - index.json
            .json fyrir valmynd
    - img
        Inniheldur myndir til að setja á síðunna
- styles
    Skipt niður css í .scss skrár sem notað er með sass

## Verkefni sem vöru útfærð

### Birting á námsefni gildir sem tvö auka verkefni.
Sótt er efni úr /${type}/lectures.json þar sem type er breytan eftir því hvaða námsefni er beðið um (css, html eða javascript).

- `title`, strengur sem inniheldur titil á námsefninu
- `category`, strengur sem inniheldur flokk námsefnis, eitt af `html`, `css`, `js`
- `lectures`, fylki af fyrirlestrum

Fyrirlestur er hlutur sem inniheldur:

- `slug`, strengur sem inniheldur auðkenni fyrirlesturs, hægt að nota í slóð
- `title`, strengur sem inniheldur titil á fyrirlestrinum
- `content`, fylki af efni

Efni er hlutur sem inniheldur `type`, strengur sem inniheldur tegund efnis, eitt af eftirfarandi ásamt viðeigandi gögnum:

- `"type": "heading"`, fyrirsögn
  - `data` inniheldur fyrirsögnina
- `"type": "text"`, texti
  - `data` inniheldur texta
- `"type": "quote"`, tilvitnun
  - `data` inniheldur tilvitnun
  - `attribute` inniheldur manneskju sem vísað er til
- `"type": "image"`
  - `data` inniheldur slóð á mynd, mynd er í `img/`
  - `caption` inniheldur myndatexta
- `"type": "list"`, listi
  - `data` inniheldur fylki af atriðum sem strengi
- `"type": "code"`, kóðabrot
  - `data` inniheldur kóða

Lesið er úr gögnum úr lectures.json (sjá að ofan) og búið til <div> og sem inniheldur upplýsingar um námsefnið. Athugað er hvort námsefninnu tilheyrir mynd og ef það er satt þá er sótt mynd úr /img og sett á síðunna.



### Lykilhugtök 

Sótt er efni úr /${type}/keywords.json þar sem type er breytan eftir því hvaða námsefni er beðið um (css, html eða javascript).

Lykilhugtök eru í `keywords.json` skrám. Hlutur sem inniheldur:

- `title`, strengur sem inniheldur titil á námsefninu
- `category`, strengur sem inniheldur flokk námsefnis, eitt af `html`, `css`, `js`
- `keywords`, fylki af lykilhugtökum

Lykilhugtak er hlutur sem inniheldur:

- `title`, strengur, titill á lykilhugtaki
- `english`, hugsanlega skilgreint, strengur, ensk þýðing á lykilhugtaki, ef ekki skilgreint er titill á ensku sá sami og á íslensku
- `content`, strengur, skilgreining á lykilhugtaki

Athugar hvort það var ýtt á "Lykilhugtök" og athugar hvaða 'type' keywords.json á að tilheyra keyrir svo forritið.
Tekinn eru inn .json gögn og býr til tilheyrandi <div> sem innihalda header sem eru lykilhugtök og texta undir með tilheyrandi upplýsingar.

### Birting á spurningum

Sótt er efni úr /${type}/questions.json þar sem type er breytan eftir því hvaða námsefni er beðið um (css, html eða javascript).

Spurningar eru í `questions.json` skrám og eru í öllum tilfellum krossaspurningar þar sem fjórir möguleikar á svari eru og einn möguleiki er réttur. Hlutur sem inniheldur:

- `title`, strengur sem inniheldur titil á námsefninu
- `category`, strengur sem inniheldur flokk námsefnis, eitt af `html`, `css`, `js`
- `questions`, fylki af spurningum

Spurning er hlutur sem inniheldur:

- `question`, strengur, spurning
- `answers`, fylki af möguleikum
  - `answer`, strengur, svar
  - `correct`, boolean, `true` ef svarið er rétt, annars `false`

Athugar hvort það var ýtt á "Spurningar" og athugar hvaða 'type' question.json á að tilheyra keyrir svo forritið.
Tekinn eru inn .json gögn og býr til tilheyrandi <div> sem innihalda spurningar og svör.
Einnig er gert radio úr "answers" sem inniheldur boolean "true" eða "false" þanning að forritið getur athugað hversu mörg svör þú hefur rétt. 




### Contributers
Valur Sudee Viðarsson - vsv11@hi.is - ValurSV
Ignas Pacevicius - igp4@hi.is - NASPA365
Jóhann Ástráðsson - joa41@hi.is- SpooossGaming
