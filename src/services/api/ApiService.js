/**
 * @typedef {import('./client').Client}
 */

import OpenAPIClientAxios from "openapi-client-axios";
import Schema from "./openapi-schema";

const openApi = new OpenAPIClientAxios({ definition: Schema });
const API_URL = process.env.REACT_APP_BASE_URL;
/**
 *
 * @type
 */
const client = openApi.initSync();
client.defaults.baseURL = API_URL;

export default client;
