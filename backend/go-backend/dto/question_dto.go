package dto

import (
	"go-backend/model"

	"github.com/google/uuid"
)

type (
	QuestionResponse struct {
		ID        uuid.UUID    `json:"id"`
		Question  string       `json:"question"`
		AnswerKey string       `json:"answer_key"`
		MaxScore  float64      `json:"max_score"`
		Exam      ExamResponse `json:"exam"`
	}

	CreateQuestionRequest struct {
		Question  string     `json:"question" binding:"required"`
		AnswerKey string     `json:"answer_key" binding:"required"`
		MaxScore  float64    `json:"max_score" binding:"required"`
		ExamId    *uuid.UUID `json:"exam_id" binding:"required"`
	}

	UpdateQuestionRequest struct {
		ID        string  `json:"-"`
		Question  string  `json:"question" binding:"required"`
		AnswerKey string  `json:"answer_key" binding:"required"`
		MaxScore  float64 `json:"max_score" binding:"required"`
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
