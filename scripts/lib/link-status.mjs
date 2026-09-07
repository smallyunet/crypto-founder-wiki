// Access restrictions are inconclusive and must remain visible in the report.
export function classifyStatus(status) {
	if (status === 404 || status === 410) return 'dead';
	return status >= 200 && status < 300 ? 'ok' : 'warning';
}
