#!/bin/sh

kubectl port-forward service/kiali 20001:20001 -n istio-system
