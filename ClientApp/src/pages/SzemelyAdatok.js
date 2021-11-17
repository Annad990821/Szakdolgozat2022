import React, { useEffect, useState } from 'react';

export default function SzemelyAdatokPage() {
    const [szemelyadatok, setSzemelyadatok] = useState([]);
    const filterOptions = ["nev", "penztargep", "adoszam"];
    const [filterBy, setFilterBy] = useState(filterOptions[0]);
    const [filter, setFilter] = useState("");
    let nezetek = [15, 30, 50];
    const [max, setMax] = useState(nezetek[0]);
    const [page, setPage] = useState(0);


    useEffect(() => {
        fetch("api/Szemely/szemelyadatok")
            .then(res => res.json())
            .then(json => setSzemelyadatok(json));
    }, []);
    useEffect(() => { setPage(0); }, [filter, filterBy]);

    function search(rows) {
        if (filterBy === "nev")
            return rows.filter(row => row.nev.toLowerCase().indexOf(filter.toLowerCase()) > -1)

        if (filterBy === "adoszam")
            return rows.filter(row => row.adoszam.toLowerCase().indexOf(filter.toLowerCase()) > -1)

        if (filterBy === "penztargep")
            return rows.filter(row => row.penztargep.toLowerCase().indexOf(filter.toLowerCase()) > -1)

        return rows;
    }

    function GetPenztargepek(darab) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <td>
                            Név
                        </td>
                        <td>
                            Pénztárgép
                        </td>
                        <td>
                            Telephely
                        </td>
                        <td>
                            Adószám
                        </td>
                        <td>
                            Telefonszám
                        </td>
                        <td>
                            Email cím
                        </td>
                        <td>
                            Törlés
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {search(szemelyadatok).slice(page * darab, page * darab + darab).map((szemelyadat) => (
                        <tr>
                            <td>
                                {szemelyadat.nev}
                            </td>
                            <td>
                                {szemelyadat.penztargep}
                            </td>
                            <td>
                                {szemelyadat.telephely}
                            </td>
                            <td>
                                {szemelyadat.adoszam}
                            </td>
                            <td>
                                {szemelyadat.telefon}
                            </td>
                            <td>
                                {szemelyadat.email}
                            </td>
                            <td>
                                <span onClick={() => Delete(szemelyadat.id)}>Törlés</span>
                            </td>
                        </tr>))}
                </tbody>
            </table>
        );
    }

    function Delete(id) {
        fetch("api/Penztargep/?id=" + id, { method: "DELETE" })
            .then(res => res.json())
            .then(json => {
                if (json === true) {
                    setSzemelyadatok(szemelyadatok.filter(sz => sz.id !== id));
                }
                else {
                    console.log("Hiba a pénztárgép törlése során.");
                }
            });
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
            if (page < Math.ceil(search(szemelyadatok).length / max) - 1)
                setPage(page + 1);
    }

    return (
        <div className="relative-div">
            <div className="input-group">
                <label className="input-text-rcorner" htmlFor="filterInput">Filter:</label>
                <div className="input-group-append">
                    <input className="form-control" type="text" id="filterInput" value={filter} onChange={(e) => setFilter(e.target.value)} />
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
                <span>Találatok összesen: {search(szemelyadatok).length} ({page * max} - {page * max + max})</span>
                <button onClick={() => ChangePage(1, filter)}>Következő lap<span></span></button>
            </div>
            {GetPenztargepek(max)}
        </div>
    );
}