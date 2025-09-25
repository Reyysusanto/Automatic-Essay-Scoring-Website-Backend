package controller

import (
	"go-backend/constants"
	"go-backend/dto"
	"go-backend/logging"
	"go-backend/service"
	"go-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type (
	IAdminController interface {
		// Exam
		CreateExam(ctx *gin.Context)
		GetAllExams(ctx *gin.Context)
		GetExamByID(ctx *gin.Context)
		UpdateExam(ctx *gin.Context)
		DeleteExam(ctx *gin.Context)

		//
	}

	AdminController struct {
		adminService service.IAdminService
	}
)

func NewAdminController(adminService service.IAdminService) *AdminController {
	return &AdminController{
		adminService: adminService,
	}
}

func (ac *AdminController) CreateExam(ctx *gin.Context) {
	var payload dto.CreateExamRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	result, err := ac.adminService.CreateExam(ctx.Request.Context(), payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_CREATE_EXAM)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_CREATE_EXAM, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_CREATE_EXAM+": %s", result.Name)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_CREATE_EXAM, result)
	ctx.JSON(http.StatusCreated, res)
}

func (ac *AdminController) GetAllExams(ctx *gin.Context) {
	var query dto.UserPaginationRequest
	if err := ctx.ShouldBindQuery(&query); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

}
