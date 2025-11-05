package repository

import (
	"context"
	"go-backend/model"

	"gorm.io/gorm"
)

type (
	IEssayRepository interface {
		GetEssayByID(ctx context.Context, tx *gorm.DB, essayID string) (model.Essay, error)
		GetAllEssaysAnswer(ctx context.Context, tx *gorm.DB, studentID string, examID string) ([]model.Essay, error)
		CreateEssay(ctx context.Context, tx *gorm.DB, essay model.Essay) error
		UpdateEssay(ctx context.Context, tx *gorm.DB, exam model.Essay) error
	}

	EssayRepository struct {
		db *gorm.DB
	}
)

func NewEssayRepository(db *gorm.DB) *EssayRepository {
	return &EssayRepository{
		db: db,
	}
}

func (er *EssayRepository) GetEssayByID(ctx context.Context, tx *gorm.DB, essayID string) (model.Essay, error) {
	if tx == nil {
		tx = er.db
	}

	var essay model.Essay

	if err := tx.WithContext(ctx).Preload("Student").Preload("Question").Where("id = ?", essayID).Take(&essay).Error; err != nil {
		return model.Essay{}, err
	}

	return essay, nil
}

func (er *EssayRepository) GetAllEssaysAnswer(ctx context.Context, tx *gorm.DB, studentID string, examID string) ([]model.Essay, error) {
	if tx == nil {
		tx = er.db
	}

	var essay []model.Essay

	if err := tx.WithContext(ctx).Joins("JOIN questions on questions.id = essays.question_id").Preload("Student").Preload("Question").Preload("Question.Exam").Where("student_id = ?", studentID).Where("questions.exam_id = ?", examID).Take(&essay).Error; err != nil {
		return []model.Essay{}, err
	}

	return essay, nil
}

func (er *EssayRepository) CreateEssay(ctx context.Context, tx *gorm.DB, essay model.Essay) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Create(&essay).Error
}

func (er *EssayRepository) UpdateEssay(ctx context.Context, tx *gorm.DB, essay model.Essay) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Model(&model.Essay{}).Where("id = ?", essay.ID).Updates(&essay).Error
}
