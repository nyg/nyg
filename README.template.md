#### Featured projects

- {{repo 'wiktionary-to-kindle'}}
- {{repo 'scrapy-seleniumbase-cdp'}}
- {{repo 'jmxsh'}}
- {{repo 'qoqa-compta'}}
- {{repo 'autoscout24-trends'}}
- {{repo 'dependabot-vuln-viewer'}}
- {{repo 'kraken-api-java'}}
- {{repo 'crypto-tools'}}
- {{repo 'mkv-cleaner'}}

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

- {{srht owner='nyg' name='example-java-jca' description='Some code example with the Java Cryptography Architecture API, and an attempt at writing a pure-JCA (i.e. Provider-indenpendent) ECDSA and EdDSA signature verification class.'}}
- {{srht owner='nyg' name='example-java-jmx' description='Some tests with Java\'s JMX API.'}}
- {{srht owner='nyg' name='example-java-spring-batch-bug' description='Showcasing a currently opened bug ([#4427](spring-projects/spring-batch/issues/4427)) in Spring Batch with the Oracle database when using `List<>` as a parameter.'}}
- {{srht owner='nyg' name='example-java-carnotzet' description='A simple app using Swissquote\'s [Carnotzet](swissquote/carnotzet) framework.'}}
- {{srht owner='nyg' name='example-java-querydsl' description='An attempt at defining JPA entities in one Maven module and importing this module in another, and generating QueryDSL\'s query type classes from there (works with Java EE but not Jakarta).'}}
- {{srht owner='nyg' name='example-java-cli-app' description='An example app that uses the [Apache Commons CLI library](https://commons.apache.org/proper/commons-cli).'}}
- {{srht owner='nyg' name='example-js-cli-app' description='A simple Node.js command-line app example using ESM.'}}
- {{srht owner='nyg' name='maven-basics' description='Maven from scratch.'}}
- {{repo 'ncc-pkg-examples'}}

#### Misc

- {{srht owner='nyg' name='sh' description='My very own post-install scripts and dot files, please don\'t use them.'}}
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
