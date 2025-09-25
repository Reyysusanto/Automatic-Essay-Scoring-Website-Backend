package model

import "github.com/google/uuid"

type Score struct {
	ID            uuid.UUID `gorm:"primaryKey" json:"id"`
	ScoreIndobert float64   `json:"score_indobert"`
	ScoreTfidf    float64   `json:"score_tfidf"`
	FinalScore    float64   `json:"final_score"`

	EssayID *uuid.UUID `json:"essay_id"`
	Essay   Essay      `gorm:"foreignKey:EssayID"`
	TimeStamp
}
