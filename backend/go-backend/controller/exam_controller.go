package controller

import (
	"go-backend/constants"
	"go-backend/dto"
	"go-backend/logging"
	"go-backend/service"
	"go-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type (
	IExamController interface {
		// Exam
		CreateExam(ctx *gin.Context)
		GetAllExams(ctx *gin.Context)
		GetExamByID(ctx *gin.Context)
		UpdateExam(ctx *gin.Context)
		DeleteExam(ctx *gin.Context)
	}

	ExamController struct {
		examService service.IExamService
	}
)

func NewExamController(examService service.IExamService) *ExamController {
	return &ExamController{
		examService: examService,
	}
}

func (ac *ExamController) CreateExam(ctx *gin.Context) {
	var payload dto.CreateExamRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	result, err := ac.examService.CreateExam(ctx, payload)
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

func (ac *ExamController) GetAllExams(ctx *gin.Context) {
	paginationParam := ctx.DefaultQuery("pagination", "true")
	usePagination := paginationParam != "false"

	if !usePagination {
		// Tanpa pagination
		result, err := ac.examService.GetAllExams(ctx)
		if err != nil {
			res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_ALL_EXAM, err.Error(), nil)
			ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
			return
		}

		res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_ALL_EXAM, result)
		ctx.JSON(http.StatusOK, res)
		return
	}

	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ac.examService.GetAllExamsWithPagination(ctx, payload)
	if err != nil {
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_ALL_EXAM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	res := utils.Response{
		Status:   true,
		Messsage: constants.MESSAGE_SUCCESS_GET_ALL_EXAM,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)

	// var query dto.UserPaginationRequest
	// if err := ctx.ShouldBindQuery(&query); err != nil {
	// 	logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
	// 	res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
	// 	ctx.JSON(http.StatusBadRequest, res)
	// 	return
	// }

}

func (ac *ExamController) GetExamByID(ctx *gin.Context) {
	idStr := ctx.Param("id")

	if _, err := uuid.Parse(idStr); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := ac.examService.GetExamByID(ctx, idStr)
	if err != nil {
		logging.Log.WithError(err).Error(constants.MESSAGE_FAILED_GET_DETAIL_EXAM)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DETAIL_EXAM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusNotFound, res)
		return
	}

	logging.Log.Infof(constants.MESSAGE_SUCCESS_GET_DETAIL_EXAM+": %s", idStr)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_DETAIL_EXAM, result)
	ctx.JSON(http.StatusOK, res)
}

func (ac *ExamController) UpdateExam(ctx *gin.Context) {
	idStr := ctx.Param("id")

	if _, err := uuid.Parse(idStr); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	var payload dto.UpdateExamRequest
	payload.ID = idStr

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := ac.examService.UpdateExam(ctx, payload)
	if err != nil {
		logging.Log.WithError(err).Error(constants.MESSAGE_FAILED_GET_DETAIL_EXAM)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DETAIL_EXAM, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusNotFound, res)
		return
	}

	logging.Log.Infof(constants.MESSAGE_SUCCESS_UPDATE_EXAM+": %s", idStr)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_UPDATE_EXAM, result)
	ctx.JSON(http.StatusOK, res)
}

func (ec *ExamController) DeleteExam(ctx *gin.Context) {
	idParam := ctx.Param("id")
	if _, err := uuid.Parse(idParam); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := ec.examService.DeleteExam(ctx, idParam)
	if err != nil {
		logging.Log.WithError(err).Error(constants.MESSAGE_FAILED_DELETE_EXAM)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_DELETE_EXAM, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	logging.Log.Infof(constants.MESSAGE_SUCCESS_DELETE_EXAM+": %s", idParam)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_DELETE_EXAM, result)
	ctx.JSON(http.StatusOK, res)
}
