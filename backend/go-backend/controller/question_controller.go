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
	IQuestionController interface {
		// Question
		CreateQuestion(ctx *gin.Context)
		GetAllQuestionsByExam(ctx *gin.Context)
		GetQuestionByID(ctx *gin.Context)
		UpdateQuestion(ctx *gin.Context)
		DeleteQuestion(ctx *gin.Context)
	}

	QuestionController struct {
		questionService service.IQuestionService
	}
)

func NewQuestionController(questionService service.IQuestionService) *QuestionController {
	return &QuestionController{
		questionService: questionService,
	}
}

func (qc *QuestionController) CreateQuestion(ctx *gin.Context) {
	var payload dto.CreateQuestionRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	result, err := qc.questionService.CreateQuestion(ctx, payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_CREATE_QUESTION)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_CREATE_QUESTION, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_CREATE_QUESTION+": %s", result.Question)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_CREATE_QUESTION, result)
	ctx.JSON(http.StatusCreated, res)
}

func (qc *QuestionController) GetAllQuestionsByExam(ctx *gin.Context) {
	paginationParam := ctx.DefaultQuery("pagination", "true")
	usePagination := paginationParam != "false"
	examID := ctx.Param("id")
	if !usePagination {
		results, err := qc.questionService.GetAllQuestionsByExam(ctx, examID)
		if err != nil {
			logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_ALL_QUESTION_NO_PAGINATION)
			res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_ALL_QUESTION_NO_PAGINATION, err.Error(), nil)
			ctx.JSON(http.StatusBadRequest, res)
			return
		}
		logging.Log.Info(constants.MESSAGE_SUCCESS_GET_ALL_QUESTION)
		res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_ALL_QUESTION, results)
		ctx.JSON(http.StatusOK, res)
		return
	}

	var payload dto.PaginationRequest
	if err := ctx.ShouldBind(&payload); err != nil {
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := qc.questionService.GetAllQuestionsByExamWithPagination(ctx, examID, payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_ALL_QUESTION_WITH_PAGINATION)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_ALL_QUESTION_WITH_PAGINATION, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Info(constants.MESSAGE_SUCCESS_GET_ALL_QUESTION)

	res := utils.Response{
		Status:   true,
		Messsage: constants.MESSAGE_SUCCESS_GET_ALL_EXAM,
		Data:     result.Data,
		Meta:     result.PaginationResponse,
	}

	ctx.JSON(http.StatusOK, res)

}

func (qc *QuestionController) GetQuestionByID(ctx *gin.Context) {
	questionID := ctx.Param("id")
	result, err := qc.questionService.GetQuestionByID(ctx, questionID)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DETAIL_QUESTION)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DETAIL_QUESTION, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_GET_DETAIL_QUESTION+": %s", result.Question)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_DETAIL_QUESTION, result)
	ctx.JSON(http.StatusOK, res)
}

func (qc *QuestionController) UpdateQuestion(ctx *gin.Context) {
	questionID := ctx.Param("id")
	if _, err := uuid.Parse(questionID); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	var payload dto.UpdateQuestionRequest
	payload.ID = questionID
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	result, err := qc.questionService.UpdateQuestion(ctx, payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UPDATE_QUESTION)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UPDATE_QUESTION, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_UPDATE_QUESTION+": %s", result.Question)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_UPDATE_QUESTION, result)
	ctx.JSON(http.StatusOK, res)
}

func (qc *QuestionController) DeleteQuestion(ctx *gin.Context) {
	questionID := ctx.Param("id")
	if _, err := uuid.Parse(questionID); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
		ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
		return
	}

	result, err := qc.questionService.DeleteQuestion(ctx, questionID)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_DELETE_QUESTION)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_DELETE_QUESTION, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_DELETE_QUESTION+": %s", result.Question)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_DELETE_QUESTION, result)
	ctx.JSON(http.StatusOK, res)
}
