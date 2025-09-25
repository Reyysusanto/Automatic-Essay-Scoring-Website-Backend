package dto

import "go-backend/model"

type (
	ExamResponse struct {
		ID     string `json:"id"`
		Name   string `json:"name"`
		UserId string `json:"user_id"`
	}

	CreateExamRequest struct {
		Name   string `json:"name"`
		UserId string `json:"user_id"`
	}

	UpdateExamRequest struct {
		ID     string  `json:"-"`
		Name   *string `json:"name,omitempty"`
		UserId *string `json:"user_id,omitempty"`
	}
	DeleteExamRequest struct {
		ExamID string `json:"-"`
	}

	ExamPaginationResponse struct {
		PaginationResponse
		Data []ExamResponse `json:"data"`
	}

	ExamPaginationRepositoryResponse struct {
		PaginationResponse
		Exams []model.Exam
	}
)
