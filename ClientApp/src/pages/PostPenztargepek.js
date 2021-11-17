import React, { useEffect, useState } from 'react';
import ValidateForm from '../components/ValidateForm';

import '../css/InputFieldValidateTexts.css';

export default function PostPenztergepekPage() {

    const initialStatepenztargepek = {
        penztargepid: 0,
        ap: "",
        szemelyid: -1,
        telephelyid: -1,
        beuzemeles: ""
    };

    const initialStateTelephely = {
        irsz: 0,
        varos: "",
        utca: "",
        hsz: 0
    }

    const [penztargep, setpenztargep] = useState(initialStatepenztargepek);
    const [telephely, setTelephely] = useState(initialStateTelephely);
    const [szemelyek, setSzemelyek] = useState([]);
    const [telephelyek, setTelephelyek] = useState([]);
    const [errors, setErrors] = useState({});
    const [meglevoTelephely, setmeglevoTelephely] = useState(false);
    const [filter, setFilter] = useState("");
    const [filter2, setFilter2] = useState("");

    useEffect(() => {
        fetch("api/Szemely/szemelyek")
            .then(res => res.json())
            .then((json) => {
                setSzemelyek(json);
            });
        fetch("api/Telephely")
            .then(res => res.json())
            .then((json) => {
                setTelephelyek(json);
            });
    }, []);

    const ValidateData = async (e) => {
        e.preventDefault();
        let error = ValidateForm(penztargep);
        let therror = {};

        if (meglevoTelephely === false)
            therror = ValidateForm(telephely);

        if (error.telephelyid !== undefined && meglevoTelephely === false)
            delete error["telephelyid"];

        if (Object.keys(error).length === 0 && Object.keys(therror).length === 0) {
            e.target.reset();

            let ptgJson = penztargep;

            if (!meglevoTelephely) {
                await fetch("api/Telephely", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(telephely)
                })
                    .then(res => res.json())
                    .then(id => {
                        ptgJson.telephelyid = id;
                    });
            }

            fetch("api/Penztargep", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ptgJson)
            });

            setpenztargep(initialStatepenztargepek);
            setTelephely(initialStateTelephely);
        }
        else {
            console.log(error);
        }
    };

    const handleChange = e => {
        let { name, value } = e.target;
        if (e.target.name === "szemelyid" || e.target.name === "telephelyid")
            value = parseInt(value);
        setpenztargep(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeTh = e => {
        let { name, value } = e.target;
        if (e.target.name === "irsz" || e.target.name === "hsz")
            value = parseInt(value);
        setTelephely(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (meglevoTelephely === false) {
            setFilter("");
        }
    }, [meglevoTelephely]);

    function SzemelyValaszto() {
        return (
            <div className="input-group">
                <label className="input-text-rcorner" htmlFor="filterInput">Filter:</label>
                <div className="input-group-append">
                    <input className="form-control" type="text" id="filterInput" value={filter} onChange={(e) => setFilter(e.target.value)} />
                    <select name="szemelyid" onChange={handleChange}>
                        <option value={0}>Válasszon</option>
                        {search(szemelyek).map((obj) => {
                            return (<option value={obj.id}>{obj.nev}</option>);
                        })};
                    </select>
                    {errors.szemelyid && <p className="inputFieldError">{errors.szemelyid}</p>}
                </div>
            </div>
        );

        function search(rows) {
            return rows.filter(row => row.nev.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        }
    }

    function TelephelyValaszto() {
        if (meglevoTelephely === true) {
            return (
                <div className="input-group">
                    <label className="input-text-rcorner" htmlFor="filterInput">Filter:</label>
                    <div className="input-group-append">
                        <input className="form-control" type="text" id="filterInput" value={filter2} onChange={(e) => setFilter2(e.target.value)} />
                        <select name="telephelyid" onChange={handleChange}>
                            <option value={0}>Válasszon</option>
                            {search(telephelyek).map((obj) => {
                                return (<option value={obj.id}>{obj.cim}</option>);
                            })};
                        </select>
                        {errors.telephelyid && <p className="inputFieldError">{errors.telephelyid}</p>}
                    </div>
                </div>
            );
            function search(rows) {
                return rows.filter(row => row.cim.toLowerCase().indexOf(filter2.toLowerCase()) > -1)
            }
        }

        return (
            <div className="card">
                <p className="inputFieldTitle">Irányítószám:</p>
                <input type="text" name="irsz" onChange={handleChangeTh} />
                {errors.irsz && <p className="inputFieldError">{errors.irsz}</p>}

                <p className="inputFieldTitle">Város:</p>
                <input type="text" name="varos" onChange={handleChangeTh} />
                {errors.varos && <p className="inputFieldError">{errors.varos}</p>}

                <p className="inputFieldTitle">Utca:</p>
                <input type="text" name="utca" onChange={handleChangeTh} />
                {errors.utca && <p className="inputFieldError">{errors.utca}</p>}

                <p className="inputFieldTitle">Házszám:</p>
                <input type="text" name="hsz" onChange={handleChangeTh} />
                {errors.hsz && <p className="inputFieldError">{errors.hsz}</p>}
            </div>

        );

        
    }
    return (
        <form className="modalForm" onSubmit={ValidateData}>
            <p className="inputFieldTitle">Pénztárgép AP száma:</p>
            <input type="text" name="ap" onChange={handleChange} />
            {errors.ap && <p className="inputFieldError">{errors.ap}</p>}

            <p className="inputFieldTitle">Személy neve:</p>
            {SzemelyValaszto()}

            <p className="inputFieldTitle">Telephely:</p>
            <div>
                <label htmlFor="telephely-checker">
                    Meglévő telephely
                </label>
                <input type="checkbox" checked={meglevoTelephely} onChange={(e) => setmeglevoTelephely(e.target.checked)} />
            </div>
            {meglevoTelephely}
            {TelephelyValaszto()}

            <p className="inputFieldTitle">Beüzemelés időpontja:</p>
            <input type="date" name="beuzemeles" onChange={handleChange} />
            {errors.beuzemeles && <p className="inputFieldError">{errors.beuzemeles}</p>}

            <br />
            <br />
            <input className="btn btn-primary" type="submit" />
        </form>
    );
}