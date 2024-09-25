package api

import (
	"encoding/json"
	"net/http"
)

// User struct to handle login/signup data
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var users = make(map[string]string)

// LoginHandler authenticates users
func LoginHandler(w http.ResponseWriter, r *http.Request) {
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

	if storedPassword, exists := users[user.Username]; exists && storedPassword == user.Password {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message": "Login successful"}`))
	} else {
		http.Error(w, `{"error": "Invalid credentials"}`, http.StatusUnauthorized)
	}
}

// SignUpHandler registers new users
func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if _, exists := users[user.Username]; exists {
		http.Error(w, `{"error": "User already exists"}`, http.StatusConflict)
		return
	}

	users[user.Username] = user.Password
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"message": "User created successfully"}`))
}
