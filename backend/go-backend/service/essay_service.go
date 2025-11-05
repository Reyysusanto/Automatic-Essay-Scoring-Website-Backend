package service

import (
	"context"
	"go-backend/dto"
	"go-backend/model"
	"go-backend/repository"

	"github.com/google/uuid"
)

type (
	IEssayService interface {
		CreateEssays(ctx context.Context, reqs []dto.CreateEssayRequest) error
		UpdateEssay(ctx context.Context, reqs []dto.UpdateEssayRequest) error
		GetEssayByID(ctx context.Context, essayID string) (dto.EssayResponse, error)
		GetAllEssaysAnswer(ctx context.Context, examID string) ([]dto.EssayResponse, error)
	}

	EssayService struct {
		essayRepo repository.IEssayRepository
		// examRepo   repository.IExamRepository
		jwtService InterfaceJWTService
	}
)

func NewEssayService(essayRepo repository.IEssayRepository, jwtService InterfaceJWTService) *EssayService {
	return &EssayService{
		essayRepo: essayRepo,
		// examRepo:   examRepo,
		jwtService: jwtService,
	}
}

func (es *EssayService) GetEssayByID(ctx context.Context, essayID string) (dto.EssayResponse, error) {
	essay, err := es.essayRepo.GetEssayByID(ctx, nil, essayID)
	if err != nil {
		return dto.EssayResponse{}, dto.ErrGetDetailEssay
	}
	return dto.EssayResponse{
		ID:         essay.ID,
		AnswerText: essay.AnswerText,
		Student: dto.UserResponse{
			ID:          essay.Student.ID,
			Name:        essay.Student.Name,
			Email:       essay.Student.Email,
			PhoneNumber: essay.Student.PhoneNumber,
			Address:     essay.Student.Address,
		},
		Question: dto.QuestionResponse{
			ID:        essay.Question.ID,
			Question:  essay.Question.Question,
			AnswerKey: essay.Question.AnswerKey,
			MaxScore:  essay.Question.MaxScore,
			// Exam: dto.ExamResponse{
			// 	ID:    essay.Question.Exam.ID,
			// 	Name:  essay.Question.Exam.Name,
			// 	Token: essay.Question.Exam.Token,
			// },
		},
	}, nil
}

func (es *EssayService) GetAllEssaysAnswer(ctx context.Context, examID string) ([]dto.EssayResponse, error) {
	token := ctx.Value("Authorization").(string)

	userIDStr, err := es.jwtService.GetUserIDByToken(token)
	if err != nil {
		return []dto.EssayResponse{}, dto.ErrGetUserIDFromToken
	}
	essays, err := es.essayRepo.GetAllEssaysAnswer(ctx, nil, userIDStr, examID)
	if err != nil {
		return []dto.EssayResponse{}, dto.ErrGetAllAnswer
	}

	var datas []dto.EssayResponse

	for _, essay := range essays {
		data := dto.EssayResponse{
			ID:         essay.ID,
			AnswerText: essay.AnswerText,
			Student: dto.UserResponse{
				ID:          essay.Student.ID,
				Name:        essay.Student.Name,
				Email:       essay.Student.Email,
				PhoneNumber: essay.Student.PhoneNumber,
				Address:     essay.Student.PhoneNumber,
			},
			Question: dto.QuestionResponse{
				ID:        essay.Question.ID,
				Question:  essay.Question.Question,
				AnswerKey: essay.Question.AnswerKey,
				MaxScore:  essay.Question.MaxScore,
				Exam: dto.ExamResponse{
					ID:    essay.Question.Exam.ID,
					Name:  essay.Question.Exam.Name,
					Token: essay.Question.Exam.Token,
				},
			},
		}
		datas = append(datas, data)

	}

	return datas, nil

}

func (es *EssayService) CreateEssays(ctx context.Context, reqs []dto.CreateEssayRequest) error {
	token := ctx.Value("Authorization").(string)

	userIDStr, err := es.jwtService.GetUserIDByToken(token)
	if err != nil {
		return dto.ErrGetUserIDFromToken
	}

	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		return dto.ErrParseUUID
	}

	for _, request := range reqs {
		essay := model.Essay{
			ID:         uuid.New(),
			AnswerText: request.AnswerText,
			StudentID:  &userID,
			QuestionID: request.QuestionID,
		}
		if err := es.essayRepo.CreateEssay(ctx, nil, essay); err != nil {
			return dto.ErrCreateEssay
		}
	}

	return nil

}

func (es *EssayService) UpdateEssay(ctx context.Context, reqs []dto.UpdateEssayRequest) error {
	for _, request := range reqs {
		essay, err := es.essayRepo.GetEssayByID(ctx, nil, request.ID)
		if err != nil {
			return dto.ErrGetDetailEssay
		}

		if len(request.AnswerText) < 3 {
			return dto.ErrAnswerTooShort
		}

		essay.AnswerText = request.AnswerText

		if err := es.essayRepo.UpdateEssay(ctx, nil, essay); err != nil {
			return err
		}
	}

	return nil
}
