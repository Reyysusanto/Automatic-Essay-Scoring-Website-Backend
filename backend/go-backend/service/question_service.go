package service

import (
	"context"
	"go-backend/constants"
	"go-backend/dto"
	"go-backend/model"
	"go-backend/repository"

	"github.com/google/uuid"
)

type (
	IQuestionService interface {
		CreateQuestion(ctx context.Context, req dto.CreateQuestionRequest) (dto.QuestionResponse, error)
		GetAllQuestionsByExam(ctx context.Context, idExam string) ([]dto.QuestionResponse, error)
		GetAllQuestionsByExamWithPagination(ctx context.Context, examID string, req dto.PaginationRequest) (dto.QuestionPaginationResponse, error)
		GetQuestionByID(ctx context.Context, questionId string) (dto.QuestionResponse, error)
		UpdateQuestion(ctx context.Context, req dto.UpdateQuestionRequest) (dto.QuestionResponse, error)
		DeleteQuestion(ctx context.Context, questionId string) (dto.QuestionResponse, error)
	}

	QuestionService struct {
		questionRepo repository.IQuestionRepository
		examRepo     repository.IExamRepository
		jwtService   InterfaceJWTService
	}
)

func NewQuestionService(questionRepo repository.IQuestionRepository, examRepo repository.IExamRepository, jwtService InterfaceJWTService) *QuestionService {
	return &QuestionService{
		questionRepo: questionRepo,
		examRepo:     examRepo,
		jwtService:   jwtService,
	}
}

func (qs *QuestionService) CreateQuestion(ctx context.Context, req dto.CreateQuestionRequest) (dto.QuestionResponse, error) {
	question := model.Question{
		ID:        uuid.New(),
		Question:  req.Question,
		AnswerKey: req.AnswerKey,
		ExamID:    req.ExamId,
		MaxScore:  req.MaxScore,
	}
	if err := qs.questionRepo.CreateQuestion(ctx, nil, question); err != nil {
		return dto.QuestionResponse{}, dto.ErrCreateQuestion
	}

	exam, _, err := qs.examRepo.GetExamByID(ctx, nil, question.ExamID.String())

	if err != nil {
		return dto.QuestionResponse{}, constants.ErrGetDetailExams
	}

	data := dto.QuestionResponse{
		ID:        question.ID,
		Question:  question.Question,
		AnswerKey: question.AnswerKey,
		MaxScore:  question.MaxScore,
		Exam: dto.ExamResponse{
			ID:    exam.ID,
			Name:  exam.Name,
			Token: exam.Token,
			Lecturer: dto.UserResponse{
				ID:          exam.Lecturer.ID,
				Name:        exam.Lecturer.Name,
				Email:       exam.Lecturer.Email,
				PhoneNumber: exam.Lecturer.PhoneNumber,
				Address:     exam.Lecturer.Address,
			},
		},
	}
	return data, nil

}

func (qs *QuestionService) GetAllQuestionsByExam(ctx context.Context, examID string) ([]dto.QuestionResponse, error) {
	questions, err := qs.questionRepo.GetAllQuestionsByExam(ctx, nil, examID)
	if err != nil {
		return nil, dto.ErrGetAllQuestionNoPagination
	}
	var datas []dto.QuestionResponse
	for _, question := range questions {
		data := dto.QuestionResponse{
			ID:        question.ID,
			Question:  question.Question,
			AnswerKey: question.AnswerKey,
			MaxScore:  question.MaxScore,
			Exam: dto.ExamResponse{
				ID:    question.Exam.ID,
				Name:  question.Exam.Name,
				Token: question.Exam.Token,
				Lecturer: dto.UserResponse{
					ID:          question.Exam.Lecturer.ID,
					Name:        question.Exam.Lecturer.Name,
					Email:       question.Exam.Lecturer.Email,
					PhoneNumber: question.Exam.Lecturer.PhoneNumber,
					Address:     question.Exam.Lecturer.Address,
				},
			},
		}
		datas = append(datas, data)
	}

	return datas, nil
}

func (qs *QuestionService) GetAllQuestionsByExamWithPagination(ctx context.Context, examID string, req dto.PaginationRequest) (dto.QuestionPaginationResponse, error) {

	dataWithPaginate, err := qs.questionRepo.GetAllQuestionsWithPagination(ctx, nil, examID, req)
	if err != nil {
		return dto.QuestionPaginationResponse{}, dto.ErrGetAllQuestionWithPagination
	}

	var datas []dto.QuestionResponse
	for _, question := range dataWithPaginate.Questions {
		data := dto.QuestionResponse{
			ID:        question.ID,
			Question:  question.Question,
			AnswerKey: question.AnswerKey,
			MaxScore:  question.MaxScore,
			Exam: dto.ExamResponse{
				ID:    question.Exam.ID,
				Name:  question.Exam.Name,
				Token: question.Exam.Token,
				Lecturer: dto.UserResponse{
					ID:          question.Exam.Lecturer.ID,
					Name:        question.Exam.Lecturer.Name,
					Email:       question.Exam.Lecturer.Email,
					PhoneNumber: question.Exam.Lecturer.PhoneNumber,
					Address:     question.Exam.Lecturer.Address,
				},
			},
		}
		datas = append(datas, data)
	}
	return dto.QuestionPaginationResponse{
		Data: datas,
		PaginationResponse: dto.PaginationResponse{
			Page:    dataWithPaginate.Page,
			PerPage: dataWithPaginate.PerPage,
			MaxPage: dataWithPaginate.MaxPage,
			Count:   dataWithPaginate.Count,
		},
	}, nil
}

