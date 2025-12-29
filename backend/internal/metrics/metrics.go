package metrics

import "sync/atomic"

var (
	TotalRequests uint64
	TotalSuccess  uint64
	TotalFailures uint64
)

func IncRequest() {
	atomic.AddUint64(&TotalRequests, 1)
}

func IncSuccess() {
	atomic.AddUint64(&TotalSuccess, 1)
}

func IncFailure() {
	atomic.AddUint64(&TotalFailures, 1)
}
