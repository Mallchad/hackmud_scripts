
local debug_dir = "build/debug"
local wasm_encode_file = "tools/akria_encode.ts"
local wasm_encode_exec = "akira_encode.js"
local wasm_encode_built = debug_dir .. "/" .. wasm_encode_exec

local xmake_source_dir = "/local/repos/hackmud_scripts/build/source/"

function hack_build (target)
   os.mkdir( xmake_source_dir )
   local encoder_command = ( string.format( "node_modules/esbuild/bin/esbuild %s --outfile=%s/%s",
                                            wasm_encode_file, debug_dir, wasm_encode_exec ) )
   os.exec( encoder_command )
   os.exec( "npm run hsm -- push source *.*" )
   -- try { function() os.exec( "node_modules/hackmud-script-manager/bin/hsm.js push source *.*" )  end}
   os.exec( "node ".. wasm_encode_built .. " spellbender_source/t1_crack.js" )
   print( "Encoded Akira WASM engine" )
end

target( "hackengine" )
    set_kind( "phony" )
    on_build( hack_build )
