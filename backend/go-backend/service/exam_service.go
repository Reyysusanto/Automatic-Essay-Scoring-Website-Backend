package service

import (
	"context"
	"go-backend/constants"
	"go-backend/dto"
	"go-backend/helpers"
	"go-backend/logging"
	"go-backend/model"
	"go-backend/repository"

	"github.com/google/uuid"
)

type (
	IExamService interface {
		CreateExam(ctx context.Context, req dto.CreateExamRequest) (dto.ExamResponse, error)
		GetAllExams(ctx context.Context) ([]dto.ExamResponse, error)
		GetAllExamsWithPagination(ctx context.Context, req dto.PaginationRequest) (dto.ExamPaginationResponse, error)
		GetExamByID(ctx context.Context, examId string) (dto.ExamResponse, error)
		UpdateExam(ctx context.Context, req dto.UpdateExamRequest) (dto.ExamResponse, error)
		DeleteExam(ctx context.Context, examId string) (dto.ExamResponse, error)
	}

	ExamService struct {
		userRepo   repository.IUserRepository
		examRepo   repository.IExamRepository
		jwtService InterfaceJWTService
	}
)

func NewExamService(userRepo repository.IUserRepository, examRepo repository.IExamRepository, jwtService InterfaceJWTService) *ExamService {
	return &ExamService{
		userRepo:   userRepo,
		examRepo:   examRepo,
		jwtService: jwtService,
	}
}

func (es *ExamService) GetAllExams(ctx context.Context) ([]dto.ExamResponse, error) {
	exams, err := es.examRepo.GetAllExams(ctx, nil)

	if err != nil {
		return nil, dto.ErrGetAllExamNoPagination
	}

	var datas []dto.ExamResponse
	for _, exam := range exams {
		data := dto.ExamResponse{
			ID:   exam.ID,
			Name: exam.Name,
			Lecturer: dto.UserResponse{
				ID:          exam.Lecturer.ID,
				Name:        exam.Lecturer.Name,
				Email:       exam.Lecturer.Email,
				PhoneNumber: exam.Lecturer.PhoneNumber,
				Address:     exam.Lecturer.Address,
			},
		}
		datas = append(datas, data)
	}
	return datas, nil
}

func (es *ExamService) GetAllExamsWithPagination(ctx context.Context, req dto.PaginationRequest) (dto.ExamPaginationResponse, error) {
	dataWithPaginate, err := es.examRepo.GetAllExamsWithPagination(ctx, nil, req)
	if err != nil {
		return dto.ExamPaginationResponse{}, dto.ErrGetAllExamWithPagination
	}

	var datas []dto.ExamResponse
	for _, exam := range dataWithPaginate.Exams {
		data := dto.ExamResponse{
			ID:   exam.ID,
			Name: exam.Name,
			Lecturer: dto.UserResponse{
				ID:          exam.Lecturer.ID,
				Name:        exam.Lecturer.Name,
				Email:       exam.Lecturer.Email,
				PhoneNumber: exam.Lecturer.PhoneNumber,
				Address:     exam.Lecturer.Address,
			},
		}
		datas = append(datas, data)
	}
	return dto.ExamPaginationResponse{
		Data: datas,
		PaginationResponse: dto.PaginationResponse{
			Page:    dataWithPaginate.Page,
			PerPage: dataWithPaginate.PerPage,
			MaxPage: dataWithPaginate.MaxPage,
			Count:   dataWithPaginate.Count,
		},
	}, nil
}

