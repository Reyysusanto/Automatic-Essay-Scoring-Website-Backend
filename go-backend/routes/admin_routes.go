package routes

import (
	"go-backend/constants"
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func AdminRoutes(r *gin.Engine, userController controller.IUserController,
	jwtService service.InterfaceJWTService) {

	admin := r.Group("/api/admin")
	admin.Use(middleware.Authentication(jwtService))
	admin.Use(middleware.AuthorizeRole(constants.ENUM_ROLE_ADMIN))

	// RESTful User management
	users := admin.Group("/users")
	{
		users.POST("", userController.CreateUser)      
		users.GET("", userController.GetAllUser)       
		users.GET("/:id", userController.GetUserByID)  
		users.PUT("/:id", userController.UpdateUser)   
		users.DELETE("/:id", userController.DeleteUser)
	}
}
