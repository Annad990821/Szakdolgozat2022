import React, { useState, useEffect } from 'react';
import ValidateForm from '../components/ValidateForm';

import '../css/InputFieldValidateTexts.css';

export default function PostSzemelyPage() {

    const initialStateSzemelyek = {
        nev: "",
        adoszam: "",
        szekhelyid: 0,
        telefon: "",
        email: ""
    };

    const initialStateSzekhely = {
        irsz: 0,
        varos: "",
        utca: "",
        hsz: 0
    };

    const [szemely, setSzemely] = useState(initialStateSzemelyek);
    const [szekhely, setSzekhely] = useState(initialStateSzekhely);
    const [szekhelyek, setSzekhelyek] = useState([]);
    const [errors, setErrors] = useState({});
    const [ujSzekhely, setUjSzekhely] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetch("api/Szekhely/szekhelyek")
            .then(res => res.json())
            .then((json) => {
                setSzekhelyek(json);
            });
    }, []);

    async function SetSzemelyId(id) {
        await setSzemely(prevState => ({
            ...prevState,
            szekhelyid: id
        }));
        return;
    }

    const ValidateData = async (e) => {
        console.log(e);
        e.preventDefault();
        let error = ValidateForm(szemely);
        let szherror = {};

        if (ujSzekhely === false)
            szherror = ValidateForm(szekhely);

        if (error.szekhelyid !== undefined && ujSzekhely === false)
            delete error["szekhelyid"];

        if (Object.keys(error).length === 0 && Object.keys(szherror).length === 0) {
            e.target.reset();
            let szemelyJson = szemely;
            if (ujSzekhely === false) {
                await fetch("api/Szekhely", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(szekhely)
                })
                    .then(res => res.json())
                    .then(id => {
                        szemelyJson.szekhelyid = id;
                    });
            }

            fetch("api/Szemely/addszemely", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(szemelyJson)
            })


            setSzemely(initialStateSzemelyek);
            setSzekhely(initialStateSzekhely);
            alert(`Sikeresen létrehozta a(z) ${szemely.nev} nevű személyt.`);
        }
        else {
            console.log(error);
            console.log(szherror);
        }
    };

    const handleChange = e => {
        let { name, value } = e.target;
        if (e.target.name === "szekhelyid")
            value = parseInt(value);
        setSzemely(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSzh = e => {
        let { name, value } = e.target;
        if (e.target.name === "irsz" || e.target.name === "hsz")
            value = parseInt(value);
        setSzekhely(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (ujSzekhely === false) {
            setFilter("");
        }
    }, [ujSzekhely]);

    function SzekhelyValaszto() {
        if (ujSzekhely === true) {
            return (
                <div class="input-group">
                    <label className="input-text-rcorner" htmlFor="filterInput">Filter:</label>
                    <div className="input-group-append">
                        <input className="form-control" type="text" id="filterInput" value={filter} onChange={(e) => setFilter(e.target.value)} />
                        <select name="szekhelyid" onChange={handleChange}>
                            <option value={0}>Válasszon</option>
                            {search(szekhelyek).map((obj) => {
                                return (<option value={obj.id}>{obj.cim}</option>);
                            })};
                        </select>
                        {errors.szekhelyid && <p className="inputFieldError">{errors.szekhelyid}</p>}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="card">
                    <p className="inputFieldTitle">Irányítószám:</p>
                    <input type="text" name="irsz" onChange={handleChangeSzh} />
                    {errors.irsz && <p className="inputFieldError">{errors.irsz}</p>}

                    <p className="inputFieldTitle">Város:</p>
                    <input type="text" name="varos" onChange={handleChangeSzh} />
                    {errors.varos && <p className="inputFieldError">{errors.varos}</p>}

                    <p className="inputFieldTitle">Utca:</p>
                    <input type="text" name="utca" onChange={handleChangeSzh} />
                    {errors.utca && <p className="inputFieldError">{errors.utca}</p>}

                    <p className="inputFieldTitle">Házszám:</p>
                    <input type="text" name="hsz" onChange={handleChangeSzh} />
                    {errors.hsz && <p className="inputFieldError">{errors.hsz}</p>}
                </div>
            </div>
        );
    }

    function search(rows) {
        return rows.filter(row => row.cim.toLowerCase().indexOf(filter.toLowerCase()) > -1)
    }

    return (
        <form className="modalForm" onSubmit={ValidateData}>
            <p className="inputFieldTitle">Név:</p>
            <input type="text" name="nev" onChange={handleChange} />
            {errors.nev && <p className="inputFieldError">{errors.nev}</p>}

            <p className="inputFieldTitle">Adószám:</p>
            <input type="text" name="adoszam" onChange={handleChange} />
            {errors.adoszam && <p className="inputFieldError">{errors.adoszam}</p>}

            <p className="inputFieldTitle">Székhely:</p>
            <div>
                <label htmlFor="szekhely-checker">
                    Meglévő székhely
                </label>
                <input type="checkbox" checked={ujSzekhely} onChange={(e) => setUjSzekhely(e.target.checked)} />
            </div>
            {ujSzekhely}
            {SzekhelyValaszto()}

            <p className="inputFieldTitle">Telefonszám:</p>
            <input type="text" name="telefon" onChange={handleChange} />
            {errors.telefon && <p className="inputFieldError">{errors.telefon}</p>}

            <p className="inputFieldTitle">Email cím:</p>
            <input type="text" name="email" onChange={handleChange} />
            {errors.email && <p className="inputFieldError">{errors.email}</p>}

            <br />
            <br />
            <input className="btn btn-primary" type="submit" />
        </form>
    );
}