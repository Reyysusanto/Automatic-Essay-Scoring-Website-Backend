package repository

import (
	"context"
	"go-backend/dto"
	"go-backend/model"
	"math"
	"strings"

	"gorm.io/gorm"
)

type (
	IQuestionRepository interface {
		CreateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error
		GetAllQuestionsByExam(ctx context.Context, tx *gorm.DB, examID string) ([]model.Question, error)
		GetAllQuestionsWithPagination(ctx context.Context, tx *gorm.DB, examID string, req dto.PaginationRequest) (dto.QuestionPaginationRepositoryResponse, error)
		GetQuestionByID(ctx context.Context, tx *gorm.DB, questionID string) (model.Question, bool, error)
		UpdateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error
		DeleteQuestionByID(ctx context.Context, tx *gorm.DB, questionID string) error
	}
	QuestionRepository struct {
		db *gorm.DB
	}
)

func NewQuestionRepository(db *gorm.DB) *QuestionRepository {
	return &QuestionRepository{
		db: db,
	}
}
func (er *QuestionRepository) CreateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Create(&question).Error
}

func (er *QuestionRepository) GetAllQuestionsByExam(ctx context.Context, tx *gorm.DB, examID string) ([]model.Question, error) {
	if tx == nil {
		tx = er.db
	}
	var (
		questions []model.Question
		err       error
	)

	query := tx.WithContext(ctx).Model(&model.Question{}).Preload("Exam").Preload("Exam.Lecturer").Where("exam_id = ?", examID)

	if err := query.Order(`"created_at" DESC`).Find(&questions).Error; err != nil {
		return []model.Question{}, err
	}
	return questions, err
}

func (er *QuestionRepository) GetAllQuestionsWithPagination(ctx context.Context, tx *gorm.DB, examID string, req dto.PaginationRequest) (dto.QuestionPaginationRepositoryResponse, error) {
	if tx == nil {
		tx = er.db
	}

	var questions []model.Question
	var err error
	var count int64

	if req.PerPage == 0 {
		req.PerPage = 10
	}

	if req.Page == 0 {
		req.Page = 1
	}

	query := tx.WithContext(ctx).Model(&model.Question{}).Preload("Exam").Preload("Exam.Lecturer").Where("exam_id = ?", examID)
	if req.Search != "" {
		searchValue := "%" + strings.ToLower(req.Search) + "%"
		query = query.Where("LOWER(name) LIKE ?", searchValue)
	}

	if err := query.Count(&count).Error; err != nil {
		return dto.QuestionPaginationRepositoryResponse{}, err
	}

	if err := query.Order(`"created_at" DESC`).Scopes(Paginate(req.Page, req.PerPage)).Find(&questions).Error; err != nil {
		return dto.QuestionPaginationRepositoryResponse{}, err
	}

	totalPage := int64(math.Ceil(float64(count) / float64(req.PerPage)))

	return dto.QuestionPaginationRepositoryResponse{
		Questions: questions,
		PaginationResponse: dto.PaginationResponse{
			Page:    req.Page,
			PerPage: req.PerPage,
			MaxPage: totalPage,
			Count:   count,
		},
	}, err

}

func (er *QuestionRepository) GetQuestionByID(ctx context.Context, tx *gorm.DB, questionID string) (model.Question, bool, error) {
	if tx == nil {
		tx = er.db
	}

	var question model.Question

	if err := tx.WithContext(ctx).Preload("Exam").Preload("Exam.Lecturer").Where("id = ?", questionID).Take(&question).Error; err != nil {
		return model.Question{}, false, err
	}

	return question, true, nil
}

func (er *QuestionRepository) UpdateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Save(&question).Error
}

func (er *QuestionRepository) DeleteQuestionByID(ctx context.Context, tx *gorm.DB, questionID string) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Where("id = ?", questionID).Delete(&model.Question{}).Error
}
