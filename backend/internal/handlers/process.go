package handlers

import (
	"net/http"
	"time"
)

func Process(w http.ResponseWriter, r *http.Request) {
	// simulates work
	time.Sleep(150 * time.Millisecond)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Process complete"))
}
