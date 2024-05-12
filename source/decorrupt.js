
function(context, a)// s:#s.user.name, args:{}
{
    // Corrupted Data
    var d = [],
        l = #fs.scripts.lib(),
        time_elapsed,
        // Scriptor Call
        sc = x => a.s.call(a.args),
        // Replace ALl
        ra = x => x.replaceAll( r , '§' ),
        r = new RegExp ( "`.[¡¢Á¤Ã¦§¨©ª]`", "g" ),
        // Main Function
        m,
        // Errors
        err = 0,
        corrected = 0,
        out = "",
        // Temp chars
        c1 = "",
        c2 = "",
        c3 = "";
    d[10] = d[11] = "";
    try {

        if ( !("s" in a) ) { return "need to provide script s: #s. to run" }

        // Get multiple variations of corruption
        d[0] = sc()
        d[1] = sc()
        m = x => {


            if ( typeof (d[0]) == 'object' )
            {
                d[0].map( (x) => d[10] += "\n" + x );
                d[1].map( (x) => d[11] += "\n" + x );
            }
            else
            {
                d.copyWithin( 10, 0, 4);
            }

            d[10] = ra( d[10] )
            d[11] = ra( d[11] )

            for (let i=0; i<d[10].length; ++i)
            {
                let c1 = d[10][i],
                    c2 = d[11][i],
                    p3 = false;             // Deliberately induce error

                // Matches
                out += ( c1 != "§" ? c1 :
                         c2 != "§" ? c2 : "§" )
            }
        }
        m()
        // Error Checking
        err = out.match( /§/g );
        let tmp = out.matchAll( /§/g );
        for (let x of tmp)
        {
            out += d[10][x.index]
            out += d[11][x.index]
            out += "\n"
        }
        if (err != null) { err = err.length; } else { err = 0; }
        // Benchmarking
        time_elapsed = (Date.now() - _ST )
    } catch (error) {
        out += error instanceof Error ? error.stack : error
    }

    return { msg: out +
             "\n\nunresolved errors: " + err +
             "\ntime elapsed: " + time_elapsed, ok:true };
}
