package main

import (
	"log"
	"net/http"

	"backend/internal/chaos"
	"backend/internal/handlers"
	"backend/internal/metrics"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/rs/cors"
)

func main() {
	r := chi.NewRouter()

	// standard middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(metrics.Middleware)

	// 🔥 chaos middleware
	r.Use(chaos.Middleware)

	// routes
	r.Get("/health", handlers.Health)
	r.Get("/process", handlers.Process)
	r.Get("/payment", handlers.Payment)
	r.Get("/metrics", handlers.Metrics)

	// chaos toggle
	r.Post("/chaos/on", func(w http.ResponseWriter, r *http.Request) {
		chaos.Enable()
		w.Write([]byte("Chaos enabled"))
	})

	r.Post("/chaos/off", func(w http.ResponseWriter, r *http.Request) {
		chaos.Disable()
		w.Write([]byte("Chaos disabled"))
	})

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	log.Println("Victim service running on :8081")
	log.Fatal(http.ListenAndServe(":8081", handler))
}
