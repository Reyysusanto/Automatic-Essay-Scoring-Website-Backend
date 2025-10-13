package migrations

import (
	"encoding/json"
	"errors"
	"fmt"
	"go-backend/helpers"
	"go-backend/model"
	"io"
	"os"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func SeedUsersFromJSON(db *gorm.DB, filePath string, uniqueFields ...string) error {
	// Buka file JSON
	jsonFile, err := os.Open(filePath)
	if err != nil {
		return fmt.Errorf("failed to open file %s: %w", filePath, err)
	}
	defer jsonFile.Close()

	// Baca isinya
	jsonData, err := io.ReadAll(jsonFile)
	if err != nil {
		return fmt.Errorf("failed to read JSON data: %w", err)
	}

	// Decode ke slice User
	var listData []model.User
	if err := json.Unmarshal(jsonData, &listData); err != nil {
		return fmt.Errorf("failed to unmarshal JSON data: %w", err)
	}

	// Auto migrate table User
	if err := db.AutoMigrate(&model.User{}); err != nil {
		return fmt.Errorf("failed to migrate User model: %w", err)
	}

	// Loop data
	for _, data := range listData {
		if data.ID == uuid.Nil {
			data.ID = uuid.New()
		}

		query := db.Model(&model.User{})

		// Tambah unique field checks
		for _, field := range uniqueFields {
			val, err := helpers.GetFieldValue(data, field)
			if err != nil {
				return err
			}
			query = query.Where(fmt.Sprintf("%s = ?", helpers.SnakeCase(field)), val)
		}

		// Cek existing
		var existing model.User
		if err := query.First(&existing).Error; !errors.Is(err, gorm.ErrRecordNotFound) {
			continue
		}

		// Insert
		if err := db.Create(&data).Error; err != nil {
			return fmt.Errorf("failed to insert data: %w", err)
		}
	}

	return nil
}
