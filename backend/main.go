package main

import (
	"log"
	"net/http"
	"travatocars-backend/api"
)

func main() {
	http.HandleFunc("/api/login", api.LoginHandler)
	http.HandleFunc("/api/signup", api.SignUpHandler)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
