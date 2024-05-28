
let abi = {
    "scripts.quine": x => #fs.scripts.quine(),
    "global": x => #G,
    "scripts.fullsec": function( parameters ) { return args.t.call( parameters ) },
    "debug": function( parameters ) { #D(parameters) }
}

// !SPELLBENDER

// Spellbender ABI
let context = script.ctx,
    args = script.args


// Functions
let log,
    detect,
    run_loc,
    runtime = x => Date.now() - script.START,
    // Variables
    perf,
    iter = 16,
    timeout = 4500,
    calls = 0,
    out = "",
    scrp_outs = [],
    scrp_out = "",
    tried = [],
    lock_args,
    lock = "l0cket",
    solvers,
    solver = {},
    colors = [ "red", "purple", "blue", "cyan", "green",
               "lime", "yellow", "orange" ]

try {
    // Used previous run's lock_args if it didn't finish
    lock_args = $G.last_unlocked && $G.last_start < 60*20000 ?
        args.args || {} : $G.lock_args || {}
    // Provide stub parameter to search for first lock
    lock_args.probe = 1
    lock_args = {}
    $G.last_start = script.START

    // List of lock open characteristics
    // Top level key is unrelated to the lock name
    // @param arg_key is the parameter to be modified given by a string or function heuristic
    // @param match can be a string, regex, or function heuristic
    // @param solutions is an array of arguments to be attempted
    solvers = {
        ez_x: { match: ["LOCK_ERROR.*EZ_", "LOCK_ERROR.*unlock command"],
                match_wrong: ["not the correct unlock command"],
                arg_key: x => {
                    let tmp = scrp_out.match( /EZ_../gs )
                    return tmp[ tmp.length - 1 ] },
                solutions: [ "open", "release", "unlock" ] },
        locket: { match: ["LOCK_ERROR.*l0cket"],
                  match_wrong: ["LOCK_ERROR.*k3y"],
                  arg_key: "l0cket",
                  solutions: [ "cmppiq", "6hh8xw", "uphlaw",
                               "vc2c7q", "tvfkyq", "xwz7ja",
                               "sa23uw", "ellux0", "72 umy0",
                               "i874y3", "9p65cu", "fr8ibu",
                               "eoq6de", "xfnkqe", "pmvr1q",
                               "y111qa" ] },
        ez_35_digit: { match: ["unlock parameter `.digit`"],
                       match_wrong: ["not the correct digit"],
                       arg_key: "digit",
                       solutions: [0,1,2,3,4,5,6,7,8,9] },
        ez_prime: { match: ["parameter.*ez_prime"],
                    match_wrong: ["not the correct prime"],
                    arg_key: "ez_prime",
                    solutions: [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31,
                                 37, 41, 43, 47, 53, 59, 61, 67, 71, 73,
                                 79, 83, 89, 97 ] },
        c00x: { match: ["CORE.*c00"],
                match_wrong: ["not"],
                arg_key: x => {
                    let tmp = scrp_out.match( /c00./gs )
                    return tmp[ tmp.length - 1 ] },
                solutions: colors,
                hook: x => {
                    let complement = (colors.indexOf( lock_args.c002 ) +4) %8,
                        triad_1 = (colors.indexOf( lock_args.c003 ) +3) %8,
                        triad_2 = (triad_1 +2) %8
                    if (lock_args.c001 != null)
                        lock_args.color_digit = lock_args.c001.length
                    if (lock_args.c002 != null)
                        lock_args.c002_complement = colors[ complement ]
                    if (lock_args.c003 != null)
                    {
                        lock_args.c003_triad_1 = colors[ triad_1 ]
                        lock_args.c003_triad_2 = colors[ triad_2 ]
                    }
                    run_loc()
                }
              }
    }

    detect = (a) => {
        return (scrp_out.match( RegExp( a, "gs" ) ) != null)
    }

    run_loc = x => {
        scrp_outs.push( args.s.call( lock_args ))
        ++calls
    }

    run_loc()

    main: while (iter-->0)
    {
        $G.lock_args = lock_args
        $s.scripts.midsec( G )
        // Make it auto-finish if no solver is found
        solver = null
        scrp_out = scrp_outs[ scrp_outs.length -1]

        // Determine solver to attempt
        for (const [k, v] of Object.entries( solvers ))
        {
            if ( detect(v.match[0]) )
            {
                solver = {
                    arg_key: typeof v.arg_key == "function" ? v.arg_key() : v.arg_key,
                    solutions: typeof v.solutions == "function" ? v.solutions() : v.solutions,
                    match_wrong: v.match_wrong,
                    hook: v.hook
                }
                break
            }
        }
        // Break if no solver or if unlocked and connection terminated
        $G.last_unlocked = scrp_out.match(/Connection Terminated/g) != null
        if (solver == null || $G.last_unlocked) break main


        // Find the lock solution
        for (const x of solver.solutions)
        {
            if (runtime() > timeout)
            {
                out += "`DTIMED OUT`\n"
                break main
            }
            lock_args[ solver.arg_key ] = x
            tried.push( x )
            run_loc()
            scrp_out = scrp_outs[ scrp_outs.length -1 ]
            if (detect( solver.match_wrong[0] ) == false) break

        }
        if (solver.hook != null) { #D(solver.hook()) }
    }

} catch (error) {
    let err = error instanceof Error ? error.stack : error,
        linums = err.match( /:\d*?:/g ).map( x => Number(x.replace(/:/g , "")) ),
        source = $s.scripts.quine({}).split("\n")
    out += `${error.message}\n`
    out += `${err}\n`

    linums.map( x => {
        out += `\nLine ${x-1}: ${source[ x-1 ]}\n`
        out += `Line ${x}: ${source[ x ]}\n`
        out += `Line ${x+1}: ${source[ x+1 ]}\n`
    } )
}

out = out.concat( scrp_out, "\n\nTried Answers:\n",
                  JSON.stringify( tried ),
                  "\n\nFinal Lock Args: \n",
                  JSON.stringify( lock_args ) )
perf = runtime()
out += `\nCalls:    ${calls} \n` +
    `Time Per Call:    ${perf/calls}ms  \n` +
    `Time Elapsed:    ${perf}ms \n`

script.success( out )
