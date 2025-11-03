package model

import "github.com/google/uuid"

type Essay struct {
	ID         uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	AnswerText string    `json:"answer_text"`

	Score *Score `gorm:"foreignKey:EssayID"`

	StudentID  *uuid.UUID `gorm:"type:uuid" json:"student_id"`
	Student    User       `gorm:"foreignKey:StudentID"`
	QuestionID *uuid.UUID `gorm:"type:uuid" json:"question_id"`
	Question   Question   `gorm:"foreignKey:QuestionID"`
	TimeStamp
}
