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
		// Create
		CreateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error

		// Read
		GetAllQuestions(ctx context.Context, tx *gorm.DB) ([]model.Question, error)
		GetAllQuestionsWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.QuestionPaginationRepositoryResponse, error)
		GetQuestionByID(ctx context.Context, tx *gorm.DB, questionID string) (model.Question, bool, error)

		// Update
		UpdateQuestion(ctx context.Context, tx *gorm.DB, question model.Question) error

		// Delete
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

func (er *QuestionRepository) GetAllQuestions(ctx context.Context, tx *gorm.DB) ([]model.Question, error) {
	if tx == nil {
		tx = er.db
	}
	var (
		questions []model.Question
		err       error
	)

	query := tx.WithContext(ctx).Model(&model.Question{}).Preload("Question")

	if err := query.Order(`"created_at" DESC`).Find(&questions).Error; err != nil {
		return []model.Question{}, err
	}
	return questions, err
}

func (er *QuestionRepository) GetAllQuestionsWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.QuestionPaginationRepositoryResponse, error) {
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

	query := tx.WithContext(ctx).Model(&model.Question{}).Preload("Exam")
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
