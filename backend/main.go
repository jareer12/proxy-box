package main

import (
	"fmt"
	"net/http"

	surreal "github.com/garrison-henkle/surrealdb.go"
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

type Application struct {
	External_port int16    `json:"external_port"`
	Host          string   `json:"host"`
	Id            string   `json:"id"`
	Internal_port int      `json:"internal_port"`
	Name          string   `json:"name"`
	Scheme        string   `json:"scheme"`
	Server_names  []string `json:"server_names"`
}

type Results struct {
	ID     interface{}   `json:"id" msgpack:"id"`
	Result []interface{} `json:"result" msgpack:"result"`
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

func restart(w http.ResponseWriter, req *http.Request) {
	configs := get_configs()

	url := configs.scheme + "://" + configs.host + ":" + fmt.Sprint(configs.port)

	db, db_err := surreal.New(url + "/rpc")

	if db_err != nil {
		fmt.Print(db_err)
	}

	_, signin_err := db.Use(configs.user, configs.pass)
	if signin_err != nil {
		fmt.Print(signin_err)
	}

	_, use_err := db.Use(configs.ns, configs.db)
	if use_err != nil {
		fmt.Print(use_err)
	}

	data, d_err := db.Select("apps")
	if d_err != nil {
		fmt.Print(d_err)
	}

	fmt.Println(data)

	var apps Application
	err := surreal.Unmarshal(data, &apps)

	if err != nil {
		fmt.Print(d_err)
	}

	fmt.Println(apps)
}

func main() {
	http.HandleFunc("/restart", restart)
	http.ListenAndServe(":1000", nil)
}
