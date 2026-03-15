#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="/Users/likai.lear/Desktop/lear-galxe/galxe-web/apps/tests"
NVM_VERSION="22.11.0"
# SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/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"
LOG_FILE="${PROJECT_DIR}/galxe-tph-$(date +%Y%m%d-%H%M%S).log"

json_escape() {
  local s="${1:-}"
  # Remove ANSI ESC control char to keep JSON valid.
  s="${s//$'\e'/}"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\t'/\\t}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/}"
  printf '%s' "${s}"
}

notify_slack() {
  local text="$1"
  if [[ -z "${SLACK_WEBHOOK_URL}" ]]; then
    echo "SLACK_WEBHOOK_URL not set, skip Slack notification." >&2
    return 0
  fi

  local payload
  local resp
  payload="{\"text\":\"$(json_escape "${text}")\"}"
  resp="$(curl -sS -X POST -H 'Content-type: application/json' \
    --data "${payload}" \
    "${SLACK_WEBHOOK_URL}" || true)"
  if [[ -n "${resp}" && "${resp}" != "ok" ]]; then
    echo "Slack webhook response: ${resp}" >&2
  fi
}

send_log_to_slack() {
  local exit_code="$1"
  local status_text
  local content
  local chunk
  local part=1
  local max_part=20
  local chunk_size=3000

  if [[ "${exit_code}" -eq 0 ]]; then
    status_text="Task finished successfully (exit=0)"
  else
    status_text="Task failed (exit=${exit_code})"
  fi

  content="$(cat "${LOG_FILE}" 2>/dev/null || true)"
  if [[ -z "${content}" ]]; then
    notify_slack "${status_text}\n\n(no log output)"
    return 0
  fi

  while [[ -n "${content}" && "${part}" -le "${max_part}" ]]; do
    chunk="${content:0:${chunk_size}}"
    content="${content:${chunk_size}}"
    notify_slack "${status_text} | log part ${part}\n\`\`\`\n${chunk}\n\`\`\`"
    part=$((part + 1))
  done

  if [[ -n "${content}" ]]; then
    notify_slack "${status_text}\n\n(log truncated after ${max_part} parts)"
  fi
}

on_exit() {
  local code=$?
  send_log_to_slack "${code}"
  # rm -f "${LOG_FILE}"
  exit "${code}"
}

trap on_exit EXIT

# Try to load nvm for non-interactive shells (e.g. bot execution).
if [[ -s "${HOME}/.nvm/nvm.sh" ]]; then
  # shellcheck disable=SC1090
  . "${HOME}/.nvm/nvm.sh"
fi

if command -v nvm >/dev/null 2>&1; then
  nvm use "${NVM_VERSION}" >/dev/null
fi

if [[ ! -d "${PROJECT_DIR}" ]]; then
  echo "Project directory not found: ${PROJECT_DIR}" >&2
  exit 3
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Missing command: node" >&2
  exit 127
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "Missing command: pnpm" >&2
  exit 127
fi

if [[ "$#" -ne 1 ]]; then
  echo "Usage: $0 <pnpm-script-name>" >&2
  exit 2
fi

SCRIPT_NAME="$1"

cd "${PROJECT_DIR}"
pnpm run "${SCRIPT_NAME}" >"${LOG_FILE}" 2>&1
