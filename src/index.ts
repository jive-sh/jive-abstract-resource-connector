/**
 * The public surface of this abstract: the connector kind's definition, and everything jive-abstract-resource
 * exports, which an abstract extending this one (a kind of connector with a contract) builds its CLI from.
 * Connector packages reach the hooks through the `jive-resource-connector` CLI.
 */
export * from "jive-abstract-resource";
export { connectorAbstract } from "./internal/public/connector";
