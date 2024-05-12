function(ctx, args) {
    const abi = {
        'debug': (value) => #D(value),
        'scripts.fullsec': (args) => #fs.scripts.fullsec(args),
        // Add additional scripts you would like to use
    }
    let l = #fs.scripts.lib()
    var out
    return #fs.akira.spellbender().script(ctx, args, #fs.scripts.quine(), abi)
    //$ -- begin --
    //$module.exports = (ctx, args) => {
    //$  out = "Dark magic is not cool"
    //$  out = out + ["hello", "thar"].join()
    //$  return out
    //$}
    //$ -- end --
}
