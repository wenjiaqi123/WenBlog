# golang	WEB



## HTTP 请求

```go
package main

import "net/http"

func main() {
	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		println(r.Host)
		w.Write([]byte("Hello World"))
	})

	http.ListenAndServe(":8080", nil)
}
```



## mux

```go
package main

import (
    "github.com/gorilla/mux"
    "net/http"
)

func main() {
    router := mux.NewRouter()

    router.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {

       title := mux.Vars(r)["title"]
       page := mux.Vars(r)["page"]

       println(title)
       println(page)
    })

    http.ListenAndServe(":8080", router)
}
```

http://localhost:8080/books/hello/page/20

![image-20231205111332742](https://attach.blog.wen7.online/202312051113814.png)



## protobuf

```go

```

