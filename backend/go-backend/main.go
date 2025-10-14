package main

import (
	cmd "go-backend/command"
	"go-backend/config/database"
	"go-backend/controller"
	"go-backend/logging"
	"go-backend/middleware"
	"go-backend/repository"
	"go-backend/routes"
	"go-backend/service"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// ==== Set up logger ====
	logging.SetUpLogger()
	logging.Log.Info("Logger initialized")

	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// DB
	db := database.SetUpPostgreSQLConnection()
	defer database.ClosePostgreSQLConnection(db)

	// Seeder command
	if len(os.Args) > 1 {
		cmd.Command(db)
		return
	}

	var (
		jwtService = service.NewJWTService()

		userRepo     = repository.NewUserRepository(db)
		examRepo     = repository.NewExamRepository(db)
		questionRepo = repository.NewQuestionRepository(db)

		// adminRepo       = repository.NewAdminRepository(db)
		userService     = service.NewUserService(userRepo, jwtService)
		examService     = service.NewExamService(userRepo, examRepo, jwtService)
		questionService = service.NewQuestionService(questionRepo, examRepo, jwtService)

		// adminService    = service.NewAdminService(adminRepo, jwtService)
		userController     = controller.NewUserController(userService, jwtService)
		examController     = controller.NewExamController(examService)
		questionController = controller.NewQuestionController(questionService)
		// adminController = controller.NewAdminController(adminService)
	)

	server := gin.Default()
	server.Use(middleware.CORSMiddleware())

	routes.PublicRoutes(server, userController, jwtService)
	// routes.AdminRoutes(server, userController, adminController, jwtService)
	routes.UserRoutes(server, userController, jwtService)
	routes.ExamRoutes(server, examController, jwtService)
	routes.QuestionRoutes(server, questionController, jwtService)

	server.Static("/assets", "./assets")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	var serve string
	if os.Getenv("APP_ENV") == "localhost" {
		serve = "127.0.0.1:" + port
	} else {
		serve = ":" + port
	}

	if err := server.Run(serve); err != nil {
		log.Fatalf("error running server: %v", err)
	}
}
