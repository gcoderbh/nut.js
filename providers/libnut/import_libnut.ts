import ln from "./libnut";

// Import the local libnut-core using a declaration merge approach
declare const require: any;
const libnut: typeof ln = require("libnut");

export {
    libnut,
}