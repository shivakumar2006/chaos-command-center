package routes

import (
	"backend/auth/controllers"

	"github.com/go-chi/chi/v5"
)

func AuthRoutes(router chi.Router) {
	router.Post("/signup", controllers.Signup)
	router.Post("/login", controllers.Login)
	router.Post("/verify", controllers.Verify)
}
