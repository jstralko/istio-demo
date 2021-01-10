FROM golang:1.7.3
RUN go get -d -v github.com/rs/cors 
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest  
RUN apk --no-cache add ca-certificates
COPY --from=0 /go/main .
CMD ["./main"] 


