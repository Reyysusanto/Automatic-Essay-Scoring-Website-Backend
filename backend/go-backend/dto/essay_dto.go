package dto

import "github.com/google/uuid"

type (
	EssayResponse struct {
		ID         uuid.UUID `json:"id"`
		AnswerText string    `json:"answer_text"`

		Student    UserResponse     `json:"student"`
		Question   QuestionResponse `json:"question"`
		StudentID  *uuid.UUID       `json:"student_id"`
		QuestionID *uuid.UUID       `json:"question_id"`
	}

	CreateEssayRequest struct {
		AnswerText string `json:"answer_text" binding:"required"`
		// StudentID  *uuid.UUID `json:"student_id" binding:"required"`
		QuestionID *uuid.UUID `json:"question_id" binding:"required"`
	}

	UpdateEssayRequest struct {
		ID         string     `json:"id" binding:"required"`
		AnswerText string     `json:"answer_text" binding:"required"`
		QuestionID *uuid.UUID `json:"question_id" binding:"required"`
	}
	// DeleteExamRequest struct {
	// 	ExamID string `json:"-"`
	// }
)
