package main

import (
	"encoding/json"
	"log"
	"net/http"
	"travatocars-backend/api"
	"travatocars-backend/utils"

	"github.com/gorilla/mux"
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
	// Create a new router
	r := mux.NewRouter()

	// Serve static files from the public directory
	r.PathPrefix("/images/").Handler(http.StripPrefix("/images/", http.FileServer(http.Dir("public/images"))))

	// Define API routes
	r.HandleFunc("/api/login", api.LoginHandler).Methods("POST")
	r.HandleFunc("/api/signup", api.SignUpHandler).Methods("POST")
	r.HandleFunc("/api/cars", getCarsHandler).Methods("GET")

	// Configure CORS
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
	})

	// Use the CORS middleware and start the server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", corsHandler.Handler(r)); err != nil {
		log.Fatalf("Could not start server: %s", err)
	}
}