func (qs *QuestionService) GetQuestionByID(ctx context.Context, questionId string) (dto.QuestionResponse, error) {
	question, _, err := qs.questionRepo.GetQuestionByID(ctx, nil, questionId)
	if err != nil {
		return dto.QuestionResponse{}, dto.ErrGetDetailQuestion
	}
	return dto.QuestionResponse{
		ID:        question.ID,
		Question:  question.Question,
		AnswerKey: question.AnswerKey,
		MaxScore:  question.MaxScore,

		Exam: dto.ExamResponse{
			ID:    question.Exam.ID,
			Name:  question.Exam.Name,
			Token: question.Exam.Token,
			Lecturer: dto.UserResponse{
				ID:          question.Exam.Lecturer.ID,
				Name:        question.Exam.Lecturer.Name,
				Email:       question.Exam.Lecturer.Email,
				PhoneNumber: question.Exam.Lecturer.PhoneNumber,
				Address:     question.Exam.Lecturer.Address,
			},
		},
	}, nil

}

func (qs *QuestionService) UpdateQuestion(ctx context.Context, req dto.UpdateQuestionRequest) (dto.QuestionResponse, error) {
	question, _, err := qs.questionRepo.GetQuestionByID(ctx, nil, req.ID)
	if err != nil {
		return dto.QuestionResponse{}, dto.ErrGetDetailQuestion
	}

	if req.Question != "" {
		if len(req.Question) < 3 {
			return dto.QuestionResponse{}, dto.ErrQuestionContentTooShort
		}
		question.Question = req.Question
	}

	if req.AnswerKey != "" {
		if len(req.AnswerKey) < 3 {
			return dto.QuestionResponse{}, dto.ErrAnswerKeyTooShort
		}
		question.AnswerKey = req.AnswerKey
	}
	if req.MaxScore != 0 {
		question.MaxScore = req.MaxScore
	}

	if err := qs.questionRepo.UpdateQuestion(ctx, nil, question); err != nil {
		return dto.QuestionResponse{}, dto.ErrUpdateQuestion
	}

	exam, _, err := qs.examRepo.GetExamByID(ctx, nil, question.ExamID.String())

	if err != nil {
		return dto.QuestionResponse{}, constants.ErrGetDetailExams
	}

	res := dto.QuestionResponse{
		ID:        question.ID,
		Question:  question.Question,
		AnswerKey: question.AnswerKey,
		MaxScore:  question.MaxScore,
		Exam: dto.ExamResponse{
			ID:    exam.ID,
			Name:  exam.Name,
			Token: exam.Token,
			Lecturer: dto.UserResponse{
				ID:          exam.Lecturer.ID,
				Name:        exam.Lecturer.Name,
				Email:       exam.Lecturer.Email,
				PhoneNumber: exam.Lecturer.PhoneNumber,
				Address:     exam.Lecturer.Address,
			},
		},
	}

	return res, nil

}

func (qs *QuestionService) DeleteQuestion(ctx context.Context, questionId string) (dto.QuestionResponse, error) {

	question, _, err := qs.questionRepo.GetQuestionByID(ctx, nil, questionId)
	if err != nil {
		return dto.QuestionResponse{}, dto.ErrGetDetailQuestion
	}

	if err := qs.questionRepo.DeleteQuestionByID(ctx, nil, questionId); err != nil {
		return dto.QuestionResponse{}, dto.ErrDeleteQuestion
	}

	exam, _, err := qs.examRepo.GetExamByID(ctx, nil, question.ExamID.String())

	if err != nil {
		return dto.QuestionResponse{}, constants.ErrGetDetailExams
	}
	res := dto.QuestionResponse{
		ID:        question.ID,
		Question:  question.Question,
		AnswerKey: question.AnswerKey,
		MaxScore:  question.MaxScore,
		Exam: dto.ExamResponse{
			ID:    exam.ID,
			Name:  exam.Name,
			Token: exam.Token,
			Lecturer: dto.UserResponse{
				ID:          exam.Lecturer.ID,
				Name:        exam.Lecturer.Name,
				Email:       exam.Lecturer.Email,
				PhoneNumber: exam.Lecturer.PhoneNumber,
				Address:     exam.Lecturer.Address,
			},
		},
	}

	return res, nil
}
