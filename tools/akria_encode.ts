import fs from 'node:fs'
import path from 'node:path'

const [filePath] = process.argv.slice(2)
const fileName = path.basename(filePath!)

let raw = fs.readFileSync(filePath!, 'utf-8')
const header_dividor = raw.match( RegExp("\!SPELLBENDER\n", "ds" ) )
let header = ""
let script = ""

if (header_dividor)
{
    header = raw.substring( 0, header_dividor.indices[0][1] )
    script = raw.substring( header_dividor.indices[0][1] )
}
else throw new Error( "// !SPELLBENDER dividor not found" )
const result = [
    `function(ctx, args) {`,
    header,
    '  return #fs.akira.spellbender().script(ctx, args, #fs.scripts.quine())',
    '//$ -- begin -- ',
    ...script.replace( "#G", "$G" ).split('\n').map((line) => `//$ ${line}`),
    '//$ -- end --',
    '  }',
].join('\n')

fs.writeFileSync(`/local/repos/hackmud_scripts/build/source/${fileName}`, result, 'utf-8')
