package dto

import "errors"

var (
	ErrGetUserIDFromToken = errors.New("failed to get user id from token")
	ErrParseUUID          = errors.New("failed parse uuid")

	ErrGetAllExamNoPagination   = errors.New("failed get all exam no pagination")
	ErrGetAllExamWithPagination = errors.New("failed get all exam with pagination")
	ErrUpdateExam               = errors.New("failed update exam")
	ErrExamNameTooShort         = errors.New("failed exam name too short (min 3)")
)
