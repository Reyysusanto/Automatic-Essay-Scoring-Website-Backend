package constants

import "errors"

const (
	// failed
	MESSAGE_FAILED_PROSES_REQUEST      = "failed proses request"
	MESSAGE_FAILED_ACCESS_DENIED       = "failed access denied"
	MESSAGE_FAILED_TOKEN_NOT_FOUND     = "failed token not found"
	MESSAGE_FAILED_TOKEN_NOT_VALID     = "failed token not valid"
	MESSAGE_FAILED_TOKEN_DENIED_ACCESS = "failed token denied access"
	MESSAGE_FAILED_GET_DATA_FROM_BODY  = "failed get data from body"
	MESSAGE_FAILED_CREATE_USER         = "failed create user"
	MESSAGE_FAILED_GET_DETAIL_USER     = "failed get detail user"
	MESSAGE_FAILED_GET_LIST_USER       = "failed get list user"
	MESSAGE_FAILED_UPDATE_USER         = "failed update user"
	MESSAGE_FAILED_DELETE_USER         = "failed delete user"
	MESSAGE_FAILED_LOGIN_USER          = "failed login user"
	MESSAGE_FAILED_UUID_FORMAT         = "failed invalid UUID format"
	MESSAGE_FAILED_REGISTER            = "failed to register user"
	MESSAGE_SUCCESS_REGISTER           = "success register user"

	//exam
	MESSAGE_FAILED_CREATE_EXAM     = "failed create exam"
	MESSAGE_FAILED_GET_EXAM        = "failed get exam"
	MESSAGE_FAILED_UPDATE_EXAM     = "failed update exam"
	MESSAGE_FAILED_DELETE_EXAM     = "failed delete exam"
	MESSAGE_FAILED_GET_ALL_EXAM    = "failed get all exam"
	MESSAGE_FAILED_GET_DETAIL_EXAM = "failed get detail exam"

	//question
	MESSAGE_FAILED_CREATE_QUESTION                  = "failed create question"
	MESSAGE_FAILED_GET_QUESTION                     = "failed get question"
	MESSAGE_FAILED_UPDATE_QUESTION                  = "failed update question"
	MESSAGE_FAILED_DELETE_QUESTION                  = "failed delete question"
	MESSAGE_FAILED_GET_ALL_QUESTION                 = "failed get all question"
	MESSAGE_FAILED_GET_DETAIL_QUESTION              = "failed get detail question"
	MESSAGE_FAILED_GET_ALL_QUESTION_NO_PAGINATION   = "failed get all question no pagination"
	MESSAGE_FAILED_GET_ALL_QUESTION_WITH_PAGINATION = "failed get all question with pagination"

	// success

	// User
	MESSAGE_SUCCESS_CREATE_USER     = "success create user"
	MESSAGE_SUCCESS_GET_DETAIL_USER = "success get detail user"
	MESSAGE_SUCCESS_GET_LIST_USER   = "success get list user"
	MESSAGE_SUCCESS_UPDATE_USER     = "success update user"
	MESSAGE_SUCCESS_DELETE_USER     = "success delete user"
	MESSAGE_SUCCESS_LOGIN_USER      = "success login user"

	// Exam
	MESSAGE_SUCCESS_CREATE_EXAM     = "success create exam"
	MESSAGE_SUCCESS_GET_EXAM        = "success get exam"
	MESSAGE_SUCCESS_UPDATE_EXAM     = "success update exam"
	MESSAGE_SUCCESS_DELETE_EXAM     = "success delete exam"
	MESSAGE_SUCCESS_GET_ALL_EXAM    = "success get all exam"
	MESSAGE_SUCCESS_GET_DETAIL_EXAM = "success get detail exam"

	// Question
	MESSAGE_SUCCESS_CREATE_QUESTION     = "success create question"
	MESSAGE_SUCCESS_GET_QUESTION        = "success get question"
	MESSAGE_SUCCESS_UPDATE_QUESTION     = "success update question"
	MESSAGE_SUCCESS_DELETE_QUESTION     = "success delete question"
	MESSAGE_SUCCESS_GET_ALL_QUESTION    = "success get all question"
	MESSAGE_SUCCESS_GET_DETAIL_QUESTION = "success get detail question"
)

var (
	ErrGenerateAccessToken      = errors.New("failed to generate access token")
	ErrGenerateRefreshToken     = errors.New("failed to generate refresh token")
	ErrUnexpectedSigningMethod  = errors.New("unexpected signing method")
	ErrDecryptToken             = errors.New("failed to decrypt token")
	ErrTokenInvalid             = errors.New("token invalid")
	ErrTokenExpired             = errors.New("token expired")
	ErrValidateToken            = errors.New("failed to validate token")
	ErrInvalidName              = errors.New("failed invalid name")
	ErrInvalidEmail             = errors.New("failed invalid email")
	ErrInvalidPassword          = errors.New("failed invalid password")
	ErrEmailAlreadyExists       = errors.New("email already exists")
	ErrRegisterUser             = errors.New("failed to register user")
	ErrGetAllUserWithPagination = errors.New("failed get list user with pagination")
	ErrGetUserByID              = errors.New("failed get user by id")
	ErrUpdateUser               = errors.New("failed to update user")
	ErrPasswordSame             = errors.New("failed new password same as old password")
	ErrHashPassword             = errors.New("failed hash password")
	ErrDeleteUserByID           = errors.New("failed delete user by id")
	ErrEmailNotFound            = errors.New("email not found")
	ErrPasswordNotMatch         = errors.New("password not match")
	ErrDeniedAccess             = errors.New("denied access")
	ErrGetPermissionsByRoleID   = errors.New("failed get all permission by role id")
	ErrInvalidPhoneNumber       = errors.New("invalid phone number")
	ErrInvalidLoginCredential   = errors.New("invalid login credentials")
	ErrCreateUser               = errors.New("failed to create user")
	ErrInvalidUUID              = errors.New("invalid UUID format")
	// Input Validation
	ErrEmptyFields = errors.New("failed there are empty fields")
	// Exam
	ErrCreateExam       = errors.New("failed to create exam")
	ErrGetExamByID      = errors.New("failed to get exam by id")
	ErrUpdateExam       = errors.New("failed to update exam")
	ErrDeleteExamByID   = errors.New("failed to delete exam by id")
	ErrGetAllExam       = errors.New("failed to get all exam")
	ErrInvalidExamName  = errors.New("failed invalid exam name")
	ErrInvalidExamScore = errors.New("failed invalid exam score")
	ErrGetDetailExams   = errors.New("failed get detail exam")
)
