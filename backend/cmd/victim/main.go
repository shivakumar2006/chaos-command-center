package main

import (
	"log"
	"net/http"

	"backend/internal/handlers"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {
	r := chi.NewRouter()

	// basic middlewares (safe & standard)
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// routes
	r.Get("/health", handlers.Health)
	r.Get("/process", handlers.Process)
	r.Get("/payment", handlers.Payment)

	log.Println("Victim service running on :9000")
	log.Fatal(http.ListenAndServe(":9000", r))
}
