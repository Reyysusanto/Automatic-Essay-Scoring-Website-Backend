package dto

import (
	"go-backend/model"

	"github.com/google/uuid"
)

type (
	QuestionResponse struct {
		ID        uuid.UUID    `json:"id"`
		Question  string       `json:"name"`
		AnswerKey string       `json:"answer_key"`
		Exam      ExamResponse `json:"exam"`
	}

	CreateQuestionRequest struct {
		Question  string     `json:"name" binding:"required"`
		AnswerKey string     `json:"answer_key" binding:"required"`
		ExamId    *uuid.UUID `json:"exam_id" binding:"required"`
	}

	UpdateQuestionRequest struct {
		ID        string `json:"-"`
		Question  string `json:"name" binding:"required"`
		AnswerKey string `json:"answer_key" binding:"required"`
	}
	QuestionPaginationResponse struct {
		PaginationResponse
		Data []QuestionResponse `json:"data"`
	}

	QuestionPaginationRepositoryResponse struct {
		PaginationResponse
		Questions []model.Question
	}
)
