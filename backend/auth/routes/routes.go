package routes

import (
	"auth/controllers"

	"github.com/go-chi/chi/v5"
)

func AuthRoutes(router chi.Router) {
	router.Post("/signup", controllers.Signup)
	router.Post("/login", controllers.Login)
	router.Get("/verify", controllers.Verify)
	router.Post("/forgot-password", controllers.ForgotPassword)
	router.Post("/reset-password", controllers.ResetPassword)
}
