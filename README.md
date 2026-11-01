# jive-abstract-resource-connector

A Jive abstract for **connectors**: resources that link Jive to an outside system (npm, Slack, a database). It
extends [`jive-abstract-resource`](https://github.com/jive-sh/jive-abstract-resource), which makes a resource a
[Convex component](https://docs.convex.dev/components/authoring) published to npm and supplies the scaffold, the
package.json schema and the six CI/CD hooks. This package adds the connector kind and its CLI,
`jive-resource-connector`. It is a library, not a Convex component itself.

This package was `jive-abstract-connector` until 0.2.1. Its machinery moved to `jive-abstract-resource`; the
names changed with it (`ConnectorAbstract` is `ResourceAbstract`, `runConnectorCli` is `runResourceCli`).

## Create a connector

```sh
bunx jive-resource-connector create jive-resource-connector-example
```

That writes the package, adds `jive-abstract-resource-connector` as a dev dependency, installs, and generates the
component's code, so the result builds as it stands. The default component name is the package name without
`jive-resource-`, camelCased (`connectorExample` here); pass `--component <identifier>` to choose another.
Layout, `codegen`, environment variables and what each hook does are `jive-abstract-resource`'s; see its README.

## Kinds of connector with a contract

A kind of connector, such as a package registry, is an abstract extending this one. It depends on this package,
which re-exports everything `jive-abstract-resource` exports, and runs the CLI with its own definition:

```ts
// src/entrypoints/jive-resource-connector-package-registry.ts in jive-abstract-resource-connector-package-registry
import { Option } from "effect";
import { runResourceCli } from "jive-abstract-resource-connector";

runResourceCli({
  cliName: "jive-resource-connector-package-registry",
  description: "…",
  abstractPackageName: "jive-abstract-resource-connector-package-registry",
  contract: Option.some({ componentApiType: "PackageRegistryComponentApi" }),
  scaffold: packageRegistryScaffold,
});
```

## Limitations

- `jive create resource connector` is not built: `jive create` does not resolve abstracts yet. Use
  `jive-resource-connector create`.
- The connector kind adds no contract and no files beyond `jive-abstract-resource`'s; it names the kind.
