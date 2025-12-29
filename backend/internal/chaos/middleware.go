package chaos

import (
	"math/rand"
	"net/http"
	"time"
)

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if IsEnabled() {
			// random latency
			time.Sleep(time.Duration(rand.Intn(400)) * time.Millisecond)

			// random failure (10%)
			if rand.Intn(10) == 0 {
				http.Error(w, "chaos injected failure", http.StatusServiceUnavailable)
				return
			}
		}

		next.ServeHTTP(w, r)
	})
}
