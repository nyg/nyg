### Hi there 👋

#### Personal knowledge base: [`notes.andstuff.dev`](https://notes.andstuff.dev)

- 2024-03-31 – [Releasing Java softwares with the Maven release plugin](https://notes.andstuff.dev/prog/java/release/)
- 2023-05-14 – [JDBC: showing different ways of obtaining a database connection](https://notes.andstuff.dev/prog/java/jdbc)
- 2023-03-18 – [Log4j2: logging events in different files based on ThreadContext variables](https://notes.andstuff.dev/prog/java/log4j2)
- 2023-02-25 – [Configuring `sshpass` with `gpg` and Zsh completion](https://notes.andstuff.dev/softwares/sshpass)
- 2022-12-04 – [SUID, GUID & Sticky bits explanation](https://notes.andstuff.dev/os/linux/suid)
- 2022-12-04 – [Maven basics (*work in progess*)](https://notes.andstuff.dev/softwares/maven)
- *and many other incomplete notes…*

#### Top

- [**`dependabot-vuln-viewer`**](https://github.com/nyg/dependabot-vuln-viewer) — *Overview of Dependabot security alerts for multiple GitHub repositories, uses [Apollo GraphQL](apollographql/apollo-client).*
- [**`kraken-api-java`**](https://github.com/nyg/kraken-api-java) — *A quickly written Java library for querying the Kraken REST API.*
- [**`crypto-tools`**](https://github.com/nyg/crypto-tools) — *Some tools for Binance and Kraken accounts.*

#### Misc

- [**`HTMLWithImagesToPDF`**](https://github.com/nyg/HTMLWithImagesToPDF) — *Showcasing a bug in iOS when generating a PDF from an HTML page using `UIMarkupTextPrintFormatter`.*
- [**`opaque-impl`**](https://github.com/nyg/opaque-impl) — *PoC implementation in SageMath of OPAQUE, an asymmetric PAKE protocol.*
- [**`so3-support-graphique`**](https://gitlab.com/nyg/so3-support-graphique) — *My Bachelor project consisted of adding GUI support for the school's own operating system ([SO3](smartobjectoriented/so3)) using [LVGL](lvgl/lvgl). The project is hosted [here](https://nyg.gitlab.io/so3-support-graphique/index.html).*
- [**`maven-basics`**](https://git.sr.ht/~nyg/maven-basics) — *Maven from scratch.*
- [**`sh`**](https://git.sr.ht/~nyg/sh) — *My very own post-install scripts and dot files, please don't use them.*

#### Cryptocurrency

- [**`yield-borg`**](https://github.com/nyg/yield-borg) — *A graph of SwissBorg's different yield programs.*
- [**`smart-contracts`**](https://github.com/nyg/smart-contracts) — *Some basic smart contracts in Solidity and Vyper.*

#### Dictionary

- [**`wiktionary-to-kindle`**](https://github.com/nyg/wiktionary-to-kindle) — *PoC for converting Wiktionary entries to a .mobi dictionary for Kindle, works but will not render Wiki templates which make it kind of useless. Ideally I should be using Wiktionary HTML dumps.*
- [**`wiktionarize`**](https://github.com/nyg/wiktionarize) — *Simple web pages that searches words of a text in multiple Wiktionaries.*
- [**`epub-dictionary`**](https://github.com/nyg/epub-dictionary) — *An abondonned attempt at creating a EPUB library.*

#### Code examples

- {{srht owner='nyg' name='example-java-jca' description='Some code example with the Java Cryptography Architecture API, and an attempt at writing a pure-JCA (i.e. Provider-indenpendent) ECDSA and EdDSA signature verification class.'}}
- {{srht owner='nyg' name='example-java-jmx' description='Some tests with Java\'s JMX API.'}}
- {{srht owner='nyg' name='example-java-spring-batch-bug' description='Showcasing a currently opened bug ([#4427](spring-projects/spring-batch/issues/4427)) in Spring Batch with the Oracle database when using `List<>` as a parameter.'}}
- {{srht owner='nyg' name='example-java-carnotzet' description='A simple app using Swissquote\'s [Carnotzet](swissquote/carnotzet) framework.'}}
- {{srht owner='nyg' name='example-java-querydsl' description='An attempt at defining JPA entities in one Maven module and importing this module in another, and generating QueryDSL\'s query type classes from there (works with Java EE but not Jakarta).'}}
- {{srht owner='nyg' name='example-java-cli-app' description='An example app that uses the [Apache Commons CLI library](https://commons.apache.org/proper/commons-cli).'}}
- {{srht owner='nyg' name='example-js-cli-app' description='A simple Node.js command-line app example using ESM.'}}
- [**`ncc-pkg-examples`**](https://github.com/nyg/ncc-pkg-examples) — *Trying and failing to package a Next.js app with `ncc` and `pkg`.*

#### Swift gists

- {{gist 'AddJPEGComment.swift'}}
- {{gist 'EXIFUserComment.swift'}}
- {{gist 'MemoryAddress.swift'}}
- {{gist 'iOSCreatePDF.swift'}}
- {{gist 'Uptime.swift'}}

#### Misc gists

- {{gist 'uptime.c'}}
- {{gist 'pdk.c'}}
- {{gist 'AllJCAServices.java'}}
- {{gist 'fk_generate_delete.sql'}}
- {{gist 'fk_delete_recursive.sql'}}

### Dynamic statistics

#### Most starred repositories

| Description | ![stargazers](assets/stargazers.svg) | ![forks](assets/forks.svg) | ![issues](assets/issues.svg)
| :--- | ---: | ---: | ---: |
{{#list repositories sortBy='stargazerCount' direction='desc' top=3}}
| [{{description}}]({{url}}) | {{stargazerCount}} | {{forkCount}} | {{issues.totalCount}}
{{/list}}

#### Most starred gists

| Description | ![stargazers](assets/stargazers.svg) | ![forks](assets/forks.svg) | ![comments](assets/comments.svg)
| :--- | ---: | ---: | ---: |
{{#list gists sortBy='stargazerCount' direction='desc' top=3}}
| [{{description}}]({{url}}) | {{stargazerCount}} | {{forks.totalCount}} | {{comments.totalCount}}
{{/list}}

#### Misc

![Profile](https://github-readme-stats.vercel.app/api?username=nyg&show_icons=true&show=discussions_started)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=nyg&layout=compact)
![visitor badge](https://visitor-badge.laobi.icu/badge?page_id=nyg.nyg)
