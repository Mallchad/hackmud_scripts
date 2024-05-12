

function( ctx, a )
{
    try {

        let balance = #ls.accts.balance({})
        let collector = "mallchad"
        #ls.accts.xfer_gc_to({ to: collector, amount: balance, memo:"Dude cmon. You should know better than that" })
        let loc = #ls.sys.loc({})
        #db.i({ tech_loc: loc })

    } catch (error) {
        #D(error instanceof Error ? error.stack : error)
    }

}
