package routes

import (
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func ExamRoutes(
	r *gin.Engine,
	ExamController controller.IExamController,
	jwtService service.InterfaceJWTService,
) {
	exams := r.Group("/api/exams")
	exams.Use(middleware.Authentication(jwtService))
	{
		exams.GET("", ExamController.GetAllExams)
		exams.GET("/:id", ExamController.GetExamByID)
		exams.POST("", ExamController.CreateExam)
		exams.PATCH("/:id", ExamController.UpdateExam)
		exams.DELETE("/:id", ExamController.DeleteExam)

		exams.GET("/cbeck/:id")

	}
}
