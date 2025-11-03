package dto

import (
	"go-backend/model"

	"github.com/google/uuid"
)

type (
	ExamResponse struct {
		ID       uuid.UUID    `json:"id"`
		Name     string       `json:"name"`
		Token    string       `json:"token"`
		Lecturer UserResponse `json:"lecturer"`
	}

	CreateExamRequest struct {
		Name       string     `json:"name" binding:"required"`
		LecturerID *uuid.UUID `json:"lecturer_id"`
	}

	UpdateExamRequest struct {
		ID         string     `json:"-"`
		Name       string     `json:"name,omitempty" binding:"required"`
		LecturerID *uuid.UUID `json:"lecturer_id,omitempty"`
	}
	// DeleteExamRequest struct {
	// 	ExamID string `json:"-"`
	// }

	ExamPaginationResponse struct {
		PaginationResponse
		Data []ExamResponse `json:"data"`
	}

	ExamPaginationRepositoryResponse struct {
		PaginationResponse
		Exams []model.Exam
	}
)
