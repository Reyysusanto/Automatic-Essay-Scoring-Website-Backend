package service

import (
	"context"
	"go-backend/dto"
	"go-backend/repository"
)

type (
	IQuestionService interface {
		CreateQuestion(ctx context.Context, req dto.CreateQuestionRequest) (dto.QuestionResponse, error)
		GetAllQuestions(ctx context.Context) ([]dto.QuestionResponse, error)
		GetAllQuestionsWithPagination(ctx context.Context, req dto.PaginationRequest) (dto.QuestionPaginationResponse, error)
		GetQuestionByID(ctx context.Context, questionId string) (dto.QuestionResponse, error)
		UpdateQuestion(ctx context.Context, req dto.UpdateQuestionRequest) (dto.QuestionResponse, error)
		DeleteQuestion(ctx context.Context, questionId string) (dto.QuestionResponse, error)
	}

	QuestionService struct {
		userRepo     repository.IUserRepository
		questionRepo repository.IQuestionRepository
		jwtService   InterfaceJWTService
	}
)
