package model

import (
	"github.com/google/uuid"
)

type Exam struct {
	ID    uuid.UUID `gorm:"type:uuid;primaryKey" json:"id"`
	Name  string    `json:"name"`
	Token string    `json:"token"`

	ExamsUsers []ExamUser `gorm:"foreignKey:ExamID"`
	Questions  []Question `gorm:"foreignKey:ExamID"`

	LecturerID *uuid.UUID `gorm:"type:uuid" json:"lecturer_id"`
	Lecturer   User       `gorm:"foreignKey:LecturerID"`

	TimeStamp
}
