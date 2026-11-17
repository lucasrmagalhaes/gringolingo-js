# GringoLingo Android (TWA)

Projeto Trusted Web Activity gerado com Bubblewrap a partir de https://gringolingo.vercel.app/manifest.webmanifest.

## Identidade

- package id: `com.lucasrmagalhaes.gringolingo`
- host: `gringolingo.vercel.app`
- minSdk: 24

## Build local

1. Instale JDK 17 e o Android SDK.
2. Configure o Bubblewrap: `bubblewrap updateConfig --jdkPath=... --androidSdkPath=...`
3. Coloque o keystore de upload em `../keys/upload.keystore` (fora do git) ou ajuste `twa-manifest.json`.
4. Defina `BUBBLEWRAP_KEYSTORE_PASSWORD` e `BUBBLEWRAP_KEY_PASSWORD`.
5. Rode `bubblewrap build --skipPwaValidation` nesta pasta.

Os artefatos `.aab` e `.apk` e o keystore **nao** entram no repositorio.

### Sem o Bubblewrap

O Gradle do projeto gera o AAB sem assinatura, e o `jarsigner` assina à parte:

1. Com `JAVA_HOME` apontando para o JDK 17, rode `./gradlew bundleRelease` nesta pasta. O arquivo sai em `app/build/outputs/bundle/release/app-release.aab`.
2. Assine com `jarsigner -sigalg SHA256withRSA -digestalg SHA-256 -keystore <keystore> -signedjar app-release-signed.aab app/build/outputs/bundle/release/app-release.aab <alias>`.
3. Confira com `keytool -printcert -jarfile app-release-signed.aab`: o SHA-256 tem de ser o da chave de upload listada abaixo.

O build reescreve `app/src/main/res/xml/shortcuts.xml`; desfaça essa alteração antes de commitar.

A cada envio novo para a Play, suba `versionCode` e `versionName` em `app/build.gradle` (e `appVersionCode` no `twa-manifest.json`): a Play recusa código de versão repetido.

## Digital Asset Links

O arquivo `/.well-known/assetlinks.json` na raiz do site lista dois fingerprints SHA-256, no formato da Play Console (hexadecimal maiúsculo com dois-pontos):

- o da chave de assinatura da Google Play App Signing, que assina o app instalado pela loja. Sem ele, o app da Play abre com barra de endereço;
- o da chave de upload, para builds assinados localmente.

Se a chave de upload for trocada (por perda ou redefinição na Play Console), troque também o fingerprint dela aqui.
