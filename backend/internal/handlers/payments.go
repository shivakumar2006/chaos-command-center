package handlers

import (
	"math/rand"
	"net/http"
	"time"
)

func Payment(w http.ResponseWriter, r *http.Request) {
	time.Sleep(200 * time.Millisecond)

	if rand.Intn(10) < 2 { // ~20% failure
		http.Error(w, "payment failed", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("payment successful"))
}
