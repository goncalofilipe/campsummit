import { pem } from "./server";

export function appleConfigured(): boolean {
  return Boolean(
    process.env.APPLE_PASS_TYPE_ID &&
      process.env.APPLE_TEAM_ID &&
      process.env.APPLE_WWDR_PEM &&
      process.env.APPLE_SIGNER_CERT_PEM &&
      process.env.APPLE_SIGNER_KEY_PEM
  );
}

export function googleConfigured(): boolean {
  return Boolean(process.env.GOOGLE_WALLET_ISSUER_ID && process.env.GOOGLE_WALLET_SA_EMAIL && process.env.GOOGLE_WALLET_SA_PRIVATE_KEY);
}

export function appleCerts() {
  return {
    wwdr: pem(process.env.APPLE_WWDR_PEM)!,
    signerCert: pem(process.env.APPLE_SIGNER_CERT_PEM)!,
    signerKey: pem(process.env.APPLE_SIGNER_KEY_PEM)!,
    signerKeyPassphrase: process.env.APPLE_SIGNER_KEY_PASSPHRASE || undefined,
  };
}
