package routes

import (
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func UserRoutes(
	r *gin.Engine,
	userController controller.IUserController,
	jwtService service.InterfaceJWTService,
) {
	users := r.Group("/api/users")
	users.Use(middleware.Authentication(jwtService))

	users.GET("/:id", userController.GetUserByID)    
	users.PATCH("/:id", userController.UpdateUser)   
	users.DELETE("/:id", userController.DeleteUser) 
}
