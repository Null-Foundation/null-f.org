cat ./public/.well-known/tor-relay/rsa-fingerprint.txt | awk '{ printf("%s,",$0) }'