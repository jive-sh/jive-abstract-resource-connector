import { expect, test } from "bun:test";
import { Schema } from "effect";
import { commonScaffoldFiles, PackageJsonSchema } from "jive-abstract-resource";
import { connectorAbstract } from "./connector";

test("a scaffolded connector calls this abstract's CLI from every hook, and satisfies the resource schema", () => {
  const files = { ...commonScaffoldFiles(connectorAbstract, { packageName: "jive-resource-connector-example", componentName: "example" }), ...connectorAbstract.scaffold({ packageName: "jive-resource-connector-example", componentName: "example" }) };
  const packageJson = Schema.decodeUnknownSync(PackageJsonSchema)(JSON.parse(files["package.json"]!));
  for (const hook of ["get-config", "build", "audit", "deploy-plan", "upload-artifacts", "deploy"]) {
    expect(Object.values(packageJson.scripts)).toContain(`jive-resource-connector cicd ${hook}`);
  }
  expect(files["README.md"]).toContain("It extends\n`jive-abstract-resource-connector`, whose `jive-resource-connector` CLI");
  expect(files["src/component/lib.ts"]).toContain("export const ping");
});
