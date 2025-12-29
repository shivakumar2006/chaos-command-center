package chaos

import "sync/atomic"

var enabled int32

func Enable() {
	atomic.StoreInt32(&enabled, 1)
}

func Disable() {
	atomic.StoreInt32(&enabled, 0)
}

func IsEnabled() bool {
	return atomic.LoadInt32(&enabled) == 1
}
