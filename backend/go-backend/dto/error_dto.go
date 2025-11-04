package dto

import "errors"

var (
	ErrGetUserIDFromToken = errors.New("failed to get user id from token")
	ErrParseUUID          = errors.New("failed parse uuid")

	//Exam
	ErrGetAllExamNoPagination   = errors.New("failed get all exam no pagination")
	ErrGetAllExamWithPagination = errors.New("failed get all exam with pagination")
	ErrUpdateExam               = errors.New("failed update exam")
	ErrExamNameTooShort         = errors.New("failed exam name too short (min 3)")

	//Question
	ErrGetAllQuestionNoPagination   = errors.New("failed get all question no pagination")
	ErrGetAllQuestionWithPagination = errors.New("failed get all question with pagination")
	ErrGetDetailQuestion            = errors.New("failed get detail question")
	ErrCreateQuestion               = errors.New("failed create question")
	ErrUpdateQuestion               = errors.New("failed update question")
	ErrDeleteQuestion               = errors.New("failed delete question")
	ErrQuestionContentTooShort      = errors.New("failed question content too short (min 3)")
	ErrAnswerKeyTooShort            = errors.New("failed answer key too short (min 3)")
	ErrQuestionScoreInvalid         = errors.New("failed question score invalid (must > 0)")
)
