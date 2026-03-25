#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="$(dirname "$0")/../../.env"
if [[ -f "${ENV_FILE}" ]]; then
  # shellcheck disable=SC1090
  . "${ENV_FILE}"
fi

ARGS="${1:-e2e}"
REPO="NFTGalaxy/galxe-e2ev2"
EVENT_TYPE="upstream_updated"
TOKEN="${GITHUB_TOKEN}"
API_BASE="https://api.github.com/repos/${REPO}"
START_EPOCH="$(date -u +%s)"

status_code="$(curl -sS -o /tmp/github-dispatch-response.txt -w "%{http_code}" -L -X POST "${API_BASE}/dispatches" \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -d "{
    \"event_type\": \"${EVENT_TYPE}\",
    \"client_payload\": {
      \"args\": \"${ARGS}\"
    }
  }")"

if [[ "${status_code}" != "204" ]]; then
  echo "Failed to trigger repository_dispatch (HTTP ${status_code})"
  cat /tmp/github-dispatch-response.txt
  exit 1
fi

echo "CI triggered: args=${ARGS}"

action_url=""
for _ in {1..20}; do
  runs_json="$(curl -sS -L "${API_BASE}/actions/runs?event=repository_dispatch&per_page=20" \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28")"

  action_url="$(python3 - <<'PY' "${runs_json}" "${START_EPOCH}" "${EVENT_TYPE}"
import json
import sys
from datetime import datetime, timezone

runs = json.loads(sys.argv[1]).get("workflow_runs", [])
start_epoch = int(sys.argv[2])
event_type = sys.argv[3]

def to_epoch(ts: str) -> int:
    return int(datetime.strptime(ts, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc).timestamp())

for run in runs:
    created = run.get("created_at")
    if not created:
        continue
    if run.get("event") != "repository_dispatch":
        continue
    if run.get("display_title") != event_type:
        continue
    if to_epoch(created) < start_epoch - 5:
        continue
    print(run.get("html_url", ""))
    break
PY
)"

  if [[ -n "${action_url}" ]]; then
    break
  fi
  sleep 2
done

if [[ -n "${action_url}" ]]; then
  echo "ACTION_URL=${action_url}"
else
  echo "ACTION_URL=pending"
fi