func (es *ExamService) CreateExam(ctx context.Context, req dto.CreateExamRequest) (dto.ExamResponse, error) {
	token := ctx.Value("Authorization").(string)

	userIDStr, err := es.jwtService.GetUserIDByToken(token)
	if err != nil {
		return dto.ExamResponse{}, dto.ErrGetUserIDFromToken
	}

	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		return dto.ExamResponse{}, dto.ErrParseUUID
	}
	exam := model.Exam{
		ID:         uuid.New(),
		LecturerID: &userID,
		Name:       req.Name,
	}
	if err := es.examRepo.CreateExam(ctx, nil, exam); err != nil {
		return dto.ExamResponse{}, err
	}

	user, _, err := es.userRepo.GetUserByID(ctx, nil, userIDStr)
	if err != nil {
		logging.Log.WithError(err).WithField("user_id", userID).Error(constants.MESSAGE_FAILED_GET_DETAIL_USER)
		return dto.ExamResponse{}, constants.ErrGetUserByID
	}

	examToken, err := helpers.GenerateToken()
	if err != nil {
		return dto.ExamResponse{}, err
	}

	res := dto.ExamResponse{
		ID:    exam.ID,
		Name:  exam.Name,
		Token: examToken,
		Lecturer: dto.UserResponse{
			ID:          user.ID,
			Name:        user.Name,
			Email:       user.Email,
			PhoneNumber: user.PhoneNumber,
		},
	}

	return res, nil
}

func (es *ExamService) GetExamByID(ctx context.Context, examId string) (dto.ExamResponse, error) {
	exam, _, err := es.examRepo.GetExamByID(ctx, nil, examId)
	if err != nil {
		return dto.ExamResponse{}, constants.ErrGetDetailExams
	}

	return dto.ExamResponse{
		ID:   exam.ID,
		Name: exam.Name,
		Lecturer: dto.UserResponse{
			ID:          exam.Lecturer.ID,
			Name:        exam.Lecturer.Name,
			Email:       exam.Lecturer.Email,
			PhoneNumber: exam.Lecturer.PhoneNumber,
			Address:     exam.Lecturer.Address,
		},
	}, nil
}

func (es *ExamService) UpdateExam(ctx context.Context, req dto.UpdateExamRequest) (dto.ExamResponse, error) {
	token := ctx.Value("Authorization").(string)

	userIDStr, err := es.jwtService.GetUserIDByToken(token)
	if err != nil {
		return dto.ExamResponse{}, dto.ErrGetUserIDFromToken
	}

	exam, _, err := es.examRepo.GetExamByID(ctx, nil, req.ID)

	if err != nil {
		return dto.ExamResponse{}, dto.ErrUpdateExam
	}

	if req.Name != "" {
		if len(req.Name) < 3 {
			return dto.ExamResponse{}, dto.ErrExamNameTooShort
		}

		exam.Name = req.Name
	}

	err = es.examRepo.UpdateExam(ctx, nil, exam)
	if err != nil {
		return dto.ExamResponse{}, dto.ErrUpdateExam
	}

	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		return dto.ExamResponse{}, dto.ErrParseUUID
	}
	exam.LecturerID = &userID

	user, _, err := es.userRepo.GetUserByID(ctx, nil, userIDStr)
	if err != nil {
		// logging.Log.WithError(err).WithField("user_id", userID).Error(constants.MESSAGE_FAILED_GET_DETAIL_USER)
		return dto.ExamResponse{}, constants.ErrGetUserByID
	}

	res := dto.ExamResponse{
		ID:    exam.ID,
		Name:  exam.Name,
		Token: exam.Token,
		Lecturer: dto.UserResponse{
			ID:          user.ID,
			Name:        user.Name,
			Email:       user.Name,
			PhoneNumber: user.PhoneNumber,
			Address:     user.Address,
		},
	}
	return res, nil

}

func (es *ExamService) DeleteExam(ctx context.Context, examId string) (dto.ExamResponse, error) {
	exam, _, err := es.examRepo.GetExamByID(ctx, nil, examId)

	if err != nil {
		logging.Log.WithError(err).Error(constants.MESSAGE_FAILED_GET_DETAIL_EXAM)
		return dto.ExamResponse{}, constants.ErrGetExamByID
	}

	err = es.examRepo.DeleteExamByID(ctx, nil, examId)

	if err != nil {
		logging.Log.WithError(err).Error(constants.MESSAGE_FAILED_DELETE_EXAM)
		return dto.ExamResponse{}, constants.ErrDeleteExamByID
	}

	return dto.ExamResponse{
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
	}, nil
}
