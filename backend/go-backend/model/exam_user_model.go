package model

import (
	"time"

	"github.com/google/uuid"
)

type ExamUser struct {
	ID          uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	FinalScore  float64   `jso:"final_score"`
	CompletedAt time.Time `json:"completed_at"`

	StudentID *uuid.UUID `gorm:"type:uuid" json:"student_id"`
	Student   User       `gorm:"foreignKey:StudentID"`
	ExamID    *uuid.UUID `gorm:"type:uuid" json:"exam_id"`
	Exam      Exam       `gorm:"foreignKey:ExamID"`
}
