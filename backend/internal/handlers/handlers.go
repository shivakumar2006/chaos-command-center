package handlers

import (
	"encoding/json"
	"net/http"

	"backend/internal/metrics"
)

func Metrics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(map[string]uint64{
		"total_requests": metrics.TotalRequests,
		"success":        metrics.TotalSuccess,
		"failures":       metrics.TotalFailures,
	})
}
