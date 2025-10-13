package routes

import (
	"go-backend/constants"
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
	{
		users.Use(middleware.AuthorizeRole(constants.ENUM_ROLE_ADMIN))
		{
			users.GET("", userController.GetAllUser)
			users.POST("", userController.CreateUser)
		}
		users.GET("/:id", userController.GetUserByID)
		users.PATCH("/:id", userController.UpdateUser)
		users.DELETE("/:id", userController.DeleteUser)
	}
}
