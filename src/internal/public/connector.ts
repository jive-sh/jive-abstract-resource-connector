import { Option } from "effect";
import { resourceScaffold, type ResourceAbstract } from "jive-abstract-resource";

/**
 * The connector kind of resource: a Convex component that links Jive to an outside system (npm, Slack, a
 * database). It has no contract of its own; a kind of connector with one, such as a package registry, is an
 * abstract extending this one.
 */
export const connectorAbstract: ResourceAbstract = {
  cliName: "jive-resource-connector",
  description: "scaffold, build, audit and publish a Jive connector: a resource, as a Convex component, linking Jive to an outside system",
  abstractPackageName: "jive-abstract-resource-connector",
  contract: Option.none(),
  scaffold: resourceScaffold,
};
