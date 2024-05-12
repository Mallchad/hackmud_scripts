
function(c, a) { /* #fs.user.name({key:value}) */

    // List of strings of the same corrupted data
    let d = [];
    let out = [];
    let out1 = "";
    for (let i=0; i<3; ++i)
    {
        d.push( a.s.call( a.args ) );
    }

    let tmp;
    let orig = "";
    for (let i_loc=0; i_loc<d[0].length; ++i_loc)
    {
        let r = new RegExp( "`.[¡|¢|Á|¤|Ã|¦|§|¨|©|ª]`", "g" );
        d[0][i_loc] = d[0][i_loc].replaceAll( r , '#' );
        d[1][i_loc] = d[1][i_loc].replaceAll( r , '#' );
        d[2][i_loc] = d[2][i_loc].replaceAll( r , '#' );
        tmp = ""
        for (let i=0; i<d[0][i_loc].length; ++i)
        {
            let c1 = d[0][i_loc][i];
            let c2 = d[1][i_loc][i];
            let c3 = d[2][i_loc][i];
            // Matches
            tmp += (c1 == c2 ? c1 :
                    c2 == c3 ? c2 :
                    c1 == c3 ? c3 : "e" );
            if (tmp[i] > 127) {orig += (c1 + c2 + c3+ "|")}
        }
        out.push(tmp);
    }
    // out.map( (x) => out1 += x + "\n" )
    return { msg: out, ok: true };
}
                            
