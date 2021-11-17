import React, { useEffect, useState } from 'react';

export default function SzemelyekPage() {
    const [szemelyek, setSzemelyek] = useState([]);
    const filterOptions = ["nev", "adoszam"];
    const [filterBy, setFilterBy] = useState(filterOptions[0]);
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);

    let nezetek = [15, 30, 50];
    const [max, setMax] = useState(nezetek[0]);

    useEffect(() => {
        fetch("api/Szemely/szemelyek")
            .then(res => res.json())
            .then(json => setSzemelyek(json));
    }, []);

    useEffect(() => { setPage(0); }, [filter, filterBy]);

    const search = (rows) => {
        if (filterBy === "nev") {
            let res = rows.filter(row => row.nev.toLowerCase().indexOf(filter.toLowerCase()) > -1);
            return res;
        }

        if (filterBy === "adoszam") {
            let res = rows.filter(row => row.adoszam.toLowerCase().indexOf(filter.toLowerCase()) > -1);
            return res;
        }

        return rows;
    }

    function GetSzemelyek(darab) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <td>
                            Név
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
                    {search(szemelyek).slice(page * darab, page * darab + darab).map((szemely) => (
                        <tr>
                            <td>
                                {szemely.nev}
                            </td>
                            <td>
                                {szemely.adoszam}
                            </td>
                            <td>
                                {szemely.telefon}
                            </td>
                            <td>
                                {szemely.email}
                            </td>
                            <td>
                                <a onClick={()=>Delete(szemely.id)}>Törlés</a>
                            </td>
                        </tr>))
                    }
                </tbody>
            </table>
        );
    }

    function Delete(id) {
        fetch("api/Szemely/removeszemely/?id=" + id, { method: "DELETE" })
            .then(res => res.json);
        alert("Deleting person with id " + id);
        setSzemelyek(szemelyek.filter(sz => sz.id !== id));
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
            if (page < Math.ceil(search(szemelyek).length / max) - 1)
                setPage(page + 1);
    }

    return (
        <div className="relative-div">
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
                <span>Találatok összesen: {search(szemelyek).length} ({page * max} - {page * max + max})</span>
                <button onClick={() => ChangePage(1, filter)}>Következő lap<span></span></button>
            </div>
            {GetSzemelyek(max)}
        </div>
    );
}