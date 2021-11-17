import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h2>Online Pénztárgépek Nyilvántartó Adatbázisa</h2>
                <p>
                    A webalkalmazás a szakdolgozatom megírása mellett egy vállalat számára készült, melyben pénztárgépek adatait tudják lekérdezni egy adatbázis segítségével. Ennek megvalósítására több funkcióval is rendelkezik a felület:
                </p>
                <ul>
                    <li>
                        meglévő adatokat tud lekérdezni
                    </li>
                    <li>
                        a lekérdezés során meg lehet választani, hogy mi alapján keressük az kívánt adatokat
                    </li>
                    <li>
                        új adatokat vihetünk fel
                    </li>
                    <li>
                        törölhetünk az adatbázisból
                    </li>
                </ul>
                <p>
                    Ezeket a funkciókat elérjük a menüszalagon elhelyezett menüpontokban.
                    Az Adatbázis fülön megtalálható a pénztárgéppel kapcsolatos legfontosabb adatok, ezen az oldalon lehet törölni a pénztárgép adatait keresés után.
                    A Felülvizsgálatok fülön láthatjuk a gépek felülvizsgálatának idejét és a hozzájuk szorosan köthető adatokat, a pénztárgép AP számát, típusát, az üzemeltető személy nevét és a beüzemelés dátumát.
                    A következő Személyek menüpontban megtalálható minden adat az üzemeltetőről, elérhetőségek és a székhely is.
                    A következő két menüpontnál pedig új adatokat vihetünk fel, új személyeket és pénztárgépeket az adatbázisba.
                    A kereséshez a legtöbb helyen filterezéses szűrők segítségével lehet gyorsítani a lekérdezést, erről bővebben a szakdolgozat írásos dokumentumában olvashatnak.
                    </p>
                <p>
                    Felhívom a kedves használó figyelmét, hogy ez a webalkalmazás egyelőre generált adatokkal van feltöltve a szemléltetés szempontjából és a titoktartási felelősségem érdekében. Az adatbázist a vállalatnak átadáskor az általuk használt adatokkal lehet személyre szabni a későbbiekben.
                </p>
            </div>
        );
    }
}