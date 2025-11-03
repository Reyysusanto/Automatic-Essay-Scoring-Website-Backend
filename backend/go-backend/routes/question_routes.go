package routes

import (
	"go-backend/controller"
	"go-backend/middleware"
	"go-backend/service"

	"github.com/gin-gonic/gin"
)

func QuestionRoutes(
	r *gin.Engine,
	QuestionController controller.IQuestionController,
	jwtService service.InterfaceJWTService,
) {
	questions := r.Group("/api/questions")
	questions.Use(middleware.Authentication(jwtService))
	{
		questions.GET("/exam/:id", QuestionController.GetAllQuestionsByExam)
		questions.GET("/:id", QuestionController.GetQuestionByID)
		questions.POST("", QuestionController.CreateQuestion)
		questions.PATCH("/:id", QuestionController.UpdateQuestion)
		questions.DELETE("/:id", QuestionController.DeleteQuestion)
	}
}
