package helpers

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func GenerateToken() (string, error) {
	// Bikin angka random 6 digit (100000 - 999999)
	n, err := rand.Int(rand.Reader, big.NewInt(900000))
	if err != nil {
		return "", err
	}
	return fmt.Sprintf("%06d", n.Int64()+100000), nil
}
