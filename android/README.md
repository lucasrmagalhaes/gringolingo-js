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

## Digital Asset Links

O arquivo `/.well-known/assetlinks.json` na raiz do site precisa listar o fingerprint SHA-256 da chave de upload e, depois do primeiro upload na Play Console, tambem o fingerprint da chave de assinatura da Google Play App Signing.
