package migrations

import (
	"gorm.io/gorm"
)

func Seed(db *gorm.DB) error {
	// cukup panggil langsung tanpa generic
	if err := SeedUsersFromJSON(db, "./migrations/json/users.json", "Email"); err != nil {
		return err
	}

	return nil
}
