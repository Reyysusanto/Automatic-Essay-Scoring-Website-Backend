package routes

import (
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func PublicRoutes(r *gin.Engine, userController controller.IUserController, jwtService service.InterfaceJWTService) {
	public := r.Group("/api/auth")
	public.POST("/register", userController.Register)
	public.POST("/login", userController.Login)
	public.Use(middleware.Authentication(jwtService))
	{
		public.GET("/refreshtoken", userController.RefreshToken)
	}
}
