#!/bin/bash
# Copia .env.local sulla VPS e riavvia l'app.
# Prima di usarlo: compila sotto VPS_HOST, VPS_USER e APP_PATH.
# Richiede: .env.local nella root del progetto (con SMTP_PASS già impostato).

set -e
cd "$(dirname "$0")/.."

# --- Compila questi valori (indirizzo VPS, utente SSH, cartella dell'app) ---
VPS_HOST=""      # es. 123.45.67.89 o vps.buluagency.it
VPS_USER=""      # es. root o ubuntu
APP_PATH=""      # es. /var/www/bulu-agency

if [[ -z "$VPS_HOST" || -z "$VPS_USER" || -z "$APP_PATH" ]]; then
  echo "Apri scripts/setup-vps-env.sh e compila VPS_HOST, VPS_USER e APP_PATH."
  exit 1
fi

if [[ ! -f .env.local ]]; then
  echo "Manca .env.local nella root del progetto."
  exit 1
fi

echo "Invio .env.local sulla VPS come $APP_PATH/.env ..."
scp .env.local "$VPS_USER@$VPS_HOST:$APP_PATH/.env"

echo "Riavvio l'app (pm2 restart)..."
ssh "$VPS_USER@$VPS_HOST" "cd $APP_PATH && pm2 restart bulu-agency || true"

echo "Fatto. Puoi provare il form sul sito."
