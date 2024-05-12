
function(context, a) { // dat: 2
    let l = [ "NULLSEC", "LOWSEC", "MIDSEC", "HIGHSEC", "FULLSEC" ],
        sec = #fs.scripts.get_level({ name: a.s.name });
    if (sec != 4) return { msg: "script is not FULLSEC, bailing.\nSecurity: "
                           +l[sec], ok: false }
    let out = a.s.call( a.args );
    return { msg: out, ok: true }

}
