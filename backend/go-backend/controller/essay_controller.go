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
	IEssayController interface {
		CreateEssays(ctx *gin.Context)
		UpdateEssays(ctx *gin.Context)
		GetEssayByID(ctx *gin.Context)
	}

	EssayController struct {
		essayService service.IEssayService
	}
)

func NewEssayController(essayService service.IEssayService) *EssayController {
	return &EssayController{
		essayService: essayService,
	}
}

func (ec *EssayController) GetEssayByID(ctx *gin.Context) {
	essayID := ctx.Param("id")
	result, err := ec.essayService.GetEssayByID(ctx, essayID)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DETAIL_ESSAY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DETAIL_ESSAY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_GET_DETAIL_ESSAY+": %s", result)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_DETAIL_ESSAY, result)
	ctx.JSON(http.StatusOK, res)
}

func (ec *EssayController) GetAllEssaysAnswer(ctx *gin.Context) {
	examID := ctx.Param("examID")
	result, err := ec.essayService.GetAllEssaysAnswer(ctx, examID)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_ALL_ANSWER)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_ALL_ANSWER, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_GET_ALL_ANSWER+": %s", result)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_GET_ALL_ANSWER, result)
	ctx.JSON(http.StatusOK, res)
}

func (ec *EssayController) CreateEssays(ctx *gin.Context) {
	var payload []dto.CreateEssayRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	err := ec.essayService.CreateEssays(ctx, payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_CREATE_ESSAYS)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_CREATE_ESSAYS, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_CREATE_QUESTION)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_CREATE_QUESTION, nil)
	ctx.JSON(http.StatusCreated, res)
}

func (ec *EssayController) UpdateEssays(ctx *gin.Context) {

	// if _, err := uuid.Parse(essayID); err != nil {
	// 	logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UUID_FORMAT)
	// 	res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UUID_FORMAT, err.Error(), nil)
	// 	ctx.AbortWithStatusJSON(http.StatusBadRequest, res)
	// 	return
	// }

	var payload []dto.UpdateEssayRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_GET_DATA_FROM_BODY, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}

	err := ec.essayService.UpdateEssay(ctx, payload)
	if err != nil {
		logging.Log.WithError(err).Warn(constants.MESSAGE_FAILED_UPDATE_ESSAYS)
		res := utils.BuildResponseFailed(constants.MESSAGE_FAILED_UPDATE_ESSAYS, err.Error(), nil)
		ctx.JSON(http.StatusBadRequest, res)
		return
	}
	logging.Log.Infof(constants.MESSAGE_SUCCESS_UPDATE_ESSAY)
	res := utils.BuildResponseSuccess(constants.MESSAGE_SUCCESS_UPDATE_ESSAY, nil)
	ctx.JSON(http.StatusOK, res)
}
