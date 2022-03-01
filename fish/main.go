package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"

	"github.com/rs/cors"
)

type Fish struct {
	Type string
	Y    int
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/fish", func(w http.ResponseWriter, r *http.Request) {
		min := 350
		max := 950

		fish := Fish{"/fish-red.png", rand.Intn(max-min) + min}
		js, err := json.Marshal(fish)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	})

	fmt.Printf("Starting server at port 8080\n")
	//CORS setup - allow all.
	handler := cors.Default().Handler(mux)
	if err := http.ListenAndServe(":8080", handler); err != nil {
		log.Fatal(err)
	}
}
