package main

import (
	"encoding/json"
	"log"
	"net/http"
	"travatocars-backend/api"
	"travatocars-backend/utils"

	"github.com/rs/cors"
)

// getCarsHandler retrieves car data and sends it as JSON response
func getCarsHandler(w http.ResponseWriter, r *http.Request) {
	cars, err := utils.LoadCars()
	if err != nil {
		http.Error(w, "Could not load car data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(cars)
}

func main() {
	// Serve static files from the public directory
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("public/images"))))

	http.HandleFunc("/api/login", api.LoginHandler)
	http.HandleFunc("/api/signup", api.SignUpHandler)
	http.HandleFunc("/api/cars", getCarsHandler)

	// Configure CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // allow your frontend URL
		AllowCredentials: true,
	})

	// Use the cors middleware
	http.ListenAndServe(":8080", corsHandler.Handler(http.DefaultServeMux))

	log.Println("Starting server on :8080")
}
