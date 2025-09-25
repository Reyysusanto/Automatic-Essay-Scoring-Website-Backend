package service

import (
	"context"
	"go-backend/constants"
	"go-backend/dto"
	"go-backend/model"
	"go-backend/repository"
)

type (
	IAdminService interface {
		// Exam
		CreateExam(ctx context.Context, req dto.CreateExamRequest) (dto.ExamResponse, error)
		GetAllExams(ctx context.Context) ([]dto.ExamResponse, error)
		GetAllExamsWithPagination(ctx context.Context, req dto.PaginationRequest) ([]dto.ExamResponse, error)
		GetExamByID(ctx context.Context, examId string) (dto.ExamResponse, error)
		UpdateExam(ctx context.Context, req dto.UpdateExamRequest) (dto.ExamResponse, error)
		DeleteExam(ctx context.Context, req dto.DeleteExamRequest) (dto.ExamResponse, error)
	}

	AdminService struct {
		adminRepo  repository.IAdminRepository
		jwtService InterfaceJWTService
	}
)

func NewAdminService(adminRepo repository.IAdminRepository, jwtService InterfaceJWTService) *AdminService {
	return &AdminService{
		adminRepo:  adminRepo,
		jwtService: jwtService,
	}
}

func (as *AdminService) CreateExam(ctx context.Context, req dto.CreateExamRequest) (dto.ExamResponse, error) {
	if req.Name == "" || req.UserId == "" {
		return dto.ExamResponse{}, constants.ErrEmptyFields
	}

	exam := model.Exam{
		Name: req.Name,
	}

	if err := as.adminRepo.CreateExam(ctx, nil, exam); err != nil {
		return dto.ExamResponse{}, err
	}

	res := dto.ExamResponse{
		ID:   exam.ID.String(),
		Name: exam.Name,
	}

	return res, nil
}
