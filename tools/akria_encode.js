"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var filePath = process.argv.slice(2)[0];
var fileName = node_path_1["default"].basename(filePath);
var raw = node_fs_1["default"].readFileSync(filePath, 'utf-8');
var result = __spreadArray(__spreadArray([
    "function(ctx, args) {",
    '  return #fs.akira.spellbender().script(ctx, args, #fs.scripts.quine(), #ns.akira.abi())',
    '//$ -- begin -- '
], raw.split('\n').map(function (line) { return "//$ " + line; }), true), [
    '//$ -- end --',
    '  }',
], false).join('\n');
node_fs_1["default"].writeFileSync("/home/mallchad/.config/hackmud/incantation/scripts/" + fileName, result, 'utf-8');
