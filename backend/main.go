package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return // Handle preflight requests
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// authentication logic
	if user.Username == "admin" && user.Password == "password" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Login successful"}`)) // Respond with JSON
	} else {
		http.Error(w, `{"error": "Invalid credentials"}`, http.StatusUnauthorized)
	}
}

func main() {
	http.HandleFunc("/api/login", loginHandler)

	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}
