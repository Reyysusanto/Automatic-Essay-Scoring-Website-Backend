package migrations

import (
	"go-backend/model"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&model.User{},
	); err != nil {
		return err
	}

	return nil
}
