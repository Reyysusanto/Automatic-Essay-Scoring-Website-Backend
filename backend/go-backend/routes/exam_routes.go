package routes

import (
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func ExamRoutes(r *gin.Engine, jwtService service.InterfaceJWTService) {
	exams := r.Group("/api/exams")
	exams.Use(middleware.Authentication(jwtService))
	{
		exams.GET("")
		exams.GET("/:id")
		exams.POST("")
		exams.PATCH("/:id")
		exams.DELETE("/:id")

		exams.GET("/cbeck/:id")

	}
}
