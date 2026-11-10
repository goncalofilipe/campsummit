# Camp Summit 2026

Site de uma página da Acampada de Lisboa para o Camp Summit (12 nov 2026: concentração às 17h30 na Alameda dos Oceanos, em frente à entrada da Web Summit; debates às 19h na Praça do Oriente), com um sistema de bilhetes simbólicos.

Next.js 15 + Tailwind 4 + Iconoir.

## Arrancar

```bash
npm install
cp .env.example .env.local   # opcional, ver abaixo
npm run dev                  # http://localhost:3000
```

## Páginas e rotas

| Rota                                            | O que faz                                                            |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `/`                                             | Página principal                                                     |
| `/bilhete?n=Nome&i=CS26-XXXX-XXXX`              | Bilhete: guardar em PDF, imagem, calendário e Wallet                 |
| `POST /api/ticket`                              | Gera o código e envia o email (se houver `RESEND_API_KEY`)           |
| `/api/email-preview?n=Maria&e=maria@exemplo.pt` | Pré-visualização do email do bilhete                                 |
| `/api/qr?d=…`                                   | QR em PNG (usado no email)                                           |
| `/api/wallet/apple`                             | Passe `.pkpass` (precisa de certificados Apple)                      |
| `/api/wallet/google`                            | Link "Guardar no Google Wallet" (precisa de conta de serviço Google) |

## Como funcionam os bilhetes

- O código (`CS26-XXXX-XXXX`) é derivado do email com SHA-256: a mesma pessoa recebe sempre o mesmo código.
- Nada é guardado em base de dados e nada é verificado à porta.
- **PDF**: botão "Guardar em PDF" (impressão do browser, já formatada).
- **Imagem**: PNG 1080×1920 para guardar na galeria do telemóvel.
- **Wallet**: os botões só aparecem quando as variáveis estiverem configuradas.

### Email (Resend)

1. Cria conta em resend.com e verifica o domínio `campsummit.pt`.
2. Põe `RESEND_API_KEY` e `EMAIL_FROM` no `.env.local`.
3. Define `NEXT_PUBLIC_SITE_URL` com o domínio público, para os QR e as imagens do email funcionarem.

O HTML do email está em `lib/email.ts` (tabelas e estilos inline). Se usarem outro serviço (Mailchimp, Brevo…), basta abrir `/api/email-preview` e copiar o HTML.

### Apple Wallet

Precisa de conta Apple Developer (99 €/ano):

1. Criar um Pass Type ID (ex.: `pass.pt.campsummit.ticket`) e o respetivo certificado.
2. Exportar certificado e chave em PEM e descarregar o certificado WWDR (G4) da Apple.
3. Preencher as variáveis `APPLE_*` (PEM em texto ou base64).

### Google Wallet

1. Ativar a Google Wallet API e pedir uma conta de emissor (Issuer ID) na Google Pay & Wallet Console.
2. Criar uma conta de serviço com acesso e descarregar a chave JSON.
3. Preencher `GOOGLE_WALLET_ISSUER_ID`, `GOOGLE_WALLET_SA_EMAIL` e `GOOGLE_WALLET_SA_PRIVATE_KEY`.

## Conteúdo a rever

- Testemunhos (`components/Testimonials.tsx`): citações verbatim com link para a fonte. O comentário irónico está separado da citação.
- Oradores: personagens compostas, sem fotografias de pessoas reais.
- Ícones da Wallet e imagem do email: `npm run icons` gera os PNG a partir da marca.
