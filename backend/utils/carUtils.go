package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

// Car struct to represent car data
type Car struct {
	ID             int    `json:"id"`
	Make           string `json:"make"`
	Model          string `json:"model"`
	Year           int    `json:"year"`
	Condition      string `json:"condition"`
	Modified       bool   `json:"modified"`
	Registered     bool   `json:"registered"`
	ServiceHistory bool   `json:"serviceHistory"`
	ImageURL       string `json:"imageUrl"`
	Link           string `json:"link"`
}

// LoadCars reads the car data from the JSON file
func LoadCars() ([]Car, error) {
	data, err := ioutil.ReadFile("data/cars.json")
	if err != nil {
		log.Printf("Error reading car data: %v", err)
		return nil, err
	}

	var cars []Car
	if err := json.Unmarshal(data, &cars); err != nil {
		log.Printf("Error unmarshalling car data: %v", err)
		return nil, err
	}

	return cars, nil
}
