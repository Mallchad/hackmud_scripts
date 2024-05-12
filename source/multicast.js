

function(ctx, a)//{ s: #s.user.name, t:#s.user.name, u:#s.user.name, v:#s.user.name, sargs: {}, targs: {}, uargs: {}, vargs: {} }
{

    try {
        var sr = [],
            a = a || {},
            r, out,
            l = #fs.scripts.lib(),
            help = "Must take the form \n\
 { s: #s.user.name, t:#s.user.name, u:#s.user.name, v:#s.user.name, sargs: {}, targs: {}, uargs: {}, vargs: {}} "

        if (a.s == undefined) return "No valid arugment s specified\n"+help
        if (a.help) return help

        r = x => {
            if (typeof a[x] != 'undefined' && typeof a[x] != 'object') {
                #D( "Type: " +typeof x )
                throw( "One of 's, t, u, v' arguments is not a scriptor" )
            } else if (a[x] != null) {
                sr.push( `---- Script ${x}: ${a[x].name} \
${JSON.stringify( a[ x+"args" ] ) || "{}"} -------` )
                let tmp = a[x].call( a[x+"args"] ),
                    tmp2 = []
                if (!l.is_arr( a[x] ) && typeof tmp == "object")
                {
                    for (let [k, v] of Object.entries(tmp)) tmp2.push( v )
                } else { tmp2 = tmp; }
                sr.push( tmp2 )
            }
        }
        r("s"); r("t"); r("u"); r("v")

        out = sr.flat( 100 )
    } catch (error) {
        #D(error instanceof Error ? error.stack : error)
    }

    return out;
}
