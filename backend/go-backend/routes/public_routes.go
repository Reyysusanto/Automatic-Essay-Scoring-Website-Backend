package routes

import (
	"go-backend/controller"

	"github.com/gin-gonic/gin"
)

func PublicRoutes(r *gin.Engine, userController controller.IUserController) {
	public := r.Group("/api/auth")
	public.POST("/register", userController.Register)
	public.POST("/login", userController.Login)
}
