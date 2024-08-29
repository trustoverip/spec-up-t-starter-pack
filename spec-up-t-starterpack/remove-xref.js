/**
 * @file remove-xref.js
 * @description This script removes a cross-reference entry from an external specification file using the 
 * `spec-up-t` library. It takes two arguments: the term to be removed and the external 
 *  specification file where the removal should take place.
 * 
 *  This script is an intermediary between the `spec-up-t` library and the command line, to avoid issues
 *  with escaping quotes in the command line.
 *
 * @usage
 *   node remove-xref.js <term> <externalSpec>
 *   - <term>: The term to remove from the external specification.
 *   - <externalSpec>: The path to the external specification file where the cross-reference should be removed.
 *
 * @example
 *   node remove-xref.js "Aal" "test-1"
 *
 * @requires spec-up-t/src/get-xrefs-data.js
 * @function removeXref
 * @param {string} term - The term to be removed from the cross-reference list.
 * @param {string} externalSpec - The path to the external specification file.
 */


const args = process.argv.slice(2);
const term = args[0];
const externalSpec = args[1];
require('spec-up-t/src/get-xrefs-data.js').removeXref(term, externalSpec);
