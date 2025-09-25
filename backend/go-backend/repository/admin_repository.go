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
	IAdminRepository interface {
		// Create
		CreateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error

		// Read
		GetAllExams(ctx context.Context, tx *gorm.DB) ([]model.Exam, error)
		GetAllExamsWithPagination(ctx context.Context, tx *gorm.DB) ([]model.Exam, error)
		GetExamByID(ctx context.Context, tx *gorm.DB, examID string) (model.Exam, bool, error)

		// Update
		UpdateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error

		// Delete
		DeleteExamByID(ctx context.Context, tx *gorm.DB, examID string) error
	}

	AdminRepository struct {
		db *gorm.DB
	}
)

func NewAdminRepository(db *gorm.DB) *AdminRepository {
	return &AdminRepository{
		db: db,
	}
}

func (ar *AdminRepository) CreateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error {
	if tx == nil {
		tx = ar.db
	}

	return tx.WithContext(ctx).Create(&exam).Error
}

func (ar *AdminRepository) GetAllExams(ctx context.Context, tx *gorm.DB) ([]model.Exam, error) {
	if tx == nil {
		tx = ar.db
	}
	var (
		exams []model.Exam
		err   error
	)

	query := tx.WithContext(ctx).Model(&model.Exam{}).Preload("Users")

	if err := query.Order(`"created_at" DESC`).Find(&exams).Error; err != nil {
		return []model.Exam{}, err
	}
	return exams, err
}

func (ar *AdminRepository) GetAllExamsWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.ExamPaginationRepositoryResponse, error) {
	if tx == nil {
		tx = ar.db
	}

	var exams []model.Exam
	var err error
	var count int64

	if req.PerPage == 0 {
		req.PerPage = 10
	}

	if req.Page == 0 {
		req.Page = 1
	}

	query := tx.WithContext(ctx).Model(&model.Exam{}).Preload("Users")
	if req.Search != "" {
		searchValue := "%" + strings.ToLower(req.Search) + "%"
		query = query.Where("LOWER(name) LIKE ?", searchValue)
	}

	if err := query.Count(&count).Error; err != nil {
		return dto.ExamPaginationRepositoryResponse{}, err
	}

	if err := query.Order(`"created_at" DESC`).Scopes(Paginate(req.Page, req.PerPage)).Find(&exams).Error; err != nil {
		return dto.ExamPaginationRepositoryResponse{}, err
	}

	totalPage := int64(math.Ceil(float64(count) / float64(req.PerPage)))

	return dto.ExamPaginationRepositoryResponse{
		Exams: exams,
		PaginationResponse: dto.PaginationResponse{
			Page:    req.Page,
			PerPage: req.PerPage,
			MaxPage: totalPage,
			Count:   count,
		},
	}, err

}

func (ar *AdminRepository) GetExamByID(ctx context.Context, tx *gorm.DB, examID string) (model.Exam, bool, error) {
	if tx == nil {
		tx = ar.db
	}

	var exam model.Exam
	if err := tx.WithContext(ctx).Preload("Users").Where("id = ?", examID).Take(&exam).Error; err != nil {
		return model.Exam{}, false, err
	}

	return exam, true, nil
}

func (ar *AdminRepository) UpdateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error {
	if tx == nil {
		tx = ar.db
	}

	return tx.WithContext(ctx).Where("id = ?", exam.ID).Updates(&exam).Error
}

func (ar *AdminRepository) DeleteExamByID(ctx context.Context, tx *gorm.DB, examID string) error {
	if tx == nil {
		tx = ar.db
	}

	return tx.WithContext(ctx).Where("id = ?", examID).Delete(&model.Exam{}).Error
}
