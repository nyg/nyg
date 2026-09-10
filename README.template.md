### Hello 👋 <a href="https://buymeacoffee.com/_nyg" title="Buy me a coffee"><img align="right" src="https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-donate-yellow.svg" alt="Buy Me A Coffee" /></a>

#### Desktop apps

- {{repo 'wiktionary-to-kindle'}}
- {{repo 'qoqa-compta'}}
- {{repo 'crypto-tools'}}

#### Web apps

- {{repo 'autoscout24-trends'}}
- {{repo 'dependabot-vuln-viewer'}}
- {{repo 'yield-borg'}}
- {{repo 'climbmania-tracker'}}

#### CLI tools

- {{repo 'jmxsh'}}

#### Libraries

- {{repo 'kraken-api-java'}}
- {{repo 'scrapy-seleniumbase-cdp'}}
- {{repo 'libdegiro'}}

#### Misc
- {{repo 'mkv-cleaner'}}
- {{repo 'vagrant-bitcoin-node'}}

#### Contributions

<table>
  <tr>
    <th align="left"><img width="700" height="1">Repository</th>
    <th align="right"><img width="300" height="1">Pull requests</th>
  </tr>
  {{#filterout pullRequests 'repo.owner.login' (array 'panticne' 'gs-2019' 'SoftEng-HEIGVD' 'Quartz-Core')}}
  {{#list this sortBy='prCount' direction='desc'}}
  <tr>
    <td><a href="{{repo.url}}">{{repo.nameWithOwner}}</a></td>
    <td align="right">{{#each prs}}<a href="{{url}}" title="{{title}}">#{{number}}</a> {{/each}}</td>
  </tr>
  {{/list}}
  {{/filterout}}
</table>

#### More stuff

<details>
<summary>Other repositories</summary>

#### Dictionary

- {{repo 'wiktionarize'}}
- {{repo 'greek-dictionaries'}}

#### iOS & Swift

- {{repo 'HTMLWithImagesToPDF'}}
- {{repo 'iOSSystemSoundsLibrary'}}
- {{gist 'iOSCreatePDF.swift'}}
- {{gist 'MemoryAddress.swift'}}
- {{gist 'EXIFUserComment.swift'}}
- {{gist 'AddJPEGComment.swift'}}
- {{gist 'Uptime.swift'}}
- {{gist 'Serialize.swift'}}
- {{gist 'UIApplicationDelegate.swift'}}
- {{gist 'sequence_iterator.swift'}}

#### Java & JMX

- {{gist 'AllJCAServices.java'}}
- {{gist 'FreeSwap.java'}}
- {{gist 'AsynchronousServerSocketChannelTest.java'}}

#### Crypto & Finance

- {{repo 'smart-contracts'}}
- {{repo 'opaque-impl'}}
- {{repo 'vagrant-bitcoin-node'}}

#### Tools & Projects

- {{repo 'pagerduty'}}
- {{repo 'h2-recover'}}


#### Code examples

- {{repo 'example-jmx'}}
- {{repo 'example-spring-batch-bug'}}
- {{repo 'maven-basics'}}

#### Misc

- {{repo 'sh'}}
- {{repo 'heig-vd'}}
- {{repo 'greek-election-data'}}
- {{repo 'renovate-presets'}}
- {{gist 'uptime.c'}}
- {{gist 'pdk.c'}}
- {{gist 'div_euc_hex.c'}}
- {{gist 'auto_extract.sh'}}
- {{gist 'use-local-storage.js'}}
- {{gist 'request.mjs'}}
- {{gist 'yql_json.html'}}
- {{gist 'enlarge_image.php'}}
- {{gist 'fk_generate_delete.sql'}}
- {{gist 'fk_delete_recursive.sql'}}

</details>

<details>
<summary>Statistics</summary>

#### Cards (by *[readme-tools/github-readme-stats](https://github.com/readme-tools/github-readme-stats)*)

<div>
  <img src="assets/cards/stats.svg" alt="Profile" />
  <img src="assets/cards/top-langs.svg" alt="Top Langs" />
</div>

#### Most starred repositories

<table>
  <tr>
    <th align="left"><img width="1000" height="1">Repository</th>
    <th align="right"><img width="1" height="1"><img src="assets/stargazers.svg"></th>
    <th align="right"><img width="1" height="1"><img src="assets/forks.svg"></th>
    <th align="right"><img width="1" height="1"><img src="assets/issues.svg"></th>
  </tr>
  {{#list repositories sortBy='stargazerCount' direction='desc' top=3}}
  <tr>
    <td><a href="{{url}}"><strong>{{name}}</strong></a> — {{description}}</td>
    <td align="right">{{stargazerCount}}</td>
    <td align="right">{{forkCount}}</td>
    <td align="right">{{issues.totalCount}}</td>
  </tr>
  {{/list}}
</table>

#### Most starred gists

<table>
  <tr>
    <th align="left"><img width="1000" height="1">Gist</th>
    <th align="right"><img width="1" height="1"><img src="assets/stargazers.svg"></th>
    <th align="right"><img width="1" height="1"><img src="assets/forks.svg"></th>
    <th align="right"><img width="1" height="1"><img src="assets/comments.svg"></th>
  </tr>
  {{#list gists sortBy='stargazerCount' direction='desc' top=3}}
  <tr>
    <td><a href="{{url}}"><strong>{{files.[0].name}}</strong></a> — {{description}}</td>
    <td align="right">{{stargazerCount}}</td>
    <td align="right">{{forks.totalCount}}</td>
    <td align="right">{{comments.totalCount}}</td>
  </tr>
  {{/list}}
</table>

</details>
