import React, { useEffect, useState } from 'react';

export default function FelulvizsgalatokPage() {
    const [felulvizsgalatok, setfelulvizsgalatok] = useState([]);
    const filterOptions = ["szemely", "ap"];
    const [filterBy, setFilterBy] = useState(filterOptions[0]);
    const [filter, setFilter] = useState("");

    let nezetek = [15, 30, 50];
    const [max, setMax] = useState(nezetek[0]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch("api/Penztargep/felulvizsgalatok")
            .then(res => res.json())
            .then(json => setfelulvizsgalatok(json));
    }, []);

    useEffect(() => { setPage(0); }, [filter, filterBy]);

    function search(rows) {
        if (filterBy === "szemely")
            return rows.filter(row => row.szemely.toLowerCase().indexOf(filter.toLowerCase()) > -1)

        if (filterBy === "ap")
            return rows.filter(row => row.ap.toLowerCase().indexOf(filter.toLowerCase()) > -1)

        return rows;
    }

    function ChangePage(n, filter) {
        if (n < 0) {
            if (page > 0 && n === -1) {
                setPage(page - 1);
            }
            else if (page > 0 && n < -1) {
                setPage(0);
            }
        }
        else
            if (page < Math.ceil(search(felulvizsgalatok).length / max) - 1)
                setPage(page + 1);
    }

    function GetFelulvizsgalatok(darab) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <td>
                            AP szám
                        </td>
                        <td>
                            Típus
                        </td>
                        <td>
                            Személy
                        </td>
                        <td>
                            Beüzemelés
                        </td>
                        <td>
                            Felülvizsgálat
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {search(felulvizsgalatok).slice(page * darab, page * darab + darab).map((felulvizsgalat) => (
                        <tr>
                            <td>
                                {felulvizsgalat.ap}
                            </td>
                            <td>
                                {felulvizsgalat.tipus}
                            </td>
                            <td>
                                {felulvizsgalat.szemely}
                            </td>
                            <td>
                                {felulvizsgalat.beuzemeles}
                            </td>
                            <td>
                                {felulvizsgalat.felulvizsgalat}
                            </td>
                        </tr>)
                    )}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <div className="input-group">
                <label className="input-text-rcorner" htmlFor="filterInput">Filter:</label>
                <input className="form-control" type="text" id="filterInput" value={filter} onChange={(e) => setFilter(e.target.value)} />
                <div className="input-group-append">
                    <select className="custom-select" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                        {filterOptions.map((option) => {
                            return (<option value={option}>{option}</option>);
                        })}
                    </select>
                </div>
            </div>
            <div className="input-group-append abosolute-right">
                <select className="custom-select" value={max} onChange={(e) => setMax(e.target.value)}>
                    {nezetek.map((option) => {
                        return (<option value={option}>{option}</option>);
                    })}
                </select>
            </div>
            <div className="page-changing-header">
                <button onClick={() => ChangePage(-1, filter)}>Előző lap<span></span></button>
                <span>Találatok összesen: {search(felulvizsgalatok).length} ({page * max} - {page * max + max})</span>
                <button onClick={() => ChangePage(1, filter)}>Következő lap<span></span></button>
            </div>
            {GetFelulvizsgalatok(max)}
        </div>
    );
}