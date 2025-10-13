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
	IExamRepository interface {
		// Create
		CreateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error

		// Read
		GetAllExams(ctx context.Context, tx *gorm.DB) ([]model.Exam, error)
		GetAllExamsWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.ExamPaginationRepositoryResponse, error)
		GetExamByID(ctx context.Context, tx *gorm.DB, examID string) (model.Exam, bool, error)

		// Update
		UpdateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error

		// Delete
		DeleteExamByID(ctx context.Context, tx *gorm.DB, examID string) error
	}

	ExamRepository struct {
		db *gorm.DB
	}
)

func NewExamRepository(db *gorm.DB) *ExamRepository {
	return &ExamRepository{
		db: db,
	}
}

func (er *ExamRepository) CreateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Create(&exam).Preload("Lecturer").Error
}

func (er *ExamRepository) GetAllExams(ctx context.Context, tx *gorm.DB) ([]model.Exam, error) {
	if tx == nil {
		tx = er.db
	}
	var (
		exams []model.Exam
		err   error
	)

	query := tx.WithContext(ctx).Model(&model.Exam{}).Preload("Lecturer")

	if err := query.Order(`"created_at" DESC`).Find(&exams).Error; err != nil {
		return []model.Exam{}, err
	}
	return exams, err
}

func (er *ExamRepository) GetAllExamsWithPagination(ctx context.Context, tx *gorm.DB, req dto.PaginationRequest) (dto.ExamPaginationRepositoryResponse, error) {
	if tx == nil {
		tx = er.db
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

	query := tx.WithContext(ctx).Model(&model.Exam{}).Preload("Lecturer")
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

func (er *ExamRepository) GetExamByID(ctx context.Context, tx *gorm.DB, examID string) (model.Exam, bool, error) {
	if tx == nil {
		tx = er.db
	}

	var exam model.Exam
	if err := tx.WithContext(ctx).Preload("Lecturer").Where("id = ?", examID).Take(&exam).Error; err != nil {
		return model.Exam{}, false, err
	}

	return exam, true, nil
}

func (er *ExamRepository) UpdateExam(ctx context.Context, tx *gorm.DB, exam model.Exam) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Where("id = ?", exam.ID).Updates(&exam).Error
}

func (er *ExamRepository) DeleteExamByID(ctx context.Context, tx *gorm.DB, examID string) error {
	if tx == nil {
		tx = er.db
	}

	return tx.WithContext(ctx).Where("id = ?", examID).Delete(&model.Exam{}).Error
}
