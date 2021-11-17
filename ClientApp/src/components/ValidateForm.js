export default function ValidateForm(json) {
    if (Object.entries(json).length === 0) {
        console.log("null");
    }
    const res = {};
    for (const [key, value] of Object.entries(json)) {
        if (value === "" || value === undefined || value === null) {
            res[key] = `A(z) ${key} nem lehet üres mező.`;
        }
        if (key === "szekhelyid" && value === 0)
            res[key] = `Kérem válassza ki a székhelyet!`;
        if (key === "irsz" && value === 0)
            res[key] = `Kérem adja meg az irányítószámot!`;
        if (key === "hsz" && value === 0)
            res[key] = `Kérem adja meg a házszámot!`;
    }
    return res;
}