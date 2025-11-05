package routes

import (
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func EssayRoutes(
	r *gin.Engine,
	EssayController controller.IEssayController,
	jwtService service.InterfaceJWTService,
) {
	exams := r.Group("/api/essays")
	exams.Use(middleware.Authentication(jwtService))
	{
		exams.GET("/:id", EssayController.GetEssayByID)
		exams.POST("", EssayController.CreateEssays)
		exams.PATCH("", EssayController.UpdateEssays)

	}
}
