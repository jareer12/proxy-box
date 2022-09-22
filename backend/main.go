package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	surreal "github.com/surrealdb/surrealdb.go"
)

type Config struct {
	ns     string
	db     string
	user   string
	scheme string
	pass   string
	host   string
	port   int
}

type Results struct {
	result []any
	status string
	time   string
}

func restart(w http.ResponseWriter, req *http.Request) {
	configs := get_configs()

	url := configs.scheme + "://" + configs.host + ":" + fmt.Sprint(configs.port)
	db, db_err := surreal.New(url + "/rpc")

	if db_err != nil {
		fmt.Print(db_err)
	}

	_, use_err := db.Use(configs.ns, configs.db)
	if use_err != nil {
		fmt.Print(use_err)
	}

	data, d_err := db.Query("select * from apps", nil)
	if d_err != nil {
		fmt.Print(d_err)
	}

	fmt.Println(data)

	var apps Results
	json.Unmarshal([]byte(fmt.Sprint(data)), &apps)

	fmt.Println(&apps)

	for i, s := range apps.result {
		fmt.Println(i, s)
	}

}

func headers(w http.ResponseWriter, req *http.Request) {

	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
}

func get_configs() Config {
	configs := Config{
		user:   "root",
		pass:   "root",
		db:     "test",
		ns:     "test",
		host:   "127.0.0.1",
		scheme: "ws",
		port:   8000,
	}

	return configs
}

func main() {
	http.HandleFunc("/restart", restart)
	http.HandleFunc("/headers", headers)

	http.ListenAndServe(":8090", nil)
}
