package controller

import "github.com/gin-gonic/gin"

type (
	IExamController interface {
		GetAllExamsAdmin(ctx *gin.Context)
	}
)
