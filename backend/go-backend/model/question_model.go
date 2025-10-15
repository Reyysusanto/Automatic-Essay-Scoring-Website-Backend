package model

import "github.com/google/uuid"

type Question struct {
	ID        uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Question  string    `json:"question"`
	AnswerKey string    `json:"answer_key"`
	MaxScore  float64   `json:"max_score"`

	ExamID *uuid.UUID `gorm:"type:uuid" json:"exam_id"`
	Exam   Exam       `gorm:"foreignKey:ExamID"`
	TimeStamp
}
